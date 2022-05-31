// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  console.log(options.url);
  options.url = "http://www.liulongbin.top:3007" + options.url;
  // 统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }
  options.complete = function (res) {
    // console.log('complete回调');
    console.log(res);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 强制清空 token
      localStorage.removeItem("token");
      // 强制跳转到登录页面
      location.href = "/login.html";
    }
  };
});
