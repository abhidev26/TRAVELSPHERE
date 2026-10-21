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

/* COMMIT 16: TRIP SHARING */

function getTripShareText() {
  const result =
    document.querySelector("#plannerResult") ||
    document.querySelector(".planner-result") ||
    document.querySelector(".generated-result");

  if (!result || !result.innerText.trim()) {
    alert("Please generate your trip itinerary first!");
    return null;
  }

  return result.innerText.trim();
}

async function copyTripPlan() {
  const tripText = getTripShareText();
  if (!tripText) return;

  try {
    await navigator.clipboard.writeText(tripText);
    showTripShareMessage("Itinerary copied successfully!");
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = tripText;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();

    const copied = document.execCommand("copy");
    textArea.remove();

    showTripShareMessage(
      copied
        ? "Itinerary copied successfully!"
        : "Copy failed. Please select and copy the itinerary manually."
    );
  }
}

async function shareTripPlan() {
  const tripText = getTripShareText();
  if (!tripText) return;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "My TravelSphere Trip",
        text: tripText
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        showTripShareMessage("Sharing failed. Try Copy Itinerary instead.");
      }
    }
  } else {
    await copyTripPlan();
    showTripShareMessage(
      "Sharing is not supported here. Copy the itinerary and send it to your friends."
    );
  }
}

function showTripShareMessage(message) {
  const messageElement = document.getElementById("shareTripMessage");

  if (messageElement) {
    messageElement.textContent = message;
  } else {
    alert(message);
  }
  
/* COMMIT 17: TRIP HISTORY */

const TRAVELSPHERE_HISTORY_KEY = "travelsphere_trip_history";
const TRAVELSPHERE_RECENT_KEY = "travelsphere_recent_destinations";

function readTravelSphereStorage(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch (error) {
    return [];
  }
}

function saveTravelSphereStorage(key, items) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error("Unable to save TravelSphere history:", error);
  }
}

function recordRecentDestination(name) {
  if (!name || typeof name !== "string") return;

  const destination = name.trim();
  if (!destination) return;

  let items = readTravelSphereStorage(TRAVELSPHERE_RECENT_KEY);

  items = items.filter(
    item => item.name.toLowerCase() !== destination.toLowerCase()
  );

  items.unshift({
    name: destination,
    viewedAt: new Date().toISOString()
  });

  saveTravelSphereStorage(TRAVELSPHERE_RECENT_KEY, items.slice(0, 8));
  renderTravelSphereHistory();
}

function recordGeneratedItinerary(text) {
  if (!text || typeof text !== "string" || !text.trim()) return;

  let items = readTravelSphereStorage(TRAVELSPHERE_HISTORY_KEY);

  items.unshift({
    id: Date.now(),
    text: text.trim(),
    createdAt: new Date().toISOString()
  });

  saveTravelSphereStorage(TRAVELSPHERE_HISTORY_KEY, items.slice(0, 8));
  renderTravelSphereHistory();
}

