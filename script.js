/* =========================================================
   TRAVELSPHERE — SMART TRAVEL PLANNER
   COMMIT 11 — SAVED TRIPS
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const exploreBtn = document.getElementById("exploreBtn");
const destinationInput =
    document.getElementById("destinationInput");

const planner =
    document.getElementById("planner");

const planDestination =
    document.getElementById("planDestination");

const plannerForm =
    document.getElementById("plannerForm");

const daysInput =
    document.getElementById("days");

const budgetInput =
    document.getElementById("budget");

const travelStyleInput =
    document.getElementById("travelStyle");

const plannerResult =
    document.getElementById("plannerResult");

const resetBtn =
    document.getElementById("resetBtn");


/* =========================================================
   STORAGE
   ========================================================= */

const SAVED_TRIPS_KEY =
    "travelsphere_saved_trips";


/* =========================================================
   DESTINATION DATA
   ========================================================= */

const destinationData = {

    Dubai: {
        country: "United Arab Emirates",
        emoji: "🏙️",
        category: "Luxury • Adventure • Shopping",
        rating: "4.8/5",
        bestTime: "November – March",
        dailyCost: "$120 – $250",

        latitude: 25.2048,
        longitude: 55.2708,

        currency: "AED",

        description:
            "Dubai combines futuristic architecture, luxury shopping, desert adventures and unforgettable city experiences.",

        attractions: [
            "Burj Khalifa",
            "Dubai Mall",
            "Palm Jumeirah",
            "Dubai Marina",
            "Desert Safari",
            "Museum of the Future"
        ],

        tips: [
            "Use the Dubai Metro for affordable city travel.",
            "Book popular attractions in advance.",
            "Carry water during outdoor activities.",
            "Evenings are ideal for desert and city experiences."
        ]
    },


    Paris: {
        country: "France",
        emoji: "🗼",
        category: "Culture • Romance • Art",
        rating: "4.9/5",
        bestTime: "April – June / September – October",
        dailyCost: "$100 – $220",

        latitude: 48.8566,
        longitude: 2.3522,

        currency: "EUR",

        description:
            "Paris is famous for its architecture, museums, cafés, fashion and iconic landmarks.",

        attractions: [
            "Eiffel Tower",
            "Louvre Museum",
            "Arc de Triomphe",
            "Notre-Dame",
            "Montmartre",
            "Seine River"
        ],

        tips: [
            "Use public transportation to explore the city.",
            "Reserve museum tickets online.",
            "Explore neighbourhoods on foot.",
            "Try local cafés away from major tourist areas."
        ]
    },


    Tokyo: {
        country: "Japan",
        emoji: "🌃",
        category: "Technology • Culture • Food",
        rating: "4.9/5",
        bestTime: "March – May / October – November",
        dailyCost: "$90 – $200",

        latitude: 35.6762,
        longitude: 139.6503,

        currency: "JPY",

        description:
            "Tokyo offers a unique combination of advanced technology, traditional Japanese culture, food and entertainment.",

        attractions: [
            "Tokyo Skytree",
            "Shibuya Crossing",
            "Senso-ji Temple",
            "Akihabara",
            "Meiji Shrine",
            "Shinjuku"
        ],

        tips: [
            "Get a rechargeable transport card.",
            "Learn a few basic Japanese phrases.",
            "Keep public spaces clean and quiet.",
            "Try different neighbourhoods rather than staying in one area."
        ]
    },


    Switzerland: {
        country: "Switzerland",
        emoji: "🏔️",
        category: "Nature • Mountains • Adventure",
        rating: "5.0/5",
        bestTime: "June – September / December – February",
        dailyCost: "$150 – $350",

        latitude: 46.9480,
        longitude: 7.4474,

        currency: "CHF",

        description:
            "Switzerland is known for spectacular Alps, crystal-clear lakes, scenic trains and charming mountain villages.",

        attractions: [
            "Swiss Alps",
            "Interlaken",
            "Lucerne",
            "Jungfraujoch",
            "Lake Geneva",
            "Zermatt"
        ],

        tips: [
            "Consider a Swiss Travel Pass.",
            "Check mountain weather before travelling.",
            "Book scenic train routes early.",
            "Carry layers because mountain temperatures change quickly."
        ]
    }

};


/* =========================================================
   CURRENCY
   ========================================================= */

const currencyRates = {

    INR: 1,
    USD: 0.0119,
    AED: 0.0437,
    EUR: 0.0102,
    JPY: 1.76,
    CHF: 0.0094

};


/* =========================================================
   STORAGE FUNCTIONS
   ========================================================= */

