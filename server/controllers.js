	exports.home = (req, res) => {
		 res.send('<a href="/auth/google">Google İle Giriş Yap</a>');
	};


	exports.login = (req, res) => {
		res.send('Girş Yapınız...');

		//let email = req.body.email;
		//let password = req.body.password;

	};


	// gmail.users.messages.list - method => https://github.com/google/google-api-nodejs-client/blob/master/src/apis/gmail/v1.ts#L2137
	// gmail.users.messages.list - sample => https://github.com/google/google-api-nodejs-client/blob/master/samples/gmail/list.js
	exports.mails_list = (req, res) => {
		 res.send('Mailler Listelendi...');
	};


	// gmail.users.mesages.get - method => https://github.com/google/google-api-nodejs-client/blob/master/src/apis/gmail/v1.ts#L1990
	exports.mail_read = (req, res) => {
		 res.send(req.params.mail_id + ' id\'li mail açıldı...');
	};