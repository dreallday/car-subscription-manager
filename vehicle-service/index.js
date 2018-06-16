const { send } = require('micro')
const { router, get } = require('microrouter')

const faker = require("faker");

let vehicles = [];
const num = Math.round(Math.random() * 100);

for(i = 0; i < num; i++){
    vehicles.push({
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
    });
}

module.exports = router(
  get('/vehicles', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    // const vehicles = []
    // TODO: Return list of vehicles

    return vehicles;
  })
)
