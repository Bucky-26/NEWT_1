const axios = require('axios');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const logger = console.log;
const colors = require('colors');
const config = require(`./config.json`);
const { dirname } = require('path');
const { exec } = require('child_process');
const dev  = config.BotDeveloper;
const { newtstart } = require('./login');
const crypto = require('crypto');
const gradient = require('gradient-string');
var isHexcolor = require('is-hexcolor');
const secretKeyHex = 'ade0d29be076f734932f38e887d7eeae7818f6a9302439ab4cef070c50652e73';
const ivHex = 'e8863304994de91021b007abd79a674c8';
const secretKey = Buffer.from(secretKeyHex, 'hex');
const iv = Buffer.from(ivHex, 'hex');
app.post('/AppState', (req, res) => {
    try {
        const newData = req.query.data;

        // Check if newData is undefined or empty
        if (newData === undefined || newData === '') {
            throw new Error('Invalid or empty data parameter');
        }

        // Save the updated app state
        fs.writeFileSync(path.join(__dirname, 'appstate.json'), newData, 'utf8');

        res.json({ success: true, message: 'App state updated successfully', updatedAppState: newData });
    } catch (error) {
        console.error('Error updating app state:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


app.get('/restart-app', (req, res) => {
  // Replace 'your_pm2_app_name' with the actual name of your pm2 app
  const pm2AppName = '0';

  // Restart the pm2 app
  exec(`pm2 restart ${pm2AppName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error restarting pm2 app: ${stderr}`);
      return res.status(500).send('Internal Server Error');
    }

    console.log(`PM2 app restarted: ${stdout}`);
    res.send('PM2 app restarted successfully');
  });
});


function encryptData(data, key, iv) {
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
	let EncryptedAppState = cipher.update(data, 'utf8', 'hex');
	EncryptedAppState += cipher.final('hex');
	return EncryptedAppState;
}

try {
	if (fs.existsSync('appstate.json')) {
		const stats = fs.statSync('appstate.json');
		if (stats.size === 0) {
			console.log('appstate.json is empty.');
			return;
		}

		const RawAppState = fs.readFileSync('appstate.json', 'utf8');

		try {
			JSON.parse(RawAppState);
			console.log('Data in appstate.json is not encrypted. Encrypting...');
			const EncryptAppState = encryptData(RawAppState, secretKey, iv);
			fs.writeFileSync('appstate.json', EncryptAppState, 'utf8');
			console.log('Data has been encrypted and saved to appstate.json.');
		} catch (error) {
			console.log('Data in appstate.json is already encrypted.');
		}
	}
} catch (error) {
	console.error(error);
}

function decryptData(EncryptedAppState, key, iv) {
	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
	let decryptedAppState = decipher.update(EncryptedAppState, 'hex', 'utf8');
	decryptedAppState += decipher.final('utf8');
	return decryptedAppState;
}

const securedAppState = fs.readFileSync('appstate.json', 'utf8');
console.log(gradient('blue', 'skyblue')(""));
const decryptedAppState = decryptData(securedAppState, secretKey, iv);

const decryptedJsonData = JSON.parse(decryptedAppState);


newtstart(JSON.parse(decryptedAppState));

const figlet = require('figlet');

function printTextArt(message) {
	figlet(message, function(err, data) {
		if (err) {
			console.log('Error:', err);
			return;
		}
		console.log(data);
	});
}
app.get('/heartbeat', (req, res) => {
		res.send('Heartbeat OK');
});

let startTime;

app.use((req, res, next) => {
		if (!startTime) {
				startTime = Date.now();
		}
		next();
});

app.get('/uptime', (req, res) => {
		const uptime = Date.now() - startTime;
		res.send(`Uptime: ${uptime} ms`);
});












app.listen(port, () => {
	logger(gradient('blue', 'skyblue')("[ ISOY DEV ]"), `= >` .green, 'DEVELOP BY ADONIS JR S' .blue);
	logger(gradient('blue', 'skyblue')("[ ISOY DEV ]"), `= >` .green, 'Please Follow My Dev' .blue);
	logger(gradient('blue', 'skyblue')("[ ISOY DEV ]"), `= >` .green, 'link: https://www.facebook.com/Buckyy26' .blue);

	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, 'appstate.html'));
	});
	printTextArt('NEWT AI');
	printTextArt("ISOY DEV");
});
