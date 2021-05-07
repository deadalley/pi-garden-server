/**
 * Plant.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    room: {
      model: 'room',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    plantedDate: {
      type: 'string',
      required: true,
    },
    specification: {
      collection: 'plantspecification',
      via: 'plant',
    },
    imageUrl: {
      type: 'string',
      required: true,
      isIn: ['plant01.png', 'plant02.png', 'plant03.png', 'plant04.png'],
    },
  },
};
