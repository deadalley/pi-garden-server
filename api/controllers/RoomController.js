/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  subscribe: async (req, res) => {
    if (!req.isSocket) {
      res.badRequest('Only socket can subscribe');
    }

    const roomId = req.param('id');
    const room = await Room.findOne({ id: +roomId }).populate('sensors');

    Sensor.subscribe(
      req,
      room.sensors.map(({ id }) => id)
    );

    res.json('Subscribed');
  },
  last: async (req, res) => {
    const roomId = req.param('id');

    if (roomId) {
      try {
        const mappedReadings = await sails.helpers.lastReadings(roomId);
        res.json(mappedReadings);
      } catch (err) {
        json.serverError(err);
      }
    } else {
      res.json([]);
    }
  },
};
