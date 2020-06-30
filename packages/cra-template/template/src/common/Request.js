import 'whatwg-fetch';

// 通用请求
function request(url, options) {
  let optionsDefault = {
    credentials: 'same-origin',
  };
  // 合并参数
  let optionsCombine = optionsDefault;
  if (options) {
    optionsCombine = Object.assign(optionsCombine, options);
  }

  // 增加通用参数
  // let client =  CommonStorage.get(CommonStorage.CURR_CLIENT_KEY);
  // let locale = Cookies.getCookie("portal3_locale")==null?"zh_CN":Cookies.getCookie("portal3_locale");
  // if(url.indexOf("?")!=-1){
  //     if(url.lastIndexOf("&")===url.length-1){//以&结尾
  //         url+="locale="+locale;
  //     }else{
  //         url+="&locale="+locale;
  //     }
  // }else{
  //     url+="?locale="+locale;
  // }
  // if(client!==null&&typeof(client["user_id"])!=="undefined"){
  //     url+="&cloud_curr_client_id="+client["user_id"];
  // }
  // 请求
  let request = fetch(url, optionsCombine).then(handleResponse);
  console.log(request);

  return request;
}
// GET
function get(url) {
  return request(url, { method: 'GET' });
}

function handleResponse(response) {
  let contentType = response.headers.get('content-type');
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response);
  } else if (contentType.includes('text/html')) {
    return response.text();
  } else {
    // Other response types as necessary. I haven't found a need for them yet though.
    throw new Error(`Sorry, content-type ${contentType} not supported`);
  }
}

// 处理 json 响应结果
function handleJSONResponse(response) {
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return response.json().then(function(body) {
      //登录过期的情况
      if (
        body['error_code'] === '200102' &&
        body['msg'] === 'COMMON_PERMISSION_NO_LOGIN'
      ) {
        let currUrl = window.location.href;
        console.log(currUrl);
        window.location.href =
          'https://sso-devtest.chinacache.com/queryByCookie?clientName=secure-portal-local&accessURL=' +
          encodeURI(currUrl);
      }
      return body;
    });
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
export default request;
export { request, get };
