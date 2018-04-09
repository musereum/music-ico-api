process.stdin.resume()

const Web3 = require('web3')
const ProviderEngine = require('web3-provider-engine')
const ZeroClientProvider = require('web3-provider-engine/zero')
const connectWithDB = require('music-ico-common')
const { serialize } = require('music-ico-common/utils')
const LogEvent = require('music-ico-common/model/logEvent')

const contractAbi = require('./contractAbi.json')

const engine = ZeroClientProvider({
  getAccounts: function(){},
  rpcUrl: process.env.INFURA_URL,
})
const web3 = new Web3(engine)
const contractInstance = web3.eth.contract(contractAbi).at(process.env.MUSIC_ICO_CONTRACT)
const allEvents = contractInstance.allEvents({ fromBlock: 0, toBlock: 'latest' })
const collectedEvent = contractInstance.Collected({ fromBlock: 0, toBlock: 'latest' })

connectWithDB().then(() => {
  console.log('DB initialized')

  allEvents.watch((err, result) => {
    if (err) {
      console.log('allEvents.watch', err)
      return;
    }

    if (result.event == 'Collected') {
      const logEvent = new LogEvent(serialize(result))
  
      LogEvent.findOneAndUpdate({
        address: result.address,
        transactionHash: result.transactionHash,
        logIndex: result.logIndex
      }, result, { upsert: true }, function(err, res) {
        // Deal with the response data/error
        console.log(err, res)
      });
    }
  });

  /* It doesnt get all events only new */
  // collectedEvent.watch((err, result) => {
  //   if (!err) {
  //     console.log(2, result);
  //   } else {
  //     console.log(2, err);
  //   }
  // });
}).catch(console.log)






