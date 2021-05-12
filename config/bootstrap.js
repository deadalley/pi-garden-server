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
  console.log('Loading schedules...');
  const schedules = await Schedule.find({ active: true }).populate('sensor');
  console.log({ schedules });
  schedules.forEach((schedule) => {
    if (!schedule.sensor) {
      return;
    }

    const interface = interfaces[schedule.sensor.preferredInterface];

    console.log({ interfaces });
    if (!interface) {
      console.log(`Cannot find interface ${schedule.sensor.preferredInterface}`);
    }

    console.log(
      `Setting up schedule for ${schedule.sensor.id}, ${schedule.sensor.type}, ${schedule.cronDefinition}`
    );

    interface.schedule(schedule.sensor.id, schedule.sensor.type, schedule.cronDefinition);
  });
};

module.exports.seedDatabase = async function () {
  console.log('Seeding database...');
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
  console.log('Room created', room);

  const plant = await Plant.findOrCreate(plantParams, { ...plantParams, room: room.id });
  console.log('Plant created', plant);

  const plantSpecification = await PlantSpecification.findOrCreate(plantSpecificationParams, {
    ...plantSpecificationParams,
    plant: plant.id,
  });
  console.log('Plant specification created', plantSpecification);

  const temperatureSensor = await Sensor.findOrCreate(temperatureSensorParams, {
    ...temperatureSensorParams,
    room: room.id,
  });
  console.log('Sensor created', temperatureSensor);

  const humiditySensor = await Sensor.findOrCreate(humiditySensorParams, {
    ...humiditySensorParams,
    room: room.id,
  });
  console.log('Sensor created', humiditySensor);

  const schedule = await Sensor.activate(temperatureSensor);
  await Sensor.activate(humiditySensor);
  console.log('Schedule started', schedule);
};

module.exports.bootstrap = async function () {
  // this.startSchedules();
  this.seedDatabase();
};
