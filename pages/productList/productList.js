// productList.js
var app=getApp()
Page({

  data: {
    product_list:[],
    priceRangeFilterRange:['价格由高到低','价格由低到高'],   
    sortmethod:0,
    producttype:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var producttype=options.type
    console.log(producttype)
    wx.request({
      url: 'http://localhost/think/index.php/ProductRequst',
      data:{
        "type":producttype
      },
      method:"get",
      success:function(info){
        console.log(info.data)
        that.setData({
          product_list:info.data,
          producttype:producttype
        })
      }
    })
  },
  bindPriceRangeChange:function(e){
     var that=this
      if (e.detail.value==0){
        wx.request({
          url: 'http://localhost/think/index.php/ProductRequst',
          data: {
            "type": this.data.producttype,
            "sortmethod": 2
          },
          method: "get",
          success: function (info) {
            console.log(info.data)
            that.setData({
              product_list: info.data
            })
          }
        })
      }else{
        wx.request({
          url: 'http://localhost/think/index.php/ProductRequst',
          data: {
            "type": this.data.producttype,
            "sortmethod": 3
          },
          method: "get",
          success: function (info) {
            console.log(info.data)
            that.setData({
              product_list: info.data
            })
          }
        })
      }
  },
  todefault:function(){
    var that = this
    wx.request({
      url: 'http://localhost/think/index.php/ProductRequst',
      data: {
        "type": this.data.producttype,
        "sortmethod": 0
      },
      method: "get",
      success: function (info) {
        console.log(info.data)
        that.setData({
          product_list: info.data
        })
      }
    })
  },
  salesfirst:function(){
  var that=this
    wx.request({
      url: 'http://localhost/think/index.php/ProductRequst',
      data: {
        "type": this.data.producttype,
        "sortmethod": 1
      },
      method: "get",
      success: function (info) {
        console.log(info.data)
        that.setData({
          product_list: info.data
        })
      }
    })
  },
  newfirst:function(){
    wx.redirectTo({
      url: 'productList?sortmethod=4',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  tonow:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.productid)
      let productData={
        productid:e.currentTarget.dataset.productid,
        productname:e.currentTarget.dataset.productname,
        picture:e.currentTarget.dataset.picture,
        sales:e.currentTarget.dataset.sales,
        volumn:e.currentTarget.dataset.volumn,
        price:e.currentTarget.dataset.price,
        detail:e.currentTarget.dataset.detail,
        shippingprice:e.currentTarget.dataset.shippingprice
      }
      wx.setStorage({
        key: 'clickData',
        data: productData,
      })
      wx.navigateTo({
        url: '../product/product',
      })
  },
  onShow: function () {
  console.log(this.data.producttype);
  },
  newfirst:function(){
    var that = this
    wx.request({
      url: 'http://localhost/think/index.php/ProductRequst',
      data: {
        "type": this.data.producttype,
        "sortmethod": 4
      },
      method: "get",
      success: function (info) {
        console.log(info.data)
        that.setData({
          product_list: info.data
        })
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})