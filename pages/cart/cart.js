// pages/cart/cart.js
const app = getApp()
Page({

  data: {
    cartList:[]
  },

  onLoad(options) {

  },

  onShow(){
    this.setData({
      cartList:app.globalData.cartList
    })
  }

  
})