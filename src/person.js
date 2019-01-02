'use strict';

module.exports = class Person {
  constructor(id, name, email, position, country) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.country = country;
    this.position = position;
  }
};
