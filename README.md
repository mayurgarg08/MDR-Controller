# MDR Controller: Hospital Infection Control Dashboard

A front-end prototype of an **MDR (multi-drug-resistant) infection control centre** for hospitals. It gives infection-control teams one screen to monitor resistant-pathogen cases, ward occupancy, staff exposure and outbreak trends.

> This is a UI prototype that uses sample data. No backend is connected yet.

## Features

- **KPI cards:** total patients, active MDR cases, staff on duty, isolation capacity, critical alerts, lab processing time
- **Interactive hospital floor plan:** ward-by-ward occupancy, MDR case counts and staff deployment
- **Critical alerts** feed
- **MDR outbreak trends (7 days):** new, active and recovered cases plus deaths (Recharts line and area charts)
- **Outbreak risk prediction**
- **Active pathogen distribution:** MRSA, VRE, ESBL and CRE, with the antibiotics each one resists
- **Patient movement tracking** and **staff exposure monitoring**
- **Lab results integration** and a laboratory dashboard
- **Compliance monitoring** and **active containment protocols**
- **Hospital map editor** (`HospitalMapEditable.jsx`): draw and label risk zones such as ICU and sterilization areas with Leaflet Draw
- **Sign-up page** ("My MDR Tracker")

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 19, Vite 7 |
| Styling | Tailwind CSS 3, shadcn/ui-style components (Radix Slot, CVA, tailwind-merge) |
| Charts | Recharts |
| Maps | Leaflet, React Leaflet, Leaflet Draw |
| Icons | Lucide React, Font Awesome |
| Routing | React Router 7 |

## Project structure

```
src/
  pages/
    HomePage.jsx              main infection-control dashboard  (/)
    Signup.jsx                sign-up screen                    (/signup)
    HospitalMap.jsx           Leaflet hospital zone map
    HospitalMapEditable.jsx   drawable/editable zone map
  components/ui/              button, card, input
  lib/utils.js                cn() class-name helper
```

## Getting started

### Prerequisites
- Node.js 18+

```bash
git clone https://github.com/mayurgarg08/MDR-Controller.git
cd MDR-Controller
npm install
npm run dev       # http://localhost:5173
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |
| `npm run lint` | Run ESLint |

## Roadmap

- [ ] Connect a backend and database for live patient, lab and staff data
- [ ] Add the hospital map pages to the router
- [ ] Real-time alerts (WebSockets)
- [ ] Role-based login for doctors, nurses and infection-control officers

## Author

**Mayur Garg** · [GitHub](https://github.com/mayurgarg08) · [LinkedIn](https://www.linkedin.com/in/mayur-garg-428a291b4/)
