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

module.exports.startSchedules = async function () {
  sails.log.info('Loading schedules...');
  const schedules = await Schedule.find({ active: true }).populate('sensor');
  sails.log.info({ schedules });
  schedules.forEach((schedule) => {
    if (!schedule.sensor) {
      return;
    }

    const interface = interfaces[schedule.sensor.preferredInterface];

    sails.log.info({ interfaces });
    if (!interface) {
      sails.log.info(`Cannot find interface ${schedule.sensor.preferredInterface}`);
    }

    sails.log.info(
      `Setting up schedule for ${schedule.sensor.id}, ${schedule.sensor.type}, ${schedule.cronDefinition}`
    );

    interface.schedule(schedule.sensor.id, schedule.sensor.type, schedule.cronDefinition);
  });
};

module.exports.seedDatabase = async function () {
  sails.log.info('Seeding database...');
  const roomParams = { name: 'Living Room', avatar: 'tv-set' };
  const plantParams = {
    name: 'Strawberry',
    plantedDate: '2020-01-01',
    imageUrl: 'plant02.png',
  };
  const plantSpecificationParams = {
    temperatureStart: '5',
    temperatureEnd: '54',
  };
  const temperatureSensorParams = {
    type: 'temperature',
    preferredInterface: 'dht11',
    unit: '°C',
  };
  const humiditySensorParams = {
    type: 'humidity',
    preferredInterface: 'dht11',
    unit: '%',
  };

  const room = await Room.findOrCreate(roomParams, roomParams);
  sails.log.info('Room created', room.id);

  const plant = await Plant.findOrCreate(plantParams, { ...plantParams, room: room.id });
  sails.log.info('Plant created', plant.id);

  const plantSpecification = await PlantSpecification.findOrCreate(plantSpecificationParams, {
    ...plantSpecificationParams,
    plant: plant.id,
  });
  sails.log.info('Plant specification created', plantSpecification.id);

  const temperatureSensor = await Sensor.findOrCreate(temperatureSensorParams, {
    ...temperatureSensorParams,
    room: room.id,
  });
  sails.log.info('Sensor created', temperatureSensor.id);

  const humiditySensor = await Sensor.findOrCreate(humiditySensorParams, {
    ...humiditySensorParams,
    room: room.id,
  });
  sails.log.info('Sensor created', humiditySensor.id);

  const schedule = await Sensor.activate(temperatureSensor);
  await Sensor.activate(humiditySensor);
  sails.log.info('Schedule started', schedule.id);
};

module.exports.bootstrap = async function () {
  // this.startSchedules();
  this.seedDatabase();
};
