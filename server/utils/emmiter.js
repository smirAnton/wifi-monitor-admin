import EventEmitter from 'events';

class CustomerEmitter extends EventEmitter {}

const emitter = new CustomerEmitter();

export default emitter;
