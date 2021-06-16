import React from 'react';

const Stocks = (props) => {
  const { portfolio } = props;
  const { stocks } = portfolio;
  console.log("IN STOCKS-stocks=", stocks)
  return (
    <div id='main-stocks' className='container'>
      <h4>Stocks - Client {portfolio.client.name} ({portfolio.client.cityState})
      </h4>
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