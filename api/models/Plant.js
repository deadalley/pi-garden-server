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

  populate: async ({ id }) => {
    const plant = await Plant.findOne({ id }).populate('specification');
    const room = await Room.findOne({ id: plant.room }).populate('sensors');
    return { ...plant, specification: plant.specification[0], room };
  },

  populateAll: async (params) => {
    const plants = await Plant.find(params).populate('specification');
    const rooms = await Room.find({ id: plants.map(({ room }) => room) }).populate('sensors');
    const roomsMap = rooms.reduce((acc, room) => ({ ...acc, [room.id]: room }), {});
    return plants.map((plant) => ({
      ...plant,
      specification: plant.specification[0],
      room: roomsMap[plant.room],
    }));
  },
};
