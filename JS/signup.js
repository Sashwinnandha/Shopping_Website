function colorChange(percent){
    if(percent<=40){
        $(".progress-bar").removeClass("bg-warning")
        $(".progress-bar").removeClass("bg-success")
        $(".progress-bar").addClass("bg-danger")
    }else if(percent<=99){
        $(".progress-bar").removeClass("bg-danger")
        $(".progress-bar").removeClass("bg-success")
        $(".progress-bar").addClass("bg-warning")
    }else{
        $(".progress-bar").removeClass("bg-warning")
        $(".progress-bar").removeClass("bg-danger")
        $(".progress-bar").addClass("bg-success")
    }
}


$(function(){
    $('.form-control').keyup(function() {
    
        var empty = false;
        $('.form-control').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('.register').attr('disabled', 'disabled');
        } else {
            $('.register').removeAttr('disabled'); 
    }
})

var percent=0;
var nameProg=true;
var nameRed=false;

    $("#usernameNew").keyup(function(){
        $("#userPop").html("");
        let nameReg="^[A-Z]{1}[a-z]{1,}[ ]{0,1}[A-Za-z]{0,}$";
         if($("#usernameNew").val().length<3){
            $('.register').attr('disabled', true);
            $("#userPop").text("Please enter your Name (Min.3 characters)");
            if(nameRed){
                percent-=16.6;
                nameRed=false;
            }
            nameProg=true;
        }else if(!$("#usernameNew").val().match(nameReg)){
            $('.register').attr('disabled', 'disabled');
            $("#userPop").text("Please enter a valid Name in ProperCase");
            if(nameRed){
                percent-=16.6;
                nameRed=false;
            }
            nameProg=true;
        } else{
            if(nameProg){
                percent+=16.6;
                nameProg=false;
            }
            nameRed=true;
        }
        percent=Math.ceil(percent)
        colorChange(percent);
        $(".progress-bar").attr({"style":"width:"+percent+"%"})
    });

    var emailProg=true;
    var emailRed=false;
    $("#email").keyup(function(){
        $("#emailPop").text("");
        let emailReg="^[a-z0-9_.]{1,}@[a-z]{1,}.(com|in)$";
        if($("#email").val().length<10){
            $("#emailPop").text("Min.10 characters");
            $('.register').attr('disabled', true);
            if(emailRed){
                percent-=16.6;
                emailRed=false;
            }
            emailProg=true;
        }else if(!$("#email").val().match(emailReg)){
            $("#emailPop").text("Please enter your email Id with the valid format (E.g: abc@xyz.com)")
            $('.register').attr('disabled', true);
            if(emailRed){
                percent-=16.6;
                emailRed=false;
            }
            emailProg=true;
        }else if(localStorage.getItem($("#email").val())){
            $("#emailPop").text("User already exists with this email");
            $('.register').attr('disabled', true);
            if(emailRed){
                percent-=16.6;
                emailRed=false;
            }
            emailProg=true;
        }
        else{
            if(emailProg){
                percent+=16.6;
                emailProg=false;
            }
            emailRed=true;
        }
        percent=Math.ceil(percent)
        colorChange(percent);
        $(".progress-bar").attr({"style":"width:"+percent+"%"})
    })

var phoneProg=true;
var phoneRed=false;
    $("#phone").keyup(function(){
        
        $("#phonePop").text("");
        let phoneReg="^[6789]{1}[0-9]{9}$";
        if(!$("#phone").val().match(phoneReg)){
            $("#phonePop").text("Phone number must starts with 9,8,7,6 and following 9 digits (E.g: 9123456780)")
            $('.register').attr('disabled', true);
            if(phoneRed){
                percent-=16.6;
                phoneRed=false;
            }
            phoneProg=true;
        } else{
            if(phoneProg){
                percent+=16.6;
                phoneProg=false;
            }
            phoneRed=true;
        }
        percent=Math.ceil(percent)
        colorChange(percent);
        $(".progress-bar").attr({"style":"width:"+percent+"%"})
    })
var passProg=true;
var passRed=false;
    $("#password").keyup(function(){
       
        if($("#cnfrmpasswordPop").text()=="Please enter same password"){
            $("#cnfrmpasswordPop").text("");
        }
        $("#passwordPop").text("");
        if(($("#password").val().length<8)||$("#password").val().length>15){
            $("#passwordPop").text("Password must be Min.5 characters & Max.15 characters")
            $('.register').attr('disabled', true);
            if(passRed){
                percent-=16.6;
                passRed=false;
            }
            passProg=true;
        }else if(!$("#password").val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)){
            $("#passwordPop").text("Password must contain atlease 1 Uppercase, 1 lowercase, 1 Digits , 1 Special char (E.g: ABc5@2024)")
            $('.register').attr('disabled', true);
            if(passRed){
                percent-=16.6;
                passRed=false;
            }
            passProg=true;
        }else{
            if(passProg){
                percent+=16.6;
                passProg=false;
            }
            passRed=true;
        }
        percent=Math.ceil(percent)
        colorChange(percent);
        $(".progress-bar").attr({"style":"width:"+percent+"%"})
    })


    var cnfrmpassProg=true;
    var cnfrmpassRed=false;
    $("#cnfrmPassword").keyup(function(){
        
        if($("#passwordPop").text()=="Please enter same password"){
            $("#passwordPop").text("");
        }
        $("#cnfrmpasswordPop").text("");
        if(($("#cnfrmPassword").val().length<8)||$("#cnfrmPassword").val().length>15){
            $("#cnfrmpasswordPop").text("Password must be Min.5 characters & Max.15 characters")
            $('.register').attr('disabled', true);
            if(cnfrmpassRed){
                percent-=16.6;
                cnfrmpassRed=false;
            }
            cnfrmpassProg=true;
        }else if(!$("#cnfrmPassword").val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)){
            $("#cnfrmpasswordPop").text("Password must contain atlease 1 Uppercase, 1 lowercase, 1 Digits , 1 Special char (E.g: ABc5@2024)")
            $('.register').attr('disabled', true);
            if(cnfrmpassRed){
                percent-=16.6;
                cnfrmpassRed=false;
            }
            cnfrmpassProg=true;
        } else{
            if(cnfrmpassProg){
                percent+=16.6;
                cnfrmpassProg=false;
            }
            cnfrmpassRed=true;
        }
        percent=Math.ceil(percent)
        colorChange(percent);
        $(".progress-bar").attr({"style":"width:"+percent+"%"})
    })

