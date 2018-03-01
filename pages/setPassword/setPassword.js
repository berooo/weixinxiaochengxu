// setPassword.js
var oldpassword=null
var newpassword=null
var repassword=null
Page({

  data: {
  
  },

  onLoad: function (options) {
  
  },
  onShow: function () {
  
  },
  getOldPass:function(e){
    oldpassword=e.detail.value
  },
  getNewPass:function(e){
    newpassword=e.detail.value
  },
  confirmNewPass:function(e){
    repassword=e.detail.value
  },
  tosubmit:function(){
    if(newpassword===repassword){
        wx.getStorage({
          key: 'userid',
          success: function(res) {
            wx.request({
              url: 'http://localhost/think/index.php/Login/setPassword',
              data:{
                "userid":res.data,
                "oldpassword":oldpassword,
                "newpassword":newpassword
              },
              method:'get',
              success:function(info){
                console.log(info);
                if(info.data=="error"){
                  wx.showToast({
                    title: '原密码错误！',
                  })
                }else{
                  wx.showToast({
                    title: '修改密码成功！',
                  })
                  wx.reLaunch({
                    url: '../me/me',
                  })
                }
              }
            })
          },
        })
    }else{
      wx.showToast({
        title: '两次密码输入不一致！',
      })
    }
  }
})