import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { host } from "../../Constants";

const Room = ({ r }) => {
	const [room, setRoom] = useState(r);

	const updateRoom = async () => {
		try {
			const response = await fetch(host + "/room/" + room.id, {
				method: "POST",
				credentials: "include",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify(room),
			});
			alert("done");
			return await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={{ marginBottom: 10 }}>
			<View style={{ flexDirection: "row", marginBottom: 10 }}>
				<Text style={{ margin: 10, width: "20%" }}>Room Name</Text>
				<TextInput
					style={styles.input}
					value={room.name}
					onChangeText={(v) => setRoom({ ...room, name: v })}
				></TextInput>
			</View>
			<View style={{ flexDirection: "row", marginBottom: 10 }}>
				<Text style={{ margin: 10, width: "20%" }}>unique_name</Text>
				<TextInput
					style={styles.input}
					value={room.unique_name}
					onChangeText={(v) => setRoom({ ...room, unique_name: v })}
				></TextInput>
			</View>
			<View style={{ justifyContent: "center", flexDirection: "row" }}>
				<TouchableOpacity style={[styles.sendButton, { marginRight: 5 }]} onPress={updateRoom}>
					<Text style={{ color: "white" }}>Save</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.sendButton, { marginRight: 5 }]}>
					<Text style={{ color: "white" }}>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const Rooms = () => {
	const [rooms, setRooms] = useState([]);
	const getRooms = async () => {
		try {
			const response = await fetch(host + "/room/admin/company", {
				method: "GET",
				credentials: "include",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
			});
			return await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(async () => {
		const r = await getRooms();
		setRooms(r);
	}, []);

	return (
		<View style={styles.cardContainer}>
			{rooms.map((r) => {
				return <Room key={r.id} r={r} />;
			})}

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
