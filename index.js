const AGSimpleBroker = require('ag-simple-broker');

class BrokerWithInternalPublish extends AGSimpleBroker {

  internal_channels = []

  constructor(channelNames) {
    super()
    if (typeof channelNames === 'string') channelNames = [channelNames,]
    if (Array.isArray(channelNames)) {
      for (let channelName of channelNames) {
        this.addInternalChannel(channelName)
      }
    }
  }
  
  addInternalChannel(channelName) {
    if (this.internal_channels.indexOf(channelName) === -1) this.internal_channels.push(channelName)
    return this
  }

  async transmitPublish(channelName, data, suppressEvent) {
    const ret = await super.transmitPublish(channelName, data, suppressEvent)
    if (suppressEvent && this.internal_channels.indexOf(channelName) !== -1) this.emit(channelName,  data)
    return Promise.resolve(ret)
  }
}


module.exports = BrokerWithInternalPublish

