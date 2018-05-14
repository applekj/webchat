// pages/calc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idb: "back",
    idc: "clear",
    idadd: "＋",
    id9: "9",
    id8: "8",
    id7: "7",
    idj: "－",
    id6: "6",
    id5: "5",
    id4: "4",
    idx: "×",
    id3: "3",
    id2: "2",
    id1: "1",
    iddiv: "÷",
    id0: "0",
    idd: ".",
    ide: "=",
    screenData: "0",
    operaSymbo: { "＋": "+", "－": "-", "×": "*", "÷": "/", ".": "." },
    iconType: 'waiting_circle',
    iconColor: 'white',
    logs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /** 
   * 计算逻辑 
   */
  calcResult:function(str){
    let index = str.indexOf("＋") + 1 || str.lastIndexOf("－") + 1 || str.indexOf("×") + 1 || str.indexOf("÷") + 1;
    let calcWay = this.data.operaSymbo[str.charAt(index-1)];
    let firstNum = Number(str.substring(0,index-1));
    let secondNum = Number(str.substring(index));
    //存储计算历史记录
    this.data.logs.push(str);
    wx.setStorageSync('calcHistory', this.data.logs);
    switch(calcWay){
      case("+"):
        //返回计算结果
        return String(firstNum + secondNum);
      case("-"):
        return String(firstNum - secondNum);
      case ("*"):
        return String(firstNum * secondNum);
      case ("/"):
        return String(firstNum / secondNum);
      default:
        break;
    }
  },
  /** 
   * 点击按钮 
   */
  clickBtn:function(e){
    //按钮的值
    let value = e.target.id;
    //屏幕上的值
    let screenData = this.data.screenData;
    //屏幕上的值回退一位之后的值
    let screenDataBack = screenData.substring(0, screenData.length - 1) == '' ? '0' : screenData.substring(0, screenData.length - 1);
    //屏幕上的值的最后一位
    let lastValue = screenData.charAt(screenData.length-1);

    if(value == 'clear'){
      this.setData({
        "screenData":'0'
      });
    }else if(value == 'back'){
      this.setData({
        "screenData":screenDataBack
      })
    } else if (["＋", "－", "×", "÷"].indexOf(value) > -1){
      if(screenData == '0'){ //0
        if (value == '－'){
          this.setData({
            "screenData": value
          })
        }else{
          return;
        }
      }else if(!isNaN(screenData)){ //数字
        this.setData({
          "screenData": screenData + value
        })  
      }else{ //非数字
        if(isNaN(lastValue)){//非表达式
          this.setData({
            "screenData": screenDataBack + value
          }) 
        }else{//表达式
          this.setData({
            "screenData": this.calcResult(screenData) + value
          }) 
        }
      }
    } else if (value == '='){
      if(isNaN(screenData) && !isNaN(lastValue)){
        this.setData({
          "screenData": this.calcResult(screenData)
        }) 
      }
    } else {
      this.setData({
        "screenData":(screenData=="0"?"":screenData) + value
      })
    }
  },
  toHistory:function(e){
    wx.navigateTo({
      url: '../history/history',
    });
  }
})