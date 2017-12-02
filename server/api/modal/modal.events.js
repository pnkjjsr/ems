/**
 * Modal model events
 */

'use strict';

import {EventEmitter} from 'events';
var ModalEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ModalEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Modal) {
  for(var e in events) {
    let event = events[e];
    Modal.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ModalEvents.emit(event + ':' + doc._id, doc);
    ModalEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ModalEvents;
