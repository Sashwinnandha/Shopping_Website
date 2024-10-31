$("#logout").click(function(){
    location.assign("\Login.html");
    localStorage.setItem("loggedUser","")
})


//Items display using AJAX call and display it in card manner

function itemGen(response){
    let col=document.createElement("div");
    col.setAttribute("class","col col-xl-3 mb-5 card-col")
    let card=document.createElement("div");
    card.id="Card"+response.id;
    card.setAttribute("class","d-flex flex-column justify-content-between h-100 card-product");
    let image=document.createElement("img")
    image.setAttribute("src",response.img[0])
    image.setAttribute("alt",response.alt)
    image.setAttribute("class","card-img-top img-fluid")
    card.appendChild(image);

    //next card-body
    let cardbody=document.createElement("div");
    cardbody.setAttribute("class","text-center mt-3 p-2 pb-3")
    let brand=document.createElement("div");
    brand.setAttribute("style","color:#9b5e0f")
    brand.innerText=response.brand;
    let itemname=document.createElement("p")
    itemname.innerText=response.itemName;

    let rating=document.createElement("div");
    rating.innerHTML=response.rating+" <i class='bi bi-star-fill'></i> | "+response.reviews;
    if(response.rating<=2){
        rating.setAttribute("class","badge badge-danger p-2");
        rating.setAttribute("style","color:black")
    }else if(response.rating<=3.5){
        rating.setAttribute("class","badge badge-warning p-2");
        rating.setAttribute("style","color:black")
    }else{
        rating.setAttribute("class","badge badge-success p-2");
        rating.setAttribute("style","color:white")
    }

    let price=document.createElement("div");
    price.setAttribute("class","mt-2")
    let finalPrice=0;
    if(response.offer!=0){
        finalPrice=(response.price)-(response.price*(response.offer/100))
        price.innerHTML="₹"+Math.round(finalPrice)+" <span style='text-decoration: line-through'>₹"+response.price+"</span><span style='color:#9b5e0f'> ("+response.offer+"%)</span>";
    }else{
        finalPrice=response.price;
        price.innerText="₹"+Math.round(finalPrice);
    }
    //price.innerText="₹"+Math.round(finalPrice);

    //button
    let buttons=document.createElement("div");
    buttons.setAttribute("class","d-flex justify-content-around mt-2")

    let wishList=document.createElement("button");
    wishList.id="wish"+response.id;
    wishList.type="button"
    wishList.addEventListener("click",function(){
        window.open("singleProduct.html","_blank")
        localStorage.setItem("clickedItem",wishList.id)
    })
   // wishList.href="#"
    wishList.innerHTML="View this Product";
    wishList.setAttribute("Class","btn  btn-dark viewProduct")
    //wishList.setAttribute("type","button")
    buttons.appendChild(wishList);


    /*let addCart=document.createElement("button");
    addCart.id="cart"+response.id;
    addCart.innerHTML="<i class='bi bi-cart'></i>";
    addCart.setAttribute("Class","btn")
    addCart.setAttribute("title","Add to Cart")
    addCart.setAttribute("type","button")
    buttons.appendChild(addCart);*/

    cardbody.appendChild(brand)
    cardbody.appendChild(itemname)
    cardbody.appendChild(rating)
    cardbody.appendChild(price)
    cardbody.appendChild(buttons)
   // cardbody.appendChild(a);

    card.appendChild(cardbody)
    col.appendChild(card);
    $("#items").append(col);
}


