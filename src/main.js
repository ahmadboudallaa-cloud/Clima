import { WEATHER_CODES } from "./../data/icones";
const recherche = document.getElementById("cityInput");
const buttonSearch = document.getElementById("buttonSearch");
const villesMar = await fetch("./data/ville.json");
const villes = await villesMar.json();
const message = document.getElementById("toastMessage");
const divMessage = document.getElementById("toast");
const ciluce = document.getElementById("mainTemp");
const localisation = document.getElementById("locationName");
const titreVille = document.getElementById("ville-page");
const weatherCondition = document.getElementById("weatherCondition");
const iconesDiv = document.getElementById("icones-meteo");
const maxMinMeteo = document.getElementById("max-min-meteo");
const sunriseTime = document.getElementById("sunriseTime");
const sunsetTime = document.getElementById("sunsetTime");
const dateName = document.getElementById("dateName");
const hourName = document.getElementById("hourName");
let timeZone = "";
let dateFormat = "";
const villeSauvgarde = localStorage.getItem("villeChoisie");
const humidity = document.getElementById('humidityVal')
const humidityBar = document.getElementById('humidityBar')
const windVal = document.getElementById('windVal')
const pressureVal = document.getElementById('pressureVal')

const afficherHeure = (timeZone) => {
  const maintenant = new Date();

  const heure = maintenant.toLocaleTimeString("fr-FR", {
    timeZone: timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  hourName.textContent = heure;
};

function affichageMeteo() {
  let ville = recherche.value.trim();

  if (!ville) {
    divMessage.classList.remove("hidden");
    message.textContent = "Veiller entrer une ville";
    return;
  }

  const villeChoisie = villes.find((element) => {
    return element.city.toLowerCase() === ville.toLowerCase();
  });

  if (villeChoisie === undefined) {
    divMessage.classList.remove("hidden");
    message.textContent = "Veiller entrer une ville marocain";
    return;
  } else {
    divMessage.classList.remove("hidden");
    setTimeout(() => {
      divMessage.classList.add("hidden");
    }, 2000);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${villeChoisie.lat}&longitude=${villeChoisie.lng}&current=temperature_2m,weather_code,is_day,relative_humidity_2m,wind_speed_10m,surface_pressure&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&forecast_days=6&timezone=auto`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        ciluce.textContent = `${data.current.temperature_2m}${data.current_units.temperature_2m} `;
        localisation.textContent = `${villeChoisie.city}, ${villeChoisie.country} `;
        titreVille.textContent = `Aperçu de ${villeChoisie.city} `;
        weatherCondition.textContent = `${WEATHER_CODES[data.current.weather_code].label}`;

        const iconeMeteo = document.createElement("p");
        iconeMeteo.classList.add("text-6xl");
        iconesDiv.innerHTML = "";
        iconesDiv.append(iconeMeteo);

        iconeMeteo.textContent = WEATHER_CODES[data.current.weather_code].icon;
        maxMinMeteo.textContent = "Haut:";
        const hightTemp = document.createElement("span");
        hightTemp.id = "highTemp";
        hightTemp.classList.add("text-amberSolar-400");
        hightTemp.textContent = `${data.daily.temperature_2m_max[0]}°`;
        maxMinMeteo.append(hightTemp, "• Bas: ");

        const lowTemp = document.createElement("span");
        lowTemp.id = "lowTemp";
        lowTemp.classList.add("text-amberSolar-400");
        lowTemp.textContent = `${data.daily.temperature_2m_min[0]}°`;
        maxMinMeteo.append(lowTemp);
        const sunriseTime1 = data.daily.sunrise[0].split("T")[1];
        const sunsetTime2 = data.daily.sunset[0].split("T")[1];

       humidity.textContent = `${data.current.relative_humidity_2m}%`
       humidityBar.style.width = `${data.current.relative_humidity_2m}%`
       windVal.textContent = `${data.current.wind_speed_10m}`;


pressureVal.textContent = `${data.current.surface_pressure}`
        sunriseTime.textContent = `${sunriseTime1}`;
        sunsetTime.textContent = `${sunsetTime2}`;
        const date = data.current.time.split("T")[0];
        timeZone = data.timezone;
        dateFormat = new Date(date).toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        dateName.textContent = `${dateFormat}`;
        afficherHeure(timeZone);
      });
  }

  localStorage.setItem("villeChoisie", villeChoisie.city);
  recherche.value = "";
}

buttonSearch.addEventListener("click", () => {
  affichageMeteo();
});

recherche.value = villeSauvgarde || "Rabat";
affichageMeteo();

setInterval(() => {
  if (timeZone) {
    afficherHeure(timeZone);
  }
}, 1000);






// const previsions = document.getElementById("previsions");

// // Vider les anciennes prévisions
// previsions.innerHTML = "";

// // Parcourir les autres jours (on commence à 1 pour ignorer aujourd'hui)
// for (let i = 1; i < data.daily.time.length; i++) {

//     // Créer une carte
//     const carte = document.createElement("div");
//     carte.classList.add(
//         "bg-white",
//         "rounded-2xl",
//         "p-5",
//         "shadow-sm",
//         "border",
//         "border-skyBlue-100"
//     );

//     // Récupérer la date
//     const date = new Date(data.daily.time[i] + "T00:00:00");

//     const jour = date.toLocaleDateString("fr-FR", {
//         weekday: "long",
//         day: "numeric",
//         month: "long"
//     });

//     // Récupérer le code météo
//     const codeMeteo = data.daily.weather_code[i];

//     // Créer les éléments HTML
//     const nomJour = document.createElement("h3");
//     nomJour.textContent = jour;

//     const icone = document.createElement("p");
//     icone.classList.add("text-4xl", "my-3");
//     icone.textContent = WEATHER_CODES[codeMeteo].icon;

//     const condition = document.createElement("p");
//     condition.textContent = WEATHER_CODES[codeMeteo].label;

//     const temperature = document.createElement("p");
//     temperature.classList.add("mt-3", "font-bold");

//     temperature.textContent =
//         `${data.daily.temperature_2m_max[i]}° / ${data.daily.temperature_2m_min[i]}°`;

//     // Ajouter les éléments dans la carte
//     carte.append(nomJour, icone, condition, temperature);

//     // Ajouter la carte dans la div principale
//     previsions.append(carte);
// }