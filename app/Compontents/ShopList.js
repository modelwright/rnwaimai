//接口返回总页数的list

import React, {Component} from "react";
import {
    ActivityIndicator,
    FlatList, 
    StyleSheet, 
    Text, 
    View
} from "react-native";

import Request from '../Common/Request';

// const REQUEST_URL = 'https://api.github.com/search/repositories?q=javascript&sort=stars&page=';
let pageNo = 1;//当前第几页
let totalPage=5;//总的页数
export default class ShopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing:false,//下拉控制
            type:1, //默认类型
            status:0,//
            sessionid:'d5bc217592983e71e492128dcbf98be9ffe70c2bfd80d902ac5d09f6ea3385ef45f0a9052434fcb079da2f051fcf9628b6de7d1cd93a3877e49412a680818366Z4J8RJBc2AFOgXXQnnSfSsXDLpJY2g7Evj0WHxGUrLJA0ZEXFNolbiLQhWV8oIWMONYyZC4m+Sc=',
            itemNo:0//item的个数
        }
    }

    //网络请求——获取第pageNo页数据
    fetchData(pageNo) {
        let formData = new FormData();
        formData.append("page",pageNo);
        formData.append("type",this.state.type);
        formData.append("status",this.state.status);
        formData.append("sessionid",this.state.sessionid);

        Request.postForm('http://test.dingwei.cn/huoxing/consumer/app/product/getOrderList',formData,(data)=>{
            console.log(data);
            if (data) {
                let results = data.data;
                let dataBlob = [];
                let i = this.state.itemNo;

                results.map(function (item) {
                    dataBlob.push({
                        key: i,
                        value: item,
                    })
                    i++;//单个
                });
                itemNo = i;//每页几个
                console.log("itemNo:"+itemNo);
                let foot = 0;
                if(pageNo>=totalPage){
                    foot = 1;//listView底部显示没有更多数据了
                }

                this.setState({
                    //复制数据源
                    dataArray:this.state.dataArray.concat(dataBlob),
                    isLoading: false,
                    showFoot:foot,
                    isRefreshing:false,
                });
                data = null;
                dataBlob = null;
            }
        },(error)=>{
            console.log(error);
        })
    }

    componentDidMount() {
        //请求数据
        this.fetchData( pageNo );
    }

    //加载等待页
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    color='red'
                    size="large"
                />
            </View>
        );
    }

    //加载失败view
    renderErrorView() {
        return (
            <View style={styles.container}>
                <Text>
                    Fail
                </Text>
            </View>
        );
    }

    //返回itemView
    _renderItemView({item}) {
        return (
            <View>
                <Text style={styles.title}>name: {item.value.name}</Text>
                <Text style={styles.content}>stars: {item.value.stargazers_count}</Text>
                <Text style={styles.content}>description: {item.value.description}</Text>
            </View>
        );
    }

    renderData() {
        return (

            <FlatList
                data={this.state.dataArray}
                renderItem={this._renderItemView}
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.5}
                ItemSeparatorComponent={this._separator}
            />

        );
    }

    render() {
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView();
        }
        //加载数据
        return this.renderData();
    }
    _separator(){
        return <View style={{height:1,backgroundColor:'#999999'}}/>;
    }
    _renderFooter(){
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
                    <Text>正在加载更多数据...</Text>
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

    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((pageNo!=1) && (pageNo>=totalPage)){
            return;
        } else {
            pageNo++;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据
        this.fetchData( pageNo );
    }
}

const styles = StyleSheet.create({
    
});