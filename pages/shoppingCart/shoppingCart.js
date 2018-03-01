// shoppingCart.js
//获取应用实例
var app = getApp()
Page({
  data: {
    isnull:true,
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空如也',
    isAllSelect:false,
    totalMoney:0,
    initial:[],
    carts:[]
  },
   onLoad:function(){
     
    
   },
   onShow: function () {
     var that = this
     wx.getStorage({
       key: 'goods_arr',
       success: function (res) {
        var total=0;
        for(var i in res.data){
          var product=res.data[i]
          total=total+product.price * product.num
        }
         that.setData({
           initial: res.data,
           isnull: false,
           totalMoney:total
         })
       },
     })
   
     var carts=that.data.initial
     for(var i in carts){
       console.log(i)
     }
   },
   bindMinus: function (e) {
     var that=this
     var index = e.currentTarget.dataset.index
     var num = that.data.initial[index].num;
     // 如果大于1时，才可以减  
     var total = parseInt(that.data.totalMoney);
     var price = parseInt(that.data.initial[index].price);
     var minusStatus = 'normal';
     if (num > 1) {
       num--;
       if (that.data.initial[index].isSelect) {
         total = total - price;
       }

     } else {
       minusStatus = 'disabled'
     }

     var param={}
     var str="initial["+index+"].num";
     param[str]=num
     param['minusStatus'] = minusStatus
     param['totalMoney'] = total
     that.setData(param)
     
     // 将数值与状态写回  
     wx.redirectTo({
       url: 'shoppingCart',
     })
    
   },
   bindPlus: function (e) {

     var that = this
     var index = e.currentTarget.dataset.index
     var num = that.data.initial[index].num;
     var volumn = that.data.initial[index].volumn;
     var total=parseInt(that.data.totalMoney);
     var price=parseInt(that.data.initial[index].price);
     var minusStatus = 'normal';

     if (num < volumn) {
       num++;
       if (that.data.initial[index].isSelect) {
        total=total+price;
       }
     } else {
       minusStatus = 'disabled'
     }

     
     // 将数值与状态写回  
     var param = {}
     var str = "initial[" + index + "].num";
     param[str] = num
     param['minusStatus'] = minusStatus
     param['totalMoney']=total
     that.setData(param)

   },
   bindManual:function(e){
    var that=this
     var index = e.currentTarget.dataset.index
     var num = e.detail.value
     // 将数值与状态写回  
     var param = {}
     var str = "initial[" + index + "].num";
     param[str] = num
     that.setData(param)
     
   },
   switchSelect:function(e){
    var that=this
     var index = e.currentTarget.dataset.index
     var param = {}
     var str = "initial[" + index + "].isSelect";
     param[str] = !that.data.initial[index].isSelect
     that.setData(param)
     
     if (that.data.initial[index].isSelect) {
       var origin=parseInt(that.data.totalMoney)
       var price = parseInt(that.data.initial[index].price)
       var num = parseInt(that.data.initial[index].num)
       var total = origin + price*num;
       console.log(origin+'  + '+price+'='+total)
        that.setData({
            totalMoney:total
        })
     }
     else {
       var origin = parseInt(that.data.totalMoney)
       var price = parseInt(that.data.initial[index].price)
       var num = parseInt(that.data.initial[index].num)
       var total = origin - price*num;
       console.log(origin + '-' + price + '=' + total)
       that.setData({
         totalMoney: total
       })
     }
   },
   allSelect:function(e){
     var total=0
     var that=this
     if(!that.data.isAllSelect){
       
       for(var i=0;i<that.data.initial.length;i++){
         var price = parseInt(that.data.initial[i].price)
         var num = parseInt(that.data.initial[i].num)
          total=total+price*num
          var param = {}
          var str = "initial[" + i + "].isSelect";
          param[str] = true
          that.setData(param)
       }
       that.setData({
         isAllSelect:true,
         totalMoney:total
       })
     }else{
       for (var i = 0; i < that.data.initial.length; i++) {
         var param = {}
         var str = "initial[" + i + "].isSelect";
         param[str] = false
         that.setData(param)
       }
       that.setData({
         isAllSelect:false,
         totalMoney:0
       })
     }
   },
   tobuy:function(){
     var that=this
     var orderdata=[]
     for(var i=0;i<that.data.initial.length;i++){
       if (that.data.initial[i].isSelect){
         orderdata.push(that.data.initial[i])
       }
     }
     wx.setStorage({
       key: 'orderdata',
       data: orderdata,
       success:function(){
         wx.removeStorage({
           key: 'goods_arr',

         })
         wx.navigateTo({
           url: '../orders/orders',
         })
       }
     })
   },
   mytouchstart: function (e) {
     let that = this;
     that.setData({
       touch_start: e.timeStamp
     })
     console.log(e.timeStamp + '- touch-start')
   },
   mytouchend: function (e) {
     let that = this;
     that.setData({
       touch_end: e.timeStamp
     })
     console.log(e.timeStamp + '- touch-end')
   },
   deleteitem: function (e) {
     var that = this
     var touchTime = that.data.touch_end - that.data.touch_start;
     var index=e.currentTarget.dataset.index
     var initial=that.data.initial
     var total=0
     //如果按下时间大于350为长按  
     if (touchTime > 350) {
       wx.showModal({
         title: '提示',
         content: '是否删除该产品',
         success: function (res) {

           if (res.confirm) {
             initial.splice(index,1);
             for (var i in initial) {
               var product = initial[i]
               total = total + product.price * product.num
             }
            that.setData({
              initial:initial,
              totalMoney: total
            })
            wx.setStorage({
              key: 'goods_arr',
              data: initial,
            })
           }
         }
       })
     }
   },
  
})
