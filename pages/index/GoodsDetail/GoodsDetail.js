// pages/index/GoodsDetail/GoodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    wx.cloud.database().collection("swiper_image").doc(options.id).get().then(res=>{
      console.log(res)
      this.setData({
        goods:res.data,
      })
    })

  },
})