var faker = require('faker');

var database = { products: [] };

for (var i=1; i<=50; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.product(),
    cost: faker.commerce.price(),
    quantity: Math.round(Math.random()*100)
  });
}

console.log(JSON.stringify(database));
