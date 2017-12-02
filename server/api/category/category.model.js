'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './category.events';

var CategorySchema = new mongoose.Schema({
  name: String  
});

registerEvents(CategorySchema);
export default mongoose.model('Category', CategorySchema);
