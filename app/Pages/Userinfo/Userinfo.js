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
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import {ListRow,Label,Button} from 'teaset';
import Home from '../Home/Home';
import UserNine from '../../Compontents/UserNine';


export default class Userinfo extends Component {
  componentDidMount() {
    console.log();
  }
  render(){;
    return(
      <View style={{backgroundColor:'#fff',flex:1}}>
        <ImageBackground style={{width:'100%',justifyContent:'center',flexDirection:'column',alignItems:'center',height:160,}} source={require('../../Images/jpg/pic4.jpg')}>
          <TouchableOpacity 
            onPress={
              ()=>{
                this.props.navigation.navigate('UserEdit',{title:'个人中心'})
              }
              }>
            <Image 
              style={{borderRadius:30,width:60,height:60,marginBottom:10,}} 
              source={require('../../Images/jpg/pic9.jpg')}
              ></Image>
          </TouchableOpacity>
          <Text style={{fontSize:16,color:'#fff'}}>{global.user.userData.nickname}</Text>
          <Text style={{fontSize:12,color:'#fff'}}>{global.user.userData.mobile}</Text>
        </ImageBackground>
        {/* <UserNine /> */}
        <ListRow 
          title={<Label style={{fontSize: 14, color: '#333'}} text='包邮卡' />} 
          // detail={
          //   <View style={{backgroundColor: '#5bc0de', width: 16, height: 24, borderRadius: 4}} />
          // }
          topSeparator='full'
          accessory='indicator'
          icon={require('../../Images/png/pic133.png')}
        />
        <ListRow 
          title={<Label style={{fontSize: 14, color: '#333'}} text='收获地址' />} 
          // detail={
          //   <View style={{backgroundColor: '#5bc0de', width: 16, height: 24, borderRadius: 4}} />
          // }
          bottomSeparator='full'
          accessory='indicator'
          icon={require('../../Images/png/pic135.png')}
        />
        <View style={styles.fenge}></View>
        <ListRow 
          title={<Label style={{fontSize: 14, color: '#333'}} text='我的收藏' />} 
          // detail={
          //   <View style={{backgroundColor: '#5bc0de', width: 16, height: 24, borderRadius: 4}} />
          // }
          topSeparator='full'
          accessory='indicator'
          icon={require('../../Images/png/pic136.png')}
        />
        <ListRow 
          title={<Label style={{fontSize: 14, color: '#333'}} text='邀请有奖' />} 
          // detail={
          //   <View style={{backgroundColor: '#5bc0de', width: 16, height: 24, borderRadius: 4}} />
          // }
          accessory='indicator'
          icon={require('../../Images/png/pic137.png')}
        />
        <ListRow 
          title={<Label style={{fontSize: 14, color: '#333'}} text='商户加盟' />} 
          // detail={
          //   <View style={{backgroundColor: '#5bc0de', width: 16, height: 24, borderRadius: 4}} />
          // }
          bottomSeparator='full'
          accessory='indicator'
          icon={require('../../Images/png/pic138.png')}
        />
        <Button
          onPress={() => this.tuichulogin()}
          style={{backgroundColor: '#ea5413',marginTop:40, borderColor: '#ea5413',paddingVertical:10,width:'80%',marginHorizontal:'10%',}}
        >
          <Label style={{color: '#fff', fontSize: 14,}} text='退出登录' />
        </Button>
      </View>
    );
  }
  tuichulogin(){
    // storage.clearMapForKey('loginState');
    // storage.getAllDataForKey('loginState').then(users => {
    //     console.log(users);
    // });
    storage.remove({
      key: 'loginState',
    });
    global.user.loginState = false;
    global.user.userData = "";
    console.log(global.user.loginState)
    console.log(global.user.userData)
    
    console.log("执行成功");
    this.props.navigation.navigate('Login')
  }
}
const styles = StyleSheet.create({
  fenge:{
      height:10,
      backgroundColor:'#f5f5f5',
  }
});
