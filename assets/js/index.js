$(function() {
        geUserInfo()
            // 退出的功能
        var layer = layui.layer;
        $("#btn_ogout").on('click', function() {
            // 提示是否退出
            layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function(index) {
                //清除本地的token
                localStorage.removeItem('token')
                    // 重新跳转到登录界面
                location.href = './login.html'
                layer.close(index);
            });
        })
    })
    // 获取用户的信息
function geUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户头像
            renderAvatar(res.data)
        },
        // // 成功和失败都会调用
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //             // 强制跳转到登录页
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    // 1获取用户名称
    var name = user.nickname || user.username
        //2欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', 'user.user_pic').show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}