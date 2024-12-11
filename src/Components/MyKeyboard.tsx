//Im/2021/100
//Chamod Jayaweera

import * as React from 'react';
import Button from './Button';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/GlobalStyles';
import { myColors } from '../styles/Colors';
import { evaluate, sqrt } from 'mathjs';

export default function MyKeyboard() {
  const [expression, setExpression] = React.useState<string>("");
  const [result, setResult] = React.useState<number | null>(null);
  const [lastWasOperator, setLastWasOperator] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<string[]>([]);
  const [showHistory, setShowHistory] = React.useState(false);

  const scrollViewRef = React.useRef<ScrollView>(null);

//handle number press
  const handleNumberPress = (buttonValue: string) => {
    if (result !== null || error) {
      // after a result or 
      setExpression(buttonValue);
      setResult(null);
      setError(null);
    } else {
      const parts = expression.split(/[\+\-\*\/]/);
      const currentPart = parts[parts.length - 1];

      if (buttonValue === "." && currentPart.includes(".")) return;
      if (buttonValue === "0" && currentPart === "0") return;
      if (buttonValue === "." && currentPart === "") setExpression(expression + "0.");
      else setExpression(expression + buttonValue);
    }
    setLastWasOperator(false);
  };

//handle (=,+,/,*)
  const handleOperationPress = (buttonValue: string) => {
    if (lastWasOperator || error) return;

    

    if (result !== null) {
      // If there's a result, we append the operator to the result and continue
      setExpression(result.toString() + buttonValue);
      setResult(null); // Clear result to show the ongoing calculation
    } else {
      setExpression(expression + buttonValue);
    }
    setLastWasOperator(true);
    setError(null);
  };

// sqrt handle
  const handleSquareRoot = () => {
    if (lastWasOperator) return;
    try {
      const number = evaluate(expression || "0"); // Default to "0" if empty
      if (number < 0) {
        setError("Can't take square root of negative number");
        setResult(null);
      } else {
        const squareRootResult = sqrt(number);
        const resultStr = squareRootResult.toString();
        setExpression(resultStr); // Set the new result as expression
        setResult(squareRootResult);
        updateHistory(`${expression || "0"} = ${resultStr}`);
        setLastWasOperator(false); // Allow further operations
      }
    } catch (error) {
      setError("Error");
      setResult(null);
    }
  };

//  % handle
  const handlePercentage = () => {
    if (lastWasOperator) return;
    try {
      const number = evaluate(expression || "0"); // Default to "0" if empty
      const percentageResult = number / 100;
      const resultStr = percentageResult.toString();
      setExpression(resultStr); // Set the new result as expression
      setResult(percentageResult);
      updateHistory(`${expression || "0"} = ${resultStr}`);
      setLastWasOperator(false); // Allow further operations
    } catch (error) {
      setError("Error");
      setResult(null);
    }
  };

//clear numbers
  const clear = () => {
    setExpression("");
    setResult(null);
    setError(null);
    setLastWasOperator(false);
  };

  const updateHistory = (entry: string) => {
    setHistory((prevHistory) => {
      const updatedHistory = [entry, ...prevHistory];
      return updatedHistory.slice(0, 10); // Keep only the last 10 entries
    });
  };

//check expression evalutaions
  const evaluateExpression = () => {
    try {
        const formattedExpression = expression.replace(/÷/g, '/');

        // Check for division by zero
        if (/\/0(?!\.)/.test(formattedExpression)) {
            setError("Can't Divide By 0");
            setResult(null);
            setExpression("");
            return;
        }

        let evaluatedResult = evaluate(formattedExpression);

        // decimal point limitation
        if (typeof evaluatedResult === "number" && !Number.isInteger(evaluatedResult)) {
            evaluatedResult = parseFloat(evaluatedResult.toFixed(6));
        }
        setResult(evaluatedResult);
        setExpression(evaluatedResult.toString());
        setError(null);
        updateHistory(`${expression} = ${evaluatedResult}`);
    } catch (error) {
        setError("Error");
        setResult(null);
    }
    setLastWasOperator(false);
};

//how display works
  const displayExpression = () => {
    // errors for special cases
    if (error) {
      return (
        <Text
          style={[
            styles.screenFirstNumber,
            {
              fontSize: 48,
              color: myColors.red,
              marginTop: 5,
              textAlign: "right",
            },
          ]}
        >
          {error}
        </Text>
      );
    }

    const formattedExpression = expression || "0";
    const isResult = result !== null && expression === result.toString();

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        <Text
          style={[
            styles.screenFirstNumber,
            {
              textAlign: formattedExpression === "0" || formattedExpression.length > 7 ? "right" : "right", 
              textAlignVertical: "center",
              color: isResult ? myColors.result : myColors.gray,
              fontSize: formattedExpression.length > 7 ? 50 : 70, 
            },
          ]}
        >
          {formattedExpression}
        </Text>
      </ScrollView>
    );
  };

  return (
    <View style={styles.viewBottom}>
      {/* History Section */}
      <View style={{ width: "90%", alignSelf: "center", marginBottom: 90 }}>
        <TouchableOpacity
          onPress={() => setShowHistory(!showHistory)}
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        >
          <Text style={{ fontSize: 18, color: myColors.gray }}>History</Text>
          <Text style={{ fontSize: 18, color: myColors.blue }}>
            {showHistory ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {showHistory && (
          <ScrollView style={{ maxHeight: 100, marginTop: 5 }}>
            {history.map((entry, index) => (
              <Text key={index} style={{ fontSize: 16, color: myColors.gray }}>
                {entry}
              </Text>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={{ height: 120, width: "90%", justifyContent: "flex-start", alignSelf: "center" }}>
        {displayExpression()}
      </View>

      <View style={styles.row}>
        <Button title="C" isGray onPress={clear} />
        <Button title="√" isGray onPress={handleSquareRoot} />
        <Button title="％" isGray onPress={handlePercentage} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("÷")} />
      </View>

      <View style={styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
      </View>

      <View style={styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>

      <View style={styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>

      <View style={styles.row}>
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="⌫" onPress={() => {
          if (result !== null) {
            setResult(null);
            setExpression("");
          } else {
            setExpression(expression.slice(0, -1));
          }
        }} />
        <Button title="=" isBlue onPress={evaluateExpression} />
      </View>
    </View>
  );
}
