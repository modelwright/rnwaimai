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
    TouchableHighlight
} from 'react-native';


export default class UserNine extends Component {
    constructor(props){
        super(props);
        
    }
    render(){
    // const {navigate} = this.props.navigatio;
        return (
            <View style={[styles.sbu_red, styles.sbu_view]}>
                <TouchableHighlight underlayColor={'#FA6778'} style={{flex:1}}>
                    <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
                        <View style={[styles.sub_con_flex, styles.sub_text]}>
                            <Text style={[styles.font16]}>酒店</Text>
                        </View>
                        <View style={[styles.sub_con_flex]}>
                            <Image style={[styles.sbu_icon_img]} source={require("../Images/emoji-1.png")}></Image>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
                    <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                        <Text style={[styles.font16]}>海外</Text>
                    </View>
                    <View style={[styles.sub_con_flex, styles.sub_text]}>
                        <Text style={[styles.font16]}>周边</Text>
                    </View>
                </View>
                <View style={[styles.sbu_flex]}>
                    <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                        <Text style={[styles.font16]}>团购.特惠</Text>
                    </View>
                    <View style={[styles.sub_con_flex, styles.sub_text]}>
                        <Text style={[styles.font16]}>客栈.公寓</Text>
                    </View>
                </View>
            </View> 
        )
    }
}
const styles = StyleSheet.create({

        //container
    container:{
        backgroundColor:'#F2F2F2',
        flex:1,
    },
    //slider
    wrapper: {
        height:80,
    },
    slide: {
        height:80,
        resizeMode: Image.resizeMode.contain,
    },
    //sbu
    sbu_view:{
        height:84,
        marginLeft: 5,
        marginRight:5,
        borderWidth:1,
        borderRadius:5,
        marginBottom:10,
        flexDirection:'row',
    },
    sbu_red:{
        backgroundColor: '#FA6778',
        borderColor:'#FA6778',
    },

    sbu_blue:{
        backgroundColor: '#3D98FF',
        borderColor:'#3D98FF',
    },

    sbu_green:{
        backgroundColor: '#5EBE00',
        borderColor:'#5EBE00',
    },

    sbu_yellow:{
        backgroundColor: '#FC9720',
        borderColor:'#FC9720',
    },
    sbu_flex:{
        flex:1,
    },
    sbu_borderRight:{
        borderColor:'#fff',
        borderRightWidth: 0.5,
    },
    sbu_icon_img:{
        height:40,
        width:40,
        resizeMode:Image.resizeMode.contain,
    },
    sub_con_flex:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sub_text:{
        justifyContent:'center',
    },
    font16:{
        fontSize:17,
        color:'#FFF',
        fontWeight:'900',
    },
    sbu_borderBottom:{
        borderBottomWidth:0.5,
        borderBottomColor:'#fff',
    },
    img_view:{
        height:62,
        marginLeft:5,
        marginRight:5,
        flexDirection: 'row',
        marginBottom:20,
        backgroundColor:'#fff',
    },
    img_flex:{
        flex:1,
        borderWidth:1,
        borderColor:'#ccc',
    },
    img_wh: {
        height:59,
        borderRightWidth:0,
        resizeMode:Image.resizeMode.contain,
    }
});