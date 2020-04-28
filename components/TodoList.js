import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import Colors from '../Color';
import TodoModal from './TodoModal';

export default class TodoList extends React.Component {
    state = {
        showListVisiable: false
    };

    toggleListModal() {
        this.setState({
            showListVisiable: !this.state.showListVisiable
        })
    };

    render() {
        const list = this.props.list;
        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;
        return (
            <View>
                <Modal 
                    animationType="slide"
                    visible={this.state.showListVisiable}
                    onRequestClose={() => this.toggleListModal()}
                >
                   <TodoModal 
                        list={list} 
                        closeModal={() => this.toggleListModal()}
                        updateList= {this.props.updateList}
                    />
                </Modal>

                <TouchableOpacity 
                    style={ [styles.listContainer, {backgroundColor: list.color}]}
                    onPress={() => this.toggleListModal()}
                >
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>
        
                    <View style={{ alignItems: "center" }}>
                        <Text style={ styles.count}> { remainingCount }</Text>
                        <Text style={ styles.subtitle }>Remaining</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={ styles.count}>{ completedCount }</Text>
                        <Text style={ styles.subtitle }>Completed</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
    
};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200,
    },
    listTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18,
        padding: 20,
        width: 200,
    },
    count: {
        fontSize: 40,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle: {
        fontWeight: 20,
        fontWeight: "700",
        color: Colors.white
    }
});