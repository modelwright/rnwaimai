import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList, 
    Image,
    ActivityIndicator,
} from 'react-native';
import {BasePage, Input, Button,Toast} from 'teaset';
import Request from '../Common/Request';
export default class ShopList extends Component{
    constructor(props){
        super(props);
        this.page = 1;
        this.state={
            data:[],
            isRefresh:false,//下拉刷新
            isLoadMore:false,//加载更多
            showFoot:0,//0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            status:this.props.status,//1待支付 2待接单 3配送中 4待评价 5已完成 0所有
            type:1,//1送货上门 2到店订单
        }
    }
    render(){
        return(
            <FlatList
                style={styles.container}
                data={this.state.data}
                //Item
                renderItem={({item})=>this._renderItem(item)}
                //头尾
                // ListHeaderComponent={this._createListHeader}
                ListFooterComponent={this._createListFooter.bind(this)}
                //空布局
                ListEmptyComponent={this._createEmptyView}
                //下拉刷新相关
                onRefresh={()=>this._onRefresh()}
                refreshing={this.state.isRefresh}
                //上拉加载相关
                onEndReached={()=>this._onLoadMore()}
                onEndReachedThreshold={0.1}
                keyExtractor={(item, index) => index.toString()}
            ></FlatList>
        )
    }
    componentDidMount() {
        //请求数据
        this._getList();
    }

    //Item布局
    _renderItem(item){
        return(
            <View style={{marginBottom:10,}}>
                <TouchableOpacity style={{width:SCREEN_WIDTH,flexDirection:'row',alignItems:'center',paddingVertical:10,borderBottomWidth:1,borderTopWidth:1,borderColor:'#eee',paddingHorizontal:10,}} activeOpacity={0.5} onPress={()=>this._onItemClick(item)}>
                    <Image source={{uri:item.portrait}} style={[styles.itemImages,{marginRight:10,}]}/>
                    <View style={{flex:1,justifyContent:'space-between',flexDirection:'row'}}>
                        <View>
                            <Text style={{fontSize:16,marginBottom:3,}}>{item.shop_name}</Text>
                            <Text style={{fontSize:10,color:'#999',marginBottom:10,}}>{item.addtime}</Text>
                            <Text style={{color:'#444',fontSize:11}}>{item.title}</Text>
                        </View>
                        <View>
                            <Text style={{marginTop:5,}}>{item.status_desc}</Text>
                            <Text style={{marginTop:25,fontSize:17,fontWeight:'500',textAlign:'right'}}>{item.reality_amount}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {( ()=>{
                    switch(item.status){
                        case "4":
                            return (
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,}}>
                                    <Text>评价立得积分</Text>
                                    <Button style={{width:90,paddingVertical:10,}} type="primary" titleStyle={{fontSize:14}} title='我要评价'/>
                                </View>
                            ) 
                            break;
                        case "6":
                            return (
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,}}>
                                    <Text></Text>
                                    <Button style={{width:90,paddingVertical:10,}} type="primary" titleStyle={{fontSize:14}} title='删除订单'/>
                                </View>
                            ) 
                            break;
                        case "7":
                            return (
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10,}}>
                                    <Text></Text>
                                    <Button style={{width:90,paddingVertical:10,}} type="primary" titleStyle={{fontSize:14}} title='删除订单'/>
                                </View>
                            ) 
                            break;
                        default:return null;
                    }
                    }
                )()}
            </View>
        )
    }
    //创建头部布局
    // _createListHeader(){
    //     return(
    //         <View style={styles.headView}>
    //             <Text style={{color:'#fff'}}>头部</Text>
    //         </View>
    //     )
    // }
    //创建尾部布局
    _createListFooter(){
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text style={{marginLeft:10,}}>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }
    //创建空布局
    _createEmptyView(){
        return(
            <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12}}>暂无数据</Text>
            </View>
        )
    }
    //获取列表
    _getList(){
        // Request.get('http://m.app.haosou.com/index/getData?type=1&page='+ this.page,(data)=>{
        //     console.log(data);
        //     if(this.page === 1){
        //         console.log("重新加载");
        //         this.setState({
        //             data:data.list
        //         })
        //     }else{
        //         console.log("加载更多");
        //         this.setState({
        //             //加载更多，这个变量不刷新
        //             isLoadMore:false,
        //             data:this.state.data.concat(data.list)
        //         })
        //     }
        // })
        let customKey = null;
        customKey = Toast.show({
            text: '正在加载...',
            icon: <ActivityIndicator size='large' />,
            position: 'top',
            duration: 1000000,
        });
        let formData = new FormData();
        formData.append("page",this.page);
        formData.append("status",this.state.status);
        formData.append("type",this.state.type);
        formData.append("sessionid",global.user.userData.sessionid);
        
        Request.postForm('http://test.dingwei.cn/huoxing/consumer/app/product/getOrderList',formData,(data)=>{
            console.log(data);
            if(this.page === 1){
                console.log("重新加载");
                this.setState({
                    data:data.data
                })
                Toast.hide(customKey);
                customKey=null;
            }else{
                if(data.status==1&&data.data.length==0){
                    console.log("进没得下一页的方法了");
                    isLoadMore:true,
                    this.setState({showFoot:1});
                }else{
                    console.log("加载更多");
                    this.setState({
                        //加载更多，这个变量不刷新
                        isLoadMore:false,
                        data:this.state.data.concat(data.data)//concat返回的是一个新数组，而不是和xx合并
                        //data:this.state.data.concat(['r1','r2','r3']),
                    })
                }
                Toast.hide(customKey);
                customKey=null;
            }
        });
    }
    //下拉刷新
    _onRefresh=()=>{
        // 不处于 下拉刷新
        if(!this.state.isRefresh){
            this.page=1;
            this._getList();
        }
    }
    //加载更多
    _onLoadMore=()=>{
        //不处于正在加载更多 && 有下拉刷新过，因为没数据的时候，会触发加载更多
        if(!this.state.isLoadMore && this.state.data.length>0){
            this.page = this.page+1;
            this._getList();
        }
    }
    //item点击事件
    _onItemClick=(item)=>{
        console.log(`page ${this.page} = 店铺id ${item.id}`)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headView:{
        width:SCREEN_WIDTH,
        height:100,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    itemImages:{
        width:80,
        height:80,
        resizeMode:'cover',
        backgroundColor:'#000',
        borderWidth:1,
        borderColor:'#000'
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
})