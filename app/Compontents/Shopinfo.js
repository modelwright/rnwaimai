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


export default class Shopinfo extends Component {
    constructor(props){
        super(props);
        
    }
    render(){
        // const {params} = this.props.navigation.state;
        const model = this.props.data;
        return (
            <View style={[styles.boxS,{}]}>
                <Image style={{width:80,height:80,marginRight:15,borderRadius:5,}} source={{uri:model.headurl.xs}}></Image>
                <View>
                    <Text style={{fontSize:16,marginBottom:5,}}>{model.shop_name}</Text>
                    <Text style={[styles.youhtxt,{color:'#333'}]}>月售{model.sale}单</Text>
                    {model.note.map((item,index)=>{
                        return <View key={index} style={{flexDirection:'row',alignItems:'center',marginBottom:3}}>
                                    <Image style={{width:15,height:15,marginRight:5}} source={{uri:item.icon}}/>
                                    <Text style={[styles.youhtxt,{marginBottom:0,}]}>{item.text}</Text>
                                </View>
                    })}
                </View>
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    boxS:{
        flexDirection:'row',
        paddingVertical:10,
        marginHorizontal:15,
        borderBottomWidth:1,
        borderColor:'#e6e6e6',
    },
    youhtxt:{
        fontSize:12,
        color:'#444',
        marginBottom:5,
    }
});