
import "./style.css";
import { WEATHER_CODES } from "./data/icones";

const recherche = document.getElementById("cityInput");
const buttonSearch = document.getElementById("buttonSearch");
const btnRetry = document.getElementById('btnRetry')
const villesMar = await fetch(`${import.meta.env.BASE_URL}data/ville.json`);
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
const humidity = document.getElementById("humidityVal");
const humidityBar = document.getElementById("humidityBar");
const windVal = document.getElementById("windVal");
const pressureVal = document.getElementById("pressureVal");
const daysContainer = document.getElementById("daysContainer");
const loading = document.getElementById("loading");
const weatherContent = document.getElementById("weatherContent");
const errorContent = document.getElementById("errorContent");
// const carteDays = creerCarte()

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

function afficherChargement() {
  loading.classList.remove("hidden");
  weatherContent.classList.add("hidden");
  errorContent.classList.add("hidden");
}

function afficherError(error) {
  loading.classList.add("hidden");
  weatherContent.classList.add("hidden");
  errorContent.classList.remove("hidden");
  document.getElementById("errorMessage").textContent = error;
}
function creerCarte(days, month, icone, genre, maxMeteo, minMeteo) {
  const divCarte = document.createElement("div");
  divCarte.classList.add(
    "col-span-2",
    "sm:col-span-1",
    "group",
    "flex",
    "flex-col",
    "items-center",
    "justify-between",
    "p-5",
    "rounded-3xl",
    "bg-slateGray-900/95",
    "border",
    "border-slate-200/60",
    "dark:border-slate-700/50",
    "shadow-xs",
    "backdrop-blur-md",
    "transition-all",
    "duration-300",
    "hover:-translate-y-1",
    "hover:bg-white",
    "dark:hover:bg-slate-800",
    "cursor-pointer",
  );
  const spanDay = document.createElement("span");
  spanDay.classList.add(
    "text-xs",
    "font-semibold",
    "uppercase",
    "tracking-wider",
    "text-slate-700",
    "dark:text-slate-200",
  );
  spanDay.textContent = `${days}`;
  const spanMonth = document.createElement("span");
  spanMonth.classList.add("text-xs", "text-slate-400", "mt-0.5");
  spanMonth.textContent = `${month}`;
  const iconeMeteoDay = document.createElement("p");
  iconeMeteoDay.classList.add("text-4xl");
  iconeMeteoDay.textContent = `${icone}`;
  const genreMeteo = document.createElement("p");
  genreMeteo.classList.add(
    "text-xs",
    "font-medium",
    "text-slate-500",
    "dark:text-slate-400",
    "mb-2",
  );

  genreMeteo.textContent = `${genre}`;

  const divMaxMinMeteo = document.createElement("div");
  divMaxMinMeteo.classList.add("flex", "items-center", "gap-2", "text-sm");
  const spanMax = document.createElement("span");
  spanMax.classList.add("font-bold", "text-amberSolar-400");
  spanMax.textContent = `${maxMeteo}`;
  const spanFleche = document.createElement("span");
  spanFleche.classList.add("text-slate-400");
  spanFleche.textContent = "/";
  const spanMin = document.createElement("span");
  spanMin.classList.add("font-medium", "text-slate-400");
  spanMin.textContent = `${minMeteo}`;
  divMaxMinMeteo.append(spanMax, spanFleche, spanMin);
  divCarte.append(
    spanDay,
    spanMonth,
    iconeMeteoDay,
    genreMeteo,
    divMaxMinMeteo,
  );

  return divCarte;
}

function affichageMeteo() {
 
  let ville = recherche.value.trim();

  if (ville === "") {
    divMessage.classList.remove("hidden");
    message.textContent = "Veiller entrer une ville";
     setTimeout(() => {
      divMessage.classList.add("hidden");
    }, 2000);
    return;
  }

  const villeChoisie = villes.find((element) => {
    return element.city.toLowerCase() === ville.toLowerCase();
  });

  if (villeChoisie === undefined) {
    divMessage.classList.remove("hidden");
    message.textContent = "Veiller entrer une ville marocain";
     setTimeout(() => {
      divMessage.classList.add("hidden");
    }, 2000);
    return;
  }else{
    divMessage.classList.remove("hidden");
    message.textContent = "Les données ont été mises à jour avec succès !" 
     setTimeout(() => {
      divMessage.classList.add("hidden");
    }, 2000);
 
  }
  
   
     
 afficherChargement();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${villeChoisie.lat}&longitude=${villeChoisie.lng}&current=temperature_2m,weather_code,is_day,relative_humidity_2m,wind_speed_10m,surface_pressure&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&forecast_days=6&timezone=auto`;
   Promise.all([
  fetch(url),
  new Promise((resolve) => {setTimeout(resolve, 1000)
  })
])
      .then(([response]) => {
         if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
      })
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

        humidity.textContent = `${data.current.relative_humidity_2m}%`;
        humidityBar.style.width = `${data.current.relative_humidity_2m}%`;
        windVal.textContent = `${data.current.wind_speed_10m}`;

        pressureVal.textContent = `${data.current.surface_pressure}`;
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
daysContainer.innerHTML = "";
        for (let i = 1; i < data.daily.time.length; i++) {
          const dateCarte = new Date(data.daily.time[i]);

          const days = dateCarte.toLocaleDateString("fr-FR", {
            weekday: "long",
          });
          const month = dateCarte.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
          });
          const icone = `${WEATHER_CODES[data.daily.weather_code[i]].icon}`;
          const genre = `${WEATHER_CODES[data.daily.weather_code[i]].label}`;
          const maxMeteo = `${data.daily.temperature_2m_max[i]}`;
          const minMeteo = `${data.daily.temperature_2m_min[i]}`;

          const carteDay = creerCarte(
            days,
            month,
            icone,
            genre,
            maxMeteo,
            minMeteo,
          );

          

          daysContainer.append(carteDay);
        }
        loading.classList.add("hidden");
    weatherContent.classList.remove("hidden");
      })
      .catch((error) => {
        console.error(error);
        afficherError("Impossible de récupérer les données météo.");
      });
  

  localStorage.setItem("villeChoisie", villeChoisie.city);
  recherche.value = "";
}

buttonSearch.addEventListener("click", () => {
 
  affichageMeteo();
});

btnRetry.addEventListener("click",() =>{
 recherche.value = villeSauvgarde || "Rabat";
  affichageMeteo();
})
recherche.value = villeSauvgarde || "Rabat";
affichageMeteo();

setInterval(() => {
  if (timeZone) {
    afficherHeure(timeZone);
  }
}, 1000);
