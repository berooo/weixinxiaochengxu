// comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      commentlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var productid=options.id
    var that=this
    wx.request({
      url: 'http://localhost/think/index.php/Comment/display',
      data:{
        'productid':productid
      },
      method:'get',
      success:function(info){
        that.setData({
          commentlist:info.data
        })
      }
    })
  },
})