/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  subscribe: async (req, res) => {
    if (!req.isSocket) {
      return res.badRequest('Only socket can subscribe');
    }

    const roomId = req.param('id');
    const room = await Room.findOne({ id: +roomId }).populate('sensors');

    Sensor.subscribe(
      req,
      room.sensors.map(({ id }) => id)
    );

    sails.log.info(`Subscribed to ${roomId}`);
    res.json(await sails.helpers.lastReadings(roomId));
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
  readings: async (req, res) => {
    const roomId = req.param('id');

    const from = req.query.from;
    const to = req.query.to;

    const room = await Room.findOne({ id: +roomId }).populate('sensors');

    if (!from && !to) {
      const readings = await Reading.find({ sensor: room.sensors.map(({ id }) => id) });
      return res.json(readings);
    } else {
      const readings = await Reading.find({
        sensor: room.sensors.map(({ id }) => id),
        createdAt: { ...(from ? { '>=': from } : {}), ...(to ? { '<=': to } : {}) },
      });
      return res.json(readings);
    }
  },
};
