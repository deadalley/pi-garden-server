/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  '/': { view: 'pages/homepage' },

  'GET /signup': { view: 'pages/signup' },

  'POST /sensor/:id/activate': { action: 'sensor/activate' },

  'GET /room/:id/reading': { action: 'room/readings' },
  'GET /room/:id/reading/last': { action: 'room/last' },
  'GET /room/:id/reading/subscribe': { action: 'room/subscribe' },
};
