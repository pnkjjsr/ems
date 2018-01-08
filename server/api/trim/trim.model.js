'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './trim.events';

var TrimSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(TrimSchema);
export default mongoose.model('Trim', TrimSchema);
