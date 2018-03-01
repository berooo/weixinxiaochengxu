// tocomment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var productid=options.productid
    that.setData({
      productid:productid
    })
  },

  formSubmit: function (e) {
    var that=this
    var input=e.detail.value.input
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.request({
          url: 'http://localhost/think/index.php/Comment/insertrecord',
          data:{
            'userid':res.data,
            'productid':that.data.productid,
            'comment':input
          },
          method:'get',
          success:function(info){
            if(info.data=='success'){
              wx.showToast({
                title: '评论成功！',
              })
            }
          }
        })
      },
    })
  }
})