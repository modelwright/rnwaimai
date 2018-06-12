/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
} from 'react-native';

export default class UserEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>这是个人中心修改的页面哦</Text>
                <Text>嘿嘿</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1,
    }
});