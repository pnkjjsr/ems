'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './make.events';

var MakeSchema = new mongoose.Schema({
  name: String,
  category: String
});

registerEvents(MakeSchema);
export default mongoose.model('Make', MakeSchema);
