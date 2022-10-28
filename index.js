var OBDReader = require('./lib/OBDReader.js');

var obdReader = new OBDReader(false),
    monitors = [
        'vss',
        'rpm',
        'temp',
        'iat',
        'maf',
        'map',
        'frp',
        'load_pct',
        'throttlepos'
    ];

obdReader.on('connected', function() {
    console.log('Connected to OBD on '+ obdReader.getPort());
    var self = this;

    monitors.forEach(function(mon){
      self.addMonitor(mon);
  });
  this.startMonitors();

});

obdReader.on('dataReceived', function(reply) {
    console.log(reply);
});

obdReader.connectSerial({
  path: "/dev/pts/1",
  baudRate:9600,
});


obdReader.on('disconnected', function() {
    process.exit(1);
});