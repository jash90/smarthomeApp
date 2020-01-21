import React from "react";
import LinearGradient from "react-native-linear-gradient";
export const GradientHeader: React.FC = ({}) => {
    return (
        <LinearGradient colors={["yellow","red", "green"]} style={{width:"100%", height:50}} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} locations={[0.33,0.66,0.99]}/>
    );
};
