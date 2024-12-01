// pages/type/type.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:[],
    goodsList:[],
    currentType:-1

  },

  onLoad(options)    {
    
  },

  onShow(){
    this.getTypeList();
    this.queryGoodsByIndex(this.data.currentType);
  },

  getTypeList(){
    wx.cloud.database().collection("typeInfo").get()
      .then(res=>{
        let typeList = res.data;
        typeList.sort((a, b) => {
          return a.index - b.index;
        });
        this.setData({
          typeList:typeList
        })
      });
  },


  handleTypeClick(e) {
    const type = e.currentTarget.dataset.id; 
    wx.cloud.database().collection("typeInfo").where({
      _id:type
    }).get().then(res=>{
      // console.log('查询结果：', res.data);
      this.setData({
        currentType: res.data[0].index
      });
      console.log('查询结果：', this.data.currentType);
      this.queryGoodsByIndex(this.data.currentType);
    })
    .catch(err=>{
      console.error("查询失败:"+err)
    });
  },

  queryGoodsByIndex(index) {
    let query = wx.cloud.database().collection("goods");
    if (index !== -1) {
      query = query.where({
        type: index
      });
    }
    query.get().then(goodsRes => {
      this.setData({
        goodsList: goodsRes.data
      });
      // console.log('查询到的商品：',this.data.goodsList);
    }).catch(err => {
      // console.error("查询商品失败:", err);
    });
  },

  toGood(event){
    console.log(event.currentTarget.dataset.id);
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/Goods/Goods?id='+id,
    })
  },

  addCart(event) {
    let id = event.currentTarget.dataset.id;
    console.log(id);
    wx.cloud.database().collection("goods").doc(id).get()
    .then(res=>{
      app.addToCart(res.data);
    })
  }

})