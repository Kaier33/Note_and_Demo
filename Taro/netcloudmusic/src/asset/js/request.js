// 没啥用了.
import Taro from '@tarojs/taro';


/**
 * @param {object}  option 
 * @param {string}  option.url 
 * @param {boolean} option.signature 
 * @description: opt这个对象主要传2个值, 如果是需要登录cookie的接口,多填一个参数 signature:true 即可
 */
function WxReq(option) {
  let parms = {};
  parms.url = option.url;
  if (option.signature) {
    parms.header = {
      'cookie': Taro.getStorageSync('cookie')
    }
  }
  return Taro.request(parms)
}


/**
 * @param {object} option
 * @param {string} option.url     地址
 * @param {string} option.method  方法
 * @param {object} option.data    post请求体
 * e.g:
 * TaroFetch({xxx})
    .then(data => console.log(data))
    .catch(error => console.error(error))
 * */

function Fetch(option) {
  let params = {};
  if (option.method && option.method.toLocaleLowerCase() == 'post') {
    params.body = JSON.stringify(option.data);
    params.headers = {
      'content-type': 'application/json'
    };
    params.method = 'POST';
  } else {
    params.method = 'GET';
  }
  params.credentials = 'include';
  return fetch(option.url, param)
    .then(response => response.json()) // parses response to JSON
}

export function TaroReq(option) {
  if (process.env.TARO_ENV === 'weapp') {
    WxReq(option)
  } else if (process.env.TARO_ENV === 'h5') {
    Fetch(option)
  }
}
