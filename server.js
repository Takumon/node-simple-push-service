const fs = require('fs')
const http = require('http')
const express = require('express')
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const server = express()

server.use((req, res, next) => {
  res.sseSetup = () => res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.sseSend = (data) => res.write("data: " + JSON.stringify(data) + "\n\n");
  next()
})

var connections = []

// メッセージ受信用のHandlerFunctionを作成
const subscribeFunction = (req, res) => {
  res.sseSetup()
  connections.push(res)
};

// メッセージ送信用のHandlerFunctionを作成
const publishFunction = (req, res) => {
  if (!req.query.m) return res.sendStatus(400)
  connections.forEach(con => con.sseSend(req.query.m))
  res.sendStatus(200)
};

// ルーティングの定義
server.get('/api/subscribe', subscribeFunction)
server.get('/api/publish', publishFunction)
server.get('/view/**', (req, res) => res.sendFile(path.join(__dirname, req.url)));
server.get('/archive/**', (req, res) => res.sendFile(path.join(__dirname, req.url)));

// サーバを起動
server.listen(process.env.SERVER_PORT || 12345, () => {

  // 標準入力があれば終了（サーバを停止）
  console.log('To stop the server, press Enter.')
  rl.on('line', () => process.exit());
})