$(function(){

    $("#orderBy option[value='OrderBy']").prop("selected",true)

    //retrieve data from western.json
    //displaying all items on opening the website

    $.getJSON("/Data/western.json",function(response){
        for(let i=0;i<response.length;i++){

            itemGen(response[i]);
        }
    })

    let itemsArr=[];

    //valdiate using checkbox
    //display the items according to the categories selected
    //making AJAX call and store it in different array for further filters

    
    $("#categoriesWhole").change(function(){
        $("#orderBy option[value='OrderBy']").prop("selected",true)
        $.getJSON("/Data/western.json",function(response){
        $("#items").empty()
        itemsArr=[];
        for(let i=0;i<response.length;i++){
            if($("#sweatshirts").is(":checked")||$("#tshirts").is(":checked")||$("#tops").is(":checked")||$("#pant").is(":checked")){
                if($("#sweatshirts").is(":checked")){  
                    if(response[i].category=="Sweatshirt"){
                        itemGen(response[i]);
                        itemsArr.push(response[i])
                    }
                }
                if($("#tshirts").is(":checked")){  
                    if(response[i].category=="T-shirt"){
                        itemGen(response[i]);
                        itemsArr.push(response[i])
                    }
                }
                if($("#tops").is(":checked")){  
                    if(response[i].category=="Shirt"){
                        itemGen(response[i]);
                        itemsArr.push(response[i])
                    }
                }
                if($("#pant").is(":checked")){  
                    if(response[i].category=="Pant"){
                        itemGen(response[i]);
                        itemsArr.push(response[i])
                    }
                }
                
            }else{
                itemGen(response[i]);
            }
        
        }

        //re-value the price range to 8000
        $("#myRange").val("8000")
        $("#myValue").text("₹.8000")

        //default view of 4 items per row
        $("#4col").addClass("btn-info")
    $("#3col").removeClass("btn-info")
    $(".card-col").addClass("col-xl-3")
    $(".card-col").removeClass("col col-xl-4")
    $("#4col").attr("disabled","disabled")
    $("#3col").removeAttr("disabled")
    })
 

    })

    //display values as per the selected range of price
    //display items which are already filtered on categories and show on prices vary
    let pricedArr=[];
    $("#myRange").change(function(){
        $("#orderBy option[value='OrderBy']").prop("selected",true)
        $.getJSON("/Data/western.json",function(response){
        $("#items").empty()
        pricedArr=[];
        if(itemsArr.length>0){
            for(let i=0;i<itemsArr.length;i++){
                let salePrice=0;
                if(itemsArr[i].offer!=0){
                    salePrice=(itemsArr[i].price)-(itemsArr[i].price*(itemsArr[i].offer/100))
                    salePrice= Math.round(salePrice)
                }else{
                    salePrice=itemsArr[i].price;
                }
    
                if(salePrice<=$("#myRange").val()){
                    itemGen(itemsArr[i]);
                    pricedArr.push(itemsArr[i])
                }
            
            }
        }else{

            for(let i=0;i<response.length;i++){
                let salePrice=0;
                if(response[i].offer!=0){
                    salePrice=(response[i].price)-(response[i].price*(response[i].offer/100))
                    salePrice= Math.round(salePrice)
                }else{
                    salePrice=response[i].price;
                }
    
                if(salePrice<=$("#myRange").val()){
                    itemGen(response[i]);
                }
            
            }

        }

        //default view of 4 items per row
        $("#4col").addClass("btn-info")
    $("#3col").removeClass("btn-info")
    $(".card-col").addClass("col-xl-3")
    $(".card-col").removeClass("col col-xl-4")
    $("#4col").attr("disabled","disabled")
    $("#3col").removeAttr("disabled")
        
    })
 
})

    //retrieve data from western.json
    //displaying all items on opening the website
    /*let nextPage=1;
    let fromBack=false;
    let itemsNextPage=8;
    let itemsBackPage=0;
    $.getJSON("/Data/western.json",function(response){

        $('#back').addClass('disabled');
         $("#pageNo").html("Page "+nextPage)   
        for(let i=0;i<8;i++){
            itemGen(response[i]);
        }

        //next button functionality
        //iterates over json input and shows forward 8 itmes per page
        $("#next").click(function(e){
            // if(fromBack){
            //     nextPage++;
            // }
            nextPage++;
            $('#back').removeClass('disabled'); 
            e.preventDefault();
            $("#items").empty();
            for(let i=itemsNextPage;i<nextPage*8;i++){
                if(pricedArr.length>0){
                    if(pricedArr[i]){
                        itemGen(pricedArr[i])
                    }
                }else if(itemsArr.length>0){
                    if(itemsArr[i]){
                        itemGen(itemsArr[i])
                    }
                }else if(response[i]){
                    itemGen(response[i]);
                }/*else{
                    $('#next').addClass('disabled');
                }
            }
            itemsBackPage=itemsNextPage;
            itemsNextPage+=8;
            fromBack=false;
            $("#pageNo").html("Page "+nextPage)   
        })

        //back button functionality
        //iterates over json file and shows the 8 previous items in one page
        $("#back").click(function(e){
            nextPage--;
            itemsBackPage-=8;
            e.preventDefault();
            $("#items").empty();
            for(let i=itemsBackPage;i<nextPage*8;i++){
                if(pricedArr.length>0){
                    if(pricedArr[i]){
                        itemGen(pricedArr[i])
                    }
                }else if(itemsArr.length>0){
                    if(itemsArr[i]){
                        itemGen(itemsArr[i])
                    }
                }else if(response[i]){
                    itemGen(response[i]);
                }
            }
            itemsNextPage-=8;
        
            fromBack=true;

            $("#pageNo").html("Page "+nextPage)   

            if(nextPage===1){
                $('#back').addClass('disabled');
            }
            $('#next').removeClass('disabled');
        })
    })
*/

//toprated items on whole
//toprated items when the particular category is being selected
//toprated items when the particular category is selected and within the price range

let topRated=0;
$("#rated").click(function(){
    $("#items").empty()
    topRated=0;
    let rateditem='';
    if(pricedArr.length>0){
        for(let i=0;i<pricedArr.length;i++){
            if(pricedArr[i].rating>topRated){
                topRated=pricedArr[i].rating;
               // rateditem=pricedArr[i];
            }
        }
            for(let i=0;i<pricedArr.length;i++){
                if(pricedArr[i].rating===topRated){
                    itemGen(pricedArr[i])
                }
            }
    }else if(itemsArr.length>0){
        for(let i=0;i<itemsArr.length;i++){
            if(itemsArr[i].rating>topRated){
                topRated=itemsArr[i].rating;
                //rateditem=itemsArr[i];
            }        
        }
            for(let i=0;i<itemsArr.length;i++){
                if(itemsArr[i].rating===topRated){
                    itemGen(itemsArr[i])
                }
            }
     }else{
        $.getJSON("/Data/western.json",function(response){
            for(let i=0;i<response.length;i++){
                if(response[i].rating>topRated){
                    topRated=response[i].rating;
                    //rateditem=response[i];
                }            
            }
                for(let i=0;i<response.length;i++){
                    if(response[i].rating===topRated){
                        itemGen(response[i])
                    }
                }
                })
    }

})

//topsale on overall collections - response from JSON
//topsale on category selected as well - itemsArr 
//topsale on price variation and category selected - pricedArr

let topSale=0;
let soldReview=0
$("#sale").click(function(){

    let soldItem="";
    $("#items").empty()
    topSale=0;
    if(pricedArr.length>0){
        for(let i=0;i<pricedArr.length;i++){
            if(pricedArr[i].reviews.includes("K")){
                soldItem=pricedArr[i].reviews.replace("K","");
                soldItem=soldItem*1000;
            }else{
                soldItem=pricedArr[i].reviews;
            }   
            if(soldItem>topSale){
                topSale=soldItem;
                //solditem=response[i];
            }  
        }
        for(let i=0;i<pricedArr.length;i++){
            if(pricedArr[i].reviews.includes("K")){
                soldReview=pricedArr[i].reviews.replace("K","");
                soldReview=soldReview*1000;
            }else{
                soldReview=pricedArr[i].reviews;
            }
            if(soldReview===topSale){
                itemGen(pricedArr[i])
            }
        }
    }else if(itemsArr.length>0){
        for(let i=0;i<itemsArr.length;i++){
            if(itemsArr[i].reviews.includes("K")){
                soldItem=itemsArr[i].reviews.replace("K","");
                soldItem=soldItem*1000;
            }else{
                soldItem=itemsArr[i].reviews;
            }   
            if(soldItem>topSale){
                topSale=soldItem;
                //solditem=response[i];
            }  
        }
        for(let i=0;i<itemsArr.length;i++){
            if(itemsArr[i].reviews.includes("K")){
                soldReview=itemsArr[i].reviews.replace("K","");
                soldReview=soldReview*1000;
            }else{
                soldReview=itemsArr[i].reviews;
            }
            if(soldReview===topSale){
                itemGen(itemsArr[i])
            }
        }
    }else{

        $.getJSON("/Data/western.json",function(response){
            for(let i=0;i<response.length;i++){
                if(response[i].reviews.includes("K")){
                    soldItem=response[i].reviews.replace("K","");
                    soldItem=soldItem*1000;
                }else{
                    soldItem=response[i].reviews;
                }
                if(soldItem>topSale){
                    topSale=soldItem;
                    //solditem=response[i];
                }            
            }

                for(let i=0;i<response.length;i++){
                    if(response[i].reviews.includes("K")){
                        soldReview=response[i].reviews.replace("K","");
                        soldReview=soldReview*1000;
                    }else{
                        soldReview=response[i].reviews;
                    }
                    if(soldReview===topSale){
                        itemGen(response[i])
                    }
                }
        })
    }
})

//top offer functionality

let topOffer=0;
$("#offer").click(function(){
    $("#items").empty()
    topOffer=0;

    //price ranged top offered items for both categorized and non-categorized
    if(pricedArr.length>0){
        for(let i=0;i<pricedArr.length;i++){
            if(pricedArr[i].offer>topOffer){
                topOffer=pricedArr[i].offer;
               // rateditem=pricedArr[i];
            }
        }
            for(let i=0;i<pricedArr.length;i++){
                if(pricedArr[i].offer===topOffer){
                    itemGen(pricedArr[i])
                }
            }
    }else if(itemsArr.length>0){ //categorized top offered items
        for(let i=0;i<itemsArr.length;i++){
            if(itemsArr[i].offer>topOffer){
                topOffer=itemsArr[i].offer;
                //rateditem=itemsArr[i];
            }        
        }
            for(let i=0;i<itemsArr.length;i++){
                if(itemsArr[i].offer===topOffer){
                    itemGen(itemsArr[i])
                }
            }
    }else{   //whole top offered items
        $.getJSON("/Data/western.json",function(response){
            for(let i=0;i<response.length;i++){
                if(response[i].offer>topOffer){
                    topOffer=response[i].offer;
                    //rateditem=response[i];
                }            
            }
            
                for(let i=0;i<response.length;i++){
                    if(response[i].offer===topOffer){
                        itemGen(response[i])
                    }
                }
        })
    }
})


//sorting
$("#orderBy").change(function(){
    let input=document.getElementById("orderBy");
    let orderBy=input.options[input.selectedIndex].value;
    $("#items").empty()
    if(orderBy==="A-Z"){
        if(pricedArr.length>0){ //categorized top offered items
            pricedArr.sort(function(a, b){
                var nameA = a.itemName.toLowerCase(), nameB = b.itemName.toLowerCase();
                if (nameA < nameB) //sort string ascending
                 return -1;
                if (nameA > nameB)
                 return 1;
                return 0; //default return value (no sorting)
               });
            for(let i=0;i<pricedArr.length;i++){
                itemGen(pricedArr[i])
            }
        }else if(itemsArr.length>0){ //categorized top offered items
            itemsArr.sort(function(a, b){
                var nameA = a.itemName.toLowerCase(), nameB = b.itemName.toLowerCase();
                if (nameA < nameB) //sort string ascending
                 return -1;
                if (nameA > nameB)
                 return 1;
                return 0; //default return value (no sorting)
               });
            for(let i=0;i<itemsArr.length;i++){
                itemGen(itemsArr[i])
            }
        }else{   //whole top offered items
            
        $.getJSON("/Data/western.json",function(response){
            response.sort(function(a, b){
                var nameA = a.itemName.toLowerCase(), nameB = b.itemName.toLowerCase();
                if (nameA < nameB) //sort string ascending
                 return -1;
                if (nameA > nameB)
                 return 1;
                return 0; //default return value (no sorting)
               });
            for(let i=0;i<response.length;i++){
                itemGen(response[i])
            }
    })
        }
    }else if(orderBy==="Z-A"){
            if(pricedArr.length>0){ //categorized top offered items
                pricedArr.sort(function(a, b){
                    var nameA = a.itemName.toLowerCase(), nameB = b.itemName.toLowerCase();
                    if (nameA < nameB) //sort string descending
                     return 1;
                    if (nameA > nameB)
                     return -1;
                    return 0; //default return value (no sorting)
                   });
                for(let i=0;i<pricedArr.length;i++){
                    itemGen(pricedArr[i])
                }
            }else if(itemsArr.length>0){ //categorized top offered items
                itemsArr.sort(function(a, b){
                    var nameA = a.itemName.toLowerCase(), nameB = b.itemName.toLowerCase();
                    if (nameA < nameB) //sort string descending
                     return 1;
                    if (nameA > nameB)
                     return -1;
                    return 0; //default return value (no sorting)
                   });
                for(let i=0;i<itemsArr.length;i++){
                    itemGen(itemsArr[i])
                }
            }else{   //whole top offered items
                
            $.getJSON("/Data/western.json",function(response){
                response.sort(function(a, b){
                    var nameA = a.itemName.toLowerCase(), nameB = b.itemName.toLowerCase();
                    if (nameA < nameB) //sort string descending
                     return 1;
                    if (nameA > nameB)
                     return -1;
                    return 0; //default return value (no sorting)
                   });
                for(let i=0;i<response.length;i++){
                    itemGen(response[i])
                }
        })
    }}
});

$("#clear").click(function(){

    //default view with 4 columns
    $("#4col").addClass("btn-info")
    $("#3col").removeClass("btn-info")
    $(".card-col").addClass("col-xl-3")
    $(".card-col").removeClass("col col-xl-4")
    $("#4col").attr("disabled","disabled")
    $("#3col").removeAttr("disabled")

    //displaying all items instead of filters
    $("#items").empty()

    $.getJSON("/Data/western.json",function(response){
        for(let i=0;i<response.length;i++){

            itemGen(response[i]);
        }
    })

    //remove all sorting and show the items bu default as per JSON
    $("#orderBy option[value='OrderBy']").prop("selected",true)

    //Re-value to 8000 rupees as there is no filter
    $("#myRange").val("8000")
    $("#myValue").text("₹.8000")

    //unchecked all the categories which are selected
    $("#sweatshirts").attr("checked",false)
    $("#tshirts").attr("checked",false)
    $("#tops").attr("checked",false)
    $("#pant").attr("checked",false)

})

//display the items by 3 items per row
$("#3col").click(function(){
    $("#3col").addClass("btn-info")
    $("#4col").removeClass("btn-info")
    $(".card-col").addClass("col-xl-4")
    $(".card-col").removeClass("col-xl-3")
    $("#3col").attr("disabled","disabled")
    $("#4col").removeAttr("disabled")

})
//display the items by 4 items per row
$("#4col").click(function(){
    $("#4col").addClass("btn-info")
    $("#3col").removeClass("btn-info")
    $(".card-col").addClass("col-xl-3")
    $(".card-col").removeClass("col col-xl-4")
    $("#4col").attr("disabled","disabled")
    $("#3col").removeAttr("disabled")

})



//offer sale timeout
    function timeOut(){
        
    let countDownDate=new Date("March 17, 2024 22:55:59").getTime();

    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $("#timer").html(days + "d " + hours + "h "    + minutes + "m " + seconds + "s ")
    if(distance<0){
        $(".newSale").text("Offer will be open soon!")
    }
    }

    setInterval(timeOut,1000);


})






