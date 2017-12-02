'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './vehicle.events';

var VehicleSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(VehicleSchema);
export default mongoose.model('Vehicle', VehicleSchema);
