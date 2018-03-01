// regist.js
var app=getApp()
var check=require("../../utils/check.js")
var webUtils=require("../../utils/registerWebUtil.js")
var phoneNum=null,identifyCode=null
Page({
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    step_g:1
    var that=this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth:res.windowWidth,
          windowHeight:res.windowHeight,
          nextButtonWidth:res.windowWidth-20
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },
  getnum:function(){
    wx.request({
      url: 'http://localhost/think/index.php/PhoneCheck',
      data: {
        "mobile": phoneNum
      },
      method: 'get',
      success: function (info) {
        console.log(info);
        wx.showToast({
          title: '验证码已发送~',
        });
      }
    })
  },
  quick_login_phone:function(){
    var that=this
     wx.request({
    url: 'http://localhost/think/index.php/PhoneCheck/check',
    data:{
      "code":identifyCode,
      "mobile":phoneNum
    },
    method:'get',
    success:function(info){
      console.log(info);
      if(info.data=="registed"){
        wx.showToast({
          title: '该手机号已注册~请重新绑定！',
        })
      } else {
        wx.showToast({
          title: '手机号绑定成功！',
        })
        app.registed = true
        wx.setStorage({
          key: 'mobile',
          data: phoneNum,
          success: function () {
            wx.reLaunch({
              url: '../me/me',
            })
          }
        })} 
    }
  })
  },
 getPhoneNum:function(e){
      phoneNum=e.detail.value
    },
  inputNum:function(e){
      identifyCode=e.detail.value
    },
    input_password:function(e){
      password=e.detail.value
    },
    input_rePassword:function(e){
      rePassword=e.detail.value
    }
})



