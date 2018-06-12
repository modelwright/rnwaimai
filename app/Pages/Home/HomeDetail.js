import React,{Component} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Animated,
  onLoadEnd,
  Platform,
  findNodeHandle,
  TouchableOpacity,
  ScrollView,
  setNativeProps,
  interpolate,
  timing,
  easing,
  linear,
  Easing
} from 'react-native';


import ScrollableTabView,{DefaultTabBar,tabLabel} from 'react-native-scrollable-tab-view';
import { BlurView } from 'react-native-blur';

export default class HomeDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            left1: new Animated.Value(0),
            rotation2: new Animated.Value(0),
            pan: new Animated.Value({x:0, y:0})
        }
    }
    componentDidMount() {
        Animated.spring(this.state.left1, {
            toValue: 100,        //属性目标值
            friction: 1,        //摩擦力 （越小 振幅越大）
            tension: 100,        //拉力 
        }).start();            //执行动画
    }
    render() {
        return (
            <Animated.Image
                style={[styles.image,{left: this.state.left1}]}
                source={require('../../Images/emoji-1.png') }/>
        );
    }
}

const styles = StyleSheet.create({
    demo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 30
    }
});