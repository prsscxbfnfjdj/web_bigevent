$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 获取form对象
    var form = layui.form
        // 通过form.verify自定义校验对象
    var layer = layui.layer
    form.verify({
            //自定义了pwd的校验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
            ],
            // 校验两次密码是否一致
            repwd: function(value) {
                //  value是确认密码的值
                // 获取密码里的值
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }
        })
        // 注册表单提交的事件
    $('#form_reg').on('submit', function(e) {
            // 1.阻止表单默认行为
            e.preventDefault()
                // 2.发起post请求
            var data = {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()

            }

            console.log(data)
            $.post('api/reguser', data,
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('注册成功,请登录!')
                        // 模拟点击事件
                    $('#link_login').click()
                })
        })
        //登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 1.阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: 'api/login',
            method: 'post',
            //获取表单的数据
            data: $(this).serialize(),

            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = './index.html'

            }
        })
    })
})