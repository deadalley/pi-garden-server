/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  last: async (req, res) => {
    const roomId = req.param('id');

    if (roomId) {
      const room = await Room.findOne({ id: roomId }).populate('sensors');

      if (!room) {
        res.serverError(`Can't find room`);
      }

      const { rows } = await Reading.getDatastore().sendNativeQuery(
        `SELECT MAX("createdAt") AS "createdAt"
         FROM reading
         WHERE sensor IN (${room.sensors.map(({ id }) => id).join(',')})
         GROUP BY sensor
        `
        // `
        // SELECT DISTINCT ON (sensor) * FROM reading WHERE sensor IN (${room.sensors
        //   .map(({ id }) => id)
        //   .join(',')}) ORDER BY sensor, "createdAt" DESC;
        // `
      );

      Reading.find({
        sensor: room.sensors.map(({ id }) => id),
        createdAt: rows.map(({ createdAt }) => createdAt),
      })
        .populate('sensor')
        .exec((err, readings) => {
          if (err) {
            res.serverError(err);
          }

          if (!readings) {
            res.serverError(`Can't find readings for this room`);
          }

          const mappedReadings = readings.reduce(
            (acc, reading) => ({ ...acc, [reading.sensor.type]: reading }),
            {}
          );

          res.json(mappedReadings);
        });
    } else {
      res.json([]);
    }
  },
};
