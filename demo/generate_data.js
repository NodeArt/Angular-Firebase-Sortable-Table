"use strict";
const firebase = require('firebase');
const Chance = require('chance');
const config = JSON.parse(require('fs').readFileSync('fb_config.json'));

console.log(config);

firebase.initializeApp(config);

const DB = firebase.database();

const chance = new Chance();

const employeesFactory = function(i) {
  return {
    name: chance.name(),
    age: chance.age(),
    gender: chance.gender(),
    country: chance.country(),
    job: i < 100 ? "Frontend Engineer" : "Backend Engineer",
    cv: chance.sentence(),
    inSearch: i % 2 === 0,
    favoriteFramework: i % 2 ? (i > 100 ? "AngularJS" : "Angular2+")  : (i > 100 ? "React.JS" : "Vue.JS")
  }
};

const employersFactory = function(i) {
  return {
    name: chance.name(),
    country: chance.country(),
    address: chance.address({short_suffix: true}),
    phone: chance.phone(),
    lookingFor: i > 100 ? "Frontend Engineer" : "Backend Engineer",
    email: chance.email(),
  }
};

let counter = 199;
const employees = DB.ref('employees');
const employers = DB.ref('employers');

for (let i = 0; i < 200; i++) {
  Promise.all([
    employees.push(employeesFactory(i)),
    employers.push(employersFactory(i))
  ]).then(() => {
    --counter;
    if (counter === 0) process.exit(0);
  });
}