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
  }
  async componentDidMount () {
//    console.log('in component did mount');
    const _data = await Axios.get('/api/client');
    const data = _data.data;
    this.setState({clients: data});
    //console.log("CLIENTS", this.state.clients)
  }
  async dispPortfolio (portfolioId) {
    console.log("DISP PORTFOLIO", portfolioId);
    const _data = await Axios.get(`/api/portfolio/${portfolioId}`)
    const data = _data.data;
    this.setState({selectedPortfolio: data[0]})
    console.log('*** PORTFOLIO in STATE', this.state.selectedPortfolio)
  }

  render () {
    return (
      <div id='main'>
        <Header />
        <Sidebar employeeName={ this.state.employeeName }/>
        {Object.entries(this.state.selectedPortfolio).length === 0 ?
          <Clients clients={ this.state.clients } dispPortfolio={this.dispPortfolio}/>
          :
          <Stocks portfolio={this.state.selectedPortfolio} />
        }
        <Footer />
      </div>
    )
  }
}

export default Main;