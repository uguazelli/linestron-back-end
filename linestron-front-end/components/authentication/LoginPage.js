import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { host } from "../../Constants";

const LoginPage = ({ setAuthenticated }) => {
	const [userCredentials, setUserCredential] = useState({ email: "", password: "" });
	const [showErrorMessage, setShowErrorMessage] = useState({ loginFailed: false, loginException: false });

	const url = host + "/auth/login";
	const headers = { Accept: "application/json", "Content-Type": "application/json" };
	const body = JSON.stringify(userCredentials);
	const login = async () => {
		setShowErrorMessage({ loginFailed: false, loginException: false });
		try {
			const response = await fetch(url, { method: "POST", credentials: "include", headers: headers, body: body });
			const json = await response.json();
			if (json.email === undefined) setShowErrorMessage({ ...showErrorMessage, loginFailed: true });
			else setAuthenticated({ ok: true });
		} catch (error) {
			setShowErrorMessage({ ...showErrorMessage, loginException: true });
		}
	};

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 20, margin: 40, color: "white" }}>Login Page</Text>
			<Text style={{ color: "white" }}>Email </Text>
			<TextInput style={styles.input} onChangeText={(v) => setUserCredential({ ...userCredentials, email: v })} />
			<Text style={{ color: "white" }}>Password </Text>
			<TextInput
				secureTextEntry={true}
				style={styles.input}
				onChangeText={(v) => setUserCredential({ ...userCredentials, password: v })}
			/>
			<TouchableOpacity style={styles.sendButton} onPress={login}>
				<Text style={{ color: "white" }}>Send</Text>
			</TouchableOpacity>

			{showErrorMessage.loginFailed === true ? (
				<View>
					<Text style={{ color: "white" }}>Please verify your email or password and try again.</Text>
				</View>
			) : (
				<></>
			)}
			{showErrorMessage.loginException === true ? (
				<View>
					<Text style={{ color: "white" }}>Somenthing unexepcted happened, please try again.</Text>
				</View>
			) : (
				<></>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		maxWidth: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#2D2D44",
		padding: 100,
	},
	input: {
		height: 40,
		width: 200,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderColor: "white",
		color: "white",
	},
	sendButton: {
		backgroundColor: "green",
		height: 40,
		width: 80,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default LoginPage;