function getSavedTrips() {

    try {

        const trips =
            localStorage.getItem(
                SAVED_TRIPS_KEY
            );

        return trips
            ? JSON.parse(trips)
            : [];

    } catch (error) {

        console.error(
            "Unable to read saved trips:",
            error
        );

        return [];

    }

}


function saveTripsToStorage(trips) {

    try {

        localStorage.setItem(
            SAVED_TRIPS_KEY,
            JSON.stringify(trips)
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save trips:",
            error
        );

        return false;

    }

}


/* =========================================================
   DESTINATION SELECTION
   ========================================================= */

function selectDestination(city) {

    if (!planDestination) {
        return;
    }

    if (destinationInput) {
        destinationInput.value = city;
    }

    planDestination.value = city;

    if (planner) {

        planner.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================================
   DESTINATION DETAILS
   ========================================================= */

function showDestinationDetails(city) {

    const destination =
        destinationData[city];

    if (!destination) {
        return;
    }

    closeDestinationDetails();

    const modal =
        document.createElement("div");

    modal.className =
        "destination-modal-overlay";

    modal.id =
        "destinationDetailsModal";

    modal.innerHTML = `

        <div class="destination-modal-card">

            <button
                class="destination-modal-close"
                onclick="closeDestinationDetails()"
            >
                ×
            </button>

            <div class="destination-modal-header">

                <div class="destination-modal-icon">
                    ${destination.emoji}
                </div>

                <div>

                    <span class="destination-modal-category">
                        ${destination.category}
                    </span>

                    <h2>
                        ${city}
                    </h2>

                    <p>
                        ${destination.country}
                    </p>

                </div>

            </div>


            <div class="destination-modal-description">

                <p>
                    ${destination.description}
                </p>

            </div>


            <div class="destination-details-grid">

                <div class="destination-info-box">
                    <span>⭐</span>
                    <strong>Rating</strong>
                    <p>${destination.rating}</p>
                </div>

                <div class="destination-info-box">
                    <span>🌤️</span>
                    <strong>Best Time</strong>
                    <p>${destination.bestTime}</p>
                </div>

                <div class="destination-info-box">
                    <span>💰</span>
                    <strong>Daily Cost</strong>
                    <p>${destination.dailyCost}</p>
                </div>

                <div class="destination-info-box">
                    <span>🌍</span>
                    <strong>Country</strong>
                    <p>${destination.country}</p>
                </div>

            </div>


            <div class="destination-modal-section">

                <h3>
                    📍 Top Attractions
                </h3>

                <div class="destination-attractions">

                    ${destination.attractions
                        .map(
                            attraction => `
                                <div class="destination-attraction">
                                    <span>✦</span>
                                    ${attraction}
                                </div>
                            `
                        )
                        .join("")}

                </div>

            </div>


            <div class="destination-modal-section">

                <h3>
                    💡 Travel Tips
                </h3>

                <div class="destination-tips">

                    ${destination.tips
                        .map(
                            tip => `
                                <div class="destination-tip">
                                    <span>✓</span>
                                    <p>${tip}</p>
                                </div>
                            `
                        )
                        .join("")}

                </div>

            </div>


            <div class="destination-modal-footer">

                <button
                    class="destination-plan-btn"
                    onclick="planDestinationFromDetails('${city}')"
                >
                    🧳 Plan This Trip
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    document.body.classList.add(
        "modal-open"
    );

    requestAnimationFrame(() => {

        modal.classList.add("active");

    });

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeDestinationDetails();

            }

        }
    );

    document.addEventListener(
        "keydown",
        handleDestinationEscape
    );

}


function closeDestinationDetails() {

    const modal =
        document.getElementById(
            "destinationDetailsModal"
        );

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    setTimeout(() => {

        modal.remove();

        document.body.classList.remove(
            "modal-open"
        );

    }, 250);

    document.removeEventListener(
        "keydown",
        handleDestinationEscape
    );

}


function handleDestinationEscape(event) {

    if (event.key === "Escape") {
        closeDestinationDetails();
    }

}


function planDestinationFromDetails(city) {

    closeDestinationDetails();

    setTimeout(() => {

        selectDestination(city);

    }, 300);

}


/* =========================================================
   DESTINATION CARD BUTTONS
   ========================================================= */

function initializeDestinationDetails() {

    const cards =
        document.querySelectorAll(
            ".destination-card"
        );

    cards.forEach(card => {

        const heading =
            card.querySelector("h3");

        if (!heading) {
            return;
        }

        const city =
            heading.textContent.trim();

        if (!destinationData[city]) {
            return;
        }

        if (
            card.querySelector(
                ".destination-details-btn"
            )
        ) {
            return;
        }

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "destination-details-btn";

        button.type =
            "button";

        button.innerHTML =
            "Explore Details →";

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                showDestinationDetails(
                    city
                );

            }
        );

        card.appendChild(button);

    });

}


/* =========================================================
   WEATHER
   ========================================================= */

async function loadWeather(city) {

    const destination =
        destinationData[city];

    const weatherCard =
        document.getElementById(
            "weatherData"
        );

    if (
        !destination ||
        !weatherCard
    ) {
        return;
    }

    weatherCard.innerHTML = `

        <div class="live-loading">

            <div class="loading-spinner"></div>

            <p>
                Loading live weather...
            </p>

        </div>

    `;

    try {

        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${destination.latitude}` +
            `&longitude=${destination.longitude}` +
            `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
            `&timezone=auto`;

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                "Weather API request failed"
            );
        }

        const data =
            await response.json();

        const current =
            data.current;

        const weatherText =
            getWeatherDescription(
                current.weather_code
            );

        weatherCard.innerHTML = `

            <div class="weather-main">

                <div class="weather-temperature">

                    ${Math.round(
                        current.temperature_2m
                    )}°C

                </div>

                <div class="weather-condition">

                    ${weatherText}

                </div>

            </div>


            <div class="weather-stats">

                <div>

                    <span>💧</span>

                    <strong>
                        ${current.relative_humidity_2m}%
                    </strong>

                    <small>
                        Humidity
                    </small>

                </div>


                <div>

                    <span>💨</span>

                    <strong>
                        ${current.wind_speed_10m}
                        km/h
                    </strong>

                    <small>
                        Wind
                    </small>

                </div>


                <div>

                    <span>🕐</span>

                    <strong>
                        Live
                    </strong>

                    <small>
                        Current
                    </small>

                </div>

            </div>

        `;

    } catch (error) {

        console.error(
            "Weather error:",
            error
        );

        showWeatherError(
            "Unable to load live weather."
        );

    }

}


function getWeatherDescription(code) {

    const weatherCodes = {

        0: "☀️ Clear Sky",
        1: "🌤️ Mainly Clear",
        2: "⛅ Partly Cloudy",
        3: "☁️ Overcast",
        45: "🌫️ Foggy",
        48: "🌫️ Rime Fog",
        51: "🌦️ Light Drizzle",
        53: "🌦️ Drizzle",
        55: "🌧️ Heavy Drizzle",
        61: "🌦️ Light Rain",
        63: "🌧️ Rain",
        65: "🌧️ Heavy Rain",
        71: "🌨️ Light Snow",
        73: "❄️ Snow",
        75: "❄️ Heavy Snow",
        80: "🌦️ Rain Showers",
        81: "🌧️ Rain Showers",
        82: "⛈️ Heavy Showers",
        95: "⛈️ Thunderstorm",
        96: "⛈️ Thunderstorm + Hail",
        99: "⛈️ Heavy Thunderstorm"

    };

    return (
        weatherCodes[code] ||
        "🌍 Current Weather"
    );

}


function showWeatherError(message) {

    const weatherCard =
        document.getElementById(
            "weatherData"
        );

    if (!weatherCard) {
        return;
    }

    weatherCard.innerHTML = `

        <div class="live-error">

            <span>⚠️</span>

            <p>
                ${message}
            </p>

            <button
                onclick="loadWeatherFromPlanner()"
            >
                Try Again
            </button>

        </div>

    `;

}


function loadWeatherFromPlanner() {

    const city =
        planDestination
            ? planDestination.value
            : "";

    if (destinationData[city]) {

        loadWeather(city);

    }

}


/* =========================================================
   CURRENCY CONVERTER
   ========================================================= */

function convertCurrency() {

    const amountInput =
        document.getElementById(
            "currencyAmount"
        );

    const fromCurrency =
        document.getElementById(
            "fromCurrency"
        );

    const toCurrency =
        document.getElementById(
            "toCurrency"
        );

    const result =
        document.getElementById(
            "currencyResult"
        );

    if (
        !amountInput ||
        !fromCurrency ||
        !toCurrency ||
        !result
    ) {
        return;
    }

    const amount =
        Number(
            amountInput.value
        );

    if (
        !Number.isFinite(amount) ||
        amount < 0
    ) {

        result.innerHTML =
            "Enter a valid amount.";

        return;

    }

    const fromRate =
        currencyRates[
            fromCurrency.value
        ];

    const toRate =
        currencyRates[
            toCurrency.value
        ];

    if (
        !fromRate ||
        !toRate
    ) {

        result.innerHTML =
            "Currency unavailable.";

        return;

    }

    const converted =
        (amount / fromRate) *
        toRate;

    result.innerHTML = `

        <strong>
            ${converted.toLocaleString(
                undefined,
                {
                    maximumFractionDigits: 2
                }
            )}
            ${toCurrency.value}
        </strong>

        <span>
            ${amount}
            ${fromCurrency.value}
        </span>

    `;

}


/* =========================================================
   BUDGET PROFILE
   ========================================================= */

function getBudgetProfile(budget) {

    const profiles = {

        Budget: {
            accommodation: 30,
            food: 15,
            transport: 10,
            activities: 5
        },

        Standard: {
            accommodation: 60,
            food: 30,
            transport: 20,
            activities: 10
        },

        Luxury: {
            accommodation: 140,
            food: 60,
            transport: 35,
            activities: 15
        }

    };

    return (
        profiles[budget] ||
        profiles.Standard
    );

}


/* =========================================================
   ACTIVITIES
   ========================================================= */

function generateActivities(
    city,
    style
) {

    const activities = {

        Adventure: [
            `Explore ${city}'s outdoor attractions`,
            "Try a local adventure activity",
            "Take a scenic exploration tour",
            "Discover hidden travel spots"
        ],

        Relaxation: [
            "Enjoy a relaxing morning",
            "Visit a peaceful local attraction",
            "Enjoy a wellness experience",
            "Watch the sunset"
        ],

        Luxury: [
            "Enjoy a premium dining experience",
            "Visit an exclusive attraction",
            "Explore luxury shopping areas",
            "Enjoy an evening city experience"
        ],

        Family: [
            "Visit a family-friendly attraction",
            "Enjoy a local cultural experience",
            "Try family-friendly activities",
            "Explore a famous landmark"
        ],

        Solo: [
            "Explore the city independently",
            "Visit a local cultural attraction",
            "Try local cuisine",
            "Explore the city at your own pace"
        ],

        Honeymoon: [
            "Enjoy a romantic city walk",
            "Have a special dinner",
            "Visit a scenic attraction",
            "Enjoy a private experience"
        ]

    };

    return (
        activities[style] ||
        activities.Adventure
    );

}


