import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";

import { useState } from "react";
import Companies from "./admin/Companies";
import Rooms from "./admin/Rooms";

const Settings = () => {
	const [companies, setCompanies] = useState();

	return (
		<ScrollView contentContainerStyle={{ alignItems: "center" }}>
			<Companies />
			<Rooms />
		</ScrollView>
	);
};

export default Settings;
