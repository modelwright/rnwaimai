import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    PointPropType,
    ViewPropTypes,
} from 'react-native';

export default class MenuButton extends Component {
    constructor(props) {  
        super(props);  
        clickButtonCallback: null;
        // this._onClick = this._onClick.bind(this);  // 需要在回调函数中使用this,必须使用bind(this)来绑定  
    }
    // static propTypes = {  
    //     // renderIcon: PropTypes.number.isRequired,  // 图片,加入.isRequired即为比填项  
    //     renderIcon:ViewPropTypes.string,
    //     showText: ViewPropTypes.string,  // 显示标题\文字  
    //     tag: ViewPropTypes.string,  // Tag  
    //     onClick: ViewPropTypes.func  // 回调函数  
    // };
    clickButton() {
        if (this.props.clickButtonCallback == null) return;

        this.props.clickButtonCallback(this.props.showText);
    }
    render(){
        return(
            <TouchableOpacity onPress={() => {this.clickButton()}}>
                <View style={[styles.iconbox,this.props.style]}>
                    <Image style={styles.iconImg} source={{uri:this.props.renderIcon}}/>
                    <Text>{this.props.showText}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    iconbox:{
        alignItems:'center'
    },
    iconImg:{
        width:30,
        height:30,
        marginBottom:5,
    },
    showText:{
        fontSize:8,
    }
})