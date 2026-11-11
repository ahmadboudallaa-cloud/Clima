import{ WEATHER_CODES} from "./../data/icones"
const recherche = document.getElementById('cityInput')
const buttonSearch = document.getElementById('buttonSearch')
const villesMar = await fetch("./data/ville.json")
const villes = await villesMar.json()
const message = document.getElementById("toastMessage")
const divMessage = document.getElementById('toast')
const ciluce = document.getElementById('mainTemp')
const localisation = document.getElementById('locationName')
const titreVille = document.getElementById('ville-page')
const weatherCondition = document.getElementById('weatherCondition')
const iconesDiv = document.getElementById('icones-meteo')
const maxMinMeteo = document.getElementById('max-min-meteo')
const sunriseTime = document.getElementById('sunriseTime')
const sunsetTime = document.getElementById('sunsetTime')










function affichageMeteo(){
   const ville = recherche.value.trim() 
  
 

    if(ville === ""){
    divMessage.classList.remove('hidden')
    message.textContent = "Veiller entrer une ville"
    
  return
    }
    const villeChoisie = villes.find(element => {
      return element.city.toLowerCase() === ville.toLowerCase()
      
    })

    if(villeChoisie){
      divMessage.classList.remove('hidden')
      setTimeout(()=>{
        divMessage.classList.add('hidden')
      }
      ,2000)
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${villeChoisie.lat}&longitude=${villeChoisie.lng}&current=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&forecast_days=6&timezone=auto`
      fetch(url)
.then(response => response.json())
.then(data => {
  ciluce.textContent = `${data.current.temperature_2m}${data.current_units.temperature_2m} `
  localisation.textContent = `${villeChoisie.city}, ${villeChoisie.country} `
  titreVille.textContent = `${villeChoisie.city} Overview`
  weatherCondition.textContent = `${WEATHER_CODES[data.current.weather_code].label}`
 
  const iconeMeteo = document.createElement('p')
  iconeMeteo.classList.add("text-6xl")
iconesDiv.innerHTML = ""
iconesDiv.append(iconeMeteo)

iconeMeteo.textContent = WEATHER_CODES[data.current.weather_code].icon
maxMinMeteo.textContent = "High:"
const hightTemp = document.createElement('span')
hightTemp.id = "highTemp"
hightTemp.classList.add("text-amberSolar-400")
hightTemp.textContent = `${data.daily.temperature_2m_max[0]}°`
maxMinMeteo.append(hightTemp , "• Low: ")

const lowTemp = document.createElement('span')
lowTemp.id = "lowTemp"
lowTemp.classList.add("text-amberSolar-400")
lowTemp.textContent = `${data.daily.temperature_2m_min[0]}°`
maxMinMeteo.append(lowTemp)
const sunriseTime1 = data.daily.sunrise[0].split("T")[1]
const sunsetTime2 = data.daily.sunset[0].split("T")[1]


sunriseTime.textContent = `${sunriseTime1}`
sunsetTime.textContent = `${sunsetTime2}`



})
      
 
    }else{
      divMessage.classList.remove('hidden')
    message.textContent = "Veiller entrer une ville marocain"
   
    }
  
}



buttonSearch.addEventListener('click' , ()=>{
 
  affichageMeteo();
  
})


