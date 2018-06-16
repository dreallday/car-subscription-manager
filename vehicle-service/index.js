const { send } = require('micro')
const { router, get } = require('microrouter')

const faker = require("faker");

let vehicles = [];
const num = Math.round(Math.random() * 100);

for(i = 0; i < num; i++){
    vehicles.push({
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        vin: faker.random.alphaNumeric(17).toUpperCase(),
        image: faker.image.transport(500, 150),
        description: faker.lorem.lines(5),
        odometer: Math.round(Math.random() * 150000)
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
