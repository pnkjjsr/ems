'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './game.events';

var GameSchema = new mongoose.Schema({
  name: String,
  platform: String,
  genre: String
});

registerEvents(GameSchema);
export default mongoose.model('Game', GameSchema);
