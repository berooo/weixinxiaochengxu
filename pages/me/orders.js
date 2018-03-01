var app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    orderlist:{},
    waitsendorderilist:{},
    waitreceiveorderlist:{},
    waitcommentorderlist:{},
    touch_start: 0,
    touch_end: 0
  },
  onLoad: function (options) {
    var that = this;
    console.log(options.method)
    /** 
     * 获取系统信息 
     */
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        if (options.method === "pay") {
          wx.request({
            url: 'http://localhost/think/index.php/Order/display',
            data: {
              "method": 1,
              "userid": res.data
            },
            method: 'get',
            success: function (info) {
              //   console.log(info.data)
              that.setData({
                orderlist: info.data
              })
            }
          })
          that.setData({
            currentTab: 0
          });
        } else if (options.method === "send") {
          wx.request({
            url: 'http://localhost/think/index.php/Order/display',
            data: {
              "method": 2,
              "userid": res.data
            },
            method: 'get',
            success: function (info) {
              console.log(info.data)
              that.setData({
                waitsendorderilist: info.data
              })
            }
          })
          that.setData({
            currentTab: 1
          });
        } else if (options.method === "receive") {
          wx.request({
            url: 'http://localhost/think/index.php/Order/display',
            data: {
              "method": 3,
              "userid": res.data
            },
            method: 'get',
            success: function (info) {
              console.log(info.data)
              that.setData({
                waitreceiveorderlist: info.data
              })
            }
          })
          that.setData({
            currentTab: 2
          });
        } else if (options.method === "comment") {
          wx.request({
            url: 'http://localhost/think/index.php/Order/display',
            data: {
              "method": 4,
              "userid": res.data
            },
            method: 'get',
            success: function (info) {
              console.log(info.data)
              that.setData({
                waitcommentorderlist: info.data
              })
            }
          })
          that.setData({
            currentTab: 3
          });
        }
      },
    })

    
    

    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  toanorder:function(e){
    var that=this
    var conid = e.currentTarget.dataset.conid
    var orderid = e.currentTarget.dataset.orderid
    var total = e.currentTarget.dataset.total
    var touchTime = that.data.touch_end - that.data.touch_start;
    //如果按下时间大于350为长按  
    if (touchTime > 350) {
      wx.showModal({
        title: '提示',
        content: '是否删除该订单',
        success: function (res) {

          if (res.confirm) {
            wx.request({
              url: 'http://localhost/think/index.php/Order/deletes',
              data: {
                'orderid': orderid
              },
              method: 'get',
              success: function (info) {
                console.log(info.data)
                if (info.data == 'success') {
                  wx.showToast({
                    title: '删除成功！',
                  })
                  wx.redirectTo({
                    url: 'orders',
                  })
                }
              }
            })
          }
        }
      })
    }
else{
      wx.navigateTo({
        url: 'anorder?conid=' + conid + '&orderid=' + orderid + '&total=' + total + '&currentTab=' + that.data.currentTab,
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
})  