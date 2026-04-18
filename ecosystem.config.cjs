/**
 * PM2 config for VPS: serves the Vite production build from ./dist
 *
 * On the server (after Node/npm installed):
 *   cd /path/to/teamcloud
 *   npm ci && npm run build
 *   pm2 start ecosystem.config.cjs
 *   pm2 save && pm2 startup
 *
 * Change port: edit the -l argument below (and firewall / reverse proxy).
 * Put nginx/Caddy in front for HTTPS and optional domain.
 */
const path = require('path')

module.exports = {
  apps: [
    {
      name: 'teamcloud',
      cwd: __dirname,
      script: path.join(__dirname, 'node_modules/serve/build/main.js'),
      args: ['-s', 'dist', '-l', 'tcp://0.0.0.0:3000'],
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
