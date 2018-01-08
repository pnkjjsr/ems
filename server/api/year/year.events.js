/**
 * Year model events
 */

'use strict';

import {EventEmitter} from 'events';
var YearEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
YearEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Year) {
  for(var e in events) {
    let event = events[e];
    Year.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    YearEvents.emit(event + ':' + doc._id, doc);
    YearEvents.emit(event, doc);
  };
}

export {registerEvents};
export default YearEvents;
