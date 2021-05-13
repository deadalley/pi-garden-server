const dht = require('node-dht-sensor').promises;
const schedule = require('node-schedule');

const DHT_11 = 11;
// const DHT_22 = 22;

class DHT {
  static port = 17; // use enum for GPIO ports

  static async temperature() {
    const reading = (await dht.read(this.type, this.port)) || {};
    return reading.temperature;
  }

  static async humidity() {
    const reading = (await dht.read(this.type, this.port)) || {};
    return reading.humidity;
  }

  static schedule(sensorId, reading, frequency) {
    if (!sensorId) {
      throw new Error(`Cannot schedule ${this.type} on port ${this.port}: sensorId not defined`);
    }

    if (!reading) {
      throw new Error(`Cannot schedule ${this.type} on port ${this.port}: reading not defined`);
    }

    if (!frequency) {
      throw new Error(`Cannot schedule ${this.type} on port ${this.port}: frequency not defined`);
    }

    sails.log.info('Scheduling job', sensorId, frequency);
    const job = schedule.scheduleJob(frequency, async () => {
      try {
        sails.log.info(`Pushing last ${reading} reading to ${sensorId}`);
        const value = await this[reading]();
        const _reading = await Reading.create({
          sensor: sensorId,
          value: value,
        });
        await Sensor.publish([sensorId], _reading);
        sails.log.info(`Pushed ${value} to ${sensorId}`);
      } catch (error) {
        sails.log.error(`Could not push to ${sensorId}: `, error);
      }
    });
    return job;
  }
}

class DHT11 extends DHT {
  static type = DHT_11;
}

module.exports = {
  DHT11,
};