/* =========================================================
   VALIDATION
   ========================================================= */

function validatePlanner() {

    if (
        !planDestination ||
        !daysInput ||
        !budgetInput
    ) {
        return false;
    }

    const city =
        planDestination.value.trim();

    const days =
        Number(daysInput.value);

    const budget =
        budgetInput.value;

    if (!city) {

        alert(
            "Please select a destination."
        );

        planDestination.focus();

        return false;

    }

    if (
        !Number.isFinite(days) ||
        days < 1 ||
        days > 30
    ) {

        alert(
            "Trip duration must be between 1 and 30 days."
        );

        daysInput.focus();

        return false;

    }

    if (!budget) {

        alert(
            "Please select a budget."
        );

        budgetInput.focus();

        return false;

    }

    return true;

}


/* =========================================================
   GENERATE TRIP
   ========================================================= */

if (plannerForm) {

    plannerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (!validatePlanner()) {
                return;
            }

            const city =
                planDestination.value.trim();

            const days =
                Number(daysInput.value);

            const budget =
                budgetInput.value;

            const style =
                travelStyleInput
                    ? travelStyleInput.value
                    : "Adventure";

            const profile =
                getBudgetProfile(budget);

            const accommodation =
                profile.accommodation * days;

            const food =
                profile.food * days;

            const transport =
                profile.transport * days;

            const activitiesCost =
                profile.activities * days;

            const totalBudget =
                accommodation +
                food +
                transport +
                activitiesCost;

            const dailyAverage =
                totalBudget / days;

            const activities =
                generateActivities(
                    city,
                    style
                );

            let itineraryHTML = "";

            for (
                let day = 1;
                day <= days;
                day++
            ) {

                const activity =
                    activities[
                        (day - 1) %
                        activities.length
                    ];

                itineraryHTML += `

                    <div class="itinerary-day">

                        <div class="day-number">
                            ${day}
                        </div>

                        <div class="day-content">

                            <h4>
                                Day ${day}
                            </h4>

                            <p>
                                ${activity}
                            </p>

                        </div>

                    </div>

                `;

            }

            const generatedTime =
                new Date().toLocaleString();

            plannerResult.innerHTML = `

                <div class="result-header">

                    <div>

                        <span class="result-label">
                            YOUR TRIP PLAN
                        </span>

                        <h3>
                            ${city}
                        </h3>

                        <p>
                            ${days} Days •
                            ${style} Travel •
                            ${budget} Budget
                        </p>

                    </div>

                    <div class="result-icon">
                        ✈️
                    </div>

                </div>


                <div class="budget-analytics">

                    <h3>
                        💰 Budget Analytics
                    </h3>

                    <div class="budget-row">
                        <span>
                            🏨 Accommodation
                        </span>
                        <strong>
                            $${accommodation}
                        </strong>
                    </div>

                    <div class="budget-row">
                        <span>
                            🍴 Food
                        </span>
                        <strong>
                            $${food}
                        </strong>
                    </div>

                    <div class="budget-row">
                        <span>
                            🚕 Transport
                        </span>
                        <strong>
                            $${transport}
                        </strong>
                    </div>

                    <div class="budget-row">
                        <span>
                            🎟️ Activities
                        </span>
                        <strong>
                            $${activitiesCost}
                        </strong>
                    </div>

                    <div class="budget-total">
                        <span>
                            Total Estimated Budget
                        </span>
                        <strong>
                            $${totalBudget}
                        </strong>
                    </div>

                    <div class="budget-average">
                        Average Per Day:
                        <strong>
                            $${dailyAverage.toFixed(2)}
                        </strong>
                    </div>

                </div>


                <div class="itinerary-section">

                    <h3>
                        🗓️ Your Itinerary
                    </h3>

                    ${itineraryHTML}

                </div>


                <div class="live-data-container">

                    <div class="live-data-header">

                        <div>

                            <span>
                                LIVE TRAVEL DATA
                            </span>

                            <h3>
                                ${city} Now
                            </h3>

                        </div>

                        <div class="live-indicator">

                            <span></span>

                            LIVE

                        </div>

                    </div>


                    <div
                        id="weatherData"
                        class="weather-data"
                    >

                        <div class="live-loading">

                            <div class="loading-spinner"></div>

                            <p>
                                Loading live weather...
                            </p>

                        </div>

                    </div>

                </div>


                <!-- SAVE TRIP BUTTON -->

                <div class="save-trip-area">

                    <button
                        type="button"
                        class="save-trip-btn"
                        onclick="saveCurrentTrip()"
                    >
                        💾 Save This Trip
                    </button>

                    <p
                        id="saveTripMessage"
                        class="save-trip-message"
                    ></p>

                </div>


                <div class="trip-actions">

                    <button
                        type="button"
                        onclick="copyTripPlan()"
                    >
                        📋 Copy Plan
                    </button>

                    <button
                        type="button"
                        onclick="printTripPlan()"
                    >
                        🖨️ Print
                    </button>

                    <button
                        type="button"
                        onclick="resetPlanner()"
                    >
                        🔄 New Trip
                    </button>

                </div>


                <div class="generated-time">

                    Generated:
                    ${generatedTime}

                </div>

            `;


            plannerResult.classList.add(
                "result-visible"
            );


            loadWeather(city);


            plannerResult.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}


