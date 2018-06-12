/**
 * Created by Rabbit on 2017/4/21.
 */
'use strict';
// import RNFetchBlob from 'react-native-fetch-blob';
/**
 *  import Request from 'xx/xx/Request';
 *
 * @param Get请求
 *  Request.get(url,(data)=>{
 *      console.log(data);
 *  },(error)=>{
 *      console.log(error);
 *  })
 *
 * @param Post请求
 *  let body = {
 *      xxx: xxx,
 *  }
 *  Request.post(url,body,(data)=>{
 *      console.log(data);
 *  },(error)=>{
 *      console.log(error);
 *  })
 *
 * @param 上传
 *  let body = [{
 *      name:'token',data:token,
 *  }, {
 *      name:'key', data:key,
 *  },{
 *      name: 'file',
 *      filename: key || 'file',
 *      data: RNFetchBlob.wrap(PATH)
 *  }];
 *  Request.upload(url,body,(perent)=>{
 *      // 进度条
 *      console.log(perent);
 *  },(data)=>{
 *      console.log(data);
 *  },(error)=>{
 *      console.log(error);
 *  })
 *
 * @param 取消网络请求
 *  let *Request = Request.get(url,(data)=>{
 *      console.log(data);
 *  })
 *
 *  // 取消某个网络请求
 *  Request.cancel();
 *
 * */

const  Request = {
    /*
     *  get请求
     *  url:请求地址
     *  params:参数
     *  callback:回调函数
     * */
    get:(url, successCallBack, failCallBack) =>{
        // console.log(url);
        fetch(url,{
            method: 'GET',
        })
        .then((response) => {
            if (response.status === 200){
                return response.json();
            }else {
                return failCallBack(response.json());
            }
        })
        .then((response)=>{
            // console.log(response);
            successCallBack(response);
        })
        .catch((error)=>{
            // console.log(error);
            failCallBack(error);
        })
    },
    /**
     * @param url               请求网址
     * @param body              要上传的参数
     * @param successCallBack   返回正确的值
     * @param failCallBack      返回错误的值
     * @returns {Promise.<U>|Promise.<T>}
     */
    /*
     *  post请求
     *  url:请求地址
     *  params:参数,这里的参数格式是：{param1: 'value1',param2: 'value2'}
     *  callback:回调函数
     * */
    postJson:(url,params,successCallBack,failCallBack)=>{
        //fetch请求
        fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
        　　　　 'Content-Type': 'application/json',
            },
            body:JSON.stringify(params)
        })
        .then((response) => {
            if (response.status === 200){
                return response.json();
            }else {
                return failCallBack(response.json());
            }
        })
        .then((response)=>{
            // console.log(response);
            successCallBack(response);
        })
        .catch((error)=>{
            // console.log(error);
            failCallBack(error);
        })
    },
    /*
     *  post请求
     *  url:请求地址
     *  params:参数,这里的参数要用这种格式：'key1=value1&key2=value2'
     *  callback:回调函数
     * */
    postForm:(url,params,successCallBack,failCallBack)=>{
        //fetch请求
        fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        })
        .then((response) => {
            if (response.status === 200){
                return response.json();
            }else {
                return failCallBack(response.json());
            }
        })
        .then((response)=>{
            // console.log(response);
            successCallBack(response);
        })
        .catch((error)=>{
            // console.log(error);
            failCallBack(error);
        })
    },
    /**
     * @param url               请求网址
     * @param body              要上传的信息,会自动转码
     * @param uploadProgress    上传进度
     * @param successCallBack   返回正确的值
     * @param failCallBack      返回错误的值
     * @returns
     */
    upload:(url,body,uploadProgress,successCallBack,failCallBack) => {
        return RNFetchBlob
            .config(Request.UpLoadConfig)
            .fetch('POST',url,{
            'Content-Type' : 'multipart/form-data',
        },body)
            .uploadProgress((written, total) => {
                // 搜索进度打印
                // console.log('搜索进度:'+written / total);
            })
            .progress((received, total) => {
                let perent = received / total;
                // console.log('上传进度:' + perent);
                uploadProgress(perent);
            })
            .then((response)=>{
                if (response.respInfo.status === 200){
                    return response.json();
                }else {
                    return failCallBack(response);
                }
            })
            .then((response)=> {
                // console.log(response);
                successCallBack(response);
            })
            .catch((error)=>{
                failCallBack(error);
            });
    }
};



module.exports = Request;
