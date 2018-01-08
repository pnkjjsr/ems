/**
 * Trim model events
 */

'use strict';

import {EventEmitter} from 'events';
var TrimEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TrimEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Trim) {
  for(var e in events) {
    let event = events[e];
    Trim.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    TrimEvents.emit(event + ':' + doc._id, doc);
    TrimEvents.emit(event, doc);
  };
}

export {registerEvents};
export default TrimEvents;
