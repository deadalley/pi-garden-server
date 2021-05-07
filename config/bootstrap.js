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

  const room = await Room.create({ name: 'Living Room', avatar: 'tv-set' }).fetch();
  console.log('Room created', room);

  const plant = await Plant.create({
    name: 'Strawberry',
    plantedDate: '2020-01-01',
    room: room.id,
    imageUrl: 'plant02.png',
  }).fetch();
  console.log('Plant created', plant);

  const plantSpecification = await PlantSpecification.create({
    plant: plant.id,
    temperatureStart: '5',
    temperatureEnd: '54',
  }).fetch();
  console.log('Plant specification created', plantSpecification);

  const sensor = await Sensor.create({
    type: 'temperature',
    preferredInterface: 'dht11',
    unit: '°C',
    room: room.id,
  }).fetch();
  console.log('Sensor created', sensor);
};

module.exports.bootstrap = async function () {
  // this.startSchedules();
  this.seedDatabase();
};