/* =========================================================
   SAVE CURRENT TRIP
   ========================================================= */

function saveCurrentTrip() {

    if (
        !planDestination ||
        !daysInput ||
        !budgetInput
    ) {
        return;
    }

    const city =
        planDestination.value.trim();

    const days =
        Number(daysInput.value);

    const budget =
        budgetInput.value;

    const style =
        travelStyleInput
            ? travelStyleInput.value
            : "Adventure";


    if (
        !city ||
        !days ||
        !budget
    ) {

        alert(
            "Generate a trip before saving it."
        );

        return;

    }


    const profile =
        getBudgetProfile(
            budget
        );


    const totalBudget =
        (
            profile.accommodation +
            profile.food +
            profile.transport +
            profile.activities
        ) * days;


    const trip = {

        id:
            Date.now(),

        destination:
            city,

        days:
            days,

        budget:
            budget,

        style:
            style,

        totalBudget:
            totalBudget,

        savedAt:
            new Date().toLocaleString()

    };


    const trips =
        getSavedTrips();


    const alreadySaved =
        trips.some(
            savedTrip =>
                savedTrip.destination === city &&
                savedTrip.days === days &&
                savedTrip.budget === budget &&
                savedTrip.style === style
        );


    if (alreadySaved) {

        showSaveMessage(
            "This trip is already saved."
        );

        return;

    }


    trips.unshift(trip);


    const success =
        saveTripsToStorage(trips);


    if (success) {

        showSaveMessage(
            "Trip saved successfully! 💾"
        );

        renderSavedTrips();

    } else {

        showSaveMessage(
            "Unable to save this trip."
        );

    }

}


