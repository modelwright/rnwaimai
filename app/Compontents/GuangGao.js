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


export default class GuangGao extends Component {
    constructor(props){
        super(props);
        
    }
    render(){
    // const {navigate} = this.props.navigatio;
        return (
            <View style={[styles.guangg,{flexDirection:'row',justifyContent:'center',alignContent:'center',}]}>
                <View style={{width:'42.35%'}}>
                    <Image resizeMode="contain" style={{width:'100%',height:'100%'}} source={{uri:this.props.home_left}}/>
                </View>
                <View style={{width:'57.65%'}}>
                    <View style={{width:'100%',flexDirection:'row',height:'50%'}}>
                        <Image resizeMode="contain" style={{width:"50%",height:'100%'}} source={{uri:this.props.home_middle_top}} />
                        <Image resizeMode="contain" style={{width:'50%',height:'100%'}} source={{uri:this.props.home_middle_down}} />
                    </View>
                    <View style={{width:'100%',flexDirection:'row',height:'50%',}}>
                        <Image resizeMode="contain" style={{width:"50%",height:'100%'}} source={{uri:this.props.home_middle_right_top}} />
                        <Image resizeMode="contain" style={{width:"50%",height:'100%'}} source={{uri:this.props.home_middle_right_down}} />
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    guangg:{
        width:SCREEN_WIDTH,
        height:195,
        marginVertical:10,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#e6e6e6',
        padding:5,
        backgroundColor:'#fff'
    },
});