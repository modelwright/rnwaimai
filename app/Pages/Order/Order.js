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
    ScrollView
} from 'react-native';
import {SegmentedBar,Carousel,Label} from 'teaset';
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
import ShopList from "../../Compontents/ShopList3";

export default class Order extends Component {
    constructor(props){
        super(props);
        this.state = {
            // activeIndex:0,
            // height: defaultHeight, 
        };
        
    }
    render(){
    // const {navigate} = this.props.navigatio;
    // let barItems =  this.barItems;
        return (
            <View style={styles.container}>
                <ScrollableTabView
                renderTabBar={() => <DefaultTabBar/>}
                locked={false}//是否可以拖动 false表示可以
                initialPage={0}//初始化第几页
                tabBarUnderlineStyle={styles.Line}//选中的下方横线颜色
                tabBarActiveTextColor={'#000'}//选中的文字颜色
                tabBarInactiveTextColor={'#666'}//未选中的文字颜色
                tabBarBackgroundColor={'#fff'}//整个table的背景颜色
                scrollWithoutAnimation={false}//点击tab时 是否有动画 默认false 表示有
                onChangeTab={(obj) => {
                    console.log('index:' + obj.i);
                  }
                }
                // onScroll={(postion) => {  
                //     // float类型 [0, tab数量-1]  
                //     console.log('scroll position:' + postion);
                //     }
                // }
                >
                    <ShopList tabLabel='全部' status={0} />
                    <ShopList tabLabel='待支付' status={1}/>
                    <ShopList tabLabel='待接单' status={2}/>
                    <ShopList tabLabel='配送中' status={3}/>
                    <ShopList tabLabel='待评价' status={4}/>
                </ScrollableTabView>
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