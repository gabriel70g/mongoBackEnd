'use strict'

function errorHandler (err) {
  console.error(err)
  throw new Error('Fallo en la operación del servidor')
}

module.exports = errorHandler