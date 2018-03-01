// anorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initial:[],
    item:[],
    total:0,
    comment:false,
    tocomment:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var conid=options.conid
    var orderid=options.orderid
    var total=options.total
    var currentTab=options.currentTab
    console.log(currentTab)
    if (currentTab == 3) {
      console.log(true)
      that.setData({
        comment: true
      })
    }
   console.log(total)
    wx.request({
      url: 'http://localhost/think/index.php/Consignee/select',
      data:{
        "conid":conid
      },
      method:'get',
      success:function(info){
        that.setData({
          item:info.data[0]
        })
      }
    })
    wx.request({
      url: 'http://localhost/think/index.php/Order/products',
      data:{
        "orderid":orderid
      },
      method:'get',
      success:function(info){
        that.setData({
          initial:info.data,
          total:total
        })
      }
    })
    
  },

 tocomment:function(){
    var that=this
    that.setData({
      iscomment:true
    })
 /*  wx.navigateTo({
     url: 'tocomment?productid='+this.data.initial[0].productid,
   })*/
 },
 cancel:function(){
   var that=this
   that.setData({
     iscomment:false
   })
 },
 toedit:function(e){
   var productid=e.currentTarget.dataset.productid
   wx.navigateTo({
     url: 'tocomment?productid='+productid,
   })
 }
})