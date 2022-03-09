import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { useState } from "react";

const Rooms = () => {
	return (
		<View style={styles.cardContainer}>
			<View style={{ flexDirection: "row", marginBottom: 10 }}>
				<Text style={{ margin: 10, width: "20%" }}>Room Name</Text>
				<TextInput style={styles.input}></TextInput>
			</View>
			<View style={{ flexDirection: "row", marginBottom: 10 }}>
				<Text style={{ margin: 10, width: "20%" }}>Room Slug</Text>
				<TextInput style={styles.input}></TextInput>
			</View>
			<View style={{ justifyContent: "center", flexDirection: "row" }}>
				<TouchableOpacity style={[styles.sendButton, { marginRight: 5 }]}>
					<Text style={{ color: "white" }}>Save</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.sendButton, { marginRight: 5 }]}>
					<Text style={{ color: "white" }}>Delete</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity
				style={{
					backgroundColor: "black",
					borderRadius: 50,
					height: 40,
					width: 40,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text style={{ color: "white" }}>+</Text>
			</TouchableOpacity>
		</View>
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
	input: {
		width: "80%",
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

export default Rooms;
