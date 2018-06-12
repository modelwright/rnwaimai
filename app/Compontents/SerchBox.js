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
    TextInput,
} from 'react-native';


export default class SerchBox extends Component {
    constructor(props){
        super(props);
        this.state = { text: '' };
    }
    render(){
    // const {navigate} = this.props.navigatio;
        return (
            // <View style={{paddingVertical:20}}>
                <View style={{flex:1,backgroundColor:'#f2f2f2',borderRadius:20,flexDirection:'row',alignItems:'center',marginVertical:7,}}>
                    <Image style={{width:18,height:18,marginLeft:15,marginRight:10}} source={require('../Images/png/pic14.png')}/>
                    <TextInput
                        style={{height: 20, borderWidth: 0,fontSize:16,flex:1,}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholder='请输入商家、商品名称'
                    />
                </View>
            // </View>
        )
    }
}
const styles = StyleSheet.create({

});