var hintProg=true;
var hintRed=false;

    $("#hint").keyup(function(){
        
        $("#hintPop").text("");
        let hintReg="^[A-Z]{1}[a-z]{4,14}$";
        if(!$("#hint").val().match(hintReg)){
            $("#hintPop").text("Please enter Hint in Propercase (Min.5 characters)")
            $('.register').attr('disabled', true);
            if(hintRed){
                percent-=16.6;
                hintRed=false;
            }
            hintProg=true;
        } else{
            if(hintProg){
                percent+=16.6;
                hintProg=false;
            }
            hintRed=true;
        }
        percent=Math.ceil(percent)
        colorChange(percent);
        $(".progress-bar").attr({"style":"width:"+percent+"%"})

    })


    $(".register").click(function(){
        
        if($("#password").val()===$("#cnfrmPassword").val()){
            alert("Hi "+$("#usernameNew").val()+" ! Your account has been created. Please login again")
            localStorage.setItem($("#email").val(),[$("#usernameNew").val(),$("#phone").val(),$("#cnfrmPassword").val(),$("#hint").val()])
            window.location.assign("/HTML/Login.html");
        }else{
            $("#passwordPop").text("Please enter same password")
            $("#cnfrmpasswordPop").text("Please enter same password")
            $('.register').attr('disabled', true);
        }
    })

    $(".reset").click(function(){
        $("input").val("");
        $("#userPop").html("");
        $("#hintPop").text("");
        $("#passwordPop").text("");
        $("#phonePop").text("");
        $("#cnfrmpasswordPop").text("");
        $("#emailPop").text("");
    })
})