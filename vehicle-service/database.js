const faker = require("faker");

const num = Math.round(Math.random() * 100);

let vehicles = [];

for(i = 0; i < num; i++){
    vehicles.push({
        id: faker.random.uuid(),
        name: faker.commerce.product(),
    });
    console.log(i);
}

export default vehicles;
