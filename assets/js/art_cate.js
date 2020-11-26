$(function(){
    let form = layui.form
    huoqu()
   function huoqu(){
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function (res) {
           let htr =  template('tpl_table',res)
           $('tbody').html(htr)
        }
    });
   }
   var indexAdd =null
    $("#tianjia").on('click',function(){
        
        indexAdd = layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类'
            ,content: $('#tanchu').html()
          });     
            
    })
    $('body').on('submit',"#form-add",function(e){
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status!=0){
                    return layui.layer.msg('请求失败')
                }
                huoqu()
                layui.layer.msg('请求成功')
                layui.layer.close(indexAdd)
            }
        });
    })

    let indexBanji = null
    $('tbody').on('click','#bianji',function(){
        indexBanji = layer.open({
            type:1,
            area:['500px','250px'],
            title: '修改文章分类'
            ,content: $('#bani').html()
          });  
             let dataId = $(this).attr('data-id') 
             $.ajax({
                 type: "GET",
                 url: "/my/article/cates/"+dataId,
                 success: function (res) {
                     form.val('form-1',res.data)
                 }
             });
    })

    $('body').on('submit','#form-1',function(e){
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status!=0){
                    return layui.layer.msg('更新数据失败')
                }
                layui.layer.msg('更新数据成功')
                layui.layer.close(indexBanji)
                huoqu()
            }
        });
    })

    $("tbody").on('click','#delSc',function(){
        let delId = $(this).attr('date-id')
        layer.confirm('是否删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/"+delId,
                success: function (res) {
                    console.log(res);
                    if(res.status!=0){
                        return layui.layer.msg('发生错误')
                    }
                    layui.layer.msg('删除成功')
                    layer.close(index);
                    huoqu()
                }
            }); 
          });
    })
})