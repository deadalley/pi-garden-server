module.exports = {
  friendlyName: 'Last readings',

  description: '',

  inputs: {
    id: {
      type: 'number',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ id }, exits) {
    const room = await Room.findOne({ id }).populate('sensors');

    if (!room) {
      exits.error(`Can't find room`);
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
          exits.error(err);
        }

        if (!readings) {
          exits.error(`Can't find readings for this room`);
        }

        const mappedReadings = readings.reduce(
          (acc, reading) => ({ ...acc, [reading.sensor.type]: reading }),
          {}
        );

        exits.success(mappedReadings);
      });
  },
};
