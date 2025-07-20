var Service;
var Characteristic;

var applescript = require('applescript');

module.exports = function(homebridge) {
        Service = homebridge.hap.Service;
        Characteristic = homebridge.hap.Characteristic;
        homebridge.registerAccessory('homebridge-applescript-file-speaker', 'ApplescriptFileSpeaker', ApplescriptSpeakerAccessory);
}

function ApplescriptSpeakerAccessory(log, config) {
        this.log = log;
        this.service = 'SmartSpeaker';
        this.name = config['name'];
        this.onCommand = config['on'];
        this.offCommand = config['off'];
        this.volumeCommand = config['volume'];
}

ApplescriptSpeakerAccessory.prototype.setState = function(targetState, callback) {
        var accessory = this;
        var state = targetState === Characteristic.TargetMediaState.PLAY ? 'on' : 'off';
        var prop = state + 'Command';
        var command = accessory[prop];


	if (command.length == 0) {
		callback(null);
		return;
	}

	applescript.execFile(command, done);

	function done(err, rtn) {
		if (err) {
			accessory.log('Error: ' + err);
			callback(err || new Error('Error setting ' + accessory.name + ' to ' + state));
		} else {
			accessory.log('Set ' + accessory.name + ' to ' + state);
			callback(null);
		}
	}
}

ApplescriptSpeakerAccessory.prototype.setVolume = function(level, callback) {
        var accessory = this;
        var command = accessory['volumeCommand'];

	if (command.length == 0) {
		callback(null);
		return;
	}


	applescript.execFile(command, [level], done);

	function done(err, rtn) {
		if (err) {
			accessory.log('Error: ' + err);
			callback(err || new Error('Error setting ' + accessory.name + ' to ' + level));
		} else {
			accessory.log('Set ' + accessory.name + ' to ' + level);
			callback(null);
		}
	}
}

ApplescriptSpeakerAccessory.prototype.getServices = function() {
        var informationService = new Service.AccessoryInformation();
        var speakerService = new Service.SmartSpeaker(this.name);

	informationService
		.setCharacteristic(Characteristic.Manufacturer, 'Applescript Manufacturer')
		.setCharacteristic(Characteristic.Model, 'Applescript Model')
		.setCharacteristic(Characteristic.SerialNumber, 'Applescript Serial Number');

        speakerService
                .getCharacteristic(Characteristic.TargetMediaState)
                .on('set', this.setState.bind(this));

        speakerService
            .getCharacteristic(Characteristic.Volume)
            .on('set', this.setVolume.bind(this));
        return [speakerService];

}