/* =========================================================
   SAVE MESSAGE
   ========================================================= */

function showSaveMessage(message) {

    const messageBox =
        document.getElementById(
            "saveTripMessage"
        );

    if (!messageBox) {
        return;
    }

    messageBox.textContent =
        message;

    messageBox.classList.add(
        "show"
    );


    setTimeout(() => {

        messageBox.classList.remove(
            "show"
        );

    }, 2500);

}


/* =========================================================
   SAVED TRIPS MODAL
   ========================================================= */

function openSavedTrips() {

    renderSavedTrips();

    const modal =
        document.getElementById(
            "savedTripsModal"
        );

    if (!modal) {
        return;
    }

    modal.classList.add(
        "active"
    );

    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE SAVED TRIPS
   ========================================================= */

function closeSavedTrips() {

    const modal =
        document.getElementById(
            "savedTripsModal"
        );

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   RENDER SAVED TRIPS
   ========================================================= */

function renderSavedTrips() {

    const container =
        document.getElementById(
            "savedTripsList"
        );

    const count =
        document.getElementById(
            "savedTripsCount"
        );


    if (!container) {
        return;
    }


    const trips =
        getSavedTrips();


    if (count) {

        count.textContent =
            trips.length;

    }


    if (trips.length === 0) {

        container.innerHTML = `

            <div class="empty-saved-trips">

                <div>
                    🧳
                </div>

                <h3>
                    No Saved Trips Yet
                </h3>

                <p>
                    Generate a trip and save it here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        trips.map(
            trip => `

                <div
                    class="saved-trip-card"
                    data-trip-id="${trip.id}"
                >

                    <div class="saved-trip-icon">

                        ${
                            destinationData[
                                trip.destination
                            ]
                                ? destinationData[
                                    trip.destination
                                ].emoji
                                : "✈️"
                        }

                    </div>


                    <div class="saved-trip-info">

                        <h3>
                            ${trip.destination}
                        </h3>

                        <p>
                            ${trip.days} Days •
                            ${trip.style}
                        </p>

                        <span>
                            ${trip.budget} Budget
                            •
                            $${trip.totalBudget}
                        </span>

                        <small>
                            Saved ${trip.savedAt}
                        </small>

                    </div>


                    <div class="saved-trip-actions">

                        <button
                            type="button"
                            onclick="loadSavedTrip(${trip.id})"
                        >
                            Open
                        </button>

                        <button
                            type="button"
                            class="delete-trip-btn"
                            onclick="deleteSavedTrip(${trip.id})"
                        >
                            🗑️
                        </button>

                    </div>

                </div>

            `
        ).join("");

}


/* =========================================================
   LOAD SAVED TRIP
   ========================================================= */

function loadSavedTrip(id) {

    const trips =
        getSavedTrips();

    const trip =
        trips.find(
            savedTrip =>
                savedTrip.id === id
        );


    if (!trip) {
        return;
    }


    closeSavedTrips();


    if (planDestination) {
        planDestination.value =
            trip.destination;
    }


    if (destinationInput) {
        destinationInput.value =
            trip.destination;
    }


    if (daysInput) {
        daysInput.value =
            trip.days;
    }


    if (budgetInput) {
        budgetInput.value =
            trip.budget;
    }


    if (travelStyleInput) {
        travelStyleInput.value =
            trip.style;
    }


    if (planner) {

        planner.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    setTimeout(() => {

        if (plannerForm) {

            plannerForm.dispatchEvent(
                new Event("submit", {
                    cancelable: true
                })
            );

        }

    }, 600);

}


/* =========================================================
   DELETE SAVED TRIP
   ========================================================= */

function deleteSavedTrip(id) {

    const confirmed =
        confirm(
            "Delete this saved trip?"
        );


    if (!confirmed) {
        return;
    }


    const trips =
        getSavedTrips();


    const updatedTrips =
        trips.filter(
            trip =>
                trip.id !== id
        );


    saveTripsToStorage(
        updatedTrips
    );


    renderSavedTrips();

}


/* =========================================================
   CLEAR ALL SAVED TRIPS
   ========================================================= */

function clearSavedTrips() {

    const trips =
        getSavedTrips();


    if (trips.length === 0) {
        return;
    }


    const confirmed =
        confirm(
            "Delete all saved trips?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        SAVED_TRIPS_KEY
    );


    renderSavedTrips();

}


/* =========================================================
   SAVED TRIPS UI
   ========================================================= */

function initializeSavedTripsUI() {

    if (
        document.getElementById(
            "savedTripsModal"
        )
    ) {
        return;
    }


    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.innerHTML = `

        <button
            type="button"
            class="saved-trips-floating-btn"
            onclick="openSavedTrips()"
        >

            💾
            <span>
                Saved Trips
            </span>

            <b id="savedTripsCount">
                0
            </b>

        </button>


        <div
            id="savedTripsModal"
            class="saved-trips-modal"
        >

            <div
                class="saved-trips-modal-card"
            >

                <div
                    class="saved-trips-header"
                >

                    <div>

                        <span>
                            TRAVELSPHERE
                        </span>

                        <h2>
                            Saved Trips
                        </h2>

                    </div>


                    <button
                        type="button"
                        class="saved-trips-close"
                        onclick="closeSavedTrips()"
                    >
                        ×
                    </button>

                </div>


                <div
                    id="savedTripsList"
                    class="saved-trips-list"
                >
                </div>


                <div
                    class="saved-trips-footer"
                >

                    <button
                        type="button"
                        class="clear-saved-btn"
                        onclick="clearSavedTrips()"
                    >
                        🗑️ Clear All
                    </button>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(
        wrapper
    );


    renderSavedTrips();


    const modal =
        document.getElementById(
            "savedTripsModal"
        );


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeSavedTrips();

                }

            }
        );

    }

}


