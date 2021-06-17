import React from 'react';
import AddStock from './AddStock';

const Stocks = (props) => {
  const { portfolio, sell, buy } = props;
  const { stocks } = portfolio;
  return (
    <div id='main-stocks' className='container'>
      <h4>Portfolio Stock Inventory --- Client: {portfolio.client.name} --- Location: {portfolio.client.cityState}</h4>
      <AddStock buy={buy} portfolioId={portfolio.id}/>
      <table id='stockstbl'>
        <tbody>
          <tr className='gray'>
            <td>Symbol</td>
            <td>Name</td>
            <td># Shares</td>
            <td>Purchase Price</td>
            <td>Date Purchased</td>
            <td>Current Price</td>
            <td>Gain / Loss</td>
            <td>Action</td>
          </tr>


          {stocks.map( c => {
            const currPrice = (Math.random()*100).toFixed(2);
            const gainLoss = ((currPrice - c.purchasePrice) * c.quantity).toFixed(2);
            return(
              <tr key={c.id}>
              <td className='center'>{c.symbol}</td>
              <td >{c.symbol} Corporation</td>
              <td className='right'>{c.quantity}</td>
              <td className='right'>{c.purchasePrice}</td>
              <td className='center'>{c.datePurchased}</td>
              <td className='right'>{currPrice}</td>
              <td className='right'>{gainLoss}</td>
              <td><button onClick={() => sell(c.id)}>Sell</button></td>
              </tr>
            )
          })
          }
          </tbody>
      </table>
    </div>
  )
}

export default Stocks;