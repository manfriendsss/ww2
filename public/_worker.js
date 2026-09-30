let syncState = {
  index: 0,
  revision: 0,
  updatedAt: Date.now(),
};

let commandState = {
  action: null,
  revision: 0,
  updatedAt: Date.now(),
};

const SYNC_CACHE_KEY = 'https://ww2-presentation.local/api/sync-state';
const COMMAND_CACHE_KEY = 'https://ww2-presentation.local/api/command-state';

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'access-control-allow-headers': 'content-type',
      'access-control-allow-methods': 'GET,POST,OPTIONS',
      'cache-control': 'no-store',
    },
  });

const readJson = async (request) => {
  try {
    return await request.json();
  } catch {
    return {};
  }
};

const readCachedState = async (key, fallback) => {
  const response = await caches.default.match(new Request(key));
  if (!response) return fallback;

  try {
    return await response.json();
  } catch {
    return fallback;
  }
};

const writeCachedState = async (key, state) => {
  await caches.default.put(
    new Request(key),
    new Response(JSON.stringify(state), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=86400',
      },
    })
  );
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
      return json({}, 204);
    }

    if (url.pathname === '/api/sync') {
      syncState = await readCachedState(SYNC_CACHE_KEY, syncState);

      if (request.method === 'GET') return json(syncState);

      if (request.method === 'POST') {
        const payload = await readJson(request);
        if (Number.isFinite(payload.index)) {
          syncState = {
            index: Math.max(0, Number(payload.index)),
            revision: syncState.revision + 1,
            updatedAt: Date.now(),
          };
          await writeCachedState(SYNC_CACHE_KEY, syncState);
        }
        return json(syncState);
      }

      return json({ error: 'Method not allowed' }, 405);
    }

    if (url.pathname === '/api/command') {
      commandState = await readCachedState(COMMAND_CACHE_KEY, commandState);

      if (request.method === 'GET') return json(commandState);

      if (request.method === 'POST') {
        const payload = await readJson(request);
        if (payload.action === 'next' || payload.action === 'prev') {
          commandState = {
            action: payload.action,
            revision: commandState.revision + 1,
            updatedAt: Date.now(),
          };
          await writeCachedState(COMMAND_CACHE_KEY, commandState);
        }
        return json(commandState);
      }

      return json({ error: 'Method not allowed' }, 405);
    }

    return env.ASSETS.fetch(request);
  },
};
