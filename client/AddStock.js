import React from 'react';

class AddStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      quantity: 0,
      purchasePrice: 0,
      portfolioId:  props.portfolioId,
      datePurchased: '1999-12-31'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    switch (event.target.id){
      case 'newstock':
        this.setState({symbol: event.target.value.toUpperCase()})
        break;
      case 'shares':
        this.setState({quantity: Number(event.target.value)})
        break;
    }
    this.setState({purchasePrice: (Math.random()*100).toFixed(2)})
    const dt=new Date();
    const purchDate=`${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`
    this.setState({ datePurchased: purchDate });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.symbol === ''){
      alert('Stock symbol is required');
      return;
    }
    if (this.state.quantity < 1 || this.state.quantity > 1000){
      alert('Quantity must be between 1 and 1000');
      return;
    }

    await this.props.buy(this.state);
    alert (`${this.state.quantity} shares of ${this.state.symbol} Company purchased at ${this.state.purchasePrice}`)
    this.setState({symbol: '', quantity: 0})
  }

  render() {
    return (
      <div id='buystock'>
        <h3>Buy a stock:</h3>
        <form onSubmit={() => {this.props.buy(this.state)}}>
          <label>Stock symbol:
            <input autoFocus required id='newstock' type="text"  value={this.state.symbol} onChange={this.handleChange}/>
          </label>
          <label>Number of shares:
            <input id='shares' required min='1' max='1000' type="number"  value={this.state.quantity} onChange={this.handleChange}/>
          </label>
          <input type="button" value="Buy" onClick={this.handleSubmit}/>
          <p>NOTE: All shares will go into this portfolio and have the current quoted stock price</p>
        </form>
      </div>
    );
  }
}

export default AddStock;
