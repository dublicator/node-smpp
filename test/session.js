var assert = require('assert'),
    smpp = require('../lib/smpp')
    Server = require('../lib/smpp').Server;

describe('Session', function () {
    var session;

    describe('#connect()', function () {
        var server;
        var defaultHost = 'localhost';
        var defaultPort = 2775;
        var defaultLocalPort = null;
        var defaultLocalHost = '127.0.0.1';

        beforeEach(function() {
            server = new Server();
        });

        afterEach(function (done) {
            session.once('close', done);
            session.close();
        });

        after(function (done) {
            server.once('close', done);
            server.close();
        });

        it("should connect with default host, port and localPort", function () {
            server.listen(defaultPort);
            session = smpp.connect();
            assert.equal(session.host, defaultHost, 'Invalid default host');
            assert.equal(session.port, defaultPort, 'Invalid default port');
            assert.equal(session.localPort, defaultLocalPort, 'Invalid default localPort');
        });

        it("should connect with default port and localPort", function () {
            server.listen(defaultPort);
            session = smpp.connect('127.0.0.1');
            assert.equal(session.host, '127.0.0.1', 'Invalid host');
            assert.equal(session.port, defaultPort, 'Invalid default port');
            assert.equal(session.localPort, defaultLocalPort, 'Invalid default localPort');
        });

        //todo add checking default values
        it("should connect defined localPort", function () {
            server.listen(2777);
            session = smpp.connect('127.0.0.1', 2777, 4, '127.0.0.1', 3210);
            assert.equal(session.host, '127.0.0.1', 'Invalid host');
            assert.equal(session.port, 2777, 'Invalid port');
            assert.equal(session.addressType, 4, 'Invalid addressType');
            assert.equal(session.localAddress, '127.0.0.1', 'Invalid localAddress');
            assert.equal(session.localPort, 3210, 'Invalid localPort');
        });
    });
});