$(function(){
    let user=localStorage.getItem("loggedUser").split(",");
    $(".user").text("Hello "+user[1]);

    $("#logout").click(function(){
        location.assign("\Login.html");
        localStorage.setItem("loggedUser","")
    })

    $("i[title='Profile']").click(function(){
        location.assign("\profile.html")
    })

    $("#list").hide()

    $("#search").focus(function(){
        $("#list").show()
    })
    $("#search").blur(function(){
        $("#list").hide()
    })
})