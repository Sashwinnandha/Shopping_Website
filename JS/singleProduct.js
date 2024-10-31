$(function(){
    let product=localStorage.getItem("clickedItem").substring(4)

    $.getJSON("/Data/western.json",function(response){
        for(let i=0;i<response.length;i++){
            if(response[i].id===product){
                let carouselInner=document.getElementsByClassName("carousel-inner")[0]

                for(let j=0;j<response[i].img.length;j++){
                    let carouselItem=document.createElement("div");
                    if(j==0){
                        carouselItem.className="carousel-item active";
                    }else{
                        carouselItem.className="carousel-item ";
                    }
                    let image=document.createElement("img");
                    image.className="d-block img-fluid";
                    image.alt=j+"-slide";
                    image.src=response[i].img[j]
                    carouselItem.appendChild(image);
                    carouselInner.appendChild(carouselItem);
                }
                if(response[i].img.length>1){
                    $(".arrows").show();
                }else{
                    $(".arrows").hide();
                }
                $("#brand").text(response[i].brand)
                $("#itemName").text(response[i].itemName)
                $("#product").text(response[i].itemName)
                $("#rating").html(response[i].rating+ " <i class='bi bi-star-fill'></i>")
                $("#reviews").text(response[i].reviews+" Ratings")

                $("#productId").text(response[i].id)
                $("#category").text(response[i].category)

                let price=document.getElementById("mrp")
                let finalmrp=document.getElementById("finalmrp")
                let finalmrp2=document.getElementById("finalmrp2")
                let finalPrice=0;
                if(response[i].offer!=0){
                    finalPrice=(response[i].price)-(response[i].price*(response[i].offer/100))
                    finalmrp.innerHTML="₹"+Math.round(finalPrice);
                    finalmrp2.innerHTML="₹"+Math.round(finalPrice);
                    price.innerHTML="MRP " +" <span style='text-decoration: line-through'>"+response[i].price+"</span><span style='color:#9b5e0f'class=font-weight-bold> ("+response[i].offer+"% OFF)</span><div >Price inclusive of all taxes</div>";
                }else{
                    finalmrp.innerText="₹"+Math.round(response[i].price);
                    finalmrp2.innerText="₹"+Math.round(response[i].price);
                    price.innerHTML="<div >Price inclusive of all taxes</div>";
                }

                if(response[i].rating<=2){
                    rating.setAttribute("class","badge badge-danger p-2");
                    rating.setAttribute("style","color:black")
                }else if(response[i].rating<=3.5){
                    rating.setAttribute("class","badge badge-warning p-2");
                    rating.setAttribute("style","color:black")
                }else{
                    rating.setAttribute("class","badge badge-success p-2");
                    rating.setAttribute("style","color:white")
                }
            }
        }
    })

    $("#logout").click(function(){
        location.assign("\Login.html");
        localStorage.setItem("loggedUser","")
    })
})