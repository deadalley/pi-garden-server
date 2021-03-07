/**
 * `tasks/register/loadSchedule.js`
 *
 * ---------------------------------------------------------------
 *
 */
const interfaces = require('../../interfaces');

module.exports = function(grunt) {
  grunt.registerTask('loadSchedules', 'Loads schedules', async () => {
    console.log('Loading schedules...');
    const schedules = await Schedule.find({ active: true });
    console.log(schedules);
    schedules.forEach(schedule => {
      const interface = interfaces[schedule.sensor.preferredInterface];
      console.log(
        `Setting up schedule for ${schedule.sensor.id}, ${schedule.sensor.type}, ${schedule.cronDefinition}`
      );

      interface.schedule(
        schedule.sensor.id,
        schedule.sensor.type,
        schedule.cronDefinition
      );
    });
  });
};
