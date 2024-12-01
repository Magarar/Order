// pages/cart/cart.js
const app = getApp()
Page({

  data: {
    cartList:[],
    totalPrice:0
  },

  onLoad(options) {
    
  },

  onShow(){
    this.setData({
      cartList:app.globalData.cartList
    })
    this.calculateTotalPrice(); 
  },

  increaseNum(e) {
    let index = e.currentTarget.dataset.index;
    let cartList = this.data.cartList;
    cartList[index].num++;
    this.setData({
      cartList: cartList
    });
    app.globalData.cartList = cartList;
    wx.setStorageSync("cartList",app.globalData.cartList);
    this.calculateTotalPrice(); 
  },
  
  decreaseNum(e) {
    let index = e.currentTarget.dataset.index;
    let cartList = this.data.cartList;
    if (cartList[index].num > 1) {
      cartList[index].num--;
      this.setData({
        cartList: cartList
      });
      app.globalData.cartList = cartList;
    } else {
      cartList.splice(index, 1);
      this.setData({
        cartList: cartList
      });
      app.globalData.cartList = cartList;
      wx.setStorageSync("cartList",app.globalData.cartList);
    }
    this.calculateTotalPrice(); 
  },

  chooseGood(e){
    let index = e.currentTarget.dataset.index;
    let cartList = this.data.cartList;
    cartList[index].choose = !cartList[index].choose;
    this.setData({
      cartList: cartList
    });
    app.globalData.cartList = cartList;
    wx.setStorageSync("cartList",app.globalData.cartList);
    this.calculateTotalPrice(); 
  },

  toGood(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/Goods/Goods?id='+id,
    });
  },

  chooseAll() {
    let cartList = this.data.cartList;
    cartList.forEach((item) => {
      item.choose = true;
      console.log(item.choose)
    });
    this.setData({
      cartList: cartList,
    });
    app.globalData.cartList = cartList;
    wx.setStorageSync("cartList", app.globalData.cartList);
    this.calculateTotalPrice(); 
  },

  calculateTotalPrice() {
    let cartList = this.data.cartList;
    let total = 0;
    cartList.forEach(item => {
      if (item.choose) { // 只计算已选择的商品
        total += item.price * item.num; // 累加商品的价格
      }
    });
    this.setData({
      totalPrice: total.toFixed(2)
    });
  },

  toOrder(){
    if (app.globalData.cartList.length <= 0) {
      return;
    }

    let orderList = this.data.cartList.filter(item => item.choose);
    wx.setStorageSync('orderList', orderList);
    wx.navigateTo({
      url: '/pages/order/order',
    });
  }

  
})