/* =========================================================
   COPY TRIP
   ========================================================= */

function copyTripPlan() {

    if (!plannerResult) {
        return;
    }


    navigator.clipboard
        .writeText(
            plannerResult.innerText
        )
        .then(() => {

            alert(
                "Trip plan copied successfully!"
            );

        })
        .catch(() => {

            alert(
                "Unable to copy the trip plan."
            );

        });

}


/* =========================================================
   PRINT
   ========================================================= */

function printTripPlan() {

    if (!plannerResult) {
        return;
    }


    const printWindow =
        window.open(
            "",
            "_blank"
        );


    if (!printWindow) {

        alert(
            "Please allow pop-ups to print your trip."
        );

        return;

    }


    printWindow.document.write(`

        <html>

        <head>

            <title>
                TravelSphere Trip Plan
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    line-height: 1.6;
                }

                .budget-row,
                .budget-total {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                }

                .itinerary-day {
                    display: flex;
                    gap: 15px;
                    margin: 15px 0;
                    padding: 15px;
                    border-bottom: 1px solid #ddd;
                }

                button {
                    display: none;
                }

            </style>

        </head>

        <body>

            <h1>
                TravelSphere
            </h1>

            ${plannerResult.innerHTML}

        </body>

        </html>

    `);


    printWindow.document.close();

    printWindow.focus();


    setTimeout(() => {

        printWindow.print();

    }, 500);

}


