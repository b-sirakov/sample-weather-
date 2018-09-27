
const apiKey = "2add6bdc39943f0938fac2913bb5d0c4";
$(document).ready(function(){

    startBasicLogic()

    addEventListenerForForm();
    
    function startBasicLogic () {

        let httpReq = new XMLHttpRequest();
    
        httpReq.addEventListener("load",function(event){
            let resObj = JSON.parse(httpReq.response);
            console.log('User\'s Location Data is ', resObj);
            console.log('User\'s Country', resObj.country);
    
            getDataForLocation(resObj.city);
        });
    
        httpReq.addEventListener("error",function(event){
            console.log(event);
        });
    
        httpReq.open("GET",'http://ip-api.com/json');
    
        httpReq.send();
    }

    function addEventListenerForForm(){
        $("form").on("submit",function(event){
            event.preventDefault();
    
            let city = $("form input:first-child").val();
            getDataForLocation(city);
            console.log(event);
        });
    }

    function getDataForLocation(strLocation){
        $.get(`http://localhost:4000/home/${strLocation}`).then(function(response){
            let weatherObj = JSON.parse(response);
            console.log(weatherObj);

            let img = document.querySelector("#div-weather-img img");
            img.setAttribute("src",`http://openweathermap.org/img/w/${weatherObj.weather[0].icon}.png`);

            document.querySelector("#city").textContent = weatherObj.name;
            document.querySelector("#condition").textContent = weatherObj.weather[0].description;

            document.querySelector("#temp").textContent = weatherObj.main.temp + " C";
            document.querySelector("#pressure").textContent = weatherObj.main.pressure + " hPa";
            document.querySelector("#humidity").textContent = weatherObj.main.humidity + " %";
            $("#wind-speed").text(weatherObj.wind.speed + " mph");
        });
    }

});
