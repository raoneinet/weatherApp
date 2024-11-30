
function getPosition(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
           async function(position){
                let lat = position.coords.latitude
                let lon = position.coords.longitude

                let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b494e566fdd1ebe8fae7a88d54b3a1e9&units=metric&lang=pt_br`
                let locationRequest = await fetch(locationUrl)
                let requestResponse = await locationRequest.json()

                if(requestResponse.cod === 200){
                    document.querySelector(".city").innerHTML = requestResponse.name
                    document.querySelector(".country").innerHTML = requestResponse.sys.country
                    document.querySelector(".temp").innerHTML = `${requestResponse.main.temp.toFixed(0)}<sup>ºC</sup>`
                    document.querySelector(".userImgSite").src = `http://openweathermap.org/img/wn/${requestResponse.weather[0].icon}.png`
                    document.querySelector(".sky").innerHTML = requestResponse.weather[0].description
                }     
        })
    }
}

document.querySelector("#search").addEventListener("click", async (e)=>{
    e.preventDefault()

    let search = document.querySelector(".locationInput").value
    
    if(search != ""){
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(search)}&appid=b494e566fdd1ebe8fae7a88d54b3a1e9&units=metric&lang=pt_br`
        let urlFetch = await fetch(weatherUrl)
        let json = await urlFetch.json()
        
        if( json.cod === 200){
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                icon: json.weather[0].icon,
                sky: json.weather[0].description,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
                realFeel: json.main.feels_like
            })
            
        }else{
            error("Localização não encontrada")
        }
        search.innerHTML = ""
    }else{
        error("Localização não encontrada")
    }
    search.innerHTML = ""
    
})

function showInfo(json){
    document.querySelector(".citySearch").innerHTML = `${json.city} <sup>${json.country}</sup>`
    document.querySelector(".searchIcon").src = `http://openweathermap.org/img/wn/${json.icon}.png`
    document.querySelector(".tempSearch").innerHTML = `${json.temp.toFixed(0)} <sup>ºC</sup>`
    document.querySelector(".skySearch").innerHTML = json.sky
    document.querySelector(".wind").innerHTML = `${json.windSpeed} <sup>Km/h</sup>` 
    document.querySelector(".humid").innerHTML = `${json.humidity} %`
    document.querySelector(".feelsLike").innerHTML = `${json.realFeel} <sup>ºC</sup>`
    search.innerHTML = ""

}

function error(msg){
    alert(msg)
}

getPosition()



