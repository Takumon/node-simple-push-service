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

// その他のリクエストはindexファイルにルーティング
server.get('/view/**', (req, res) => res.sendFile(path.join(__dirname, req.url)));
server.get('/archive/**', (req, res) => res.sendFile(path.join(__dirname, req.url)));


// サーバを起動
server.listen(process.env.SERVER_PORT || 12345, () => {

  // 標準入力があれば終了（サーバを停止）
  console.log('To stop the server, press Enter.')
  rl.on('line', () => process.exit());
})

