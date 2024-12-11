//IM-2021-100
//Chamod jayaweera

import{useContext, useState} from 'react';
import{TouchableOpacity,Text} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import{styles} from '../styles/GlobalStyles';


// Define the ButtonProps interface to specify the props the Button component can accept
interface ButtonProps {
    onPress: () => void; // Function to handle button press
    title: string;       // Text displayed on the button
    isBlue?: boolean;    // Optional: Indicates if the button should be blue
    isGray?: boolean;    // Optional: Indicates if the button should be gray
}

// Button component definition
export default function Button({ title, onPress, isBlue, isGray }: ButtonProps) {
    const theme = useContext(ThemeContext); // Access the current theme (light or dark) using context

    return (
        <TouchableOpacity 
            // Apply styles based on the button's color props or theme
            style={
                  isBlue 
                ? styles.btnBlue            // Use blue button style if isBlue is true
                : isGray 
                ? styles.btnGray            // Use gray button style if isGray is true
                : theme === "light" 
                ? styles.btnLight           // Use light theme button style for light mode
                : styles.btnDark            // Use dark theme button style for dark mode
            } 
            onPress={onPress} // Call the onPress function when the button is pressed
        >
            <Text 
                // Apply text styles based on the button's color props or theme
                style={
                   isBlue || isGray 
                   ? styles.smallTextLight    // Use light text style for blue or gray buttons
                   : theme === "dark" 
                   ? styles.smallTextLight    // Use light text style for dark theme
                   : styles.smallTextDark     // Use dark text style for light theme
                }
            >
                {title} 
            </Text>
        </TouchableOpacity>
    );
}
