import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { host } from "../../Constants";

const Company = () => {
	const [company, setCompany] = useState({ name: "", slug: "" });

	const getCompanies = async () => {
		try {
			const response = await fetch(host + "/company", {
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
		const co = await getCompanies();
		setCompany({ ...company, name: co.name, slug: co.slug });
	}, []);

	const updateCompany = async () => {
		try {
			const response = await fetch(host + "/company", {
				method: "POST",
				credentials: "include",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify(company),
			});
			alert("done");
			return await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.cardContainer}>
			<View style={{ flexDirection: "row", marginBottom: 10 }}>
				<Text style={{ margin: 10, width: "20%" }}>Company Name</Text>
				<TextInput
					style={styles.input}
					value={company.name}
					onChangeText={(v) => setCompany({ ...company, name: v })}
				/>
			</View>
			<View style={{ flexDirection: "row", marginBottom: 10 }}>
				<Text style={{ margin: 10, width: "20%" }}>Slug</Text>
				<TextInput
					style={styles.input}
					value={company.slug}
					onChangeText={(v) => setCompany({ ...company, slug: v })}
				/>
			</View>
			<View style={{ alignItems: "center" }}>
				<TouchableOpacity style={styles.sendButton} onPress={updateCompany}>
					<Text style={{ color: "white" }}>Save</Text>
				</TouchableOpacity>
			</View>
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

export default Company;
