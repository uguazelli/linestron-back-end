import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { io } from "socket.io-client";
const socket = io("localhost:3000");

const Client = ({ route, navigation }) => {
	const [currentNumber, setCurrentNumber] = useState(0);
	const { room } = route.params;
	useEffect(() => {
		navigation.setOptions({ title: "Room " + room });
		socket.emit("connectToRoom", room);
	}, []);

	socket.on(room, (msg) => {
		setCurrentNumber(msg);
	});

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text>The current Number is: {currentNumber}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 100,
	},
	card: {
		maxWidth: "100%",
		margin: 50,
		alignItems: "center",
		justifyContent: "center",
		padding: 30,
		width: "70%",
		maxWidth: 500,
		height: "70%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,

		elevation: 24,
	},
});

export default Client;
