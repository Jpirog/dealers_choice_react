import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import Clients from './Clients';
import Stocks from './Stocks';
const faker = require('faker');
const Axios = require('axios');

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      employeeName: faker.name.findName(),
      clients: [],
      selectedPortfolio: {}
    }
    this.dispPortfolio = this.dispPortfolio.bind(this);
    this.sell = this.sell.bind(this);
    this.buy = this.buy.bind(this);
    this.resetToClients = this.resetToClients.bind(this);
  }
  async resetToClients (){
    this.setState({ selectedPortfolio: {}});
  }
  async componentDidMount () {
    const _data = await Axios.get('/api/client');
    const data = _data.data;
    this.setState({clients: data});
  }
  async dispPortfolio (portfolioId) {
    const _data = await Axios.get(`/api/portfolio/${portfolioId}`)
    const data = _data.data;
    this.setState({selectedPortfolio: data[0]})
  }

  async sell(stockId) {
    const _data = await Axios.delete(`api/stock/${stockId}`);
    const copyPortfolio = Object.assign({},this.state.selectedPortfolio);
    copyPortfolio.stocks = copyPortfolio.stocks.filter(c => c.id !== stockId);
    this.setState({selectedPortfolio: copyPortfolio});
  }

  async buy(details) {
    let newStock;
    try{
      const _data = await Axios.post(`api/stock`, details)
      const data = _data.data;
        newStock = data;
        const copyPortfolio = Object.assign({},this.state.selectedPortfolio);
        copyPortfolio.stocks.push(newStock);
        this.setState({selectedPortfolio: copyPortfolio});
    }
    catch(ex){
      console.log('Error adding stock', ex)
    }
  }

  render () {
   console.log('in render', this.state.selectedPortfolio)
   console.log('also:', Object.entries(this.state.selectedPortfolio))
    return (
      <div id='main'>
        <Header />
        <Sidebar employeeName={ this.state.employeeName } resetToClients={ this.resetToClients } />
        {Object.entries(this.state.selectedPortfolio).length === 0 ?
          <Clients clients={ this.state.clients } dispPortfolio={this.dispPortfolio}/>
          :
          <Stocks portfolio={this.state.selectedPortfolio} sell={this.sell} buy={this.buy}/>
        }
        <Footer />
      </div>
    )
  }
}

export default Main;