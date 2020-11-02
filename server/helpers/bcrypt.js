'use strict'

const bycrpt = require('bcryptjs');

function hashPassword(password){
  const salt = bycrpt.genSaltSync(10);
  const hash = bycrpt.hashSync(password,salt);

  return hash;
}

function comparePassword(password, hash){
  return bycrpt.compareSync(password, hash);
}

module.exports = {
  hashPassword,
  comparePassword
}