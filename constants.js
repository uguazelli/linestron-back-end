require("dotenv").config();

module.exports = Object.freeze({
	// CORS_ORIGIN: "http://localhost:19006",
	CORS_ORIGIN: "*",
	TWILIO_PHONE_NUMBER: "+19124467374",
	TWILIO_ACCOUNT_SID: process.env.accountSid,
	TWILIO_AUTH_TOKEN: process.env.authToken,
	firebaseConfig: {
		apiKey: "AIzaSyATcWgmO37ZVBePq_v_0fT6p1CRxUGDpQc",
		authDomain: "linestron-app.firebaseapp.com",
		databaseURL: "https://linestron-app-default-rtdb.firebaseio.com",
		projectId: "linestron-app",
		storageBucket: "linestron-app.appspot.com",
		messagingSenderId: "200383405318",
		appId: "1:200383405318:web:3a44dbb0c4d0b3ce555287",
		measurementId: "G-BJG6DK8GVT",
	},
	firestoreCredential: {
		type: "service_account",
		project_id: "linestron-app",
		private_key_id: process.env.firestorePrivateKeyId,
		private_key: process.env.firestorePrivateKey,
		client_email: "firebase-adminsdk-vmvkw@linestron-app.iam.gserviceaccount.com",
		client_id: "106911900165779304643",
		auth_uri: "https://accounts.google.com/o/oauth2/auth",
		token_uri: "https://oauth2.googleapis.com/token",
		auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
		client_x509_cert_url:
			"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vmvkw%40linestron-app.iam.gserviceaccount.com",
	},
});
