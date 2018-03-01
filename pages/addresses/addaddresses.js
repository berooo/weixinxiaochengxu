// addaddresses.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add:true,
    item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var method = options.method
    if (method == "modify") {
      that.setData({
        add: false
      })
      wx.getStorage({
        key: 'editdata',
        success: function (res) {
          that.setData({
            item: res.data
          })
        },
      })
    } else {
      that.setData({
        add: true
      })

    }
  },

  onShow: function (options) {
    
   
  },
  formSubmit:function(e){
    var warn="";
    var flag=false;
    console.log(e)
    if (e.detail.value.username == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.telephone == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.telephone))) {
      warn = "手机号格式不正确";  
    }else{
      flag=true;
      console.log(e)
      if(this.data.add){
        wx.request({
          url: 'http://localhost/think/index.php/Consignee',
          data: {
            name: e.detail.value.username,
            address: e.detail.value.address,
            tel: e.detail.value.telephone
          },
          method: 'get',
          success: function (info) {
            console.log(info.data)
            
          }
        })
      }else{
        wx.request({
          url: 'http://localhost/think/index.php/Consignee/update',
          data: {
            id:this.data.item.conid,
            name: e.detail.value.username,
            address: e.detail.value.address,
            tel: e.detail.value.telephone
          },
          method: 'get',
          success: function (info) {
            console.log(info.data)
          }
        })
      }
     wx.navigateBack({})
    }
    if(flag==false){
      wx.showToast({
        title: warn
      })
    }
  }
})