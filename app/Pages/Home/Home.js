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
    ScrollView,
    RefreshControl,
} from 'react-native';

import {Carousel,Toast} from 'teaset';

import IndexHeader from "../../Compontents/IndexHeader";
import MenuButton from "../../Compontents/MenuButton";
import GuangGao from "../../Compontents/GuangGao";
import Shopinfo from "../../Compontents/Shopinfo";
import SerchBox from "../../Compontents/SerchBox";
//import ShopList from "../../Compontents/ShopList2";

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
        //     width: defaultWidth,
        //     height: defaultHeight,
            lunbo:[],
            category:[{
                id:100,
                type:'1',
                cat_name:'早餐',
                pic:'http://test.dingwei.cn/huoxing/uploads/product/category/100/100.png?r=891627',
            }],
            home_left:'',
            home_middle_down:'',
            home_middle_right_down:'',
            home_middle_right_top:'',
            home_middle_top:'',
            sort:2,
            page:1,
            latitude:29.590597,
            longitude:106.602008,
            category_id:100,
            shops:[],
            isRefreshing: false,
        };
    }
    componentWillMount() {
        console.log(this.props);
        Fetch.get('http://test.dingwei.cn/huoxing/consumer/app/home/home',(data)=>{
            console.log(data.data);
            this.setState({
                lunbo:data.data.lunbo,
                category:data.data.category,
                home_left:data.data.home_left.imgs,
                home_middle_down:data.data.home_middle_down.imgs,
                home_middle_right_down:data.data.home_middle_right_down.imgs,
                home_middle_right_top:data.data.home_middle_right_top.imgs,
                home_middle_top:data.data.home_middle_top.imgs,
            })
        })
        let formData = new FormData();
        formData.append("sort",this.state.sort);
        formData.append("page",this.state.page);
        formData.append("latitude",this.state.latitude);
        formData.append("longitude",this.state.longitude);
        formData.append("category_id",this.state.category_id);
        // formData.append("keyword",this.state.keyword);//
        Fetch.postForm('http://test.dingwei.cn/huoxing/consumer/app/home/getShopList',formData,(data)=>{
            console.log(data);
            if(data==undefined){
                return false;
            }else{
                if(data.status==0){
                    Toast.fail(data.message);
                }else{
                    this.setState({
                        shops:data.data
                    })
                }
            }
            
        },(error)=>{
            console.log(error);
        })
    }
    clickComponentBMiddleButton(data) {
        console.log(data);
        return false;
        this.props.navigator.push({
            component: DetailView,
            passProps: {'message' : data}
        });
    }
    _contentViewScroll(event){
        var offsetY = event.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = event.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            console.log('滑动到底部了');
        }
    }
    _onRefresh() {
        let formData = new FormData();
        formData.append("sort",this.state.sort);
        formData.append("page",this.state.page);
        formData.append("latitude",this.state.latitude);
        formData.append("longitude",this.state.longitude);
        formData.append("category_id",this.state.category_id);
        Fetch.postForm('http://test.dingwei.cn/huoxing/consumer/app/home/getShopList',formData,(data)=>{
            console.log(data);
            if(data==undefined){
                return false;
            }else{
                if(data.status==0){
                    Toast.fail(data.message);
                }else{
                    this.setState({
                        shops:data.data,
                        isRefreshing: false,
                    })
                }
            }
            
        },(error)=>{
            console.log(error);
        })
    }
    render(){
    // const {navigate} = this.props.navigatio;
        // const {params} = this.props.navigation.state;
        return (
            <View style={{flex:1,}}>
                <IndexHeader />
                <ScrollView 
                    style={{backgroundColor:'#eee',flex:1}}
                    onMomentumScrollEnd={this._contentViewScroll}
                    refreshControl={
                        <RefreshControl  
                        refreshing={this.state.isRefreshing}  
                        onRefresh={this._onRefresh.bind(this)}  
                        colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}  
                        progressBackgroundColor="#ffffff"  
                        />
                    }>
                    <Carousel style={{height:160}} control={true}>
                        {
                            this.state.lunbo.map(function (item,index){
                                return (
                                    <Image source={{uri:item.imgs}} key={index} style={[styles.ImageStyle]}/> 
                                )
                            })
                        }
                    </Carousel>
                    <View style={styles.MenuBox}>
                        {this.state.category.map((item, index) => {
                            // console.log(this);
                            // console.log(item);
                            return <MenuButton 
                                        renderIcon={item.pic}
                                        showText={item.cat_name} tag={'wdgz'}
                                        clickButtonCallback={(data) => {this.clickComponentBMiddleButton(data)}}
                                        style={styles.MenuBtn}
                                        key={index}
                                    />
                            })
                        }
                    </View>
                    <GuangGao 
                        home_left={this.state.home_left}
                        home_middle_top={this.state.home_middle_top}
                        home_middle_down={this.state.home_middle_down}
                        home_middle_right_top={this.state.home_middle_right_top}
                        home_middle_right_down={this.state.home_middle_right_down}
                        />
                    <View style={{flex:1,backgroundColor:'#fff',justifyContent:'center',paddingVertical:10,}}>
                        <Image style={{width:150,alignSelf:'center'}} resizeMode='contain' source={require('../../Images/png/pic131.png')}/>
                    </View>
                    <View style={{flex:1,backgroundColor:'#fff'}}>
                    {
                        this.state.shops.map((item, index) => {
                            // console.log(index);
                            return  <TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate('HomeDetail',{user:12,title:'详情页',isVisible:true})}>{/*isVisible:true*/}
                                        <Shopinfo data={item}/>
                                    </TouchableOpacity>
                        })
                    }
                    </View>
                </ScrollView>
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    MenuBox:{
        flexDirection: 'row',
        flexWrap:"wrap",
        paddingVertical:20,
        paddingTop:20,
        paddingBottom:10,
        borderBottomWidth:1,
        borderColor:'#e6e6e6',
        backgroundColor:'#fff',
    },
    MenuBtn:{
        width:SCREEN_WIDTH/5,
        marginBottom:20,
    },
    ImageStyle: {
        width:SCREEN_WIDTH,
        resizeMode:'cover',
        height:'100%',
    },
});