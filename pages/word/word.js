// pages/baiside/baiside.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    maxtime:"",
    loadingHidden:false,
    isHideLoadMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData("list");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.requestData("list");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 获取数据
   */
  requestData:function(a){
    wx.request({
      url: 'https://api.budejie.com/api/api_open.php',
      data:{
        a:a,
        c:"data",
        maxtime:this.data.maxtime,
        type:'29',
      },
      method:"GET",
      success: res => {
        this.setData({
          list:this.data.list.concat(res.data.list),
          loadingHidden:true
        });
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    this.data.list = [];
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    this.requestData('newlist');
    
      
  },
})