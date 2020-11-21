$(function() {
    //getuserinfo 获取用户基本信息
    getuserinfo()
    //退出功能实现
    var layer = layui.layer
    $("#out").on("click",function(){
        layer.confirm('是否退出', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          })
    })

})


function renderAvatar(res){
    let name = res.nickname||res.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if(res.user_pic==null){
        $(".layui-nav-img").hide()
        let wz = name[0].toUpperCase()
        $(".text-avatar").html(wz)
    }else{
        $(".layui-nav-img").attr('src',res.user_pic).show()
        $(".text-avatar").hide()
    }
    

}//渲染用户头像
function getuserinfo(){
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if(res.status!=0){
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },

    });
}   

