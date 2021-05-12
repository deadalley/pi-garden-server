module.exports = {
  friendlyName: 'Populate plant',

  description: '',

  inputs: {
    id: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ id }, exits) {
    const plant = await Plant.findOne({ id }).populate('specification');
    const room = await Room.findOne({ id: plant.room }).populate('sensors');
    return exits.success({ ...plant, specification: plant.specification[0], room });
  },
};
