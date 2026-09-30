import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin } from 'vite';

function presentationSyncPlugin(): Plugin {
  let state = {
    index: 0,
    step: 0,
    revision: 0,
    updatedAt: Date.now(),
  };
  let command = {
    action: null as 'next' | 'prev' | 'goto' | null,
    index: undefined as number | undefined,
    step: undefined as number | undefined,
    revision: 0,
    updatedAt: Date.now(),
  };

  return {
    name: 'ww2-presentation-sync',
    configureServer(server) {
      const sendJson = (res: import('http').ServerResponse, payload: unknown, status = 200) => {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(payload));
      };

      const setCors = (res: import('http').ServerResponse) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      };

      server.middlewares.use('/api/sync', (req, res) => {
        setCors(res);

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method === 'GET') {
          sendJson(res, state);
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}') as { index?: number; step?: number };
              if (Number.isFinite(payload.index)) {
                state = {
                  index: Math.max(0, Number(payload.index)),
                  step: typeof payload.step === 'number' && Number.isFinite(payload.step)
                    ? Math.max(0, Number(payload.step))
                    : 0,
                  revision: state.revision + 1,
                  updatedAt: Date.now(),
                };
              }
              sendJson(res, state);
            } catch {
              sendJson(res, { error: 'Invalid sync payload' }, 400);
            }
          });
          return;
        }

        sendJson(res, { error: 'Method not allowed' }, 405);
      });

      server.middlewares.use('/api/command', (req, res) => {
        setCors(res);

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method === 'GET') {
          sendJson(res, command);
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}') as {
                action?: 'next' | 'prev' | 'goto';
                index?: number;
                step?: number;
              };
              if (payload.action === 'next' || payload.action === 'prev' || payload.action === 'goto') {
                command = {
                  action: payload.action,
                  index: typeof payload.index === 'number' && Number.isFinite(payload.index)
                    ? Math.max(0, Math.floor(payload.index))
                    : undefined,
                  step: typeof payload.step === 'number' && Number.isFinite(payload.step)
                    ? Math.max(0, Math.floor(payload.step))
                    : undefined,
                  revision: command.revision + 1,
                  updatedAt: Date.now(),
                };
              }
              sendJson(res, command);
            } catch {
              sendJson(res, { error: 'Invalid command payload' }, 400);
            }
          });
          return;
        }

        sendJson(res, { error: 'Method not allowed' }, 405);
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    watch: {
      ignored: ['**/*.mp4', '**/dist/**'],
    },
  },
  plugins: [presentationSyncPlugin(), react(), tailwindcss()],
});
