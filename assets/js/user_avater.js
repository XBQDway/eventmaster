$(function(){
    let layer = layui.layer
    var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
  $('#btnFile').on('click',function(){
      $("#file_1").click()
  })

  $("#file_1").on('change',function(e){
      let filesa = e.target.files
      if(filesa.length == 0){
          return layer.msg('请上传图片')
      }
      var file = e.target.files[0]
      var newImgURL = URL.createObjectURL(file)
      $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
     
  })

  $('#btnSc').on('click',function(){
    var dataURL = $image      
    .cropper('getCroppedCanvas', {
         // 创建一个 Canvas 画布      
         width: 100,    
         height: 100      
        })     
         .toDataURL('image/png')     
           // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

         $.ajax({
             type: "POST",
             url: "/my/update/avatar",
             data: {avatar:dataURL},
             success: function (res) {
                 if(res.status!=0){
                     return layer.msg('图片上传失败')
                 }
                window.parent.getuserinfo()
             }
         });
  })
  

})