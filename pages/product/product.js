// product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,  
    minusStatus: 'disabled' ,
  isLike:false,
  showDialog:false,
  imgUrls:[],
  indicatorDots: true,  //是否显示面板指示点
  autoplay: true,  //是否自动切换
  interval: 3000,  //自动切换时间间隔,3s
  duration: 1000,  //  滑动动画时长1s
  productname:'',
  price:0,
  sales:0,
  volumn:0,
  detail:'',
  id:'',
  picture:'',
  shippingprice:0,
  isimme:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'clickData',
      success: function(res) {
        wx.request({
          url: 'http://localhost/think/index.php/ProductRequst/imgrequest',
          data: {
            "id": res.data.productid
          },
          method: "get",
          success: function (info) {
            that.setData({
              imgUrls: info.data
            })
          }
        })
        that.setData({
          productname: res.data.productname,
          price: res.data.price,
          sales: res.data.sales,
          volumn: res.data.volumn,
          detail: res.data.detail,
          shippingprice: res.data.shippingprice,
          id:res.data.productid,
          picture:res.data.picture
        })
      },
    })
  },
  onShow:function(){
    var that=this
    console.log(that.data.id)
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.request({
          url: 'http://localhost/think/index.php/ViewInsert',
          data:{
            'userid':res.data,
            'productid':that.data.id
          },
          method:'get',
          success:function(info){
            
            if(info.data=='success'){
              console.log('浏览记录添加成功！')
            }else{
            console.log('浏览记录更新成功！')
            }
          }
        })
      },
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  addLike:function(e) {
    
    var that=this
    that.setData({
      isLike: !this.data.isLike
    });
    if(that.data.isLike){
      console.log(that.data.id)
      wx.getStorage({
        key: 'userid',
        success: function (res) {
          wx.request({
            url: 'http://localhost/think/index.php/Collect',
            data:{
              'userid':res.data,
              'productid':that.data.id
            },
            method:'get',
            success:function(res){
              if(res.data=="success"){
                wx.showToast({
                  title: '收藏成功！',
                })
              }else{
                that.data.isLike = false
                wx.showToast({
                  title: '收藏失败！',
                })
              }
            }
          })
         },
         fail:function(){
           wx.showToast({
             title: '请先绑定手机哦',
             success:function(){
              that.data.isLike=false
               wx.redirectTo({
                 url: '../regist/regist',
               })
             }
           })
         }
      })
    }else{
      wx.getStorage({
        key: 'userid',
        success: function(res) {
          wx.request({
            url: 'http://localhost/think/index.php/Collect/remove',
            data:{
              'userid': res.data,
              'productid': that.data.id 
            },
            method:'get',
            success:function(res){
              if (res.data == "success") {
                wx.showToast({
                  title: '取消收藏成功！',
                })
              } else {
                that.data.isLike = true
                wx.showToast({
                  title: '取消收藏失败！',
                })
              }
            }
          })
        },
      })
    }
  },
  toCart:function(){
    wx.switchTab({
      url: '../shoppingCart/shoppingCart',
    })
  },
  toggleDialog:function(){
    this.setData({
      showDialog:true
    })
  },
  closeDialog:function(){
    this.setData({
      showDialog:false
    })
  },
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    var minusStatus = 'normal';
    if (num > 1) {
      num--;
    }else{
      minusStatus = 'disabled'
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
   
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },  
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1
    
    var minusStatus='normal';
    if(num<this.data.volumn){
      
      num++;
    }else{
      minusStatus='disabled'
    }
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  confirm:function(){
    if(this.data.isimme){
      
      var purchasedata={}
      purchasedata['productid']=this.data.id
      purchasedata['num']=this.data.num
      purchasedata['price']=this.data.price
      purchasedata['shippingprice'] = this.data.shippingprice
      purchasedata['name']=this.data.productname
      purchasedata['picture']=this.data.picture
      var orderdata=[]
      orderdata.push(purchasedata)
      wx.setStorage({
        key: 'orderdata',
        data: orderdata,
      })
      wx.navigateTo({
        url: '../orders/orders',
      })
    }else{
    
      var purchasedata = {}
      purchasedata['productid'] = this.data.id
      purchasedata['num'] = this.data.num
      purchasedata['name'] = this.data.productname
      purchasedata['price'] = this.data.price
      purchasedata['volumn'] = this.data.volumn
      purchasedata['picture'] = this.data.picture
      purchasedata['isSelect'] = true
      purchasedata['shippingprice']=this.data.shippingprice
      wx.getStorage({
        key: 'goods_arr',
        success: function (res) {
          var goods_arr = res.data
          goods_arr.push(purchasedata)
          wx.setStorage({
            key: 'goods_arr',
            data: goods_arr
          })
        }, fail: function () {
          var goods_arr = [];    //开空对象
          goods_arr.push(purchasedata)
          wx.setStorage({
            key: 'goods_arr',
            data: goods_arr,
          })
        }
      })
      this.setData({
        showDialog: false
      })
    }
  },
  addCar:function(){
    this.setData({
      showDialog: true
    })
  },
  immeBuy:function(e){
    
    this.setData({
      showDialog: true,
      isimme:true
    })
   
  },
  tocomment:function(){
    wx.navigateTo({
      url: '../comment/comment?id='+this.data.id,
    })
  }
})