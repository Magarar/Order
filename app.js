// app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:'order-learn-8gtowqh7fdb505b4'
    })
    if(wx.getStorageSync("cartList")){
      this.globalData.cartList=wx.getStorageSync("cartList")
    };
    wx.cloud.callFunction({
      name:"getOpenID"
    }).then(res=>{
      console.log("openID"+res.result.openid);
      this.globalData.openID=res.result.openid;
    })
  },

  globalData:{
    userInfo:null,
    cartList:[],
    orderList:null,
    openID:null,
  } ,

  addToCart(item) {
    if(item._id==null){
      return;
    }
    let cartList = this.globalData.cartList;
    let exists = false;
 
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i]._id === item._id) {
        cartList[i].num += item.num || 1; 
        cartList[i].choose =true; 
        exists = true;
        break;
      }
    }
 
    if (!exists) {
      cartList.push({
        ...item,
        num: item.num || 1,
        choose:true
      });
    }
 
    this.globalData.cartList = cartList;
    wx.setStorageSync("cartList",this.globalData.cartList);
  },

  getTotalQuantity() {
    const cartList = this.globalData.cartList;
    let totalQuantity = 0;
 
    for (let i = 0; i < cartList.length; i++) {
      totalQuantity += cartList[i].num;
    }
 
    return totalQuantity;
  }
})

  

