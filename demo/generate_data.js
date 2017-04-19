"use strict";
const firebase = require('firebase');
const Chance = require('chance');
const config = {
  apiKey: "AIzaSyBbKmIPEGoxk1PEOL4yctQmRpl14DQA9h0",
  authDomain: "ngfb-sortable-table-demo.firebaseapp.com",
  databaseURL: "https://ngfb-sortable-table-demo.firebaseio.com",
  projectId: "ngfb-sortable-table-demo",
  storageBucket: "ngfb-sortable-table-demo.appspot.com",
  messagingSenderId: "1061433697273"
};
firebase.initializeApp(config);

const chance = new Chance();

const factory = function(i) {
  return {
    name: chance.name(),
    age: chance.age(),
    birthday: chance.birthday({string: true, american: false}),
    country: chance.country(),
    image: chance.avatar({fileExtension: 'jpg'}),
    job: i > 50 ? "Frontend Engineer" : "Frontend Developer",
    cv:  chance.paragraph(),
    inSearch: i % 2 === 0,
    favoriteFramework: i % 2 ? (i > 100 ? "AngularJS" : "Angular2+")  : (i > 100 ? "React.JS" : "Vue.JS")
  }
};

const people = firebase.database().ref('people');
let counter = 199;
for (let i = 0; i < 200; i++) {
  const data = factory(i);
  const newKey = people.push();
  newKey.set(data).then(() => {
    --counter;
    if (counter === 0) process.exit(0);
  });
}