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
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import SerchBox from '../Compontents/SerchBox';

export default class GuangGao extends Component {
    constructor(props){
        super(props);
    }
    render(){
    // const {navigate} = this.props.navigatio;
        return (
            <View style={{backgroundColor:'#fff',paddingTop:20,}}>
                <View style={{height:44,flexDirection:'row',paddingHorizontal:10,}}>
                    <Text style={{fontSize:16,alignSelf:'center',justifyContent:'center',marginRight:10}}>
                        重庆市
                        <Image style={{width:13,height:7,marginLeft:5}} source={require('../Images/png/pic13.png')}/>
                    </Text>
                    <View style={{flex:1,}}>
                        <SerchBox/>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({

});