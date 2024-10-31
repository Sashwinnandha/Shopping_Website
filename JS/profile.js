$(function(){
    let userVal=localStorage.getItem("loggedUser").split(",")
    $("#email").val(userVal[0]);
    $("#name").val(userVal[1]);
    $("#phone").val(userVal[2]);

    $("#back").click(function(){
        window.history.back();
    })

    $("#nameEdit").click(function(e){
       if($("#nameEdit").text()==="Edit"){
        e.preventDefault();
        $("#name").removeAttr("disabled")
        $("#nameEdit").text("Save")
        $("#nameEdit").attr("disabled","disabled")
        $("#name").keyup(function(){
            $("#namePop").html("");
            let nameReg="^[A-Z]{1}[a-z]{1,}[ ]{0,1}[A-Za-z]{0,}$";
             if($("#name").val().length<3){
                $("#nameEdit").attr("disabled","disabled")
                $("#namePop").text("Please enter your Name (Min.3 characters)");
            }else if(!$("#name").val().match(nameReg)){
                $("#nameEdit").attr("disabled","disabled")
                $("#namePop").text("Please enter a valid Name in ProperCase");
            } else{
                $("#nameEdit").removeAttr("disabled")
            }
            $("#nameEdit").click(function(){
                let userDetails=localStorage.getItem(userVal[0])
                let userDetailsArr=userDetails.split(",")
                localStorage.setItem("loggedUser",[userVal[0],$("#name").val(),userVal[2]])
                localStorage.setItem( userVal[0],[$("#name").val(),userDetailsArr[1],userDetailsArr[2],userDetailsArr[3],userDetailsArr[4]])
            })

        });
       }else{
        e.preventDefault();
        $("#name").attr("disabled","disabled")
        $("#nameEdit").text("Edit")
       }
    })

    $("#phoneEdit").click(function(e){
        if($("#phoneEdit").text()==="Edit"){
         e.preventDefault();
         $("#phone").removeAttr("disabled")
         $("#phoneEdit").text("Save")

         $("#phoneEdit").attr("disabled","disabled")
         $("#phone").keyup(function(){
            $("#phonePop").text("");
            let phoneReg="^[6789]{1}[0-9]{9}$";
            if(!$("#phone").val().match(phoneReg)){
                $("#phonePop").text("Phone number must starts with 9,8,7,6 and following 9 digits (E.g: 9123456780)");
                $("#phoneEdit").attr("disabled","disabled")
            }else{
                 $("#phoneEdit").removeAttr("disabled")
             }

             $("#phoneEdit").click(function(){
                let userDetails=localStorage.getItem(userVal[0])
                let userDetailsArr=userDetails.split(",")
                localStorage.setItem("loggedUser",[userVal[0],userVal[1],$("#phone").val()])
                localStorage.setItem( userVal[0],[userDetailsArr[0],$("#phone").val(),userDetailsArr[2],userDetailsArr[3],userDetailsArr[4]])
            })
         });
        }else{
         e.preventDefault();
         $("#phone").attr("disabled","disabled")
         $("#phoneEdit").text("Edit")
        }
     })
})