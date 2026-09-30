interface Env {
  SYNC_KV?: {
    get: (key: string) => Promise<string | null>;
    put: (key: string, value: string) => Promise<void>;
  };
}

let inMemoryCommand = {
  action: null as 'next' | 'prev' | 'goto' | null,
  index: undefined as number | undefined,
  step: undefined as number | undefined,
  revision: 0,
  updatedAt: Date.now(),
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function onRequestGet(context: { env: Env }): Promise<Response> {
  if (context.env?.SYNC_KV) {
    try {
      const stored = await context.env.SYNC_KV.get('slide_command');
      if (stored) {
        return new Response(stored, {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }
    } catch {
      // Fallback to in-memory command on KV error
    }
  }

  return new Response(JSON.stringify(inMemoryCommand), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  try {
    const payload = (await context.request.json()) as {
      action?: 'next' | 'prev' | 'goto';
      index?: number;
      step?: number;
    };

    if (payload.action === 'next' || payload.action === 'prev' || payload.action === 'goto') {
      let currentCommand = inMemoryCommand;
      if (context.env?.SYNC_KV) {
        try {
          const stored = await context.env.SYNC_KV.get('slide_command');
          if (stored) currentCommand = JSON.parse(stored);
        } catch {}
      }

      const newCommand = {
        action: payload.action,
        index: typeof payload.index === 'number' && Number.isFinite(payload.index)
          ? Math.max(0, Math.floor(payload.index))
          : undefined,
        step: typeof payload.step === 'number' && Number.isFinite(payload.step)
          ? Math.max(0, Math.floor(payload.step))
          : undefined,
        revision: (currentCommand.revision || 0) + 1,
        updatedAt: Date.now(),
      };

      inMemoryCommand = newCommand;

      if (context.env?.SYNC_KV) {
        try {
          await context.env.SYNC_KV.put('slide_command', JSON.stringify(newCommand));
        } catch {}
      }

      return new Response(JSON.stringify(newCommand), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    return new Response(JSON.stringify({ error: 'Unsupported command action' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid command payload' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
}
