$(function(){

    $("#password , #cnfrmPassword").attr("disabled",'disabled')
    $("#hint").attr("disabled",'disabled')
    $('.form-control').keyup(function() {
    
        var empty = false;
        $('.form-control').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('.update').attr('disabled', 'disabled');
        } else {
            $('.update').removeAttr('disabled'); 
    }
})
    


    $("#userEmail").keyup(function(){
        $(".userEmailPop").text("")
        $(".hintPop").text("")
        $("#hint").val("");
        $("#cnfrmpasswordPop").text("");
        $("#passwordPop").text("");
       if(!localStorage.getItem($("#userEmail").val())){
            $(".userEmailPop").text("User doesn't exists")
            $('.update').attr('disabled', 'disabled');
        }else{
            $("#hint").removeAttr("disabled")
        }
    })

    $("#hint").keyup(function(){
        $("#cnfrmpasswordPop").text("");
        $("#passwordPop").text("");
        $(".hintPop").text("")
        if(localStorage.getItem($("#userEmail").val())){
            let localHint=localStorage.getItem($("#userEmail").val()).split(",")[3];

            if(localHint===$("#hint").val()){
                $("#password , #cnfrmPassword").removeAttr("disabled");
            }else{
                $(".hintPop").text("Incorrect Hint to reset the password")
                $("#password , #cnfrmPassword").attr("disabled",'disabled')
                $('.update').attr('disabled', 'disabled');
            }
        }
    })
    
    $("#password").keyup(function(){
        if($("#cnfrmpasswordPop").text()=="Please enter same password"){
            $("#cnfrmpasswordPop").text("");
        }
        $("#passwordPop").text("");
        if(($("#password").val().length<8)||($("#password").val().length>15)){
            $("#passwordPop").text("Password must be Min.5 characters & Max.15 characters")
            $('.update').attr('disabled', 'disabled');
        }else if(!$("#password").val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
            $("#passwordPop").text("Password must contain atlease 1 Uppercase, 1 lowercase, 1 Digits , 1 Special char (E.g: ABc5@2024)")
            $('.update').attr('disabled', 'disabled');
        }
    })

    $("#cnfrmPassword").keyup(function(){
        if($("#passwordPop").text()=="Please enter same password"){
            $("#passwordPop").text("");
        }
        $("#cnfrmpasswordPop").text("");
        if(($("#cnfrmPassword").val().length<8)||($("#cnfrmPassword").val().length>15)){
            $("#cnfrmpasswordPop").text("Password must be Min.5 characters & Max.15 characters")
            $('.update').attr('disabled', 'disabled');
        }else if(!$("#cnfrmPassword").val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/)){
            $("#cnfrmpasswordPop").text("Password must contain atlease 1 Uppercase, 1 lowercase, 1 Digits , 1 Special char (E.g: ABc5@2024)")
            $('.update').attr('disabled', 'disabled');
        }
    })

$(".update").click(function(e){
    e.preventDefault();
        let localOld=localStorage.getItem($("#userEmail").val()).split(",");
        let username=localOld[0];
        let phone=localOld[1];
        let hint=localOld[3];
        if($("#password").val()===$("#cnfrmPassword").val()){
            alert("Your password has been changed. Please login again")
            localStorage.setItem($("#userEmail").val(),[username,phone,$("#cnfrmPassword").val(),hint])
            window.location.assign("/HTML/Login.html");
        }else{
            $("#passwordPop").text("Please enter same password")
            $("#cnfrmpasswordPop").text("Please enter same password")
            $('.update').attr('disabled', 'disabled');
        }
    })
})