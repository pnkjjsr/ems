'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './modal.events';

var ModalSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(ModalSchema);
export default mongoose.model('Modal', ModalSchema);
