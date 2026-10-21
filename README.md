# 🌍 TravelSphere — Smart Travel Planner & Destination Explorer

> **TravelSphere** is a responsive travel discovery and planning website built with HTML, CSS, and vanilla JavaScript. It combines a premium editorial travel interface with practical tools for exploring destinations, planning itineraries, estimating trip costs, and preparing for a journey.

![TravelSphere](https://img.shields.io/badge/Project-TravelSphere-d4a64a)
![HTML5](https://img.shields.io/badge/HTML5-Structure-orange)
![CSS3](https://img.shields.io/badge/CSS3-Responsive%20UI-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Design System](#-design-system)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Run Locally](#-run-locally)
- [External Services and APIs](#-external-services-and-apis)
- [Browser Storage](#-browser-storage)
- [How to Use](#-how-to-use)
- [Accessibility and Responsive Design](#-accessibility-and-responsive-design)
- [Known Limitations](#-known-limitations)
- [Testing Checklist](#-testing-checklist)
- [Future Improvements](#-future-improvements)
- [Git Commit](#-git-commit)
- [Author](#-author)

---

## 🧭 Project Overview

**Project name:** TravelSphere  
**Category:** Travel discovery, itinerary planning, and travel utility website  
**Frontend:** HTML5, CSS3, JavaScript (ES6+)  
**Architecture:** Static frontend; no backend or build process required  
**Primary goal:** Make destination discovery and trip preparation feel visual, interactive, and easy to use.

TravelSphere brings destination photography, itinerary planning, budget estimation, weather information, currency conversion, packing preparation, and saved travel ideas into one interface.

This is a frontend portfolio project. It is designed to demonstrate responsive web design, DOM manipulation, browser storage, API integration, interactive UI states, and user-focused visual design.

## 🎨 Design System

TravelSphere includes two coordinated themes:

### Dark theme — Obsidian Royal Gold
- Deep black and charcoal surfaces
- Royal gold accents
- White typography
- Glassmorphism panels and layered surfaces
- Cinematic destination photography
- Soft glow, depth, and hover transitions

### Light theme — Ivory Orange Sky
- Ivory and white surfaces
- Royal orange accents
- Sky-blue highlights
- Clean editorial typography
- Soft shadows and readable contrast

### Interaction and motion
- Glassmorphism-style panels
- Elevated destination cards
- Subtle 3D tilt and hover effects
- Scroll reveal animations
- Animated loading screen
- Responsive navigation
- Theme preference retained in the browser

The visual effects are CSS-based and intended to enhance content without replacing clear navigation or readable text.

## ✨ Features

### 1. Premium landing page
- Branded loading screen
- Large travel-focused hero section
- Destination imagery and editorial-style content
- Calls to action that guide users toward exploration and planning
- Scroll-based reveal effects

### 2. Destination discovery
- Photo-led destination cards
- Destination information and calls to action
- Interactive hover states
- Save/favourite destination interactions where available in the interface

### 3. Dark and light themes
- Toggle between dark and light appearances
- Dark theme uses black, royal gold, and white
- Light theme uses ivory/white, orange, and sky blue
- Theme choice is stored locally in the browser

### 4. Trip planner and itinerary
- Enter a destination and trip preferences
- Generate a trip-plan view
- Display itinerary results in the planner area
- Export itinerary content where supported by the page controls
- Copy/share trip information where supported by the browser and available controls

> Generated itinerary content is frontend-generated. It should not be presented as a verified booking, live availability result, or professionally validated travel recommendation.

### 5. Interactive destination map
- Map interface powered by Leaflet
- Map tiles supplied by OpenStreetMap
- Destination markers and map interactions where configured in the page

Map tiles require an internet connection. Always respect the map provider's attribution requirements.

### 6. Weather forecast
- Forecast cards for supported destinations
- Weather information retrieved from Open-Meteo
- Loading and error states for unavailable data

Forecast availability depends on the network, service uptime, and the location data used by the frontend. Forecasts are not a substitute for official local alerts.

### 7. Currency converter
- Choose source and target currencies
- Enter an amount and calculate a conversion
- Swap the selected currencies
- Display reference-rate information when returned by the service

The converter uses `open.er-api.com`. Rates are indicative only and may differ from card, bank, cash-exchange, or payment-provider rates. Confirm the final rate and fees with your provider before travelling.

### 8. Smart budget planner
- Enter a trip budget
- Estimate transport, accommodation, food, activities, and other expenses
- Calculate total estimated spending
- Show remaining budget or an over-budget warning
- Display a progress indicator for budget usage

Budget values are estimates entered by the user, not live prices or guaranteed trip costs.

### 9. Packing checklist
- Checklist for preparing travel essentials
- Interactive check-off states
- Save checklist progress in browser storage where supported by the implementation

### 10. Saved travel ideas / travel journal
- Save travel items or itinerary details where supported
- Revisit saved content in the journal area
- Keep local data in the current browser profile

Browser-local data is not automatically synchronised across devices or browsers.

### 11. Travel safety information
- Safety and emergency information section
- General preparation guidance

Emergency numbers and entry requirements vary by country. Verify important details through official government, embassy, airline, and local emergency sources before departure.

### 12. Responsive UI and metadata
- Layout adjustments for desktop, tablet, and mobile screens
- Mobile navigation menu
- Semantic page sections
- Search-engine description and social-sharing metadata
- Reduced-motion consideration and keyboard focus styling where implemented

---

## 🧰 Technology Stack

| Technology / Service | Purpose |
|---|---|
| HTML5 | Semantic page structure and content |
| CSS3 | Themes, responsive layouts, animations, glassmorphism, and card effects |
| Vanilla JavaScript | Interactions, calculations, UI state, and API requests |
| `localStorage` | Store selected preferences and supported user data in the browser |
| Leaflet | Interactive map interface |
| OpenStreetMap | Map tile data |
| Open-Meteo | Weather forecast data |
| Open ER API | Reference currency exchange rates |
| Google Fonts | Web typography |
| Unsplash | Destination photography |

No React, Node.js, database, or package installation is required for the current static version.

## 📁 Project Structure

```text
TravelSphere/
├── index.html    # Main page structure, sections, and metadata
├── style.css     # Design system, themes, responsive rules, and animations
├── script.js     # UI interactions, planner logic, browser storage, and API calls
└── README.md     # Project documentation
```

## 🚀 Run Locally

### Option A — VS Code + Live Server (recommended)

1. Download or clone the project.
2. Open the `TravelSphere` folder in Visual Studio Code.
3. Install the **Live Server** extension if it is not already installed.
4. Right-click `index.html`.
5. Select **Open with Live Server**.
6. The site should open in your browser.

### Option B — Open the HTML file

Double-click `index.html` to open it in a browser. Some external integrations may work more reliably through a local development server.

### Requirements
- A modern browser such as Chrome, Edge, Firefox, or Safari
- Internet connection for remote fonts, images, map tiles, and external API data
- No `npm install` or compilation step for the current version

## 🌐 External Services and APIs

| Service | Used for | Notes |
|---|---|---|
| Google Fonts | Fonts | Requires internet access |
| Unsplash image URLs | Destination photography | Image availability and remote loading can change |
| Leaflet | Map library | Loaded from an external CDN if configured in the page |
| OpenStreetMap | Map tiles | Attribution must remain visible as required |
| Open-Meteo | Weather forecast | API/network availability may vary |
| `open.er-api.com` | Currency reference rates | Values are indicative, not guaranteed transaction rates |

**Privacy note:** When the site requests external resources, the relevant service may receive normal request information such as IP address and browser metadata. Do not enter passwords, payment-card details, or other sensitive personal information into this demo.

## 💾 Browser Storage

TravelSphere uses browser `localStorage` for selected preferences and supported locally saved features.

- Data stays in the browser profile used to access the site.
- Clearing site data or browser storage can remove saved preferences and travel items.
- Private/incognito browsing may clear data when the session ends.
- Local data is not a cloud backup and is not synchronised between devices.
- Do not use browser storage as secure storage for passwords or secrets.

## 🧑‍💻 How to Use

1. Open the landing page and browse destination imagery.
2. Use the theme toggle to switch between the dark and light themes.
3. Select a destination or move to the trip planner.
4. Enter your destination and trip preferences, then generate an itinerary.
5. Use the budget planner to estimate expenses.
6. Check weather information and currency reference rates when online.
7. Explore the map and review the safety section.
8. Complete the packing checklist and save travel ideas where supported.
9. Test the website at desktop, tablet, and mobile widths.

## ♿ Accessibility and Responsive Design

The project aims to provide:
- Responsive layouts for smaller screens
- Semantic sections and navigation
- Visible keyboard focus where styled
- Button labels for key controls
- Reduced-motion handling where implemented
- Theme contrast intended to keep text legible

Accessibility should be tested manually with keyboard navigation, browser zoom, and a screen reader. Decorative animations should never prevent users from accessing the page's content.

## ⚠️ Known Limitations

- This is a static frontend project; it does not include user accounts, a server, or a database.
- Saved items are browser-local and do not sync across devices.
- Weather and currency features need a working internet connection and external services.
- External images may change, fail to load, or be rate-limited.
- Currency results are reference estimates, not a guaranteed exchange quote.
- Map markers and destination data depend on the values configured in the frontend.
- Itinerary and budget outputs are planning aids, not confirmed reservations or guaranteed prices.
- This project does not process real bookings or payments.

## ✅ Testing Checklist

Before pushing the final redesign to GitHub, test:

- [ ] `index.html` opens without a blank screen.
- [ ] Browser console has no blocking JavaScript errors.
- [ ] CSS and JavaScript files load successfully.
- [ ] Dark/light theme toggle works and retains its preference.
- [ ] Mobile navigation opens and closes.
- [ ] Destination cards and planner controls respond to clicks.
- [ ] Itinerary generation displays a result.
- [ ] Export, copy, or share controls work where shown.
- [ ] Budget calculations handle empty, zero, and valid values.
- [ ] Packing checklist and saved items behave as expected.
- [ ] Map renders when online.
- [ ] Weather and currency widgets show useful errors if APIs are unavailable.
- [ ] Layout is usable at mobile, tablet, and desktop widths.
- [ ] Footer links and page navigation work.
- [ ] External image credits and map attribution are retained where required.

## 🔮 Future Improvements

Potential next steps:
- Add a backend API and database for cross-device accounts and saved trips
- Add authentication and secure user profiles
- Add verified destination data and source attribution
- Add server-side itinerary persistence and sharing links
- Add automated tests and a deployment workflow
- Add a privacy policy and clearer data-use disclosures
- Add automated accessibility and performance checks
- Add a production deployment on GitHub Pages or another static hosting provider

## 📦 Git Commit

After testing the replacement files, run these commands from the project folder:

```powershell
git add index.html style.css script.js README.md
git commit -m "Redesign TravelSphere with premium UI UX and themes"
git push origin main
```

If Git reports that the remote branch contains commits you do not have locally, fetch and reconcile the changes before pushing. Avoid force-pushing unless you fully understand the impact on the remote repository.

## 👨‍💻 Author

**Abhishek**  
BCA Graduate | Aspiring Full-Stack Developer

**Project:** TravelSphere — Smart Travel Planner & Destination Explorer

---

*Built as a frontend portfolio project to practise responsive UI/UX design, JavaScript interactions, browser storage, and third-party API integration.*
