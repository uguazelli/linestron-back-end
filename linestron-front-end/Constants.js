import { Platform } from "react-native";

export const host = Platform.OS === "web" ? "http://localhost:3000" : "http://10.0.2.2:3000";