function renderTravelSphereHistory() {
  const destinationContainer = document.getElementById("recentDestinations");
  const itineraryContainer = document.getElementById("recentItineraries");

  if (!destinationContainer || !itineraryContainer) return;

  const destinations = readTravelSphereStorage(TRAVELSPHERE_RECENT_KEY);
  const itineraries = readTravelSphereStorage(TRAVELSPHERE_HISTORY_KEY);

  destinationContainer.replaceChildren();
  itineraryContainer.replaceChildren();

  if (destinations.length === 0) {
    destinationContainer.textContent =
      "No recently viewed destinations yet.";
  } else {
    destinations.forEach(item => {
      const card = document.createElement("article");
      card.className = "history-card";

      const title = document.createElement("h3");
      title.textContent = item.name;

      const date = document.createElement("p");
      date.className = "history-date";
      date.textContent = item.viewedAt
        ? "Viewed " + new Date(item.viewedAt).toLocaleDateString()
        : "";

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Explore Again";
      button.addEventListener("click", () => {
        const matchingCard = [...document.querySelectorAll(
          ".destination-card, .destination-card button"
        )].find(element =>
          element.textContent.toLowerCase().includes(item.name.toLowerCase())
        );

        if (matchingCard) {
          matchingCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          matchingCard.click();
        } else {
          showTripShareMessage(
            "Find " + item.name + " in the destination section to explore it again."
          );
        }
      });

      card.append(title, date, button);
      destinationContainer.appendChild(card);
    });
  }

  if (itineraries.length === 0) {
    itineraryContainer.textContent =
      "Generate a trip to see it here.";
  } else {
    itineraries.forEach(item => {
      const card = document.createElement("article");
      card.className = "history-card";

      const title = document.createElement("h3");
      title.textContent = "Trip itinerary";

      const preview = document.createElement("p");
      preview.textContent = item.text.slice(0, 180) +
        (item.text.length > 180 ? "…" : "");

      const date = document.createElement("p");
      date.className = "history-date";
      date.textContent = item.createdAt
        ? new Date(item.createdAt).toLocaleString()
        : "";

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "View Itinerary";
      button.addEventListener("click", () => {
        const result =
          document.querySelector("#plannerResult") ||
          document.querySelector(".planner-result") ||
          document.querySelector(".generated-result");

        if (result) {
          result.textContent = item.text;
          result.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        } else {
          alert(item.text);
        }
      });

      card.append(title, preview, date, button);
      itineraryContainer.appendChild(card);
    });
  }
}

function clearTripHistory() {
  if (!confirm("Clear all recently viewed destinations and trip history?")) {
    return;
  }

  localStorage.removeItem(TRAVELSPHERE_HISTORY_KEY);
  localStorage.removeItem(TRAVELSPHERE_RECENT_KEY);
  renderTravelSphereHistory();
}

document.addEventListener("DOMContentLoaded", renderTravelSphereHistory);
}

/* COMMIT 18: SMART BUDGET CALCULATOR */

