import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from '../Color';

export default class AddListModal extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                 <TouchableOpacity style={{ position: "absolute", top: 64, right: 32}}>
                     <AntDesign name="close" size={34} color={colors.black} />
                 </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
