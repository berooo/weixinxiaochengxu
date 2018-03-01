//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    inputShowed:false,
    inputVal:'',
    petimageUrl:'../../Images/pet.png',
    homeimageUrl:'../../Images/house.png',
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495626232647&di=c7c53f96e0f48681471e4626eebe0181&imgtype=0&src=http%3A%2F%2Fwww.sanchiseo.com%2Fuploadfile%2F2015821%2F2015821115728937045.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495626316444&di=ff20f74da6031541a12e0eeadaf156b9&imgtype=0&src=http%3A%2F%2Fsem.g3img.com%2Fsite%2F34016275%2F20160216162430_82108.png',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495626359075&di=3297d75c3742024d15f553547495f3db&imgtype=0&src=http%3A%2F%2Fwww.17emarketing.com%2Fuploads%2Fallimg%2F160627%2F1-16062G54154.png',
    ],
    motto: 'Hello World',
    userInfo: {},
    product_list:[],
    searchResult:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  onLoad: function () {
    console.log('onLoad')
    var that=this
   
    wx.request({
      url: 'http://localhost/think/index.php/ProductRequst',
      data: {
        "recommend":true
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
  onPullDownRefresh:function(){
    this.onLoad()
  },
  onShareAppMessage:function(){
    return{
      title:'买巴小程序',
      desc:'这是一个用于购买物品的微信小程序',
      path:'pages/index/index'
    }
  },
  tonow: function (e) {
    let productData = {
      productid: e.currentTarget.dataset.productid,
      productname: e.currentTarget.dataset.productname,
      picture: e.currentTarget.dataset.picture,
      sales: e.currentTarget.dataset.sales,
      volumn: e.currentTarget.dataset.volumn,
      price: e.currentTarget.dataset.price,
      detail: e.currentTarget.dataset.detail,
      shippingprice: e.currentTarget.dataset.shippingprice
    }
    wx.setStorage({
      key: 'clickData',
      data: productData,
    })
  //  wx.setStorageSync('clickdata', productData)
    wx.navigateTo({
      url: '../product/product',
    })
  },
  inputTyping:function(e){
    let that=this
    setTimeout(
      function(){
        that.setData({
          inputVal: e.detail.value
        });
        wx.request({
          url: 'http://localhost/think/index.php/ProductRequst/search',
          data: {
            "keywords": e.detail.value
          },
          method: "get",
          success: function (res) {
            that.setData({
              searchResult: res.data
            })
          }
        })
      },2000
    )
    
  }
})
