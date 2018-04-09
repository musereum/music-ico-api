const { send, json } = require('micro')
const cache = require('micro-cacheable')

const LogEvent = require('music-ico-common/model/logEvent')
const connectWithDB = require('music-ico-common')
const { unserialize, sortProperties } = require('music-ico-common/utils')

connectWithDB()

module.exports = cache(15e3, async (req, res) => {
  const events = await LogEvent.find()

  const sumEvents = {}
  events.forEach((doc) => {
    const event = unserialize(doc)
    const { _from, _tokens } = event.args
    sumEvents[_from] = sumEvents[_from] ? sumEvents[_from].plus(_tokens) : _tokens
  })

  const sortedEvents = sortProperties(sumEvents)
  send(res, 200, sortedEvents)
})