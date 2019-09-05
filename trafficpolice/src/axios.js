import axios from "axios";
import { Loading, Message } from "element-ui";

// 使用 Element-ui 添加网络请求动画方法
let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "网络请求中, 请等待",
    background: "rgba(0,0,0,0.5)"
  });
}
function closeLoading() {
  loading.close();
}

// 发出请求时, 对数据进行拦截
axios.interceptors.request.use(
  config => {
    let strArr = config.url.split('?')

    if(strArr[0] != 'https://restapi.amap.com/v3/traffic/status/road'){
      startLoading();
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 获取请求数据时, 对数据进行拦截
axios.interceptors.response.use(
  response => {
    let strArr = response.config.url.split('?')
    if(strArr[0] != 'https://restapi.amap.com/v3/traffic/status/road'){
      closeLoading();
      Message.success("网络请求成功");
    }
    return response;
  },
  error => {
    closeLoading();
    Message.error("网络请求失败");
    return Promise.reject(error);
  }
);

export default axios;
