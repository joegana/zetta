var StreamTopic = require('../lib/stream_topic');
var assert = require('assert');

describe('Stream Topic', function() {
  it('will correctly parse a topic of all valid strings', function() {
    var t = new StreamTopic();
    t.parse('Detroit/led/1234/state');
    assert.equal(t.serverName, 'Detroit');
    assert.equal(t.deviceType, 'led');
    assert.equal(t.deviceId, '1234');
    assert.equal(t.streamName, 'state');
  });  

  it('will correctly parse a regex out of a topic string', function() {
    var t = new StreamTopic();
    t.parse('{^Det.+$}/led/1234/state');
    assert(t.serverName.test);  
    assert.equal(t.deviceType, 'led');
    assert.equal(t.deviceId, '1234');
    assert.equal(t.streamName, 'state');
  });

  it('will correctly parse a query out of a topic string', function() {
    var t = new StreamTopic();
    t.parse('Detroit/led/1234/state?select * where data > 80');
    assert.equal(t.serverName, 'Detroit');
    assert.equal(t.deviceType, 'led');
    assert.equal(t.deviceId, '1234');
    assert.equal(t.streamName, 'state');
    assert.equal(t.streamQuery, 'select * where data > 80'); 
  });

  it('will correctly parse topics without the leading server name', function() {
    var t = new StreamTopic();
    t.parse('led/1234/state');
    assert.equal(t.serverName, null);
    assert.equal(t.deviceType, 'led');
    assert.equal(t.deviceId, '1234');
    assert.equal(t.streamName, 'state');    
  })

  it('hash() will return the original input', function() {
    var t = new StreamTopic();
    var topic = '{^Det.+$}/led/1234/state?select * where data > 80';
    t.parse(topic);
    assert.equal(t.hash(), topic);
  })
  
});
