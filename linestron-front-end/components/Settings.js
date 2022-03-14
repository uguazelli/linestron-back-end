import { Text, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { host } from "../Constants";

const Settings = ({ navigation }) => {
	const [companies, setCompanies] = useState([]);

	const getCompanies = async () => {
		try {
			const response = await fetch(host + "/company/byemail", {
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
		const com = await getCompanies();
		await setCompanies(com);
	}, []);

	const selectCompany = async (companyID) => {
		if (companyID !== "") {
			try {
				// setting company id in backend
				const response = await fetch(host + "/admin/session/company/" + companyID, {
					method: "GET",
					credentials: "include",
					headers: { Accept: "application/json", "Content-Type": "application/json" },
				});
				let result = await response.json();
				navigation.navigate("/home");
				return result;
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<View style={{ alignItems: "center", justifyContent: "center" }}>
			<Text style={{ margin: 10, width: "20%" }}>Select a company</Text>
			<Picker style={styles.input} onValueChange={(v, i) => selectCompany(v)}>
				<Picker.Item label="Select a company" value="" />
				{companies.map((item) => (
					<Picker.Item key={item.id} label={item.name} value={item.id} />
				))}
			</Picker>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		width: "80%",
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
	},
});

export default Settings;
