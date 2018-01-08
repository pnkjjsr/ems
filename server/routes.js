/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/trims', require('./api/trim'));
  app.use('/api/years', require('./api/year'));
  app.use('/api/modals', require('./api/modal'));
  app.use('/api/makes', require('./api/make'));
  app.use('/api/categories', require('./api/category'));
  app.use('/api/vehicles', require('./api/vehicle'));

  app.use('/api/games', require('./api/game'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
