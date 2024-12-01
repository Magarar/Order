// pages/Goods/Goods.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    cartList:app.globalData.cartList,
    cartListLength:0
  },
  
  onLoad(options) {
    wx.cloud.database().collection("goods").doc(options.id).get().then(res=>{
      console.log(res)
      this.setData({
        goods:res.data,
      })
    });
    this.setData({
      cartList:app.globalData.cartList,
      cartListLength:app.getTotalQuantity()
    });


  },

  addCart(){
    app.addToCart(this.data.goods);
    this.setData({
      cartList:app.globalData.cartList,
      cartListLength:app.getTotalQuantity()
    });
  },


})