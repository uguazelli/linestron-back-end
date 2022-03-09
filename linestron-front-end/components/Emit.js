import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import { io } from "socket.io-client";
const socket = io("localhost:3000");

const Room = ({ room }) => {
	const [value, setValue] = useState("");
	const emitValue = () => socket.emit("emmitToRoom", { room: room, value: value });

	return (
		<View style={styles.roomContainer}>
			<Text style={{ margin: 10, width: "30%" }}>Room Number {room}</Text>
			<TextInput style={styles.input} value={value} onChangeText={setValue} />
			<TouchableOpacity style={styles.sendButton} onPress={emitValue}>
				<Text style={{ color: "white" }}>Send</Text>
			</TouchableOpacity>
		</View>
	);
};

const Emit = () => {
	return (
		<ScrollView contentContainerStyle={{ alignItems: "center" }}>
			<View style={styles.cardContainer}>
				<Room room={1} />
				<Room room={2} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		width: "95%",
		maxWidth: 640,
		backgroundColor: "white",
		padding: 30,
		margin: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
		borderRadius: 10,
	},
	roomContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	input: {
		width: "40%",
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
	},
	sendButton: {
		backgroundColor: "black",
		borderRadius: 5,
		height: 40,
		width: 80,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Emit;
