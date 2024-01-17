const login = require('fca-project-orion'),
    banuser = require('./ban.json'),
  config = require('./config.json'),
  approved = require('./approved.json'),
  approvedID = approved,
  prefix = config.prefix
function newtstart(_0xf6bff7) {
  login({ appState: _0xf6bff7 }, (_0x4ed7ff, _0x3100bf) => {
    if (_0x4ed7ff) {
      return console.error(_0x4ed7ff)
    }
    const _0x48db8b = process.platform
    let _0x260cbf
    if (_0x48db8b === 'win32') {
      _0x260cbf =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
    } else {
      _0x48db8b === 'android'
        ? (_0x260cbf =
            'Mozilla/5.0 (Linux; Android 11; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.50 Mobile Safari/537.36')
        : (_0x260cbf =
            'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/95.0.4638.50 Mobile/15E148 Safari/604.1')
    }
    _0x3100bf.setOptions({
      forceLogin: true,
      listenEvents: true,
      logLevel: 'silent',
      selfListen: false,
      userAgent: _0x260cbf,
    })
    const _0x23a822 = require('./newt-main/events/eventhandler.js')
    _0x23a822.run({
      api: _0x3100bf,
      config: config,
      prefix,
      approvedID: approvedID,banuser,
    })
    console.log('[ NEWT AI ] >  BOT DEVELOP BY ADONIS')
  })
}
module.exports = { newtstart: newtstart }
