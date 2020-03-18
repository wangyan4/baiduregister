$(function () {
  var $username = $('#username'),
    $login = $('#login'),
    $pwd = $('#pwd'),
    $validata = $('#validata'),
    $getcode = $('#getcode'),
    $submit = $('#submit'),
    $cbox = $('#cbox'),
    num = 10,
    timer;
  $getcode.mouseover(function () {
    $getcode.css({
      color: "#2E58FF",
      border: "1px solid #2E58FF"
    })
  });
  $getcode.mouseout(function () {
    $getcode.css({
      color: "#000",
      border: 0
    })
  })
  $username.focusout(function () {
    if (!validation('#username')) $username.select();
  });
  $login.focusout(function () {
    if (!validation('#login')) $login.select();
  });
  $pwd.focusout(function () {
    if (!validation('#pwd')) $pwd.select();
  });
  $getcode.click(function () {
    if ($login.val() === '' || $pwd.val() === '' || $username.val() === '') {
      return;
    }
    $getcode.attr('disabled', true);
    $getcode.val('获取验证码(10s)');
    timer = setInterval(function () {
      num--;
      if (num == 0) {
        if (!validation('#validata')) {
          clearInterval(timer);
          num = 10;
          $getcode.val('获取验证码');
          $getcode.removeAttr('disabled');
          return;
        }
        clearInterval(timer);
        num = 10;
        $getcode.val('获取验证码');
        $getcode.removeAttr('disabled');
      } else {
        $getcode.val('获取验证码(' + num + 's)');
      }
    }, 1000);
  })
  $('form').change(function(){
    if($login.val() !== '' && $pwd.val() !== '' && $username.val() !== '' && $validata.val() !== '' && $cbox.prop('checked')){
      $submit.removeAttr('disabled');
      $submit.css({
        "background-color":'#3f89cc',
        "box-shadow":"0 8px 20px 0 #8f9fff"
      });
    }else{
      $submit.attr('disabled');
      $submit.css({
        "background-color":'#BDCEFC',
      });
    }
  });
  $submit.click(function(){
    if (!validation('#username')){
      $username.select();
      return ;
    } 
    if (!validation('#login')){
      $login.select();
      return ;
    } 
    if (!validation('#pwd')){
      $pwd.select();
      return ;
    }
    if (!validation('#validata')){
      if (!validation('#pwd')){
      $validata.select();
      return ;
      }
    }
    if(!$cbox.prop('checked')){
      $cbox.css({
        'box-shadow':'0 0 10px #3f89cc;'
      })
    }
  })
  function validation(filed) {
    var $data = $(filed),
      $msg = $(filed+'-msg'),
      $text = filed.substring(1);
    switch ($text) {
      case 'username':
        if (getLen($data.val()) > 14) {
          $msg.html('用户名不能超过7个汉字或14个字符');
          return false;
        } else if ($data.val() !== '' && /^[a-zA-Z0-9_\u4e00-\u9fa5]*$/.test($data.val()) && !/^[0-9]*$/.test($data.val())) {
          $msg.html('');
          return true;
        } else {
          $msg.html('用户名仅支持中英文、数字和下划线,且不能为纯数字');
          return false;
        }
      case 'login':
        if ($data.val() !== '' && /^1(3|4|5|6|7|8|9)\d{9}$/.test($data.val())) {
          $msg.html('');
          return true;
        } else {
          $msg.html('手机号码格式不正确');
          return false;
        }
      case 'pwd':
        if (/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{8,14}$/.test($data.val())) {
          $msg.html('');
          return true;
        } else {
          $msg.html('格式错误,必须包含字母/数字以及符号至少两种,长度8-14位');
          return false;
        }
      case 'validata':
        if ($data.val() === '') {
          $msg.html('请求超时,请稍后重试');
          return false;
        } else {
          $msg.html('');
          return true;
        }
    }
  }
})

function getLen(val) {
  var len = 0;
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}