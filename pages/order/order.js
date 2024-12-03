// pages/order/order.js
const app = getApp();
const util = require('../../components/util.js');
Page({
  data: {
    cartList:[],
    totalPrice:0,
    selectedTable: 0, 
    remark:'',
    phone:0,
    totalPrice:0,
    name:"哈陛下",
    




    tableList: ['1号桌', '2号桌', '3号桌', '4号桌'],
    selectedTableName: '1号桌' ,

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
    if(this.data.cartList.length<=0){
      return;
    }
    
    wx.cloud.database().collection("order").add({
      data:{
        title:util.generateOrderNumber(),
        table:this.data.selectedTable,
        order:this.data.cartList,
        price:Number(this.data.totalPrice),
        phone:this.data.phone,
        remark:this.data.remark,
        openID:app.globalData.openID,
        Date:util.formatDate(new Date()),
        status:Number(0)
      }
    }).then(
      res=>{
        wx.showToast({
          title: "提交成功",
          duration: 2000
        });
        app.globalData.cartList = [];
        setTimeout(() => {
          wx.navigateBack(); 
        }, 1000); 
      }
    ).catch(err=>{
      console.error("提交订单失败", err);
      wx.showToast({
        title: "提交失败",
        icon: 'none',
        duration: 2000});
    })



}})