// orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  initial:[],
  totalMoney:0,
  hasaddress:false,
  item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'orderdata',
      success: function(res) {
        console.log(res.data)
        var total = 0;
        for (var i in res.data) {
          var product = res.data[i]
          var shipprice=parseInt(product.shippingprice)
          total = total + product.price * product.num + shipprice
        }
        that.setData({
          initial: res.data,
          totalMoney: total
        })
      
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    wx.getStorage({
      key: 'selectdata',
      success: function(res) {
        console.log(res.data)
        
        that.setData({
          item: res.data,
          hasaddress:true
        })
      },
    })
  },

 tobuy:function(){
    var that=this
    
    var products = JSON.stringify(that.data.initial);
    wx.getStorage({
      key: 'userid',
      success: function(res) {
    
        wx.request({
          url: 'http://localhost/think/index.php/Order',
          data: {
            "products": products ,
            "userid":res.data,
            "conid":that.data.item.conid,
            "price":that.data.totalMoney,
          },
          method:'get',
          success:function(info){
         console.log(info.data)
          if(info.data=="success"){
            wx.showToast({
              title: '提交成功',
            })
          }
          }
        })
      },
    })
 }
})