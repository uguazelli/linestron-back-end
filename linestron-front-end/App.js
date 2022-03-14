import { useEffect, useState } from "react";
import { View } from "react-native";
import LoginPage from "./components/authentication/LoginPage";
import NavigationTab from "./components/NavigationTab";
import { host } from "./Constants";

export default function App() {
	const [authenticated, setAuthenticated] = useState("");
	const authenticate = async () => {
		try {
			const response = await fetch(host + "/auth/loggeduser", {
				method: "GET",
				credentials: "include",
			});
			const json = await response.json();
			setAuthenticated(json);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		authenticate();
	}, []);

	return <>{authenticated.ok === true ? <NavigationTab /> : <LoginPage setAuthenticated={setAuthenticated} />}</>;
	// return <NavigationTab />;
}
