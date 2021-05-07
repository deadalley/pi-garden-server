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
      required: true,
    },
    humidityStart: {
      type: 'number',
      required: true,
      min: 0,
      max: 100,
    },
    humidityEnd: {
      type: 'number',
      required: true,
      min: 0,
      max: 100,
    },
    temperatureStart: {
      type: 'number',
      required: true,
    },
    temperatureEnd: {
      type: 'number',
      required: true,
    },
    soilMoistureStart: {
      type: 'number',
      required: true,
      min: 0,
      max: 100,
    },
    soilMoistureEnd: {
      type: 'number',
      required: true,
      min: 0,
      max: 100,
    },
    brightnessStart: {
      type: 'number',
      required: true,
      min: 0,
      max: 100,
    },
    brightnessEnd: {
      type: 'number',
      required: true,
      min: 0,
      max: 100,
    },
  },
};
