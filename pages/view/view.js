// view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.request({
          url: 'http://localhost/think/index.php/ViewInsert/display',
          data:{
            'userid':res.data
          },
          method:'get',
          success: function (info) {
            console.info(info.data)
            that.setData({
              product_list: info.data,
            })
          }
        })
      },
    })
    
  }
})