// pages/Goods/Goods.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    cartList:app.globalData.cartList
  },
  
  onLoad(options) {
    wx.cloud.database().collection("goods").doc(options.id).get().then(res=>{
      console.log(res)
      this.setData({
        goods:res.data,
      })
    });
    this.setData({
      cartList:app.globalData.cartList
    })

  },

  addCart(){
    app.globalData.cartList.push(this.data.goods);
    this.setData({
      cartList:app.globalData.cartList
    })
  }


})