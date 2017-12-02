/**
 * Vehicle model events
 */

'use strict';

import {EventEmitter} from 'events';
var VehicleEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VehicleEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Vehicle) {
  for(var e in events) {
    let event = events[e];
    Vehicle.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    VehicleEvents.emit(event + ':' + doc._id, doc);
    VehicleEvents.emit(event, doc);
  };
}

export {registerEvents};
export default VehicleEvents;
