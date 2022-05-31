$(function () {
  let form = layui.form;
  let layer = layui.layer;
  form.verify({
    nickname: function (val) {
      if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
    },
  });

  // 获取用户信息
  const initUserInfo = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        // console.log(res);
        if (res.status !== 0) return layer.msg("获取用户信息失败");
        console.log(res);
        // 调用 form.val() 方法为表单赋值
        form.val("formUserInfo", res.data);
      },
    });
  };

  //调用获取用户基本信息
  initUserInfo();
  // 重置表单数据
 $("#btnReset").click((e) => {
    e.preventDefault();
    initUserInfo()
});

  //   监听表单提交事件
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(".layui-form").serialize(),
      success: (res) => {
        console.log(res);
        if (res.status!==0) return layer.msg('更新用户信息失败')
        layer.msg('更新用户信息成功')
         // 调用父页面渲染函数
         window.parent.getUserInfo()
      },
    });
  });
});
