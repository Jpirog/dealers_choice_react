import React from 'react';
import Client from './Client';

const Clients = (props) => {
  const { clients } = props;
    return (
      <div id='main-clients' className='container'>
          <h4>Active Client List</h4>
          <table id='clienttbl'>
            <tbody>
            <tr className='gray'>
              <td></td>
              <td>Name</td>
              <td>Location</td>
              <td>Client Since</td>
              <td>Age</td>
              <td colSpan="2">Portfolios (click)</td>
            </tr>
              { clients.map(c => {
                return(
                  <Client client={c} key={c.id} dispPortfolio={props.dispPortfolio}/>
                  )
              }
              )
              }
              </tbody>
            </table>
      </div>
      
    )
}

export default Clients;