/* =========================================================
   RESET
   ========================================================= */

function resetPlanner() {

    if (plannerForm) {
        plannerForm.reset();
    }


    if (plannerResult) {

        plannerResult.innerHTML = "";

        plannerResult.classList.remove(
            "result-visible"
        );

    }


    if (planner) {

        planner.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeTravelSphere() {

    initializeDestinationDetails();

    initializeSavedTripsUI();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeTravelSphere
    );

} else {

    initializeTravelSphere();

}
/* =========================================================
   COMMIT 13
   INTERACTIVE UI EXPERIENCE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       SCROLL REVEAL
    ----------------------------------------------------- */

    const revealItems = document.querySelectorAll(
        ".section-title, .destination-card, .planner-form, .planner-result"
    );

    revealItems.forEach((item) => {
        item.classList.add("reveal-item");
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealItems.forEach((item) => {
        revealObserver.observe(item);
    });


    /* -----------------------------------------------------
       3D DESTINATION CARD TILT
    ----------------------------------------------------- */

    const cards = document.querySelectorAll(".destination-card");

    cards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 800) return;

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "";
        });
    });


    /* -----------------------------------------------------
       ANIMATED COUNTERS
    ----------------------------------------------------- */

    const counters =
        document.querySelectorAll(
            ".hero-stats strong"
        );

    const animateCounter = (element) => {

        const originalText =
            element.textContent.trim();

        const match =
            originalText.match(/\d+/);

        if (!match) return;

        const target =
            parseInt(match[0], 10);

        let current = 0;

        const duration = 1200;

        const start =
            performance.now();

        const update = (time) => {

            const progress =
                Math.min(
                    (time - start) / duration,
                    1
                );

            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );

            current =
                Math.floor(
                    target * eased
                );

            element.textContent =
                originalText.replace(
                    /\d+/,
                    current
                );

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };


    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        animateCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.8
            }
        );


    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });


    /* -----------------------------------------------------
       HERO PARALLAX
    ----------------------------------------------------- */

    const hero =
        document.querySelector(".hero");

    const earth =
        document.querySelector(".earth");

    if (hero && earth) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 900)
                    return;

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5);

                earth.style.transform =
                    `translate(
                        ${x * 18}px,
                        ${y * 18}px
                    )`;
            }
        );

        hero.addEventListener(
            "mouseleave",
            () => {
                earth.style.transform = "";
            }
        );
    }


    /* -----------------------------------------------------
       BUTTON RIPPLE
    ----------------------------------------------------- */

    const buttons =
        document.querySelectorAll(
            "button"
        );

    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                button.classList.remove(
                    "button-clicked"
                );

                void button.offsetWidth;

                button.classList.add(
                    "button-clicked"
                );
            }
        );
    });
