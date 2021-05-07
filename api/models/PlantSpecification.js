/**
 * PlantSpecification.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    plant: {
      model: 'plant',
      unique: true,
      required: true,
    },
    humidityStart: {
      type: 'number',
      min: 0,
      max: 100,
    },
    humidityEnd: {
      type: 'number',
      min: 0,
      max: 100,
    },
    temperatureStart: {
      type: 'number',
    },
    temperatureEnd: {
      type: 'number',
    },
    soilMoistureStart: {
      type: 'number',
      min: 0,
      max: 100,
    },
    soilMoistureEnd: {
      type: 'number',
      min: 0,
      max: 100,
    },
    brightnessStart: {
      type: 'number',
      min: 0,
      max: 100,
    },
    brightnessEnd: {
      type: 'number',
      min: 0,
      max: 100,
    },
  },
};
