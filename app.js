//app.js
App({
  onLaunch: function() {
   var that=this;
  wx.clearStorageSync();
   if(wx.getStorageSync('session3rd')){
      wx.checkSession({
        success:function(){
          var a = wx.getStorageSync('session3rd');
          console.log('登录态存在');
          console.log(a);
         that.getUserInfo();
        },
        fail:function(){
         that.Login();
        }
      });
    }else{
      wx.authorize({
        scope: 'scope.userInfo',
        success(){
          that.Login();
          that.getUserInfo();
        }
      })
    }
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        },
        fail: function () {
          // 调用微信弹窗接口
          wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法正常使用******的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      })
    }
  },
  
  Login:function(e){
    var that=this
    wx.login({
      success:function(res){
        var code=res.code
        wx.getUserInfo({
          success:function(){
            wx.request({
              url: 'http://localhost/think/index.php/Login',
              data:{
                "code":code
              },
              method:'GET',
              success:function(info){
                console.log(info);
                wx.setStorageSync('session3rd', info.data);
              }
            })
          }
        })
      }
    })
  },
  CheckExist:function(){
    wx.request({
      url: 'http://localhost/think/index.php/Login',
      data:{
        name:this.globalData.userInfo.nickName
      },
      method:'get',
      success:function(info){
          
      }
    })
  },
  globalData: {
    userInfo: null,
    registed:false,
    posted:false,
    productid:''
  }
})
