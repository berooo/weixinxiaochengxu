//提交电话号码
function submitPhoneNum(phoneNum){
//此处调用wx中的网络请求的API，完成电话号码的提交 return true
  wx.request({
    url: 'http://localhost/think/index.php/PhoneCheck',
    data:{
      "mobile":phoneNum
    },
    method:'get',
    success: function (info) {
      console.log(info);
      return true;
    }
  })

}
//提交[验证码]
function submitIdentifyCode(identifyCode,phoneNum){
  //此处调用wx中的网络请求的API,完成短信验证码的提交
  wx.request({
    url: 'http://localhost/think/index.php/PhoneCheck/check',
    data:{
      "code":identifyCode,
      "mobile":phoneNum
    },
    method:'get',
    success:function(info){
      console.log(info);
      return true;
    }
  })
}
//提交密码，前一步保证两次密码输入相同
function submitPassword(password){
  //此处调用wx中的网络请求的API，完成密码的提交return true
}

module.exports={
  submitPhoneNum:submitPhoneNum,
  submitIdentifyCode:submitIdentifyCode,
  submitPassword:submitPassword
}