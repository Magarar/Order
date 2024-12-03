// pages/myOrder/myOrder.js
const app = getApp();
Page({

  data: {
    orderList:[],
    openID:app.globalData.openID,
    selectedIndex: 0,
    menuStatuses: ['未处理', '制作中', '已完成', '已取消'],
    orderInfo: {}, 
    orderItems: [] 
  },
  onLoad(options) {
    this.getData();
  },

  handleStatusClick(event) {
    const clickedIndex = event.currentTarget.dataset.index;
    this.setData({
      selectedIndex: clickedIndex
    });
    this.getData();
  },

  getData(){
    console.log(this.data.selectedStatusKey);
    wx.cloud.database().collection("order").where({
      status:this.data.selectedIndex,
      openID:this.data.openID
    }).get().then(res=>{
      console.log(res.data);
      this.setData({
        orderList:res.data
      });
      this.setOrderData();
    })
  },

  setOrderData(){
    const ordersJson = this.data.orderList;
    this.setData({
      orders: ordersJson.map(order => ({
        ...order,
        orderItems: order.order.map(item => ({
          cover: item.cover,
          num: item.num,
          price: item.price,
          title: item.title
        }))
      }))
    });
  },

  gotoDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/DetailOrder/DetailOrder?id='+id,
    })
  }



})