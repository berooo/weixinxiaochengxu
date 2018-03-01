// me.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    that.setData({
      userInfo:app.globalData.userInfo,
    });
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        if(res.data==""){

        }else{
          getApp().registed=true
        }
      },
    })

    /** 
    */
  },

  toOrders:function(e){
    var re = getApp().registed
    var method=e.currentTarget.dataset.method
    console.log(method)

    if (!re) {
      wx.showModal({
        title: '提示',
        content: '还没绑定手机号哦',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../regist/regist',
            })
          } else {
            wx.switchTab({
              url: '../me/me',
            })
          }
        },
      })
    }else{
      wx.navigateTo({
        url: 'orders?method='+method,
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var re=getApp().registed
    var posted=getApp().posted
      if (!re) {
      wx.showModal({
        title: '提示',
        content: '先绑定手机号才能出现功能哦',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../regist/regist',
            })
          }else{
            wx.switchTab({
              url: '../me/me',
            })
          }
        },
      })
    }else{
      if(!posted){
        var tel=wx.getStorage({
          key: 'mobile',
          success: function(res) {
            wx.request({
              url: 'http://localhost/think/index.php/Login/insertUserInfo',
              data: {
                username: app.globalData.userInfo.nickName,
                tel:res.data
              },
              method:'get',
              success:function(info){
                getApp().posted=true;
                  wx.setStorage({
                    key: 'userid',
                    data: info.data,
                  })
              }
            })
          },
        })
        
      }
    }
  },
  onShareAppMessage: function () {
    return {
      title: '买巴小程序',
      desc: '这是一个用于购买物品的微信小程序',
      path: 'pages/index/index'
    }  
  },
  toCollection:function(){
    var re = getApp().registed
    if (!re) {
      wx.showModal({
        title: '提示',
        content: '还没绑定手机号哦',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../regist/regist',
            })
          } else {
            wx.switchTab({
              url: '../me/me',
            })
          }
        },
      })
    } else {
      wx.navigateTo({
        url: '../collections/collections',
      })
    }
  },
  toViewing:function(){
    var re = getApp().registed
    if (!re) {
      wx.showModal({
        title: '提示',
        content: '还没绑定手机号哦',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../regist/regist',
            })
          } else {
            wx.switchTab({
              url: '../me/me',
            })
          }
        },
      })
    } else {
      wx.navigateTo({
        url: '../view/view',
      })
    }
  },
  toReceiving:function(){
    var re = getApp().registed
    if (!re) {
      wx.showModal({
        title: '提示',
        content: '还没绑定手机号哦',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../regist/regist',
            })
          } else {
            wx.switchTab({
              url: '../me/me',
            })
          }
        },
      })
    } else {
      wx.navigateTo({
        url: '../addresses/addresses',
      })
    }
  }
})