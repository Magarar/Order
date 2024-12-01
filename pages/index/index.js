// index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    typeList:[],
    goodsList:[],
    goodsListPre:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData();
  
  },

  fetchData()  {
    Promise.all([
      wx.cloud.database().collection("typeInfo").get().then(res => ({ success: true, data: res.data, errMsg: null })).catch(err => ({ success: false, data: [], errMsg: err.message })),
      wx.cloud.database().collection("swiper_image").get().then(res => ({ success: true, data: res.data, errMsg: null })).catch(err => ({ success: false, data: [], errMsg: err.message })),
      wx.cloud.database().collection("goods").get().then(res => ({ success: true, data: res.data, errMsg: null })).catch(err => ({ success: false, data: [], errMsg: err.message }))
    ]).then(results => {
      const [typeResult, bannerResult,goodsResult] = results;

      if (goodsResult.success) {
        this.setData({
          goodsList: goodsResult.data,
          goodsListPre:goodsResult.data.slice(0,4)
        });
      
      } else {
        // console.error("获取分类数据时发生错误：", typeResult.errMsg);
      }
 
      if (typeResult.success) {
        // console.log("获取到的分类数据：", typeResult.data);
        this.setData({
          typeList: typeResult.data.slice(0,4)
        });
      } else {
        console.error("获取分类数据时发生错误：", typeResult.errMsg);
      }
 
      if (bannerResult.success) {
        // console.log("获取到的轮播图数据：", bannerResult.data);
        this.setData({
          swiperList: bannerResult.data
        });
      } else {
        console.error("获取轮播图数据时发生错误：", bannerResult.errMsg);
      }
    });
  },


  toGoodsDetails(event){
    let id = event.currentTarget.dataset.id;
    console.log("'Clicked item id:'"+id);
    wx.navigateTo({
      url: '/pages/index/GoodsDetail/GoodsDetail?id='+id,
    });
  },

  toGood(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/Goods/Goods?id='+id,
    });
  },

  turnToType(){
    wx.showToast({
      title:"还没写!"
    })
  },

  toSearch(){
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  }



})