Extends SocketCluster SimpleBroker to allow communication between SCC worker instances.

```js
// 'internal_channel' here is the name of a channel used for worker communication
// multiple channels can be used

let agOptions = {
  //brokerEngine: new BrokerWithInternalPublish('internal_channel') //OR
  brokerEngine: new BrokerWithInternalPublish(['internal_channel1', 'internal_channel2',])
};

const scServer = socketClusterServer.attach(httpServer, agOptions)

scServer.brokerEngine.transmitPublish('internal_channel', {event, data})
```


