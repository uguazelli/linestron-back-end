import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { host } from "../../Constants";

const Companies = () => {
	const [selectedCompany, setSelectedCompany] = useState("");
	const [companies, setCompanies] = useState([]);
	const [companyForm, setCompanyForm] = useState({ name: "", slug: "" });

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
		const co = await getCompanies();
		await setCompanies(co);
	}, []);

	useEffect(() => {
		const currentCompany = companies.find((c) => c.slug === selectedCompany);
		if (currentCompany !== undefined)
			setCompanyForm({ ...companyForm, name: currentCompany.name, slug: currentCompany.slug });
	}, [selectedCompany]);

	return (
		<View style={styles.cardContainer}>
			<View style={{ flexDirection: "row", marginBottom: 10 }}>
				<Text style={{ margin: 10, width: "20%" }}>Select a company</Text>
				<Picker
					style={styles.input}
					selectedValue={selectedCompany}
					onValueChange={(itemValue, itemIndex) => setSelectedCompany(itemValue)}
				>
					<Picker.Item label="Select a company" value="" />
					{companies.map((item) => (
						<Picker.Item key={item.id} label={item.name} value={item.slug} />
					))}
				</Picker>
			</View>
			<View style={{ flexDirection: "row", marginBottom: 10 }}>
				<Text style={{ margin: 10, width: "20%" }}>Company Name</Text>
				<TextInput
					style={styles.input}
					value={companyForm.name}
					onChangeText={(v) => setCompanyForm({ ...companyForm, name: v })}
				/>
			</View>
			<View style={{ flexDirection: "row", marginBottom: 10 }}>
				<Text style={{ margin: 10, width: "20%" }}>Slug</Text>
				<TextInput
					style={styles.input}
					value={companyForm.slug}
					onChangeText={(v) => setCompanyForm({ ...companyForm, slug: v })}
				/>
			</View>
			<View style={{ alignItems: "center" }}>
				<TouchableOpacity style={styles.sendButton}>
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
export default Companies;
