// pages/order/order.js
const app = getApp();
Page({
  data: {
    cartList:[],
    totalPrice:0,
    tableList: ['1号桌', '2号桌', '3号桌', '4号桌'],
    selectedTable: 0, 
    selectedTableName: '1号桌' ,
    remark:''

  },

  onLoad(options) {
    const orderList = wx.getStorageSync('orderList') || [];
    this.setData({
      cartList: orderList,
    });
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

  calculateTotalPrice() {
    let cartList = this.data.cartList;
    let total = 0;
    cartList.forEach(item => {
      if (item.choose) { // 只计算已选择的商品
        total += item.price * item.num; // 累加商品的价格
      }
    });
    this.setData({
      totalPrice: total.toFixed(2),
    });
  },

  onTableChange: function(e) {
    const index = e.detail.value;
    const selectedTableName = this.data.tableList[index];
    this.setData({
      selectedTable: index,
      selectedTableName: selectedTableName
    });
  },

  onRemarkInput(e) {
    const remark = e.detail.value;
    this.setData({
      remark: remark
    });
  },

  addOrder(){
    wx.showToast({
      title: '还没写',
    })
    // wx.cloud.database().collection("order").add({
    //   data:{
    //     a:1
    //   }
    // })
  }



})