const recherche = document.getElementById('cityInput')
const buttonSearch = document.getElementById('buttonSearch')
const villesMar = await fetch("./data/ville.json")
const villes = await villesMar.json()
const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&utm_source=chatgpt.com"
const message = document.getElementById("toastMessage")
const divMessage = document.getElementById('toast')





buttonSearch.addEventListener('click' , ()=>{
  const ville = recherche.value.trim() 

 

    if(ville === ""){
    divMessage.classList.remove('hidden')
    message.textContent = "Veiller entrer un ville"
  return
    }
    const villeChoisie = villes.find(element => {
      return element.city.toLowerCase() === ville.toLowerCase()
    })

    if(villeChoisie){
      divMessage.classList.remove('hidden')
 
    }else{
      divMessage.classList.remove('hidden')
    message.textContent = "Veiller entrer un ville marocain"
    }
  
  
  
})


// function villeChoisie(ville){
//   ville = recherche.value


// console.log(geoCode)
// }
// fetch(url)
// .then(response => response.json())
// .then(data => {
//   console.log(data)
// })