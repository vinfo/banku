# Phonegap-SMS-Plugin

## PhoneGap plugin to send and receive sms

### Supported Features

- Send SMS
- Check SMS feature availability
- Start Receiving SMSs
- Stop Receiving SMSs

### Supported Platforms

- Android

### Usage

#### Installation

    phonegap plugin add https://github.com/tanansatpal/Phonegap-SMS.git
    
__or__
    
    cordova plugin add https://github.com/tanansatpal/Phonegap-SMS.git
	
#### Require the plugin module

	var smsplugin = cordova.require("info.satpal.phonegap.smsplugin.smsplugin");
    
#### Methods

__send__

	smsplugin.send(number,message,successCallback(result),failureCallback(error));

__isSupported__

	smsplugin.isSupported(successCallback(result),failureCallback(error));

__startReception__

	smsplugin.startReception(successCallback(result),failureCallback(error));

__stopReception__
	
	smsplugin.stopReception(successCallback(result),failureCallback(error));


This fork fixes the character case problem for online adobe builder ("Class not found") as far as the maintainer doesnt support it.
