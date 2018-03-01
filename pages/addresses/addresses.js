// addresses.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    selectimg:[],
    touch_start:0,
    touch_end:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  deleteAddress:function(e){
    var that=this
    var conid=e.currentTarget.dataset.conid
    var touchTime = that.data.touch_end - that.data.touch_start;
    //如果按下时间大于350为长按  
    if (touchTime > 350) {
      wx.showModal({
        title: '提示',
        content: '是否删除该地址',
        success: function (res) {
          
          if (res.confirm) {
            wx.request({
              url: 'http://localhost/think/index.php/Consignee/deletes',
              data:{
                'conid': e.currentTarget.dataset.conid
              },
              method:'get',
              success:function(info){
                console.log(info.data)
                if(info.data=='success'){
                  wx.showToast({
                    title: '删除成功！',
                  })
                  wx.redirectTo({
                    url: 'addresses',
                  })
                }
              }
            })
          }
        }
      })
    }
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
 edit:function(e){
    console.log(e)
    var editdata={}
    editdata['conid'] = e.currentTarget.dataset.conid
    editdata['consigneeName']=e.currentTarget.dataset.name
    editdata['tel'] = e.currentTarget.dataset.tel
    editdata['address'] = e.currentTarget.dataset.address
    wx.setStorage({
      key: 'editdata',
      data: editdata,
      success:function(){
        wx.navigateTo({
          url: 'addaddresses?method=modify',
        })
      }
    })

 },
 selectchange:function(e){
   var that=this
  for(var i=0;i<this.data.addressList.length;i++){
    var param={}
    var str="selectimg["+i+"]"
    param[str]=false
    that.setData(param)
  }
  var param={}
  var str = "selectimg[" + e.currentTarget.dataset.index + "]"
  param[str]=true
  that.setData(param)
  
  var selectdata={}
  selectdata['conid'] = e.currentTarget.dataset.conid
  selectdata['consigneeName'] = e.currentTarget.dataset.name
  selectdata['tel'] = e.currentTarget.dataset.tel
  selectdata['address'] = e.currentTarget.dataset.address
  wx.setStorage({
    key: 'selectdata',
    data: selectdata,
    success:function(){
      wx.navigateBack({})
    }
  })
 },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    wx.request({
      url: 'http://localhost/think/index.php/Consignee/display',
      success:function(info){
        console.log(info.data)
        that.setData({
          addressList:info.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
})