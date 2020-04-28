import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from '../Color';
import tempData from "../tempData";

export default class AddListModal extends React.Component {

    bgColor = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];

    state = {
        name: '',
        color: this.bgColor[0],
    };

    renderColor() {
        return this.bgColor.map(color => {
            return (
                <TouchableOpacity 
                    key={color}
                    style={{backgroundColor: color, width: 38,
                        height: 30,
                        borderRadius: 4}}
                    onPress={() => this.setState({ color})}
                    />
            );
        });
    }

    createTodo () {
        const {name, color} = this.state;

        const list = {name, color};
        this.props.addList(list);
        
        this.setState({name: ""});
        this.props.closeModal();
    }

    render() {
        return (
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior="padding"
                keyboardVerticalOffset={-550}
            >
                 <TouchableOpacity style={{ position: "absolute", top: 15, right: 20}} onPress={ this.props.closeModal}>
                     <AntDesign name="close" size={34} color={colors.black} />
                 </TouchableOpacity>
                 <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                     <Text style={styles.title}>Create Todo List</Text>
                     <TextInput 
                        style={styles.input} 
                        placeholder="list todo?" 
                        onChangeText= {text => this.setState({name: text})}
                        />

                     <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>{ this.renderColor() }</View>

                     <TouchableOpacity 
                        style={ [styles.btn, {backgroundColor: this.state.color}]}
                        onPress = { () => this.createTodo()}
                        >
                        <Text style={{color: colors.white, fontWeight: "600", textAlign: "center"}}>Create!</Text>
                    </TouchableOpacity>
                 </View>

            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    btn: {
        marginTop: 24, 
        height: 50, 
        borderRadius: 6, 
        alignSelf: "center", 
        justifyContent: "center",
        alignSelf: "stretch"
    }
});

