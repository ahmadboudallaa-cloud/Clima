const recherche = document.getElementById('cityInput')
const buttonSearch = document.getElementById('buttonSearch')
const villesMar = await fetch("./data/ville.json")
const villes = await villesMar.json()
const message = document.getElementById("toastMessage")
const divMessage = document.getElementById('toast')
const ciluce = document.getElementById('mainTemp')
const localisation = document.getElementById('locationName')





buttonSearch.addEventListener('click' , ()=>{
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
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${villeChoisie.lat}&longitude=${villeChoisie.lng}&current=temperature_2m`
      fetch(url)
.then(response => response.json())
.then(data => {
  ciluce.textContent = `${data.current.temperature_2m}°C `
  localisation.textContent = `${villeChoisie.city}, ${villeChoisie.country} `
  

  


})
      
 
    }else{
      divMessage.classList.remove('hidden')
    message.textContent = "Veiller entrer une ville marocain"
   
    }
  
  
  
})



