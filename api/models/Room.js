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
    avatar: {
      type: 'string',
      isIn: [
        'bedside-table',
        'dressing-table',
        'bed',
        'bed4',
        'full-length-mirror',
        'bedside-table1',
        'bunk-bed',
        'chair',
        'table',
        'chair1',
        'table1',
        'chandelier',
        'vase',
        'vase1',
        'dinning-table',
        'armchair',
        'ceiling-lamp',
        'tv-set',
        'chair2',
        'curtain',
        'painting',
        'pillow',
        'office-chair',
        'stool',
        'computer-desktop',
      ],
      required: true,
    },
  },
};
