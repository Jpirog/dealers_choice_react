import React from 'react';

const Client = (props) => {
  const { client } = props;
  const { portfolios } = client;

  return (
    <tr key={client.id}>
      <td><img src={client.photoUrl} /></td>
      <td>{client.name}</td>
      <td>{client.cityState}</td>
      <td>{client.birthdate}</td>
      <td>{client.clientSince}</td>
      <td className='selection'>
        <a onClick={() => props.dispPortfolio(portfolios[0].id)}>
          
        {portfolios[0].dateCreated} <br></br>
        {portfolios[0].type === 1 ? 'Taxable' : 'Non-taxable'}
        </a>
      </td>      
      {portfolios.length > 1 ? 
        <td className='selection'>
          <a onClick={() => props.dispPortfolio(portfolios[1].id)}>
          {portfolios[1].dateCreated} <br></br>
          {portfolios[1].type === 1 ? 'Taxable' : 'Non-taxable'}
          </a>
        </td>      
        :
        <td></td>
        }
        
      
      
    </tr>
  )
}

export default Client;