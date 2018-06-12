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
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {createStackNavigator,createBottomTabNavigator} from 'react-navigation';

import Login from '../Pages/Login/Login';

import Home from '../Pages/Home/Home';
import Order from '../Pages/Order/Order';
import Userinfo from '../Pages/Userinfo/Userinfo';
import UserEdit from '../Pages/Userinfo/UserEdit';
import HomeDetail from '../Pages/Home/HomeDetail';

import SerchBox from '../Compontents/SerchBox'


export default class Router extends Component {
    constructor(props){
        super(props);
    }
    render(){
        // const {navigate} = this.props.navigatio;
        // AsyncStorage.getItem('sessionid')
        // .then((value) => {
        //     let jsonValue = JSON.parse((value));
        //     if(jsonValue == undefined){
        //         alert('under')
        //         return (
        //             <Zhu />
        //         )
        //     }else{
        //         alert('no');
        //         return (
        //             <RootStack />
        //         )
        //     }
        // })
        return (
            <Zhu />
        )
    }
}
//主tabbar
const MyTab = createBottomTabNavigator({
    Home:{
        screen:Home,
        navigationOptions:{
            tabBarLabel: '首页',
            tabBarIcon: ({ focused }) =>{
                if (focused) {
                    return (
                        <Image style={styles.tabBarIcon} source={require('../Images/png/b1-1.png')}/>
                    );
                }
                return (
                    <Image style={styles.tabBarIcon} source={require('../Images/png/b1.png')}/>
                );
            },
        },
    },
    Order:{
        screen:Order,
        navigationOptions:{
            tabBarLabel: '订单',
            tabBarIcon: ({ focused }) =>{
                if (focused) {
                    return (
                        <Image style={styles.tabBarIcon} source={require('../Images/png/b2-1.png')}/>
                    );
                }
                return (
                    <Image style={styles.tabBarIcon} source={require('../Images/png/b2.png')}/>
                );
            },
        },
    },
    Userinfo:{
        screen:Userinfo,
        navigationOptions:{
            tabBarLabel: '我的',
            tabBarIcon: ({ focused }) =>{
                if (focused) {
                    return (
                        <Image style={styles.tabBarIcon} source={require('../Images/png/b5-1.png')}/>
                    );
                }
                return (
                    <Image style={styles.tabBarIcon} source={require('../Images/png/b5.png')}/>
                );
            },
        },
    },
},{
    tabBarPosition: 'bottom',
    swipeEnabled:false,//是否允许在标签之间进行滑动。
    animationEnabled:false,//是否在更改标签时显示动画。
    lazy:true,//是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    //initialRouteName:, //设置默认的页面组件
    backBehavior:false,//按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        style: {//tabbar的样式。
            height:50,
            borderTopWidth:1,
            // borderColor:'#f1f1f1',
            borderTopColor:'#f1f1f1',
        },
        activeBackgroundColor:'white',//label和icon的背景色 活跃状态下（选中） 。
        activeTintColor:'#ff5e16cf',//label和icon的前景色 活跃状态下（选中）。
        inactiveBackgroundColor:'white',//label和icon的背景色 不活跃状态下（未选中）。
        inactiveTintColor:'#999',//label和icon的前景色 不活跃状态下(未选中)。
        showLabel:true,//是否显示label，默认开启。
        labelStyle:{fontSize:12}//label的样式。
    },
})




//主页栈
const RootStack = createStackNavigator({
    IndexScreen: {
        screen:MyTab,
        navigationOptions:{
            header:null,
        }
        //navigationOptions: ({navigation}) => IndexOptions({navigation})
    },
    // Home:{screen:Home,navigationOptions: ({navigation}) => IndexOptions({navigation})},
    HomeDetail: {
        screen: HomeDetail,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    UserEdit: {
        screen: UserEdit,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
});

//入口栈
const Zhu = createStackNavigator({
    Root: {
        screen: RootStack,
        navigationOptions:{
            header:null,
        }
    },
    Login: {
        screen: Login,
    },
},{
    mode: 'modal',// 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)  
    headerMode: 'none', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    navigationOptions:{
        gesturesEnabled:false,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭 
        
    },
    onTransitionStart: (Start)=>{console.log('导航栏切换开始');},  // 回调  
    onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
});

//判断是否登录
const defaultGetStateForAction = Zhu.router.getStateForAction; 
Zhu.router.getStateForAction = (action, state) => {  
    //页面是MeScreen并且 global.user.loginState = false || ''（未登录）  
    if (action.routeName ==='Userinfo' && !global.user.loginState) {
        this.routes = [  
            ...state.routes,  
            {key: 'id-'+Date.now(), routeName: 'Login', params: { name: 'name1'}},  
        ];  
        return {  
            ...state,  
            routes,  
            index: this.routes.length - 1,  
        };  
    }  
    return defaultGetStateForAction(action, state);  
};  

//主流程自定义导航 左侧返回
const StackOptions = ({navigation}) => {
    console.log(navigation);
    let {state,goBack} = navigation;
    const headerStyle = {backgroundColor:'#fff',borderBottomWidth:0,};
    const headerBackTitle = false;
    const headerTitle = state.params ? state.params.title : state.routeName;
    //const headerTitle = state.routeName;
    const headerTitleStyle = {fontSize:iOS?FONT_SIZE(16):FONT_SIZE(18),
        color:'#000',fontWeight:'500',alignSelf:'center',paddingTop:Android? 17: null,}
    const headerLeft = (
        <TouchableOpacity style={{width:px2dp(50),height:px2dp(50),justifyContent:'center',alignItems:'center',}} onPress={()=>{goBack()}}>
            <Image source={require('../Images/png/pic17.png')} style={{width:15,height:15,resizeMode: 'contain'}}/>
        </TouchableOpacity>
    );
    let headerRight;
    if (state.params?state.params.headerRight:null){
        headerRight = state.params.headerRight;
    }
    let header;
    if (state.params ? state.params.isVisible === true : null){
        header = null;
    }
    console.log(headerTitle);
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,header,headerLeft,headerRight}
};

const IndexOptions=({navigation})=>{
    console.log(navigation);
    let {state,goBack} = navigation;
    const headerTitle = (
        <View style={{flex:1,backgroundColor:'#000'}}>
            <SerchBox />
        </View>
    )
    const headerStyle = {backgroundColor:'#fff',borderBottomWidth:0,};
    const headerTitleStyle = {fontSize:iOS?FONT_SIZE(16):FONT_SIZE(18),
        color:'#000',fontWeight:'500',alignSelf:'center',paddingTop:Android? 17: null,}
    // const headerTitleStyle = {fontSize:FONT_SIZE(20),color:'white',fontWeight:'500'}
    const headerBackTitle = false;
    const headerLeft = (
        <Text style={{fontSize:16,alignItems:'center',justifyContent:'center',flex:1,marginHorizontal:5}}>重庆市 <Image style={{width:13,height:7}} source={require('../Images/png/pic13.png')}/></Text>
    );
    const headerRight=(
        <Text>123</Text>
    )
    return {headerTitle,headerBackTitle,headerTitleStyle,headerLeft,headerStyle,headerRight}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff'
    },
    tabBarIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    }
});