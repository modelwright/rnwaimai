//接口返回总页码的list
import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Image,
    AsyncStorage
} from 'react-native';
import Request from '../Common/Request';

// const url = 'http://edu.shikaotong.com/teacher/course/course_data';
const url = 'http://test.dingwei.cn/huoxing/consumer/app/product/getOrderList';
let pageNo = 1;//当前第几页
let itemNo=0;//item的个数

export default class ShopList extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,//loading状态是否显示
            data:[],//默认数据
            error: false,//网络请求状态
            errorInfo: "",
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing:false,//refreshing: false,//当前的刷新状态
            totalPage:5,//总的页数
            type:1, //默认类型
            status:0,//
            sessionid:'d5bc217592983e71e492128dcbf98be9ffe70c2bfd80d902ac5d09f6ea3385ef45f0a9052434fcb079da2f051fcf9628b6de7d1cd93a3877e49412a680818366Z4J8RJBc2AFOgXXQnnSfSsXDLpJY2g7Evj0WHxGUrLJA0ZEXFNolbiLQhWV8oIWMONYyZC4m+Sc=',
        }
    }
    componentDidMount() {
        //请求数据
        this.fetchDate(pageNo);
    }
    //获取第pageNo页的数据
    fetchDate(pageNo){
        let formData = new FormData();
        formData.append("page",pageNo);
        formData.append("type",this.state.type);
        formData.append("status",this.state.status);
        formData.append("sessionid",this.state.sessionid);

        Request.postForm(url,formData,(data)=>{
            let results = data.data;//存请求的数据
            let dataBlob = [];//存数据的临时变量
            let i = itemNo;//一页几个

            results.map(function(item){
                dataBlob.push({
                    key:i,
                    value:item,
                })
                i++;//单个增加
            });
            itemNo = i;//增加之后的item放进要显示的item
            console.log("itemNo:"+itemNo);
            let foot = 0;//0：隐藏footer
            if(pageNo>=this.state.totalPage){
                foot = 1;//1:已加载完成,没有更多数据
            }
            this.setState({
                data:this.state.data.concat(dataBlob),//临时数据赋值给状态
                isLoading:false,//不显示圆圈
                showFoot:foot,
                isRefreshing:false,
                totalPage:1,
            });
            results = null;//清空请求的数据
            dataBlob = null;//晴空临时的数据
            console.log(this.state.totalPage);
        },(error)=>{
            this.setState({
                error: true,
                errorInfo: error
            })
            console.log(error);
        })
    }
    //返回itemView
    _renderItemView({item}) {
        return (
            <View style={{alignItems:'center',justifyContent:'flex-start',flexDirection:'row',marginVertical:10,paddingHorizontal:15,}}>
                <Image style={{width:60,height:60,marginRight:10,borderWidth:1,borderColor:'#e6e6e6'}} source={{uri:item.value.portrait}}/>
                <View style={{flex:1,}}>
                    <Text style={styles.title}>{item.value.shop_name}</Text>
                    <Text style={styles.content}>{item.value.addtime}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.content}>{item.value.title}</Text>
                        <Text>¥{item.value.reality_amount}</Text>
                    </View>
                </View>
            </View>
        );
    }
    //加载等待页面
    render(){
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator
                        animating={true}
                        color='red'
                        size="large"
                    />
                </View>
            )
        } else if (this.state.error) {
            //请求失败view
            return (
                <View style={styles.container}>
                    <Text>
                        请求失败了
                    </Text>
                </View>
            )
        }
        //加载数据
        return (
            <FlatList
                data={this.state.data}
                //item显示的布局
                renderItem={this._renderItemView}
                //头部组件
                //ListHeaderComponent={this._renderHeader}
                //尾部组件
                ListFooterComponent={this._renderFooter.bind(this)}
                //上拉加载
                onEndReached={this._onLoadMore.bind(this)}
                onEndReachedThreshold={0.1}
                //行与行之间的分隔线组件
                ItemSeparatorComponent={this._separator}
                //Key加了不报错
                keyExtractor={(item, index) => index.toString()}
                // 空布局
                ListEmptyComponent={this._Empty}//列表为空时
                //下拉刷新相关
                onRefresh={()=>this._onRefresh()}
                refreshing={this.state.isRefreshing}
            />
        )
    }
    _separator(){
        return <View style={{height:1,backgroundColor:'#f1f1f1',width:SCREEN_WIDTH-30,marginHorizontal:15,}}/>;
    }
    _Empty(){
        return <View><Text>暂无数据</Text></View>
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
    _onLoadMore(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((pageNo!=1) && (pageNo>=this.state.totalPage)){
            return;
        } else {
            pageNo++;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据
        this.fetchDate(pageNo);
    }
    //下拉刷新
    _onRefresh=()=>{
        // 不处于 下拉刷新
        if(!this.state.isRefreshing){
            pageNo = 1;
            this.fetchDate(pageNo);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 14,
        color: '#333',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    content: {
        fontSize: 12,
        color: '#999',
    }
});