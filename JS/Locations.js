let state=["Andhra Pradesh","Delhi","Kerala","Pondicherry","Maharastra","Tamil Nadu"];

let andhracities=["Vijayawada","Vizag"];
let delhicities=["Delhi"];
let keralacities=["Kochin","Thirisur","Trivandrum"];
let pondicities=["Pondicherry"];
let maharastracities=["Mumbai","Pune","Thane"];
let tamilcities=["Chennai","Coimbatore","Madurai","Trichy"];



let chennaiArea=["T.Nagar","Anna Nagar","Sholinganallur","Thousand Lights","Chrompet"];
let CoimbatoreArea=["Peelamedu","Gandhipuram"]
let maduraiArea=["Goripalayam"]
let trichyArea=["Thillai Nagar"]
let kochinArea=["Ernakulam","Kakkanad"]
let thirisurArea=["Thirisur"]
let trivandrumArea=["Trivandrum"]
let pondiArea=["Auroville"]
let delhiArea=["Paschim Vihar"]
let mumbaiArea=["Marol","Khar west"]
let puneArea=['Swargate']
let thaneArea=["Bhavani Nagar"]
let vijayArea=["Gunadala"]
let vizagArea=["Tungalam","Gajuwaka"]

$(function(){
    $(".location-head").hide();
    for(let states of state){
        $("#state").append("<option value='"+states+"'>"+states+"</options>")
    }

    $("#state").change(function(){
        $(".location-head").hide();
        $(".location-details").html("");
        $("#city").empty();
        let city=[],allCities;
        let stateName=$("#state").val();

        if(stateName=="Andhra Pradesh"){
            city=andhracities;
        }else if(stateName=="Delhi"){
            city=delhicities;
        }else if(stateName=="Kerala"){
            city=keralacities;
        }else if(stateName=="Pondicherry"){
            city=pondicities;
        }else if(stateName=="Maharastra"){
            city=maharastracities;
        }else if(stateName=="Tamil Nadu"){
            city=tamilcities;
        }else if(stateName=="Pondicherry"){
            city=maharastracities;
        }else if(stateName=="Tamil Nadu"){
            city=tamilcities;
        }
        
        for(let cities of city){
            allCities+="<option value='"+cities+"'>"+cities+"</options>";
        }
        $("#city").append("<option value='' selected readonly disabled>-- SELECT A CITY --</option>"+allCities)

        $.getJSON("/Data/location.json",function(response){
            if(response!==""){
                let stateMap=response.state[$("#state").val()];
                $(".maps").attr("src",stateMap.url)
            }
        })
    })

    $("#city").change(function(){
        $(".location-head").hide();
        $(".location-details").html("");
        $("#storeArea").empty();
        let stores=[],allStores;
        let cityName=$("#city").val();

        if(cityName=="Chennai"){
            stores=chennaiArea;
        }else if(cityName=="Coimbatore"){
            stores=CoimbatoreArea;
        }else if(cityName=="Madurai"){
            stores=maduraiArea;
        }else if(cityName=="Trichy"){
            stores=trichyArea;
        }else if(cityName=="Thirisur"){
            stores=thirisurArea;
        }else if(cityName=="Trivandrum"){
            stores=trivandrumArea;
        }else if(cityName=="Kochin"){
            stores=kochinArea;
        }else if(cityName=="Pondicherry"){
            stores=pondiArea;
        }else if(cityName=="Delhi"){
            stores=delhiArea;
        }else if(cityName=="Mumbai"){
            stores=mumbaiArea;
        }else if(cityName=="Thane"){
            stores=thaneArea;
        }else if(cityName=="Pune"){
            stores=puneArea;
        }else if(cityName=="Vizag"){
            stores=vizagArea;
        }else if(cityName=="Vijayawada"){
            stores=vijayArea;
        }
        
        for(let store of stores){
            allStores+="<option value='"+store+"'>"+store+"</options>";
        }
        $("#storeArea").append("<option value='' selected readonly disabled>-- SELECT A STORE AREA --</option>"+allStores)

        $.getJSON("/Data/location.json",function(response){
            if(response!==""){
                let stateMap=response.city[$("#city").val()];
                $(".maps").attr("src",stateMap.url)
            }
        })
    })

    $("#storeArea").change(function(){
        $(".location-details").empty();
        $.getJSON("/Data/location.json",function(response){
            if(response!==""){
                let locateArr=response.stores[$("#storeArea").val()];
                $(".maps").attr("src",locateArr.url)
                $(".location-details").html('<svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>');
                $(".location-details").append(locateArr.Address);
                $(".location-all").addClass("p-5")
                $(".location-head").show();
            }
        })
    })
    $("#nearer").click(function(){
        $(".location-head").show();
    })
})