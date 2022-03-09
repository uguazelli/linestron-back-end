import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Settings from "./Settings";
import Emit from "./Emit";

const Tab = createBottomTabNavigator();

export default function NavigationTab() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						if (route.name === "/") iconName = "notifications-outline";
						else if (route.name === "/settings") iconName = "settings-outline";
						// You can return any component that you like here!
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: "green",
					tabBarInactiveTintColor: "gray",
				})}
			>
				<Tab.Screen name="/settings" component={Settings} options={{ title: "Settings" }} />
				<Tab.Screen name="/" component={Emit} options={{ title: "Emit" }} />

				{/* <Tab.Screen name="/login" component={AuthLogin} /> */}
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
