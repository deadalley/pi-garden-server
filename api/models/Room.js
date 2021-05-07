/**
 * Room.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    plants: {
      collection: 'plant',
      via: 'room',
    },
    sensors: {
      collection: 'sensor',
      via: 'room',
    },
  },
};
