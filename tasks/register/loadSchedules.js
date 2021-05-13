/**
 * `tasks/register/loadSchedule.js`
 *
 * ---------------------------------------------------------------
 *
 */
const interfaces = require('../../interfaces');

module.exports = function (grunt) {
  grunt.registerTask('loadSchedules', 'Loads schedules', async () => {
    sails.log.info('Loading schedules...');
    const schedules = await Schedule.find({ active: true });
    sails.log.info(schedules);
    schedules.forEach((schedule) => {
      const interface = interfaces[schedule.sensor.preferredInterface];
      sails.log.info(
        `Setting up schedule for ${schedule.sensor.id}, ${schedule.sensor.type}, ${schedule.cronDefinition}`
      );

      interface.schedule(schedule.sensor.id, schedule.sensor.type, schedule.cronDefinition);
    });
  });
};
