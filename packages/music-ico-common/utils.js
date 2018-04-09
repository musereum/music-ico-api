const BigNumber = require('bignumber.js')

const isBigNumber = value =>
  (value.isBigNumber === true) ||
  (value instanceof BigNumber) ||
  (value.lte && value.toNumber)

const serializeBigNumber = (value) => {
  if (isBigNumber(value)) {
    return {
      type: 'BigNumber',
      value: value.toString(),
    };
  }
  return value
}

const unserializeBigNumber = (value) => {
  if (value && value.type === 'BigNumber') {
    return new BigNumber(value.value)
  }
  return value
}

exports.serialize = (event) => {
  const doc = Object.assign({}, event)
  for (const key in event) {
    if (event[key]) {
      doc[key] = serializeBigNumber(event[key])
    }
  }
  for (const key in event.args) {
    if (event.args[key]) {
      doc.args[key] = serializeBigNumber(event.args[key])
    }
  }
  return doc
}

exports.unserialize = (doc) => {
  const event = Object.assign({}, doc)
  for (const key in doc) {
    if (doc[key]) {
      event[key] = unserializeBigNumber(doc[key])
    }
  }
  for (const key in doc.args) {
    if (doc.args[key]) {
      event.args[key] = unserializeBigNumber(doc.args[key])
    }
  }
  return event;
}

exports.sortProperties = (obj) => {
  // convert object into array
	var sortable = [];
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			sortable.push([key, obj[key]]) // each item is an array in format [key, value]
    }
  }
      
	// sort items by value
	sortable.sort((a, b) => {
		return -1 * (a[1]-b[1]);
  })
  
	return sortable // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}