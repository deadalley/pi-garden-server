module.exports = {
  friendlyName: 'Populate plants',

  description: '',

  inputs: {},

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    const plants = await Plant.find(inputs).populate('specification');
    const rooms = await Room.find({ id: plants.map(({ room }) => room) }).populate('sensors');
    const roomsMap = rooms.reduce((acc, room) => ({ ...acc, [room.id]: room }), {});
    return exits.success(
      plants.map((plant) => ({
        ...plant,
        specification: plant.specification[0],
        room: roomsMap[plant.room],
      }))
    );
  },
};
