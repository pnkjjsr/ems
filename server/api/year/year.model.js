'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './year.events';

var YearSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(YearSchema);
export default mongoose.model('Year', YearSchema);
