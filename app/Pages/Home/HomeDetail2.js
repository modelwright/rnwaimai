import React,{Component} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  setNativeProps,
  ScrollView
} from 'react-native';

import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';



export default class HomeDetail extends Component{
  constructor(props){
    super(props);
    this.state={

    }
    this.topHeight = 150;
    this.statusHeight = 55;
  }
  
  _onScroll(e) {
    //获取滑动个的y轴偏移量
    let y = e.nativeEvent.contentOffset.y;
    //y轴滑动到顶部的临界值，此时需要悬浮
    let limit = this.topHeight - this.statusHeight;
    //当y轴滑动的距离<=临界值的时候，headerview的高度=（headerview的初始高度-滑动的高度）
    if (y <= limit) {
        //headerview的高度=（headerview的初始高度-滑动的高度）
        this.topView.setNativeProps({
            style: {
                height: this.topHeight - y,
            }
        });
        // console.log("if"+((this.topHeight)-y));
        //tabview的top值需要随着scrollview的滑动改变（headerview的初始高度-搜索栏的高度-scrollview的滑动高度）
        // this.tabbox.setNativeProps({
        //    style: {
        //        top:(this.topHeight-this.statusHeight-y)
        //    }
        // });
        //当y轴滑动的距离>临界值的时候，headerview的高度=（搜索栏的高度）    
    } else {
        //tabview的top为0
        // this.tabbox.setNativeProps({
        //   style: {
        //        top:0
        //    }
        // });
        //headerview的高度=（搜索栏的高度)
        this.topView.setNativeProps({
            style: {
                height: this.statusHeight,
            }
        });
        console.log("else"+this.statusHeight)
    }
    //通过(y/limit)(scrollview滑动的y值／临界值)算出一个offset，给搜索栏view设置背景色，
    //背景色是rgba(0,0,0,offset),
    this.serchboxView.setNativeProps({
        style: {
            backgroundColor: `rgba(0,0,0,${y / limit})`,
        }
    })

}
  render(){

    return (
      <View style={styles.container}>
          {/* <StatusBar 
          translucent={true}
          barStyle={'light-content'}
          backgroundColor={'#000'}/> */}
          {/* 头部 */}
          <View style={styles.headerTopContainer}
            ref={(ref)=>this.serchboxView = ref}
            onLayout={(event)=>{
              //获取顶部搜索栏的高度
              let height = event.nativeEvent.layout.height;
              if (this.statusHeight !== height) {
                this.statusHeight = height;
                this.serchboxView.setNativeProps({
                    style: {
                        top: (height),
                        backgroundColor: '#000'
                    }
                })
              }
            }}
          >
              <TouchableOpacity style={{width:px2dp(50),height:px2dp(40),marginLeft:10,}}>
                  <Image
                      style={{width:px2dp(20),height:px2dp(40)}}
                      source={require('../../Images/png/pic34.png')}
                  />
              </TouchableOpacity>
              <View style={{flexDirection:'row',backgroundColor:'#fff',flex:1,height:px2dp(50),paddingHorizontal:10,}}>
                  <Image
                      style={{width:px2dp(30),height:px2dp(30),marginRight:10,alignSelf:'center'}}
                      source={require('../../Images/png/pic14.png')}
                  />
                  <TextInput
                      style={{color:'#333',width:'95%'}}
                      selectionColor={'#fff'}
                      underlineColorAndroid={'transparent'}
                      placeholder={'搜索'}
                      placeholderTextColor={'#999'}
                      onFocus={this._jumpToSearch}
                  />
              </View>
              <View style={{flexDirection:'row',paddingHorizontal:10,}}>
                  <TouchableOpacity style={{marginRight:10,}}>
                      <Image
                          style={{width:px2dp(40),height:px2dp(40)}}
                          source={require('../../Images/png/pic31.png')}
                      />
                  </TouchableOpacity>
                  <TouchableOpacity>
                      <Image
                          style={{width:px2dp(40),height:px2dp(40)}}
                          source={require('../../Images/png/pic32.png')}
                      />
                  </TouchableOpacity>
              </View>
          </View>
          {/*店铺信息*/}
        <ImageBackground
            ref={(ref)=>this.topView = ref}
            style={styles.headerContainer}
            source={require('../../Images/jpg/pic4.jpg')}>
            <View style={styles.headerBottomStyle}>
                <View style={{flexDirection:'row'}}>
                  <Image
                      style={styles.storeIcon}
                      source={require('../../Images/jpg/pic19.jpg')}
                  />
                  <View style={styles.headerDescStyle}>
                      <Text allowFontScaling={false} style={styles.storeTitleStyle}>苹果旗舰店</Text>
                      <Text allowFontScaling={false} style={styles.storeDescStyle}>共99件商品</Text>
                      <Text allowFontScaling={false} style={styles.storeDescStyle}>蓝光coco时代一期8栋</Text>
                  </View>
                </View>
            </View>
        </ImageBackground>
        {/* 内容部分 */}
          <ScrollableTabView
            ref={(c)=>this.tabbox = c}
            style={{position: 'relative', top: px2dp(0), zIndex: 10}}
            renderTabBar={() => <DefaultTabBar/>}>
            <ScrollView 
              style={{flex: 1,backgroundColor:'green'}}
              tabLabel='商品'
              scrollEventThrottle={1}
              onScroll={this._onScroll.bind(this)}
              overScrollMode={'never'}
            >
              <Text style={{marginBottom:20}}>1234</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>123</Text>
              <Text style={{marginBottom:20}}>1234</Text>
            </ScrollView>
            <View tabLabel='介绍'>
              <Text>123</Text>
            </View>
            <View tabLabel="评价">
              <Text>123</Text>
            </View>
          </ScrollableTabView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  },
  headerContainer: {
    width: SCREEN_WIDTH,
    height: 150,
    justifyContent: 'flex-end',
    paddingHorizontal:15,
  },
  headerBottomStyle:{
    flexDirection:'row',
    alignContent:'center',
    paddingBottom:20,
  },
  storeIcon:{
    width:px2dp(130),
    height:px2dp(130),
    marginRight:px2dp(25),
    borderRadius:px2dp(7),
  },
  storeTitleStyle:{
    color:'#fff',
    fontSize:FONT_SIZE(15),
    marginBottom:px2dp(15),
  },
  storeDescStyle:{
    color:'#fff',
    fontSize:FONT_SIZE(10),
    marginBottom:px2dp(5)
  },
  obseverDeStyle:{
    color:'#fff',
    alignSelf:'center',
    fontSize:FONT_SIZE(12),
  },
  //顶部搜索
  headerTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    paddingTop: 20,
    paddingBottom:px2dp(20),
    left: 0,
    right: 0,
    top:0,
    zIndex:2
  },
  // contentStyle: {
  //   width: SCREEN_WIDTH,
  //   position: 'absolute',
  //   top:px2dp(300),
  //   bottom:0,
  // },
});