(function initializeSmartBudget() {
  const calculateButton = document.getElementById("calculateTravelBudget");

  if (!calculateButton || calculateButton.dataset.initialized === "true") {
    return;
  }

  calculateButton.dataset.initialized = "true";

  const budgetInput = document.getElementById("travelBudgetAmount");

  const expenseIds = [
    "budgetTransport",
    "budgetAccommodation",
    "budgetFood",
    "budgetActivities",
    "budgetOther"
  ];

  const formatINR = amount =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  function calculateBudget() {
    const budget = Number(budgetInput.value);

    const expenseInputs = expenseIds.map(id =>
      document.getElementById(id)
    );

    const hasInvalidExpense = expenseInputs.some(input =>
      !input ||
      input.value.trim() === "" ||
      !Number.isFinite(Number(input.value)) ||
      Number(input.value) < 0
    );

    const alertElement = document.getElementById("budgetAlertMessage");

    alertElement.className = "budget-alert-message";

    if (
      budgetInput.value.trim() === "" ||
      !Number.isFinite(budget) ||
      budget <= 0 ||
      hasInvalidExpense
    ) {
      alertElement.textContent =
        "Enter a total budget above ₹0 and valid, non-negative expenses.";
      alertElement.classList.add("budget-danger");
      return;
    }

    const expenses = expenseInputs.reduce(
      (sum, input) => sum + Number(input.value),
      0
    );

    const remaining = budget - expenses;
    const percentage = (expenses / budget) * 100;

    document.getElementById("budgetTotalDisplay").textContent =
      formatINR(budget);

    document.getElementById("budgetExpenseDisplay").textContent =
      formatINR(expenses);

    document.getElementById("budgetRemainingDisplay").textContent =
      formatINR(remaining);

    const progressBar = document.getElementById("budgetProgressBar");

    progressBar.style.width = Math.min(percentage, 100) + "%";
    progressBar.style.background =
      remaining < 0 ? "#dc2626" :
      percentage >= 80 ? "#d97706" :
      "var(--primary)";

    if (remaining < 0) {
      alertElement.textContent =
        "Over budget by " + formatINR(Math.abs(remaining)) +
        ". Consider reducing your estimated expenses.";
      alertElement.classList.add("budget-danger");
    } else if (percentage >= 80) {
      alertElement.textContent =
        "Budget alert: you've planned to use " +
        percentage.toFixed(1) +
        "% of your budget. Remaining: " + formatINR(remaining) + ".";
      alertElement.classList.add("budget-warning");
    } else {
      alertElement.textContent =
        "You're within budget! You have " +
        formatINR(remaining) + " remaining.";
    }

    try {
      localStorage.setItem("travelsphere_smart_budget", JSON.stringify({
        budget,
        expenses: Object.fromEntries(
          expenseIds.map((id, index) => [
            id,
            Number(expenseInputs[index].value)
          ])
        ),
        updatedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.warn("Could not save budget data.", error);
    }
  }

  calculateButton.addEventListener("click", calculateBudget);

  try {
    const saved = JSON.parse(
      localStorage.getItem("travelsphere_smart_budget") || "null"
    );

    if (saved && typeof saved === "object") {
      budgetInput.value = saved.budget ?? "";

      expenseIds.forEach(id => {
        const input = document.getElementById(id);

        if (input && saved.expenses && saved.expenses[id] !== undefined) {
          input.value = saved.expenses[id];
        }
      });

      if (budgetInput.value !== "") {
        calculateBudget();
      }
    }
  } catch (error) {
    console.warn("Could not restore budget data.", error);
  }
})();

/* COMMIT 19: LIVE CURRENCY CONVERTER */

(function initializeCurrencyConverter() {
  const amountInput = document.getElementById("currencyAmount");
  const fromSelect = document.getElementById("currencyFrom");
  const toSelect = document.getElementById("currencyTo");
  const convertButton = document.getElementById("convertCurrency");
  const swapButton = document.getElementById("swapCurrencies");
  const resultElement = document.getElementById("currencyResult");
  const rateElement = document.getElementById("currencyRateInfo");
  const updatedElement = document.getElementById("currencyUpdatedAt");

  if (
    !amountInput || !fromSelect || !toSelect ||
    !convertButton || !swapButton ||
    convertButton.dataset.initialized === "true"
  ) return;

  convertButton.dataset.initialized = "true";

  const formatMoney = (amount, currency) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "JPY" ? 2 : 4
    }).format(amount);

  async function convertCurrency() {
    const amount = Number(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!Number.isFinite(amount) || amount <= 0) {
      resultElement.textContent = "Enter an amount greater than zero.";
      rateElement.textContent = "";
      updatedElement.textContent = "";
      return;
    }

    convertButton.disabled = true;
    convertButton.textContent = "Converting…";
    resultElement.textContent = "Fetching exchange rate…";
    rateElement.textContent = "";
    updatedElement.textContent = "";

    try {
      if (from === to) {
        resultElement.textContent = formatMoney(amount, to);
        rateElement.textContent = `1 ${from} = 1 ${to}`;
        updatedElement.textContent = "Same-currency conversion.";
        return;
      }

      const response = await fetch(
        `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`
      );

      if (!response.ok) {
        throw new Error("Exchange-rate service is unavailable.");
      }

      const data = await response.json();

      if (
        data.result !== "success" ||
        !data.rates ||
        !Number.isFinite(data.rates[to])
      ) {
        throw new Error("A valid exchange rate was not returned.");
      }

      const rate = data.rates[to];
      const converted = amount * rate;

      resultElement.textContent = formatMoney(converted, to);
      rateElement.textContent =
        `1 ${from} = ${rate.toLocaleString("en-US", {
          maximumFractionDigits: 6
        })} ${to}`;

      updatedElement.textContent = data.time_last_update_utc
        ? `Rate data updated: ${data.time_last_update_utc}`
        : "Check the provider for the latest rate timestamp.";
    } catch (error) {
      resultElement.textContent = "Conversion unavailable";
      rateElement.textContent =
        "Check your internet connection and try again.";
      updatedElement.textContent =
        "No estimated rate has been substituted.";
      console.error("Currency conversion error:", error);
    } finally {
      convertButton.disabled = false;
      convertButton.textContent = "Convert Currency";
    }
  }

  swapButton.addEventListener("click", () => {
    const previousFrom = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = previousFrom;
  });

  convertButton.addEventListener("click", convertCurrency);

  amountInput.addEventListener("keydown", event => {
    if (event.key === "Enter") convertCurrency();
  });

  convertCurrency();
})();
/* COMMIT 20: TravelSphere 5-Day Weather Forecast */

(() => {
  const locations = {
    Dubai: { latitude: 25.2048, longitude: 55.2708 },
    Paris: { latitude: 48.8566, longitude: 2.3522 },
    Tokyo: { latitude: 35.6762, longitude: 139.6503 },
    Zurich: { latitude: 47.3769, longitude: 8.5417 },
    Mangalore: { latitude: 12.9141, longitude: 74.856 },
    Bengaluru: { latitude: 12.9716, longitude: 77.5946 }
  };

  const weatherTypes = {
    0: ["☀️", "Clear sky"],
    1: ["🌤️", "Mainly clear"],
    2: ["⛅", "Partly cloudy"],
    3: ["☁️", "Overcast"],
    45: ["🌫️", "Fog"],
    48: ["🌫️", "Rime fog"],
    51: ["🌦️", "Light drizzle"],
    53: ["🌦️", "Drizzle"],
    55: ["🌧️", "Heavy drizzle"],
    56: ["🌧️", "Freezing drizzle"],
    57: ["🌧️", "Heavy freezing drizzle"],
    61: ["🌦️", "Light rain"],
    63: ["🌧️", "Moderate rain"],
    65: ["🌧️", "Heavy rain"],
    66: ["🌧️", "Freezing rain"],
    67: ["🌧️", "Heavy freezing rain"],
    71: ["🌨️", "Light snowfall"],
    73: ["❄️", "Snowfall"],
    75: ["❄️", "Heavy snowfall"],
    77: ["🌨️", "Snow grains"],
    80: ["🌦️", "Rain showers"],
    81: ["🌧️", "Heavy showers"],
    82: ["⛈️", "Violent showers"],
    85: ["🌨️", "Snow showers"],
    86: ["❄️", "Heavy snow showers"],
    95: ["⛈️", "Thunderstorm"],
    96: ["⛈️", "Thunderstorm with hail"],
    99: ["⛈️", "Severe thunderstorm"]
  };

  const select = document.getElementById("weatherDestination");
  const cards = document.getElementById("weatherCards");
  const status = document.getElementById("weatherStatus");
  const refreshButton = document.getElementById("refreshWeather");

  if (!select || !cards || !status || !refreshButton) return;

  function getWeatherDescription(code) {
    return weatherTypes[code] || ["🌍", "Conditions unavailable"];
  }

  function formatDay(dateString, index) {
    if (index === 0) return "Today";
    if (index === 1) return "Tomorrow";

    // Use UTC to avoid shifting dates across time zones.
    const date = new Date(`${dateString}T12:00:00Z`);

    return new Intl.DateTimeFormat("en", {
      weekday: "short",
      timeZone: "UTC"
    }).format(date);
  }

  async function loadForecast() {
    const destination = select.value;
    const location = locations[destination];

    if (!location) return;

    refreshButton.disabled = true;
    refreshButton.textContent = "Loading...";
    status.textContent = `Getting the forecast for ${destination}...`;
    cards.replaceChildren();

    const query = new URLSearchParams({
      latitude: location.latitude,
      longitude: location.longitude,
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
      forecast_days: "5",
      timezone: "auto"
    });

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${query}`
      );

      if (!response.ok) {
        throw new Error("Weather service is temporarily unavailable.");
      }

      const data = await response.json();
      const daily = data.daily;

      if (
        !daily ||
        !Array.isArray(daily.time) ||
        daily.time.length === 0
      ) {
        throw new Error("No forecast data was returned.");
      }

      const fragment = document.createDocumentFragment();

      daily.time.forEach((date, index) => {
        const [emoji, description] = getWeatherDescription(
          daily.weather_code[index]
        );

        const high = Math.round(daily.temperature_2m_max[index]);
        const low = Math.round(daily.temperature_2m_min[index]);

        const card = document.createElement("article");
        card.className = "weather-card";

        const day = document.createElement("div");
        day.className = "weather-day";
        day.textContent = formatDay(date, index);

        const icon = document.createElement("div");
        icon.className = "weather-icon";
        icon.textContent = emoji;
        icon.setAttribute("aria-hidden", "true");

        const condition = document.createElement("div");
        condition.className = "weather-condition";
        condition.textContent = description;

        const temperature = document.createElement("div");
        temperature.className = "weather-temperature";

        const highText = document.createTextNode(`${high}° `);
        const lowText = document.createElement("span");
        lowText.textContent = `${low}°C low`;

        temperature.append(highText, lowText);
        card.append(day, icon, condition, temperature);
        fragment.appendChild(card);
      });

      cards.replaceChildren(fragment);
      status.textContent = `Showing the 5-day forecast for ${destination}.`;
    } catch (error) {
      status.textContent =
        error.message ||
        "Unable to load the forecast. Check your internet connection and try again.";
      cards.replaceChildren();
    } finally {
      refreshButton.disabled = false;
      refreshButton.textContent = "Refresh Forecast";
    }
  }

  refreshButton.addEventListener("click", loadForecast);
  select.addEventListener("change", loadForecast);

  loadForecast();
})();
/* =========================================
   COMMIT 21 — ULTIMATE TRAVEL UPGRADE
   Map, itinerary, packing, accessibility
========================================= */

(() => {
  "use strict";

  const root = document.getElementById("travelExperienceUpgrade");
  if (!root || root.dataset.initialized === "true") return;
  root.dataset.initialized = "true";

  const $ = (id) => document.getElementById(id);

  // Safe localStorage helpers: the website still works if storage is blocked.
  function readStorage(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function setStatus(element, message) {
    if (element) element.textContent = message;
  }

  /* -----------------------------------------
     1. INTERACTIVE DESTINATION MAP
  ----------------------------------------- */

  const destinations = {
    Dubai: {
      name: "Dubai, UAE",
      lat: 25.2048,
      lng: 55.2708
    },
    Paris: {
      name: "Paris, France",
      lat: 48.8566,
      lng: 2.3522
    },
    Tokyo: {
      name: "Tokyo, Japan",
      lat: 35.6762,
      lng: 139.6503
    },
    Zurich: {
      name: "Zurich, Switzerland",
      lat: 47.3769,
      lng: 8.5417
    },
    Mangalore: {
      name: "Mangalore, India",
      lat: 12.9141,
      lng: 74.856
    },
    Bengaluru: {
      name: "Bengaluru, India",
      lat: 12.9716,
      lng: 77.5946
    }
  };

  const mapElement = $("tsDestinationMap");
  const mapSelect = $("tsMapDestination");
  const mapButton = $("tsLocateDestination");
  const mapStatus = $("tsMapStatus");

  let mapInstance = null;
  let mapMarkers = {};
  let mapLoadPromise = null;

  function loadLeaflet() {
    if (window.L) return Promise.resolve(window.L);
    if (mapLoadPromise) return mapLoadPromise;

    mapLoadPromise = new Promise((resolve, reject) => {
      const existingLink = document.querySelector(
        'link[data-ts-leaflet="true"]'
      );

      const css = existingLink || document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      css.dataset.tsLeaflet = "true";

      if (!existingLink) {
        document.head.appendChild(css);
      }

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;

      script.onload = () => {
        if (window.L) resolve(window.L);
        else reject(new Error("The map library could not be initialized."));
      };

      script.onerror = () => {
        mapLoadPromise = null;
        script.remove();
        reject(new Error("Could not load the map. Check your connection."));
      };

      document.head.appendChild(script);
    });

    return mapLoadPromise;
  }

  function focusDestination(name) {
    const destination = destinations[name];

    if (!destination) {
      setStatus(mapStatus, "Please select a valid destination.");
      return;
    }

    if (!mapInstance) {
      setStatus(mapStatus, "The interactive map is not ready yet.");
      return;
    }

    mapInstance.flyTo(
      [destination.lat, destination.lng],
      10,
      { duration: 0.8 }
    );

    if (mapMarkers[name]) {
      mapMarkers[name].openPopup();
    }

    setStatus(mapStatus, `Showing ${destination.name} on the map.`);
  }

  async function initializeMap() {
    if (!mapElement) return;

    try {
      setStatus(mapStatus, "Loading the interactive map...");

      const L = await loadLeaflet();

      if (!mapInstance) {
        mapInstance = L.map(mapElement).setView([20, 0], 2);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        Object.entries(destinations).forEach(([key, destination]) => {
          const marker = L.marker([
            destination.lat,
            destination.lng
          ]).addTo(mapInstance);

          marker.bindPopup(
            `<strong>${destination.name}</strong>`
          );

          mapMarkers[key] = marker;
        });
      }

      // Important when the map was initially rendered inside a hidden area.
      requestAnimationFrame(() => {
        mapInstance.invalidateSize();
      });

      setStatus(mapStatus, "Map ready. Select a destination to explore.");
    } catch (error) {
      setStatus(
        mapStatus,
        error.message || "The map could not be loaded."
      );
    }
  }

  mapButton?.addEventListener("click", () => {
    focusDestination(mapSelect?.value);
  });

  mapSelect?.addEventListener("change", () => {
    focusDestination(mapSelect.value);
  });

  initializeMap();

  /* -----------------------------------------
     2. DAY-BY-DAY ITINERARY PLANNER
  ----------------------------------------- */

  const itineraryForm = $("tsItineraryForm");
  const itineraryOutput = $("tsItineraryOutput");
  const itineraryStatus = $("tsItineraryStatus");

  const itinerarySuggestions = {
    balanced: [
      ["Explore the city centre", "Visit a major landmark", "Enjoy a local dinner"],
      ["Discover a cultural attraction", "Explore a popular neighbourhood", "Relax at a scenic spot"],
      ["Visit a local market", "Choose a memorable activity", "Enjoy a relaxed evening"]
    ],
    culture: [
      ["Visit a historic landmark", "Explore a museum", "Try local cuisine"],
      ["Discover local architecture", "Visit a cultural attraction", "Explore a heritage district"],
      ["Browse an artisan market", "Learn about local traditions", "Enjoy a cultural evening"]
    ],
    nature: [
      ["Explore a nearby park", "Enjoy a scenic walk", "Watch the sunset"],
      ["Plan an outdoor excursion", "Visit a natural viewpoint", "Relax in a green space"],
      ["Explore a nature trail", "Enjoy outdoor photography", "Rest before departure"]
    ],
    relaxed: [
      ["Enjoy a slow morning", "Explore a nearby attraction", "Relax at a cafe"],
      ["Visit one favourite landmark", "Enjoy a leisurely lunch", "Explore at your own pace"],
      ["Browse local shops", "Enjoy a quiet afternoon", "Prepare for the next day"]
    ],
    food: [
      ["Try a local breakfast", "Explore a food market", "Enjoy a regional dinner"],
      ["Discover a local speciality", "Visit a popular cafe", "Try a traditional dish"],
      ["Explore street food", "Visit a neighbourhood market", "Choose a favourite restaurant"]
    ]
  };

  let currentItinerary = null;

  function buildItinerary(destination, dayCount, style) {
    const suggestions =
      itinerarySuggestions[style] || itinerarySuggestions.balanced;

    return Array.from({ length: dayCount }, (_, index) => {
      const activities = suggestions[index % suggestions.length];

      return {
        day: index + 1,
        title: `Day ${index + 1} in ${destination}`,
        activities: [...activities]
      };
    });
  }

  function renderItinerary(days) {
    if (!itineraryOutput) return;

    const fragment = document.createDocumentFragment();

    days.forEach((day) => {
      const card = document.createElement("article");
      card.className = "ts-day-card";

      const heading = document.createElement("h3");
      heading.textContent = day.title;

      const list = document.createElement("ul");

      day.activities.forEach((activity) => {
        const item = document.createElement("li");
        item.textContent = activity;
        list.appendChild(item);
      });

      card.append(heading, list);
      fragment.appendChild(card);
    });

    itineraryOutput.replaceChildren(fragment);
  }

  itineraryForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const destination = $("tsItineraryDestination")?.value.trim();
    const days = Number($("tsItineraryDays")?.value);
    const style = $("tsItineraryStyle")?.value || "balanced";

    if (!destination || !Number.isInteger(days) || days < 1 || days > 14) {
      setStatus(
        itineraryStatus,
        "Enter a destination and choose between 1 and 14 days."
      );
      return;
    }

    currentItinerary = {
      destination,
      days: buildItinerary(destination, days, style),
      style,
      updatedAt: new Date().toISOString()
    };

    renderItinerary(currentItinerary.days);
    setStatus(
      itineraryStatus,
      `Created a ${days}-day suggested itinerary for ${destination}. Customize activities to suit your plans.`
    );
  });

  $("tsSaveItinerary")?.addEventListener("click", () => {
    if (!currentItinerary) {
      setStatus(itineraryStatus, "Create an itinerary before saving.");
      return;
    }

    const saved = readStorage("travelsphere_advanced_itineraries", []);

    const updated = [
      currentItinerary,
      ...saved.filter(
        (trip) => trip.destination !== currentItinerary.destination
      )
    ].slice(0, 20);

    const success = writeStorage("travelsphere_advanced_itineraries", updated);

    setStatus(
      itineraryStatus,
      success
        ? "Itinerary saved in this browser."
        : "Could not save the itinerary. Check your browser storage settings."
    );
  });

  $("tsExportItinerary")?.addEventListener("click", () => {
    if (!currentItinerary) {
      setStatus(itineraryStatus, "Create an itinerary before downloading.");
      return;
    }

    const text = [
      `TravelSphere Itinerary: ${currentItinerary.destination}`,
      `Travel style: ${currentItinerary.style}`,
      "",
      ...currentItinerary.days.flatMap((day) => [
        day.title,
        ...day.activities.map((activity) => `- ${activity}`),
        ""
      ])
    ].join("\n");

    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download =
      `travelsphere-${currentItinerary.destination
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}-itinerary.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setStatus(itineraryStatus, "Your itinerary download has started.");
  });

  /* -----------------------------------------
     3. PACKING CHECKLIST
  ----------------------------------------- */

  const packingKey = "travelsphere_commit21_packing";

  const defaultPackingItems = [
    { id: "passport", text: "Passport or identification", packed: false },
    { id: "tickets", text: "Tickets and booking details", packed: false },
    { id: "wallet", text: "Wallet, cards and cash", packed: false },
    { id: "phone", text: "Phone and charger", packed: false },
    { id: "clothes", text: "Clothing and comfortable shoes", packed: false },
    { id: "toiletries", text: "Toiletries and personal essentials", packed: false },
    { id: "medicine", text: "Necessary medication", packed: false },
    { id: "insurance", text: "Travel insurance details", packed: false }
  ];

  let packingItems = readStorage(packingKey, null);

  if (!Array.isArray(packingItems)) {
    packingItems = defaultPackingItems.map((item) => ({ ...item }));
  }

  function savePackingItems() {
    const success = writeStorage(packingKey, packingItems);

    if (!success) {
      setStatus(
        $("tsPackingProgressText"),
        "Browser storage is unavailable; progress may not persist."
      );
    }

    return success;
  }

  function renderPackingList() {
    const list = $("tsPackingList");
    if (!list) return;

    const fragment = document.createDocumentFragment();
    let packedCount = 0;

    packingItems.forEach((item) => {
      if (item.packed) packedCount++;

      const row = document.createElement("div");
      row.className = `ts-packing-item${item.packed ? " is-packed" : ""}`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(item.packed);
      checkbox.id = `ts-pack-${item.id}`;

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = item.text;

      checkbox.addEventListener("change", () => {
        item.packed = checkbox.checked;
        savePackingItems();
        renderPackingList();
      });

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.textContent = "×";
      removeButton.setAttribute("aria-label", `Remove ${item.text}`);

      removeButton.addEventListener("click", () => {
        packingItems = packingItems.filter((entry) => entry.id !== item.id);
        savePackingItems();
        renderPackingList();
      });

      row.append(checkbox, label, removeButton);
      fragment.appendChild(row);
    });

    list.replaceChildren(fragment);

    const total = packingItems.length;
    const percent = total ? Math.round((packedCount / total) * 100) : 0;

    const progressBar = $("tsPackingProgressBar");
    if (progressBar) {
      progressBar.style.width = `${percent}%`;
      progressBar.setAttribute("role", "progressbar");
      progressBar.setAttribute("aria-valuemin", "0");
      progressBar.setAttribute("aria-valuemax", "100");
      progressBar.setAttribute("aria-valuenow", String(percent));
      progressBar.setAttribute("aria-label", "Packing checklist completion");
    }

    setStatus(
      $("tsPackingProgressText"),
      `${packedCount} of ${total} items packed (${percent}%).`
    );
  }

  $("tsPackingForm")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = $("tsNewPackingItem");
    const text = input?.value.trim();

    if (!text) return;

    packingItems.push({
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      packed: false
    });

    savePackingItems();
    renderPackingList();
    input.value = "";
    input.focus();
  });

  $("tsResetPacking")?.addEventListener("click", () => {
    packingItems = defaultPackingItems.map((item) => ({ ...item }));
    savePackingItems();
    renderPackingList();
  });

  renderPackingList();

  /* -----------------------------------------
     4. ACCESSIBILITY PREFERENCES
  ----------------------------------------- */

  const accessibilityKey = "travelsphere_commit21_accessibility";

  const savedAccessibility = readStorage(accessibilityKey, {
    largeText: false,
    reducedMotion: false
  });

  function applyAccessibility() {
    root.classList.toggle("ts-large-text", savedAccessibility.largeText);
    root.classList.toggle(
      "ts-reduced-motion",
      savedAccessibility.reducedMotion
    );

    const motionToggle = $("tsReduceMotion");
    if (motionToggle) {
      motionToggle.checked = savedAccessibility.reducedMotion;
    }

    writeStorage(accessibilityKey, savedAccessibility);
  }

  $("tsTextLarger")?.addEventListener("click", () => {
    savedAccessibility.largeText = true;
    applyAccessibility();
  });

  $("tsTextSmaller")?.addEventListener("click", () => {
    savedAccessibility.largeText = false;
    applyAccessibility();
  });

  $("tsResetAccessibility")?.addEventListener("click", () => {
    savedAccessibility.largeText = false;
    savedAccessibility.reducedMotion = false;
    applyAccessibility();
  });

  $("tsReduceMotion")?.addEventListener("change", (event) => {
    savedAccessibility.reducedMotion = event.target.checked;
    applyAccessibility();
  });

  applyAccessibility();

})();