/* =========================================
   COMMIT 14 — DARK / LIGHT THEME SYSTEM
   TravelSphere
========================================= */

(() => {
    "use strict";

    const STORAGE_KEY = "travelsphere_theme";

    function getSavedTheme() {
        try {
            const savedTheme = localStorage.getItem(STORAGE_KEY);

            if (savedTheme === "dark" || savedTheme === "light") {
                return savedTheme;
            }
        } catch (error) {
            console.warn("Theme preference could not be loaded.");
        }

        return "dark";
    }

    function applyTheme(theme) {
        const selectedTheme =
            theme === "light" ? "light" : "dark";

        document.documentElement.dataset.theme = selectedTheme;

        const toggle = document.getElementById("themeToggle");
        const icon = document.getElementById("themeIcon");
        const label = document.getElementById("themeLabel");

        if (toggle) {
            toggle.setAttribute(
                "aria-pressed",
                String(selectedTheme === "light")
            );

            toggle.setAttribute(
                "aria-label",
                `Switch to ${selectedTheme === "dark" ? "light" : "dark"} mode`
            );
        }

        if (icon) {
            icon.textContent =
                selectedTheme === "dark" ? "☀️" : "🌙";
        }

        if (label) {
            label.textContent =
                selectedTheme === "dark" ? "Light Mode" : "Dark Mode";
        }

        try {
            localStorage.setItem(STORAGE_KEY, selectedTheme);
        } catch (error) {
            console.warn("Theme preference could not be saved.");
        }
    }

    function initializeThemeToggle() {
        applyTheme(getSavedTheme());

        const toggle = document.getElementById("themeToggle");

        if (!toggle || toggle.dataset.themeReady === "true") {
            return;
        }

        toggle.dataset.themeReady = "true";

        toggle.addEventListener("click", () => {
            const currentTheme =
                document.documentElement.dataset.theme || "dark";

            applyTheme(
                currentTheme === "dark" ? "light" : "dark"
            );
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeThemeToggle,
            { once: true }
        );
    } else {
        initializeThemeToggle();
    }
})();
});
/* ==========================================
   COMMIT 15 — TRIP EXPORT SYSTEM
========================================== */

function downloadTripPlan(format = "txt") {
    const result = document.querySelector(
        "#plannerResult, .planner-result, .generated-result"
    );

    if (!result || !result.innerText.trim()) {
        alert("Please generate a trip plan before exporting.");
        return;
    }

    const destinationInput = document.querySelector(
        "#planDestination, #destination, [name='destination']"
    );

    const destination =
        destinationInput?.value?.trim() || "My-TravelSphere-Trip";

    const safeName = destination
        .replace(/[^a-z0-9_-]/gi, "-")
        .replace(/-+/g, "-");

    const trip = {
        app: "TravelSphere",
        destination,
        exportedAt: new Date().toISOString(),
        itinerary: result.innerText.trim()
    };

    let content;
    let mimeType;
    let extension;

    if (format === "json") {
        content = JSON.stringify(trip, null, 2);
        mimeType = "application/json;charset=utf-8";
        extension = "json";
    } else {
        content = [
            "TRAVELSPHERE — MY TRIP PLAN",
            "================================",
            `Destination: ${trip.destination}`,
            `Exported: ${new Date().toLocaleString()}`,
            "",
            trip.itinerary
        ].join("\n");

        mimeType = "text/plain;charset=utf-8";
        extension = "txt";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${safeName}-trip.${extension}`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}