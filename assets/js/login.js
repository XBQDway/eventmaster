$(function(){

    $("#link-t").on("click",function(){
        $(".login_one").hide()
        $(".login_two").show()
    })

    $("#link-o").on("click",function(){
        $(".login_two").hide()
        $(".login_one").show()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,"密码必须6到12位，且不能出现空格"],
        repwd:function(value){
            var pwd = $("#agein").val()
            if(value!=pwd){
                return '两次输入的密码不一致!'
            }
        }
    })


    //监听 form表单的提交时间
    $("#form_o").on("submit",function(e){
        e.preventDefault()
        $.post("/api/reguser",{
            username:$('#form_o [name=username]').val(),
            password:$('#form_o [name=password]').val()

    },
           function (res) {
               if(res.status==1){
                   return layer.msg(res.message)
               }
               layer.msg('注册成功!')
               $("#link-o").click()
           },
       );
    })

    
    $("#form_t").submit(function(e){
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if(res.status==1){
                    return layer.msg(res.message)
                }
                localStorage.setItem('token',res.token)
                 layer.msg(res.message)
                location.href = '/index.html'
            }
        });
        
    })
   

}) 