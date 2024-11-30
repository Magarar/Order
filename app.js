// app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:'order-learn-8gtowqh7fdb505b4'
    })
  },

  globalData:{
    userInfo:null,
    cartList:[]
  }

  
})

