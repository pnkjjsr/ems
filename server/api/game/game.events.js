/**
 * Game model events
 */

'use strict';

import {EventEmitter} from 'events';
var GameEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GameEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Game) {
  for(var e in events) {
    let event = events[e];
    Game.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    GameEvents.emit(event + ':' + doc._id, doc);
    GameEvents.emit(event, doc);
  };
}

export {registerEvents};
export default GameEvents;
