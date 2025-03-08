import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

class StockDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbol: 'AAPL',
      stockData: { price: 'N/A' },
      previousSymbols: [],
      socket: null,
    };
    this.stockInput = React.createRef(); // Uncontrolled Component
  }

  componentDidMount() {
    const socket = io('http://localhost:5000');
    this.setState({ socket });
    this.fetchStockData();
    
    socket.on('stockUpdate', (data) => {
      if (data.symbol === this.state.stockSymbol) {
        this.setState({ stockData: data });
      }
    });
  }

  fetchStockData = async () => {
    const { stockSymbol, previousSymbols } = this.state;
    try {
      const response = await axios.get(`http://localhost:5000/stock/${stockSymbol}`);
      this.setState({ 
        stockData: response.data,
        previousSymbols: [...previousSymbols, stockSymbol],
      });
    } catch (error) {
      console.error('Error fetching stock data', error);
    }
  };

  handleChange = (event) => {
    this.setState({ stockSymbol: event.target.value });
  };

  handleSearch = () => {
    this.setState({ stockSymbol: this.stockInput.current.value }, this.fetchStockData);
  };

  render() {
    return (
      <div className="container mt-4">
        <h2 className="text-center">Stock Market Dashboard</h2>
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter Stock Symbol" 
            value={this.state.stockSymbol} 
            onChange={this.handleChange} 
          />
          <button className="btn btn-primary" onClick={this.fetchStockData}>Search</button>
        </div>
        <h4>Previous Searches:</h4>
        <ul>
          {this.state.previousSymbols.map((symbol, index) => (
            <li key={index}>{symbol}</li>
          ))}
        </ul>
        <div className="card p-3">
          <h4>Stock Price: ${this.state.stockData.price}</h4>
        </div>
      </div>
    );
  }
}

export default StockDashboard;
