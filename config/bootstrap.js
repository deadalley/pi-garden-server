/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const interfaces = require('../interfaces');

module.exports.bootstrap = async function() {
  console.log('Loading schedules...');
  const schedules = await Schedule.find({ active: true }).populate('sensor');
  console.log({ schedules });
  schedules.forEach(schedule => {
    if (!schedule.sensor) {
      return;
    }

    const interface = interfaces[schedule.sensor.preferredInterface];

    console.log({ interfaces });
    if (!interface) {
      console.log(
        `Cannot find interface ${schedule.sensor.preferredInterface}`
      );
    }

    console.log(
      `Setting up schedule for ${schedule.sensor.id}, ${schedule.sensor.type}, ${schedule.cronDefinition}`
    );

    interface.schedule(
      schedule.sensor.id,
      schedule.sensor.type,
      schedule.cronDefinition
    );
  });
};
