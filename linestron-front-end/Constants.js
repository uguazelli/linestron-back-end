import { Platform } from "react-native";

export const host = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";
