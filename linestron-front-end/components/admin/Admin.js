import { ScrollView } from "react-native";
import Company from "./Company";
import Rooms from "./Rooms";

const Admin = () => {
	return (
		<ScrollView contentContainerStyle={{ alignItems: "center" }}>
			<Company />
			<Rooms />
		</ScrollView>
	);
};

export default Admin;
