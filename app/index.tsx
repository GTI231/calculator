import { useCallback, useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	Button,
	TouchableOpacity,
	Text,
	View,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import "expo-router/entry";
import numeral from "numeral";

const inputBtnData = [
	{
		label: "c",
		type: "delete",
		style: {
			container: styles.inputBtn,
			text: { ...styles.inputBtnText, ...styles.lowOpacityText },
		},
	},
	{
		label: "+/-",
		type: "opr",
		style: {
			container: styles.inputBtn,
			text: { ...styles.inputBtnText, ...styles.lowOpacityText },
		},
	},
	{
		label: "%",
		type: "opr",
		style: {
			container: styles.inputBtn,
			text: { ...styles.inputBtnText, ...styles.lowOpacityText },
		},
	},
	{
		label: "/",
		type: "opr",
		style: {
			container: styles.inputBtn,
			text: { ...styles.inputBtnText, ...styles.oprBtnText },
		},
	},
	{
		label: "7",
		type: "num",
		style: {
			container: styles.inputBtn,
			text: styles.inputBtnText,
		},
	},
	{
		label: "8",
		type: "num",
		style: {
			container: styles.inputBtn,
			text: styles.inputBtnText,
		},
	},
	{
		label: "9",
		type: "num",
		style: {
			container: styles.inputBtn,
			text: styles.inputBtnText,
		},
	},
	{
		label: "*",
		type: "opr",
		style: {
			container: styles.inputBtn,
			text: { ...styles.inputBtnText, ...styles.oprBtnText },
		},
	},
	{
		label: "4",
		type: "num",
		style: {
			container: styles.inputBtn,
			text: styles.inputBtnText,
		},
	},
	{
		label: "5",
		type: "num",
		style: {
			container: styles.inputBtn,
			text: styles.inputBtnText,
		},
	},
	{
		label: "6",
		type: "num",
		style: {
			container: styles.inputBtn,
			text: styles.inputBtnText,
		},
	},
	{
		label: "+",
		type: "opr",
		style: {
			container: styles.inputBtn,
			text: { ...styles.inputBtnText, ...styles.oprBtnText },
		},
	},
	{
		label: "1",
		type: "num",
		style: {
			container: styles.inputBtn,
			text: styles.inputBtnText,
		},
	},
	{
		label: "2",
		type: "num",
		style: {
			container: styles.inputBtn,
			text: styles.inputBtnText,
		},
	},
	{
		label: "3",
		type: "num",
		style: {
			container: styles.inputBtn,
			text: styles.inputBtnText,
		},
	},
	{
		label: "-",
		type: "opr",
		style: {
			container: styles.inputBtn,
			text: { ...styles.inputBtnText, ...styles.oprBtnText },
		},
	},
	{
		label: "0",
		type: "num",
		style: {
			container: { ...styles.inputBtn, ...styles.zeroBtn },
			text: styles.inputBtnText,
		},
	},
	{
		label: ".",
		type: "decimal",
		style: {
			container: styles.inputBtn,
			text: { ...styles.inputBtnText, ...styles.lowOpacityText },
		},
	},
	{
		label: "=",
		type: "cal",
		style: {
			container: { ...styles.inputBtn, ...styles.resultBtn },
			text: styles.inputBtnText,
		},
	},
];

const max_digits = 13;

export default function Home() {
	// const router = useRouter();
	const [num1, setNum1] = useState<string>();
	const [num2, setNum2] = useState<string>();
	const [result, setResult] = useState<string>();
	const [opr, setOpr] = useState<"+" | "-" | "*" | "/" | "%">();

	const handlePress = (label, type) => {
		switch (type) {
			case "delete":
				handleDelPress();
				break;
			case "opr":
				handleOprPress(label);
				break;
			case "num":
				handleNumberPress(label);
				break;
			case "decimal":
				handleDecPress();
				break;
			case "cal":
				handleResultPress();
				break;
			default:
				break;
		}
	};

	const handleNumberPress = useCallback(
		(newVal) => {
			!opr
				? setNum1((oldVal) => {
						return validateNum(oldVal, newVal);
				  })
				: setNum2((oldVal) => {
						return validateNum(oldVal, newVal);
				  });
		},
		[opr]
	);

	const handleOprPress = useCallback(
		(label) => {
			label = !num1 && label == "-" ? "+/-" : label;

			if (result) {
				setNum1(result);
				setOpr(undefined);
				setNum2(undefined);
				setResult(undefined);
			}

			if (opr && num2 && !result) {
				const _result = handleResultPress();
				setNum1(_result);
				setOpr(undefined);
				setNum2(undefined);
			}

			switch (label) {
				case "+":
					setOpr("+");
					break;
				case "-":
					setOpr("-");
					break;
				case "*":
					setOpr("*");
					break;
				case "/":
					setOpr("/");
					break;
				case "%":
					setOpr("%");
					break;
				case "+/-":
					!opr
						? setNum1((oldVal) => {
								return validatePlusMinus(oldVal);
						  })
						: setNum2((oldVal) => {
								return validatePlusMinus(oldVal);
						  });
					break;
				default:
					break;
			}
		},
		[opr, result, num1, num2]
	);

	const handleResultPress = useCallback(() => {
		let _result = "0";
		if (num1 && num2 && opr) {
			switch (opr) {
				case "+":
					_result = `${Number(num1) + Number(num2)}`;
					break;
				case "-":
					_result = `${Number(num1) - Number(num2)}`;
					break;
				case "%":
					_result = `${Number(num1) % Number(num2)}`;
					break;
				case "*":
					_result = `${Number(num1) * Number(num2)}`;
					break;
				case "/":
					_result = `${Number(num1) / Number(num2)}`;
					break;
			}
		}

		if (_result != "0") {
			setResult(_result);
		}
		return _result;
	}, [num1, num2, opr]);

	const handleDecPress = useCallback(() => {
		!opr
			? setNum1((oldVal) => {
					return validateDec(oldVal);
			  })
			: setNum2((oldVal) => {
					return validateDec(oldVal);
			  });
	}, [opr]);

	const handleDelPress = useCallback(() => {
		!opr
			? num1
				? setNum1(undefined)
				: alert("cleared")
			: result
			? setResult(undefined)
			: num2
			? setNum2(undefined)
			: setOpr(undefined);
	}, [num1, num2, opr, result]);

	const validateNum = (oldVal: string, newVal: string) => {
		if (!oldVal || oldVal == "0") {
			return newVal;
		}
		return `${oldVal}${newVal}`;
	};

	const validateDec = (oldVal: string) => {
		if (!oldVal || oldVal == "0") {
			return oldVal;
		} else if (!oldVal.includes(".")) {
			return `${oldVal}.`;
		}

		return oldVal;
	};

	const validatePlusMinus = (oldVal: string) => {
		if (!oldVal || oldVal == "0") {
			return oldVal;
		}

		return `${Number(oldVal) * -1}`;
	};

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<SafeAreaView>
				<Stack.Screen
					options={{
						headerTitle: "Calculator",
						headerTransparent: true,
						headerTitleStyle: styles.headerTitle,
					}}
				/>
				<View style={styles.container}>
					<View style={styles.outputContainer}>
						<View style={styles.inputValueContainer}>
							<Text style={styles.inputValueText}>
								{num1
									? num1.length < max_digits
										? numeral(num1).format("0,0.[0000000]")
										: numeral(num1).format("0.0[00]e+0")
									: "0"}
							</Text>
							<Text style={styles.inputOperatorText}>{opr}</Text>
							<Text style={styles.inputValueText}>
								{num2
									? num2.length < max_digits
										? numeral(num2).format("0,0.[0000000]")
										: numeral(num2).format("0.0[00]e+0")
									: ""}
							</Text>
						</View>
						<Text style={styles.outputResultText}>
							{result
								? result.length < max_digits
									? numeral(result).format("0,0.0[0000000]")
									: numeral(result).format("0.0[000]e+0")
								: "00.0"}
						</Text>
					</View>
					<View style={styles.inputContainer}>
						{inputBtnData.map((item, index) => {
							return (
								<TouchableOpacity
									key={index}
									style={item.style.container}
									onPress={() => handlePress(item.label, item.type)}
								>
									<Text style={item.style.text}>{item.label}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
}
