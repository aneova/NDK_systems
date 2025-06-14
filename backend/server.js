
const express = require('express');
const os = require('os');
const https = require('https');
const gateway = require('default-gateway');
const cors = require('cors');

const app = express();
app.use(cors());

function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const result = [];

  for (const name in interfaces) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        result.push({
          interface: name,
          address: net.address,
        });
      }
    }
  }

  return result;
}

async function getGatewayIP() {
  try {
    const result = await gateway.v4();
    return result.gateway;
  } catch {
    return 'неизвестен';
  }
}

function getPublicIP() {
  return new Promise((resolve, reject) => {
    https.get('https://api.ipify.org/?format=json', (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).ip);
        } catch {
          reject('ошибка');
        }
      });
    }).on('error', () => reject('ошибка'));
  });
}

app.get('/api/ipinfo', async (req, res) => {
  const localIPs = getLocalIPs();
  const gatewayIP = await getGatewayIP();
  const publicIP = await getPublicIP().catch(() => 'не удалось получить');

  res.json({ localIPs, gatewayIP, publicIP });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
