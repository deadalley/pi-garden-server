/**
 * PlantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    const { specification, ...plantParams } = req.body;

    const plant = await Plant.create(plantParams).fetch();

    await PlantSpecification.create({ ...plantParams.specification, plant: plant.id });

    const newPlant = await sails.helpers.populatePlant(plant.id);

    return res.send(newPlant);
  },

  find: async (req, res) => {
    const plants = await sails.helpers.populatePlants();

    return res.send(plants);
  },
};
