const Sequelize = require('sequelize');
const { DECIMAL, DATEONLY, STRING, INTEGER, VIRTUAL } = Sequelize;
const db = new Sequelize('postgres://postgres:FSA123@localhost/stock-portfolios', {
  logging: false
});
const faker = require('faker');

const Client = db.define('client',{
  name: {
    type: STRING
  },
  birthdate: {
    type: DATEONLY
  },
  cityState: {
    type: STRING
  },
  clientSince: {
    type: DATEONLY
  },
  photoUrl: {
    type: STRING
  }
})

const Portfolio = db.define('portfolio',{
  type: {
    type: INTEGER
  },
  dateCreated: {
    type: DATEONLY
  },
  beneficiary: {
    type: STRING
  },
  taxFree: {
    type: VIRTUAL,
    get() {
      return this.type === 1;
    }
  }
})

const Stock = db.define('stock', {
  symbol: {
    type: STRING
  },
  datePurchased: {
    type: DATEONLY
  },
  quantity: {
    type: INTEGER
  },
  purchasePrice: {
    type: DECIMAL(12,2)
  }
});

Client.hasMany(Portfolio);
Portfolio.belongsTo(Client);
Portfolio.hasMany(Stock);
Stock.belongsTo(Portfolio);

const seedTestData= async () => {
  await db.sync({force: true});
  // load 10 clients
  for (let i=0; i < 10; i++){
    const newClient = await Client.create({
      name: faker.name.findName(),
      birthdate: faker.date.between(new Date(365 * 24 * 3600 * 500), new Date(365 * 24 * 3600 * 50000)),
      cityState: faker.address.city() + ', ' + faker.address.stateAbbr(),
      clientSince: faker.date.past(),
      photoUrl: faker.image.people()
    })
    
    // load 1 or 2 portfolios per client
    const nbrPortfolios = Math.ceil(Math.random()*2);
    for (let i = 0; i < nbrPortfolios; i++) {
      const newPortfolio = await Portfolio.create({
        clientId: newClient.id,
        type: Math.ceil(Math.random()*2),
        dateCreated: faker.date.between(new Date(365 * 24 * 3600 * 500), new Date(365 * 24 * 3600 * 50000)),
        beneficiary: faker.name.findName()
      })
      // load uo to 10 stocks per portfolio
      const nbrStocks = Math.ceil(Math.random()*10);
      const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (let i = 0; i < nbrStocks; i++) {
        const newStock = await Stock.create({
          portfolioId: newPortfolio.id,
          symbol: letters[Math.floor(Math.random()*26)],
          datePurchased: faker.date.between(new Date(365 * 24 * 3600 * 5000), new Date(365 * 24 * 3600 * 50000)),
          quantity: Math.ceil(Math.random()*100),
          purchasePrice: (Math.random()*100).toFixed(2)
        })
      }
    }
  }
} 

module.exports = {
  Client,
  Portfolio,
  Stock,
  seedTestData
}
