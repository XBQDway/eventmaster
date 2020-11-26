$(function(){

    let form = layui.form
    var laypage = layui.laypage;
    template.defaults.imports.dataFormat=function(data){
        const dt = new Date(data)
        var y = dt.getFullYear()
        var m = buling(dt.getMonth()+1)
        var d = buling(dt.getDate())
        var hh = buling(dt.getHours())
        var mm = buling(dt.getMinutes())
        var ss = buling(dt.getSeconds())
        return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss 
    }
    function buling(s){
        return s>9?s:"0"+s
    }

    let layer = layui.layer
    let q ={
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }
    initTable()
    initcate()
    function initTable(){
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if(res.status!=0){
                    return layer.msg('请求失败')
                }
                let htrtem = template('temp-1',res)
                $("tbody").html(htrtem)
                renderPage(res.total)
            }
        });

    }    
   
    function initcate(){
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                console.log(res);
                if(res.status!=0){
                    return layui.layer.msg('获取分类失败')
                }
                let htrxia = template('xiala',res)
                $('#xiala_1').html(htrxia)
                form.render()//从新渲染表单区域
            }
        });
    }
    $('#shaixuan').on('submit',function(e){
        e.preventDefault()
        q.cate_id =  $('[name="cate_id"]').val()
        q.state = $('[name="state"]').val()
        initTable()
    })


    function renderPage(total){
        laypage.render({
            elem:'pageBox',
            count: total,
            limit: q.pagesize,
            limits: [2, 3, 5, 10],
            curr: q.pagenum,
            layout:['count','limit','prev', 'page', 'next','skip '],
            jump: function(obj ,first){
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if(!first){
                    initTable()
                }    
            }
           
        })
       
    }

    $('tbody').on('click','.del_1',function(){
        let vtn = $('.del_1').length
        let id = $(this).attr('data-id')
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type: "GET",
                url: "/my/article/delete/"+ id,
                success: function (res) {
                    if(res.status!=0){
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if(vtn == 1){
                        q.pagenum = q.pagenum==1?1:q.pagenum-1
                        initTable()
                    }
                }
            });
            
            layer.close(index);
            initTable()
          });
    })
})