// pages/index/search/search.js
Page({
  data: {
    input:null,
    goodsList:[]
  },
  onLoad(options) {

  },

  getValue(e) {
    const input = e.detail.value.trim(); // 使用 trim() 去除首尾空格
    console.log("输入值：", input);
    this.setData({
      input:input
    })
    
  },

  search(){
    var input = this.data.input;
    if (!input) {
      console.log("输入值太短或为空，不进行查询。");
      return;
  }
  wx.cloud.database().collection("goods")
      .where({
          title: wx.cloud.database().RegExp({
              regexp: input,
              options: 'i' 
          })
      })
      .get()
      .then(res => {
          console.log("查询数据：", res.data); 
          this.setData({
            goodsList:res.data
          })
      })
      .catch(error => {
          console.error("查询数据库时发生错误：", error);
      });
  },

  toGood(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/Goods/Goods?id='+id,
    });
  },
})