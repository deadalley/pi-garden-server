/**
 * Sensor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const interfaces = require('../../interfaces');

module.exports = {
  attributes: {
    type: {
      type: 'string',
      required: true,
      isIn: ['temperature', 'moisture', 'humidity', 'light'],
    },
    preferredInterface: {
      type: 'string',
      required: true,
    },
    unit: {
      type: 'string',
      required: true,
    },
    readings: {
      collection: 'reading',
      via: 'sensor',
    },
    room: {
      model: 'room',
      required: true,
    },
  },

  activate: async (sensor) => {
    const interface = interfaces[sensor.preferredInterface];

    // destroy all current schedules for this sensor
    await Schedule.destroy({ sensor: sensor.id });

    // deploy new schedule
    interface.schedule(sensor.id, sensor.type, '* * * * *');

    // save schedule configuration to db
    const schedule = await Schedule.create({
      sensor: sensor.id,
      cronDefinition: '* * * * *',
      active: true,
    }).fetch();

    return schedule;
  },
};
