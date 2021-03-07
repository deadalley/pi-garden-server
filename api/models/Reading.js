/**
 * Reading.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// todo: disallow post routes for this model
module.exports = {
  attributes: {
    sensor: {
      model: 'sensor',
      required: true
    },
    value: {
      type: 'number',
      required: true
    }
  }
};
