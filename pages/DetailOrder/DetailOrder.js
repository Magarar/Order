// pages/DetailOrder/DetailOrder.js
const util = require('../../components/util.js');
const app = getApp()
Page({
  data: {
    orderList:{},
    feedback:""
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.database().collection("order").doc(options.id).get().then(res=>{
      console.log(res)
      this.setData({
        orderList:res.data,
      })
    })
  },

  onFeedbackInput(e) {
    this.setData({
      feedback: e.detail.value
    });
  },
 
  /**
   * 发送用户反馈
   */
  onSendFeedback() {
    const { orderList, feedback } = this.data;
    wx.cloud.database().collection("feedback").add({
      data: {
        title: this.data.orderList.title,
        openID:app.globalData.openID,
        feedback: feedback,
        time: util.formatDate(new Date()),
      }
    }).then(res => {
      this.setData({
        feedback: ''
      });
      wx.showToast({
        title: '反馈已发送',
        icon: 'success'
      });
      setTimeout(() => {
        wx.navigateBack(); 
      }, 1000); 
    }).catch(err => {
      console.error('发送反馈失败:', err);
      wx.showToast({
        title: '发送失败',
        icon: 'none'
      });
    });
  }
})
