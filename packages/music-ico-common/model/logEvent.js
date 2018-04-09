const mongoose  = require('mongoose');

var Schema = mongoose.Schema;

const EventSchema = new Schema({
  address: {
    type: String,
  },
  blockNumber: {
    type: Number,
  },
  transactionHash: {
    type: String,
  },
  transactionIndex: {
    type: Number,
  },
  blockHash: {
    type: String,
  },
  logIndex: {
    type: Number,
  },
  removed: {
    type: Boolean,
  },
  event: {
    type: String,
  },
  args: {
    type: Schema.Types.Mixed
  }
});

const initColl = () => {
  if(mongoose.models.Event) {
    return mongoose.model('Event')
  }
  else {
    return mongoose.model('Event', EventSchema);
  }
}
module.exports = initColl();