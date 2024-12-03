// pages/me/me.js
const app=getApp()
Page({
  data: {
    openID:"",
  },
  onLoad(options) {
    this.setData({
      openID:app.globalData.openID
    })
  },

  goToMyOrders(){
    if(this.data.openID!=""){
      wx.navigateTo({
        url: '/pages/myOrder/myOrder?id='+this.data.openID,
      })
    }
  }
})