$(function(){

  let captchaAuto="";
  let captchaArr=[1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  while(captchaAuto.length<6){
    let randomIndex=Math.floor(Math.random()*61);
    captchaAuto+=captchaArr[randomIndex];
  }
  $("#captcha").text(captchaAuto)

  $("#refresh").click(function(){
    captchaAuto="";
    while(captchaAuto.length<6){
      let randomIndex=Math.floor(Math.random()*61);
      captchaAuto+=captchaArr[randomIndex];
    }
    $("#captcha").text(captchaAuto)
  
  })

  $("button").click(function(e){
    e.preventDefault();
    if((($("#password").val()==="")&&$("#useremail").val()==="")){
      $(".invalid").text("Please enter registered email & password")
    }else if($("#password").val()===""){
      $(".invalid").text("Please enter your Password")
    }else if($("#useremail").val()===""){
      $(".invalid").text("Please enter your registered email")
    }else if($("#captchaInput").val()!==captchaAuto){
      $(".invalid").text("Please enter correct Captcha")
    }else{
      let localArr=localStorage.getItem($("#useremail").val());
      if(localArr){
        localArr=localArr.split(",");
        if(localArr[2]===$("#password").val()){
          location.assign("/HTML/landing.html");
          localStorage.setItem("loggedUser",[$("#useremail").val(),localArr[0],localArr[1]])
      }else{
         $(".invalid").text("Incorrect Password. Please try again!")
      }
      }else{
        $(".invalid").text("User doesn't exists. Please sign up!")
      }
    }
  })
  $(".form-control").blur(function(){
    $(".invalid").text("")
  })

  $("#showPass").click(function(){
    if($("#password").attr("type")==="password"){
      $("#password").attr("type","text")
    }else{
      $("#password").attr("type","password")
    }
  })
})