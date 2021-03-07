/**
 * SensorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const interfaces = require('../../interfaces');

module.exports = {
  activate: async (req, res) => {
    const sensorId = req.param('id');

    try {
      const sensor = await Sensor.findOne({ _id: sensorId });
      const interface = interfaces[sensor.preferredInterface];

      // destroy all current schedules for this sensor
      await Schedule.destroy({ sensor: sensorId });

      // deploy new schedule
      interface.schedule(sensorId, sensor.type, '* * * * *');

      // save schedule configuration to db
      const schedule = await Schedule.create({
        sensor: sensorId,
        cronDefinition: '* * * * *',
        active: true
      });

      res.json(schedule);
    } catch (error) {
      console.log(error);
      // todo: implement proper error handling
      res.badRequest(error);
    }
  }
};
