const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());

let stockPrices = { AAPL: 150.0, TSLA: 700.0, GOOGL: 2800.0 };

const fetchStockPrice = (symbol) => {
  let change = (Math.random() * 4 - 2).toFixed(2); // Small price changes
  stockPrices[symbol] = (parseFloat(stockPrices[symbol]) + parseFloat(change)).toFixed(2);
  return { symbol, price: stockPrices[symbol] };
};

// API for initial stock fetch
app.get('/stock/:symbol', (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  res.json(fetchStockPrice(symbol));
});

// WebSocket for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected');
  setInterval(() => {
    for (let symbol in stockPrices) {
      socket.emit('stockUpdate', fetchStockPrice(symbol));
    }
  }, 3000);
});

server.listen(5000, () => console.log('Server running on port 5000'));
