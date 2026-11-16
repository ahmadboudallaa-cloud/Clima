# 🌤️ Clima — Application météo

Clima est une application web permettant de consulter les conditions météorologiques et la qualité de l'air de plusieurs villes marocaines.

L'application utilise des API publiques pour récupérer les données météorologiques en temps réel et les prévisions des prochains jours. Elle permet également de rechercher une ville et d'afficher les informations correspondantes dans une interface simple et intuitive.

## 1. Technologies utilisées

- **HTML5** : structure de l'application.
- **Tailwind CSS** : mise en forme et design responsive.
- **JavaScript (Vanilla JS)** : logique de l'application et manipulation du DOM.
- **Fetch API** : récupération des données depuis les API.
- **JSON** : stockage des villes marocaines et format des réponses API.
- **LocalStorage** : mémorisation de la dernière ville recherchée.
- **Open-Meteo** : API météorologique et API de qualité de l'air.

## 2. API utilisées

Clima utilise deux API publiques fournies par [Open-Meteo](https://open-meteo.com/).

### A. Weather Forecast API

Cette API permet de récupérer les conditions météorologiques actuelles ainsi que les prévisions quotidiennes.

**Endpoint :**

```text
https://api.open-meteo.com/v1/forecast
```

**Méthode HTTP :** GET

**Paramètres utilisés :**

| Paramètre | Description |
|---|---|
| latitude | Latitude de la ville |
| longitude | Longitude de la ville |
| current | Données météorologiques actuelles |
| daily | Prévisions météorologiques quotidiennes |
| forecast_days | Nombre de jours de prévision (6 dans Clima) |
| timezone | Fuseau horaire automatique selon les coordonnées |

**Données actuelles récupérées :**

- `temperature_2m` : température actuelle.
- `weather_code` : code décrivant les conditions météorologiques.
- `is_day` : indique si c'est le jour ou la nuit.
- `relative_humidity_2m` : taux d'humidité.
- `wind_speed_10m` : vitesse du vent.
- `surface_pressure` : pression atmosphérique.

**Prévisions quotidiennes récupérées :**

- `time` : date de prévision.
- `temperature_2m_max` : température maximale.
- `temperature_2m_min` : température minimale.
- `weather_code` : code météorologique.
- `sunrise` : heure du lever du soleil.
- `sunset` : heure du coucher du soleil.

### B. Air Quality API

Cette API permet de récupérer l'indice de qualité de l'air pour la ville recherchée.

**Endpoint :**

```text
https://air-quality-api.open-meteo.com/v1/air-quality
```

**Méthode HTTP :** GET

**Paramètres utilisés :**

| Paramètre | Description |
|---|---|
| latitude | Latitude de la ville |
| longitude | Longitude de la ville |
| current | Données actuelles de qualité de l'air |
| us_aqi | Indice américain de qualité de l'air |

**Donnée récupérée :**

- `us_aqi` : indice américain de qualité de l'air.

## 3. Exemple de réponse JSON

Voici un exemple simplifié des données retournées par Weather Forecast API :

```json
{
  "latitude": 34.02,
  "longitude": -6.84,
  "timezone": "Africa/Casablanca",
  "current": {
    "temperature_2m": 22.5,
    "weather_code": 1,
    "is_day": 1,
    "relative_humidity_2m": 55,
    "wind_speed_10m": 12.4,
    "surface_pressure": 1015.2
  },
  "daily": {
    "time": [
      "2026-11-16",
      "2026-11-17"
    ],
    "temperature_2m_max": [25.2, 24.1],
    "temperature_2m_min": [15.3, 14.8],
    "weather_code": [1, 2],
    "sunrise": [
      "2026-11-16T07:45",
      "2026-11-17T07:46"
    ],
    "sunset": [
      "2026-11-16T18:20",
      "2026-11-17T18:19"
    ]
  }
}
```

*Exemple illustratif : les valeurs ne représentent pas nécessairement les conditions météorologiques réelles.*

## 4. Fonctionnement de l'application

### Recherche d'une ville

1. L'utilisateur saisit le nom d'une ville dans le champ de recherche.
2. JavaScript vérifie que le champ n'est pas vide.
3. La ville est recherchée dans le fichier JSON contenant les villes marocaines et leurs coordonnées géographiques.
4. Si la ville existe, ses coordonnées (latitude et longitude) sont utilisées pour construire les URL des API.
5. Si la ville est inconnue, un message d'erreur est affiché.

### Récupération des données

Les données sont récupérées avec la méthode `fetch()` et les requêtes HTTP GET.

L'application vérifie le statut de la réponse avec `response.ok`, puis transforme les réponses en objets JavaScript avec `response.json()`.

Les deux API sont utilisées pour récupérer les informations météorologiques et la qualité de l'air.

### Affichage dans le DOM

Les données récupérées sont utilisées pour mettre à jour les différentes parties de l'interface :

- **Conditions actuelles :** température, description météo, humidité, vitesse du vent et pression atmosphérique.
- **Prévisions :** création dynamique de cartes contenant les dates, les températures minimales et maximales et les conditions météo.
- **Qualité de l'air :** affichage de l'indice US AQI.
- **Informations solaires :** heures du lever et du coucher du soleil.
- **Date et heure :** affichage adapté au fuseau horaire de la ville sélectionnée.

Les codes météorologiques retournés par l'API sont associés à des descriptions et des icônes grâce à un objet JavaScript `WEATHER_CODES`.

Les cartes de prévision sont créées dynamiquement à partir des données reçues.

### Gestion des états et des erreurs

L'application prévoit trois états principaux :

- **Chargement :** affichage d'un indicateur pendant la récupération des données.
- **Succès :** affichage du tableau de bord après réception des données.
- **Erreur :** affichage d'un message compréhensible en cas de problème.

Les erreurs prises en compte comprennent :

- Champ de recherche vide.
- Ville absente du fichier JSON.
- Problème de connexion ou API indisponible.
- Limite de requêtes atteinte.
- Réponse HTTP incorrecte.

Un bouton permet à l'utilisateur de réessayer la récupération des données.

## 5. Limites et utilisation des API

Clima utilise les API publiques d'Open-Meteo.

Les principales limites à prendre en compte :

- L'accès gratuit est destiné à une utilisation non commerciale.
- La limite gratuite est de **10 000 appels API par jour**.
- Aucune clé API n'est nécessaire pour l'utilisation gratuite non commerciale.
- Les données météorologiques et de qualité de l'air dépendent des modèles et des mises à jour d'Open-Meteo.
- Une connexion Internet est nécessaire pour récupérer les données.
- Les API peuvent être temporairement indisponibles.

**Attribution :** les données Open-Meteo sont distribuées sous licence Creative Commons Attribution 4.0 International (CC BY 4.0). La source doit être mentionnée.

Documentation officielle :
- [Weather Forecast API](https://open-meteo.com/en/docs)
- [Air Quality API](https://open-meteo.com/en/docs/air-quality-api)
- [Conditions d'utilisation et tarifs](https://open-meteo.com/en/pricing)

## 6. Installation et lancement

Clona le dépôt :

```bash
git clone URL_DU_DEPOT
```

Accède au dossier du projet :

```bash
cd Clima
```

Installe les dépendances :

```bash
npm install
```

Lance le serveur de développement :

```bash
npm run dev
```

Ouvre ensuite l'adresse locale indiquée dans le terminal.

## 7. Objectifs du projet

Ce projet a pour objectif de mettre en pratique :

- L'utilisation de Fetch API et des requêtes HTTP GET.
- La récupération et l'exploitation de données JSON.
- La programmation asynchrone avec les promesses et `.then()`.
- La manipulation du DOM avec JavaScript.
- La gestion des erreurs et des états de chargement.
- L'utilisation de LocalStorage.
- L'organisation du code et le versionnement avec Git et GitHub.

---

**Clima — Une application météo simple, claire et connectée.**