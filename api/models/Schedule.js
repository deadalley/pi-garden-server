/**
 * Schedule.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    sensor: {
      model: 'sensor',
      required: true
    },
    cronDefinition: {
      type: 'string',
      required: false
    },
    active: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
