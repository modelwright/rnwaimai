import React from 'react';
import {View,Text,AsyncStorage,Image,TouchableOpacity,StyleSheet} from 'react-native';

import {BasePage, Input, Button,Toast} from 'teaset';

import Request from '../../Common/Request';

export default class Login extends BasePage {
  constructor(props) {
    super(props);
    this.state, {
      mobile: null,
      password: null,
      static:false,
    };
  }
  Login(){
    let formData = new FormData();
    formData.append("mobile",this.state.mobile);
    formData.append("password",this.state.password);
    Request.postForm('http://test.dingwei.cn/huoxing/consumer/app/user/login',formData,(data)=>{
      console.log(data);
      if(data.status==0){
        Toast.message(data.message,3000,'top');
      }else{
        // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。  
        // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。  
        storage.save({
            key: 'loginState',// 注意:请不要在key中使用_下划线符号!  
            data: {  
                user_id: data.data.user_id,  
                nickname:data.data.nickname,  
                pay_passwd: data.data.pay_passwd,
                sessionid:data.data.sessionid,
                mobile:data.data.mobile,
                balance:data.data.balance,
            },  

            // 如果不指定过期时间，则会使用defaultExpires参数  
            // 如果设为null，则永不过期  
            // 8个小时后过期  
            expires: 1000 * 3600 * 8  
        });  
        global.user.loginState = true;//设置登录状态  
        global.user.userData = { //保存用户数据 
            user_id: data.data.user_id,  
            nickname:data.data.nickname,  
            pay_passwd: data.data.pay_passwd,
            sessionid:data.data.sessionid,
            mobile:data.data.mobile,
            balance:data.data.balance,
        };
        // this.props.navigation.navigate('Root',{user:this.state.mobile,password:this.state.password})
        this.props.navigation.navigate('Userinfo')//跳转到用户页面  
      }
    },(error)=>{
        console.log(error);
    })
  }
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
        {/* <Text>{this.state.data}</Text> */}
        {/* <Button title="增" onPress={()=>this.createData()}/>
        <Button title="删" onPress={()=>this.removeData()}/>
        <Button title="改" onPress={()=>this.upData()}/>
        <Button title="查" onPress={()=>this.inquireData()}/> */}
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{position:'absolute',right:10,top:20,}}>
          <Image 
            source={require('../../Images/png/pic41.png')}
            style={{width:30,height:30}}
            />
        </TouchableOpacity>
        <View style={styles.inputBox}>
          <Image style={styles.inputBoxImg} source={require('../../Images/png/pic143.png')}/>
          <Input
            style={{width: 234,borderWidth:0,fontSize:16,}}
            size='lg'
            value={this.state.mobile}
            placeholder='用户名'
            placeholdertTextColor='#000'
            // autoFocus={true}
            clearButtonMode='always'
            maxLength={11}
            onChangeText={text => this.setState({mobile: text,static:true})}
            />
        </View>
        <View style={styles.inputBox}>
          <Image style={styles.inputBoxImg} source={require('../../Images/png/pic144.png')}/>
          <Input
          style={{width: 234,borderWidth:0,fontSize:16,}}
          size='lg'
          value={this.state.password}
          placeholder='密码'
          secureTextEntry={true}
          onChangeText={text => this.setState({password: text,static:true})}
          />
        </View>
        {
          this.state.static == true
              ?
              <Button style={{width:250,marginTop:20,backgroundColor:'#000',borderWidth:0}} title='登录' titleStyle={{fontSize:18,color:'#fff'}} size="lg" onPress={()=>this.Login()}/>
              : 
              <Button style={{width:250,marginTop:20,backgroundColor:'#eee',borderWidth:0}} title='登录' titleStyle={{fontSize:18,color:'#fff'}} size="lg"/>
        }
        <View style={{flexDirection:'row',justifyContent:'space-between',width:250,marginTop:20,}}>
          <Text style={{color:'#ea5413'}}>快速注册</Text>
          <Text style={{color:'#ea5413'}}>忘记密码？</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  inputBox:{
    width:250,
    justifyContent:'space-between',
    flexDirection:'row',
    borderBottomWidth:1,
    alignItems:'center',
    borderColor:'#e6e6e6',
  },
  inputBoxImg:{
    width:16,
    height:16,
  }
})