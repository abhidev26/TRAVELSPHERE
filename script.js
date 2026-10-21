/* =====================================================
   TRAVELSPHERE — FINAL UI/UX INTERACTIONS
   Vanilla JavaScript, no build tools required.
===================================================== */
(() => {
  "use strict";
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const store = {
    get(key, fallback) {
      try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
      catch (_) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; }
      catch (_) { return false; }
    }
  };

  let toastTimer;
  function toast(message) {
    const element = $("#toast");
    if (!element) return;
    element.textContent = message;
    element.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove("show"), 3000);
  }
  const money = value => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value) || 0);

  // Loading screen: never trap the user if external images or APIs are slow.
  function hideLoader() {
    const loader = $("#pageLoader");
    if (loader) loader.classList.add("loaded");
  }
  window.addEventListener("load", () => setTimeout(hideLoader, 450), { once: true });
  setTimeout(hideLoader, 2200);

  // Theme switcher with persistent preference.
  const themeToggle = $("#themeToggle");
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    store.set("ts-theme", theme);
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☼" : "☾";
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      themeToggle.title = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    }
  }
  applyTheme(document.documentElement.dataset.theme || "dark");
  themeToggle?.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

  // Mobile navigation.
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");
  menuToggle?.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menuToggle.textContent = open ? "✕" : "☰";
  });
  $$("#mainNav a").forEach(link => link.addEventListener("click", () => {
    mainNav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) { menuToggle.textContent = "☰"; menuToggle.setAttribute("aria-label", "Open navigation"); }
  }));

  // Reveal animation with graceful fallback.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(element => observer.observe(element));
  } else {
    $$(".reveal").forEach(element => element.classList.add("in-view"));
  }

  // Gentle 3D tilt on destination cards, disabled on coarse pointers/reduced motion.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    $$(".destination-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  // Destination data used by map and search.
  const places = {
    Bali: { label: "Bali, Indonesia", lat: -8.4095, lng: 115.1889 },
    Switzerland: { label: "Interlaken, Switzerland", lat: 46.6863, lng: 7.8632 },
    Japan: { label: "Kyoto, Japan", lat: 35.0116, lng: 135.7681 },
    Kyoto: { label: "Kyoto, Japan", lat: 35.0116, lng: 135.7681 },
    Dubai: { label: "Dubai, UAE", lat: 25.2048, lng: 55.2708 },
    Paris: { label: "Paris, France", lat: 48.8566, lng: 2.3522 },
    Tokyo: { label: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
    Mangalore: { label: "Mangalore, India", lat: 12.9141, lng: 74.856 },
    Bengaluru: { label: "Bengaluru, India", lat: 12.9716, lng: 77.5946 }
  };
  const getPlace = name => places[name] || { label: name, lat: 20, lng: 0 };

  // Map loads its library only when needed. If CDN is unavailable, show a useful fallback link.
  let map, markers = {};
  let leafletPromise;
  function loadLeaflet() {
    if (window.L) return Promise.resolve(window.L);
    if (leafletPromise) return leafletPromise;
    leafletPromise = new Promise((resolve, reject) => {
      if (!document.querySelector('link[data-ts-leaflet]')) {
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        css.dataset.tsLeaflet = "true";
        document.head.appendChild(css);
      }
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.onload = () => window.L ? resolve(window.L) : reject(new Error("Map library unavailable"));
      script.onerror = () => { leafletPromise = null; reject(new Error("Could not load the interactive map.")); };
      document.head.appendChild(script);
    });
    return leafletPromise;
  }
  async function initMap() {
    const el = $("#destinationMap");
    if (!el) return;
    try {
      const L = await loadLeaflet();
      if (!map) {
        map = L.map(el, { scrollWheelZoom: false }).setView([20, 20], 2);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        Object.entries(places).forEach(([key, place]) => {
          if (markers[key]) return;
          markers[key] = L.marker([place.lat, place.lng]).addTo(map).bindPopup(`<strong>${place.label}</strong>`);
        });
      }
      map.invalidateSize();
      focusMap($("#mapDestination")?.value || "Bali");
    } catch (_) {
      el.innerHTML = '<div style="padding:28px;color:#27333a;font:14px sans-serif"><strong>Map preview unavailable.</strong><p>Check your internet connection or open the selected place in OpenStreetMap.</p><a id="openMapFallback" href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">Open OpenStreetMap ↗</a></div>';
      $("#openMapFallback")?.addEventListener("click", () => {});
    }
  }
  function focusMap(name) {
    const place = getPlace(name);
    $("#mapPlaceName") && ($("#mapPlaceName").textContent = place.label);
    if (map) {
      map.flyTo([place.lat, place.lng], 8, { duration: .8 });
      markers[name]?.openPopup();
    }
    const fallback = $("#openMapFallback");
    if (fallback) fallback.href = `https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}#map=8/${place.lat}/${place.lng}`;
  }
  $("#mapDestination")?.addEventListener("change", event => {
    focusMap(event.target.value);
    loadWeather(event.target.value);
  });
  initMap();

  // Weather forecast via Open-Meteo; no API key needed.
  const weatherCodes = {
    0: ["☀️", "Clear"], 1: ["🌤️", "Mostly clear"], 2: ["⛅", "Partly cloudy"], 3: ["☁️", "Overcast"],
    45: ["🌫️", "Fog"], 48: ["🌫️", "Fog"], 51: ["🌦️", "Drizzle"], 53: ["🌦️", "Drizzle"],
    55: ["🌧️", "Heavy drizzle"], 56: ["🌧️", "Freezing drizzle"], 57: ["🌧️", "Freezing drizzle"],
    61: ["🌦️", "Light rain"], 63: ["🌧️", "Rain"], 65: ["🌧️", "Heavy rain"], 66: ["🌧️", "Freezing rain"],
    67: ["🌧️", "Freezing rain"], 71: ["🌨️", "Light snow"], 73: ["❄️", "Snow"], 75: ["❄️", "Heavy snow"],
    77: ["🌨️", "Snow grains"], 80: ["🌦️", "Showers"], 81: ["🌧️", "Showers"], 82: ["⛈️", "Heavy showers"],
    85: ["🌨️", "Snow showers"], 86: ["❄️", "Snow showers"], 95: ["⛈️", "Thunderstorm"], 96: ["⛈️", "Thunderstorm"], 99: ["⛈️", "Thunderstorm"]
  };
  async function loadWeather(name) {
    const place = getPlace(name);
    const holder = $("#weatherCards");
    if (!holder) return;
    $("#weatherLocation") && ($("#weatherLocation").textContent = `${place.label} forecast`);
    holder.innerHTML = '<p class="muted">Loading current forecast…</p>';
    $("#weatherStatus") && ($("#weatherStatus").textContent = "");
    try {
      const params = new URLSearchParams({
        latitude: place.lat, longitude: place.lng,
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        forecast_days: "5", timezone: "auto"
      });
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      if (!response.ok) throw new Error("Weather service unavailable");
      const data = await response.json();
      const daily = data.daily;
      if (!daily?.time?.length) throw new Error("Forecast data unavailable");
      holder.replaceChildren();
      daily.time.forEach((date, i) => {
        const [icon, label] = weatherCodes[daily.weather_code[i]] || ["🌍", "Conditions vary"];
        const day = i === 0 ? "Today" : i === 1 ? "Tomorrow" : new Intl.DateTimeFormat("en", { weekday: "short", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
        const card = document.createElement("div"); card.className = "weather-card";
        const dayEl = document.createElement("small"); dayEl.textContent = day;
        const iconEl = document.createElement("div"); iconEl.className = "weather-icon"; iconEl.textContent = icon; iconEl.setAttribute("aria-hidden", "true");
        const high = document.createElement("strong"); high.textContent = `${Math.round(daily.temperature_2m_max[i])}°`;
        const low = document.createElement("span"); low.textContent = `${Math.round(daily.temperature_2m_min[i])}° · ${label}`;
        card.append(dayEl, iconEl, high, low); holder.appendChild(card);
      });
      $("#weatherStatus") && ($("#weatherStatus").textContent = "Forecast by Open-Meteo. Conditions may change.");
    } catch (_) {
      holder.innerHTML = '<p class="muted">Weather forecast could not load. Check your connection and try again.</p>';
    }
  }
  $("#refreshWeather")?.addEventListener("click", () => loadWeather($("#mapDestination")?.value || "Bali"));
  loadWeather("Bali");

  // Quick search moves user to the planner and uses selected destination/duration.
  $("#quickSearchForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const destination = $("#quickDestination")?.value.trim();
    if (!destination) { toast("Enter a destination to get started."); $("#quickDestination")?.focus(); return; }
    $("#plannerDestination").value = destination;
    $("#plannerDays").value = $("#quickDays")?.value || "5";
    $("#planner")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    toast(`Let's plan your escape to ${destination}.`);
  });

  // Saved destination and itinerary journal.
  let savedPlaces = store.get("ts-saved-places", []);
  let savedTrips = store.get("ts-saved-trips", []);
  function saveState() { store.set("ts-saved-places", savedPlaces); store.set("ts-saved-trips", savedTrips); }
  function renderSaved() {
    const holder = $("#savedItems");
    if (!holder) return;
    const entries = [
      ...savedPlaces.map(name => ({ type: "place", name, detail: "Favourite destination", icon: "⌖" })),
      ...savedTrips.map((trip, index) => ({ type: "trip", name: trip.destination, detail: `${trip.days.length} day itinerary`, icon: "✦", index }))
    ];
    if (!entries.length) {
      holder.innerHTML = '<div class="empty-saved">Your saved places and itineraries will appear here.</div>';
      return;
    }
    holder.replaceChildren();
    entries.forEach(entry => {
      const card = document.createElement("article"); card.className = "saved-card";
      const thumb = document.createElement("div"); thumb.className = "saved-thumb"; thumb.textContent = entry.icon;
      const content = document.createElement("div");
      const title = document.createElement("h3"); title.textContent = entry.name;
      const detail = document.createElement("p"); detail.textContent = entry.detail;
      content.append(title, detail);
      const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "×"; remove.setAttribute("aria-label", `Remove ${entry.name} from saved items`);
      remove.addEventListener("click", () => {
        if (entry.type === "place") savedPlaces = savedPlaces.filter(x => x !== entry.name);
        else savedTrips.splice(entry.index, 1);
        saveState(); renderSaved(); updateSaveButtons(); toast("Removed from your saved items.");
      });
      card.append(thumb, content, remove); holder.appendChild(card);
    });
  }
  function updateSaveButtons() {
    $$("[data-save]").forEach(button => {
      const saved = savedPlaces.includes(button.dataset.save);
      button.classList.toggle("saved", saved);
      button.textContent = saved ? "♥" : "♡";
      button.setAttribute("aria-pressed", String(saved));
    });
  }
  $$("[data-save]").forEach(button => button.addEventListener("click", event => {
    event.stopPropagation();
    const name = button.dataset.save;
    savedPlaces = savedPlaces.includes(name) ? savedPlaces.filter(x => x !== name) : [...savedPlaces, name];
    saveState(); updateSaveButtons(); renderSaved();
    toast(savedPlaces.includes(name) ? `${name} saved to My Journeys.` : `${name} removed from saved places.`);
  }));
  $("#clearSaved")?.addEventListener("click", () => {
    savedPlaces = []; savedTrips = []; saveState(); renderSaved(); updateSaveButtons(); toast("Saved items cleared.");
  });
  updateSaveButtons(); renderSaved();

  // Destination cards and quick plan buttons.
  $$("[data-plan]").forEach(button => button.addEventListener("click", event => {
    event.stopPropagation();
    const name = button.dataset.plan;
    $("#plannerDestination").value = name;
    $("#planner")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    toast(`${name} selected for your trip.`);
  }));
  $$(".destination-card").forEach(card => {
    card.addEventListener("click", event => {
      if (event.target.closest("button")) return;
      const name = card.dataset.destination;
      if (name) {
        $("#plannerDestination").value = name;
        $("#planner")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
    card.addEventListener("keydown", event => {
      if ((event.key === "Enter" || event.key === " ") && event.target === card) {
        event.preventDefault();
        $("#plannerDestination").value = card.dataset.destination || "";
        $("#planner")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  });

  // Day-by-day itinerary. This generates editable suggestions, not live bookings.
  const activitySets = {
    balanced: [["Explore the city centre", "Visit a signature landmark", "Enjoy a local dinner"], ["Discover a cultural attraction", "Explore a neighbourhood", "Find a scenic viewpoint"], ["Visit a market", "Choose a memorable activity", "Relax at a cafe"]],
    culture: [["Visit a historic landmark", "Explore a museum", "Try a regional dish"], ["Discover architecture", "Visit a cultural attraction", "Walk a heritage district"], ["Browse an artisan market", "Learn local traditions", "Enjoy a cultural evening"]],
    nature: [["Explore a park or trail", "Enjoy a scenic walk", "Watch the sunset"], ["Plan an outdoor excursion", "Visit a viewpoint", "Rest in nature"], ["Explore a garden", "Take landscape photos", "Enjoy a relaxed evening"]],
    relaxed: [["Enjoy a slow morning", "Explore nearby sights", "Relax at a cafe"], ["Visit one favourite landmark", "Enjoy a leisurely lunch", "Keep the afternoon flexible"], ["Browse local shops", "Enjoy a quiet afternoon", "Prepare for tomorrow"]],
    food: [["Try a local breakfast", "Explore a food market", "Enjoy regional dinner"], ["Discover a local speciality", "Visit a popular cafe", "Try a traditional dish"], ["Explore street food", "Visit a neighbourhood market", "Choose a favourite restaurant"]]
  };
  let currentTrip = null;
  function renderTrip(trip) {
    const output = $("#itineraryOutput");
    if (!output) return;
    output.replaceChildren();
    trip.days.forEach(day => {
      const row = document.createElement("article"); row.className = "itinerary-day";
      const number = document.createElement("div"); number.className = "day-number"; number.textContent = String(day.day).padStart(2, "0");
      const content = document.createElement("div");
      const title = document.createElement("h4"); title.textContent = `Day ${day.day} · ${trip.destination}`;
      const text = document.createElement("p"); text.textContent = day.activities.join("  •  ");
      content.append(title, text); row.append(number, content); output.appendChild(row);
    });
    $("#itineraryTitle").textContent = `${trip.destination}, your way`;
  }
  $("#plannerForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const destination = $("#plannerDestination").value.trim();
    const daysCount = Number($("#plannerDays").value);
    const budget = Number($("#plannerBudget").value);
    const style = $("#plannerStyle").value;
    if (!destination || !Number.isInteger(daysCount) || daysCount < 1 || daysCount > 14 || !Number.isFinite(budget) || budget < 0) {
      toast("Please check your destination, trip length and budget."); return;
    }
    const suggestions = activitySets[style] || activitySets.balanced;
    currentTrip = { destination, budget, style, days: Array.from({ length: daysCount }, (_, index) => ({ day: index + 1, activities: [...suggestions[index % suggestions.length]] })), createdAt: new Date().toISOString() };
    renderTrip(currentTrip);
    $("#plannerStatus").textContent = `A ${daysCount}-day starting plan is ready. Confirm local details before booking.`;
  });
  $("#saveItinerary")?.addEventListener("click", () => {
    if (!currentTrip) { toast("Create an itinerary first."); return; }
    savedTrips = [currentTrip, ...savedTrips.filter(trip => !(trip.destination === currentTrip.destination && trip.createdAt === currentTrip.createdAt))].slice(0, 20);
    saveState(); renderSaved(); toast("Itinerary saved in this browser.");
    $("#plannerStatus").textContent = store.set("ts-saved-trips", savedTrips) ? "Saved to My Journeys on this device." : "Browser storage is unavailable.";
  });
  function tripText() {
    if (!currentTrip) return "";
    return [`TravelSphere itinerary — ${currentTrip.destination}`, `Days: ${currentTrip.days.length}`, `Budget: ${money(currentTrip.budget)}`, `Style: ${currentTrip.style}`, "", ...currentTrip.days.flatMap(day => [`Day ${day.day}`, ...day.activities.map(activity => `- ${activity}`), ""])].join("\n");
  }
  $("#downloadItinerary")?.addEventListener("click", () => {
    const text = tripText();
    if (!text) { toast("Create an itinerary first."); return; }
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = `travelsphere-${currentTrip.destination.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    toast("Your itinerary download has started.");
  });
  $("#shareItinerary")?.addEventListener("click", async () => {
    const text = tripText();
    if (!text) { toast("Create an itinerary first."); return; }
    try {
      if (navigator.share) await navigator.share({ title: `TravelSphere — ${currentTrip.destination}`, text });
      else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); toast("Itinerary copied to clipboard."); }
      else { toast("Sharing is not supported in this browser. Download your itinerary instead."); }
    } catch (error) {
      if (error.name !== "AbortError") toast("Unable to share right now.");
    }
  });

  // Budget calculator.
  function calculateBudget(event) {
    event?.preventDefault();
    const ids = ["budgetStay", "budgetTransport", "budgetFood", "budgetActivities", "budgetOther"];
    const expenses = ids.reduce((sum, id) => sum + Math.max(0, Number($("#" + id)?.value) || 0), 0);
    const total = Math.max(0, Number($("#budgetTotal")?.value) || 0);
    $("#budgetSpend").textContent = money(expenses);
    $("#budgetRemaining").textContent = money(total - expenses);
    $("#budgetProgress").style.width = `${total > 0 ? Math.min(100, expenses / total * 100) : expenses > 0 ? 100 : 0}%`;
    $("#budgetStatus").textContent = total <= 0 ? "Enter a budget greater than ₹0 for a useful comparison." : expenses > total ? `You're ${money(expenses - total)} over budget.` : expenses >= total * .8 ? "You're using at least 80% of your budget. Keep an eye on spending." : "You're within your planned budget.";
  }
  $("#budgetForm")?.addEventListener("submit", calculateBudget);
  ["budgetTotal", "budgetStay", "budgetTransport", "budgetFood", "budgetActivities", "budgetOther"].forEach(id => $("#" + id)?.addEventListener("input", calculateBudget));
  calculateBudget();

  // Currency converter via ExchangeRate-API's open endpoint.
  async function convertCurrency(event) {
    event?.preventDefault();
    const amount = Number($("#currencyAmount").value);
    const from = $("#currencyFrom").value;
    const to = $("#currencyTo").value;
    if (!Number.isFinite(amount) || amount < 0) { $("#currencyRate").textContent = "Enter a valid non-negative amount."; return; }
    if (from === to) { $("#currencyResult").textContent = `${amount.toLocaleString()} ${to}`; $("#currencyRate").textContent = "Both currencies are the same."; return; }
    $("#currencyResult").textContent = "…";
    $("#currencyRate").textContent = "Fetching current reference rate…";
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`);
      if (!response.ok) throw new Error("Exchange rate service unavailable");
      const data = await response.json();
      if (data.result !== "success" || !data.rates?.[to]) throw new Error("Rate unavailable for this currency");
      const rate = data.rates[to];
      $("#currencyResult").textContent = `${(amount * rate).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`;
      $("#currencyRate").textContent = `1 ${from} = ${rate.toLocaleString(undefined, { maximumFractionDigits: 5 })} ${to}. Reference rates only; provider fees may differ.`;
    } catch (_) {
      $("#currencyResult").textContent = "Unavailable";
      $("#currencyRate").textContent = "Could not fetch rates. Check your connection and try again.";
    }
  }
  $("#currencyForm")?.addEventListener("submit", convertCurrency);
  $("#swapCurrency")?.addEventListener("click", () => {
    const from = $("#currencyFrom"), to = $("#currencyTo");
    [from.value, to.value] = [to.value, from.value];
    convertCurrency();
  });
  convertCurrency();

  // Packing checklist with browser persistence.
  const packingKey = "ts-packing-list";
  const defaults = ["Passport / ID", "Tickets & booking details", "Wallet & cards", "Phone & charger", "Clothing & shoes", "Toiletries", "Medication", "Travel insurance"];
  let packing = store.get(packingKey, null);
  if (!Array.isArray(packing)) packing = defaults.map((text, index) => ({ id: `default-${index}`, text, done: false }));
  function renderPacking() {
    const list = $("#packingList"); if (!list) return;
    list.replaceChildren();
    packing.forEach(item => {
      const row = document.createElement("label"); row.className = `packing-item${item.done ? " done" : ""}`;
      const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.checked = !!item.done;
      const text = document.createElement("span"); text.textContent = item.text;
      const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "×"; remove.setAttribute("aria-label", `Remove ${item.text}`);
      checkbox.addEventListener("change", () => { item.done = checkbox.checked; store.set(packingKey, packing); renderPacking(); });
      remove.addEventListener("click", event => { event.preventDefault(); packing = packing.filter(x => x.id !== item.id); store.set(packingKey, packing); renderPacking(); });
      row.append(checkbox, text, remove); list.appendChild(row);
    });
    const done = packing.filter(x => x.done).length;
    $("#packingProgress").textContent = `${done} of ${packing.length} packed`;
  }
  $("#packingForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const input = $("#packingInput"); const text = input.value.trim();
    if (!text) return;
    packing.push({ id: `custom-${Date.now()}`, text, done: false });
    store.set(packingKey, packing); renderPacking(); input.value = ""; input.focus();
  });
  $("#resetPacking")?.addEventListener("click", () => {
    packing = defaults.map((text, index) => ({ id: `default-${index}`, text, done: false }));
    store.set(packingKey, packing); renderPacking(); toast("Packing checklist reset.");
  });
  renderPacking();

  // Quick search pre-fills planner from hero cards.
  $("#currentYear").textContent = new Date().getFullYear();

  // Back-to-top control.
  const backToTop = $("#backToTop");
  window.addEventListener("scroll", () => backToTop?.classList.toggle("visible", window.scrollY > 650), { passive: true });
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
})();
