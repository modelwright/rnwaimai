/**
 * Created by Rabbit on 2017/4/20.
 */
import React, { Component } from 'react';
import { Dimensions, StyleSheet, PixelRatio, Platform, Alert ,AsyncStorage} from 'react-native';
import FontSize from '../Compontents/TextSize';
import Colors from '../Compontents/Colors';
import { px2dp } from './Tool';
import Storage from 'react-native-storage';

var storage = new Storage({  
    // 最大容量，默认值1000条数据循环存储  
    size: 1000,  
  
    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage  
    // 如果不指定则数据只会保存在内存中，重启后即丢失  
    storageBackend: AsyncStorage,
  
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期  
    defaultExpires: 1000 * 3600 * 24,  
  
    // 读写时在内存中缓存数据。默认启用。  
    enableCache: false,  
  
    // 如果storage中没有相应数据，或数据已过期，  
    // 则会调用相应的sync方法，无缝返回最新数据。  
    // sync方法的具体说明会在后文提到  
    // 你可以在构造函数这里就写好sync的方法  
    // 或是写到另一个文件里，这里require引入  
    // 或是在任何时候，直接对storage.sync进行赋值修改  
    //sync: require('./sync')  // 这个sync文件是要你自己写的  
})  
  
// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用  
  
// 对于web  
// window.storage = storage;  
  
// 对于react native  
// global.storage = storage;  
  
// 这样，在此**之后**的任意位置即可以直接调用storage  
// 注意：全局变量一定是先声明，后使用  
// 如果你在某处调用storage报错未定义  
// 请检查global.storage = storage语句是否确实已经执行过了  
  


import Fetch from './Request';


// import ImageResizer from 'react-native-image-resizer';

let {height, width} = Dimensions.get('window');

// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 最小线宽
global.pixel = 1 / PixelRatio;
// 常用颜色
global.COLORS = Colors;
// 适配字体
global.FONT_SIZE = FontSize;
//// 用户登录状态
global.storage = storage;  
// 屏幕适配
global.px2dp = px2dp;
// 图片压缩
// global.ImageResizer = ImageResizer;
// 弹出框
global.Alert = Alert;
// 网络请求
global.Fetch = Fetch;

//用户登录数据  
global.user = {  
    loginState:'',//登录状态  
    userData:'',//用户数据  
};  
//刷新的时候重新获得用户数据
storage.load({
    key:'loginState',
}).then(users => {
    global.user.loginState = true;  
    global.user.userData = users; 
    console.log(users);
}).catch(err => {  
    global.user.loginState = false;  
    global.user.userData = '';  
}) 

