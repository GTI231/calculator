import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import * as fonts from "expo-font";

const Palette = {
	primary: {
		main: "#171717",
		light: "#444444",
	},
	secondary: {
		main: "#DA0037",
	},
	background: {
		main: "#FFFFFF",
		light: "#F5F5F5",
		darker: "#0A0A0A",
		dark: "#101010",
	},

	text: {
		primary: "#fff",
		light: "#979799",
		secondary: "#DA0037",
	},

	button: {
		primary: "#101010",
		secondary: "#DA0037",
	},
};

const Typography = {
	heading: {
		fontSize: 40,
		fontWeight: "bold",
		color: Palette.text.primary,
	} as TextStyle,
	subTitle: {
		fontStyle: "italic",
		fontSize: 23,
		fontWeight: "500",
		color: Palette.text.light,
	} as TextStyle,
};

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Palette.background.darker,
	},
	statusBar: {
		color: Palette.text.primary,
	},
	header: {
		color: Palette.text.primary,
	},
	headerTitle: {
		color: Palette.text.primary,
	},
	outputContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		backgroundColor: Palette.background.darker,
	},
	outputResultText: {
		...Typography.heading,
		padding: 4,
	},
	inputValueContainer: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	inputValueText: {
		...Typography.subTitle,
		padding: 10,
	},
	inputOperatorText: {
		...Typography.subTitle,
		color: Palette.text.secondary,
		padding: 10,
	},
	inputContainer: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center",
		flexShrink: 4,
		flexWrap: "wrap",
		flexDirection: "row",
		backgroundColor: Palette.background.darker,
	},
	inputBtn: {
		width: 90,
		height: 90,
		margin: 5,
		borderRadius: 20,
		backgroundColor: Palette.button.primary,
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},

	resultBtn: {
		backgroundColor: Palette.button.secondary,
	},

	zeroBtn: {
		width: 190,
		backgroundColor: Palette.button.primary,
	},

	oprBtnText: {
		color: Palette.text.secondary,
	},

	inputBtnText: {
		color: Palette.text.primary,
		fontSize: 24,
        fontWeight: "bold"
	},

    lowOpacityText: {
        opacity: 0.5
    }

});
