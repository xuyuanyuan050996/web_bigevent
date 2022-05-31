// $(function () {
//   getUserInfo();
// });
// 在用户登录成功，进入后台页面后，我们应该立刻获取用户的信息，然后把对应的信息展示在页面上
//获取用户信息
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization:localStorage.getItem("token"),
    // },
    success: (res) => {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败！");
      }
      //   layer.msg("获取用户信息成功！");
      renderAvatar(res.data);
    },
    // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: function (res) {
    //   // console.log('complete回调');
    //   console.log(res);
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     localStorage.removeItem("token");
    //     location.href = "/login.html";
    //   }
    // },
  });
}

// 渲染用户头像
function renderAvatar(user) {
  // 获取用户名字
  let name = user.nickname || user.username;
  // 设置欢迎文本
  $("#welcome").html(`欢迎 ${name}`);
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    let firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName);
  }
}
//退出登录
let layer = layui.layer;
$("#btnLogout").on("click", function () {
  // console.log(111);
  //提示用户是否退出
  layer.confirm("确定退出登录？", { icon: 3, title: "提示" }, function (index) {
    //do something
    // console.log(222);
    // 清空本地存储里面的 token
    localStorage.removeItem("token");
    // 重新跳转到登录页面
    location.href = "/login.html";
    layer.close(index);
  });
});
getUserInfo();
