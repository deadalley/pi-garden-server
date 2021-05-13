/**
 * SensorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  activate: async (req, res) => {
    const sensorId = req.param('id');

    try {
      const sensor = await Sensor.findOne({ id: sensorId });
      const schedule = await Sensor.activate(sensor);

      res.json(schedule);
    } catch (error) {
      // todo: implement proper error handling
      res.badRequest(error);
    }
  },
};
