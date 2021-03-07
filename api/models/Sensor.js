/**
 * Sensor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    type: {
      type: 'string',
      required: true,
      isIn: ['temperature', 'moisture', 'humidity', 'light']
    },
    preferredInterface: { type: 'string', required: true },
    unit: {
      type: 'string',
      required: true
    },
    readings: {
      collection: 'reading',
      via: 'sensor'
    }
  }
};
