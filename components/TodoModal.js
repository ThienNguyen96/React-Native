import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard, Animated } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import {Swipeable} from 'react-native-gesture-handler';

import Colors from '../Color';

export default class TodoModal extends React.Component {

    state = {
        newTodo: ""
    };

    toggleCompeleList = index => {
        let list = this.props.list;
        list.todos[index].completed = ! list.todos[index].completed;

        this.props.updateList(list);
    }

    deleteTodo = (index) => {
        let list = this.props.list;

        list.todos.splice(index, 1);

        this.props.updateList(list);
    }

    renderTodo = (todo, index) => {
        return (
            // <Swipeable renderRightActions={ this.rightActions}>
                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={()=> this.toggleCompeleList(index)}>
                        <Ionicons name={todo.completed ? "ios-square" : "ios-square-outline"} size={24} color={Colors.gray} style={{width: 32}}/>
                    </TouchableOpacity>
                    <Text style={[styles.todo, 
                        {
                            textDecorationLine: todo.completed ? "line-through" : "none" , 
                            color: todo.completed ? Colors.gray : Colors.black}]}>{todo.title}</Text>
                    <TouchableOpacity onPress={(index) => this.deleteTodo(index)}>
                        <Text style={[styles.deleteButton, {backgroundColor: this.props.list.color}]}>Delete</Text>
                    </TouchableOpacity>
                </View>
            // </Swipeable>
        );
    };

    rightActions = (dragX, index) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.9],
            extrapolate: "clamp"
        });
        return(
            <TouchableOpacity>
                <Animated.View style={styles.deleteButton}>
                    <Animated.Text style={{color: Colors.white, fontWeight: "800", transform: [{scale}]}}>Delete</Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }
    
    addTodo = () => {
        let list = this.props.list;

        if (this.state.newTodo) {
            if (!list.todos.some(todo => todo.title === this.state.newTodo)) {
                list.todos.push({title: this.state.newTodo, completed: false});
                this.props.updateList(list);
            }

            this.setState({newTodo: ""})
            Keyboard.dismiss();
        } else {
            this.setState({newTodo: ""})
            Keyboard.dismiss();
        }
    }

    render() {
        const list = this.props.list;
        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed).length;

        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={-550}>
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity 
                        style={{ position: "absolute", top: 15, right: 20, zIndex: 10}}
                        onPress={ this.props.closeModal }
                    >
                        <AntDesign name="close" size={24} color={Colors.black} />
                    </TouchableOpacity>

                    <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
                        <View>
                            <Text style={styles.title}>{ list.name }</Text>
                            <Text style={styles.taskCount}>
                                {completedCount} of {taskCount} tasks
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.section, {flex: 3}]}>
                        <FlatList
                            data={list.todos}
                            renderItem={({item, index})=> this.renderTodo(item, index)}
                            keyExtractor={item => item.title}
                            contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <View
                        style={[styles.section, styles.footer]}
                        
                    >
                        <TextInput 
                            style={[styles.input, {borderColor: list.color}]} 
                            onChangeText={text => this.setState({newTodo: text})}
                            value={this.state.newTodo}
                        />
                        <TouchableOpacity 
                            style={[styles.addTodo, {backgroundColor: list.color}]}
                            onPress={() => this.addTodo()}
                        >
                            <AntDesign name="plus" size={16} color={Colors.white}/>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignSelf: "center",
    },
    section: {
        // flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3,
        paddingTop: 16
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: Colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: Colors.gray,
        fontWeight:"600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignSelf: "center",
        paddingBottom: 16
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 6,
        paddingHorizontal: 8,
        alignSelf: "center",
        justifyContent: "center",
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignSelf: "center",
        justifyContent: "center",
    },
    todoContainer: {
        flex: 1,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 32,
        justifyContent: "space-between"
    },
    todo: {
        color: Colors.black,
        fontWeight: "700",
        fontSize: 16,
        marginLeft: -100
    },
    deleteButton: {
        // flex: 1,
        textAlign: "center",
        // justifyContent: "flex-end",
        // alignItems: "center",
        textAlignVertical: "center",
        width: 80,
        height: 40,
        color: "#fff",
        borderRadius: 6
    }
});