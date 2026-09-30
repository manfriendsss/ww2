interface Env {
  SYNC_KV?: {
    get: (key: string) => Promise<string | null>;
    put: (key: string, value: string) => Promise<void>;
  };
}

let inMemoryState = {
  index: 0,
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
      const stored = await context.env.SYNC_KV.get('slide_state');
      if (stored) {
        return new Response(stored, {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }
    } catch {
      // Fallback to in-memory state on KV error
    }
  }

  return new Response(JSON.stringify(inMemoryState), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  try {
    const payload = (await context.request.json()) as { index?: number };
    const nextIndex = typeof payload.index === 'number' && Number.isFinite(payload.index)
      ? Math.max(0, Math.floor(payload.index))
      : 0;

    let currentState = inMemoryState;
    if (context.env?.SYNC_KV) {
      try {
        const stored = await context.env.SYNC_KV.get('slide_state');
        if (stored) currentState = JSON.parse(stored);
      } catch {}
    }

    const newState = {
      index: nextIndex,
      revision: (currentState.revision || 0) + 1,
      updatedAt: Date.now(),
    };

    inMemoryState = newState;

    if (context.env?.SYNC_KV) {
      try {
        await context.env.SYNC_KV.put('slide_state', JSON.stringify(newState));
      } catch {}
    }

    return new Response(JSON.stringify(newState), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid sync payload' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
}
