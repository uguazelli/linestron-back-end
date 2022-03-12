import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Settings from "./Settings";
import Emit from "./Emit";
import Admin from "./admin/Admin";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
	return (
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
		</Tab.Navigator>
	);
}

export default function NavigationTab() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
				<Stack.Screen name="/admin" component={Admin} options={{ title: "Admin" }} />
			</Stack.Navigator>
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
