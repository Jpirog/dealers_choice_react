import React from 'react';

const getDate = () => {
  const d = new Date(2021, 4, 29, 12, 31, 21); 
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

const getTime = () => {
  const d = new Date(2021, 4, 29, 12, 31, 22); 
  return `${d.getHours()}:${d.getMinutes()+1}:${d.getSeconds()}`;
}

const Sidebar = (props) => {
    return (
      <div id='sidebar'>
        <img src='institution_icon.svg' id='logo' />
        <section>
          <h4>
            <a href='/'>Clients</a>
          </h4>
          <p className='info'>Employee:
          <br />{ props.employeeName }</p>
          <p className='info'>Last login:
          <br /> { getDate() }
          <br /> { getTime() }</p>
        </section>
      </div>
      
    )
}

export default Sidebar;