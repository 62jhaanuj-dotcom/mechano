Mechano — Vehicle Service Booking Platform
Mechano is a professional vehicle service booking platform developed with React, Firebase, and Firestore. 
It provides a digital bridge between vehicle owners and service providers, 
allowing for streamlined appointment scheduling, service tracking, and administrative management.

The platform includes a comprehensive user interface for customers and a robust dashboard for administrators 
to oversee operations, manage personnel, and handle service products.

Table of Contents
Overview
Key Features
Tech Stack
Project Structure
Installation
Environment Setup
Deployment
Author

Overview
Mechano simplifies the vehicle maintenance lifecycle by offering:
Online appointment booking for various vehicle services.
Real-time tracking of service progress.
Automated status notifications.
Integrated store for browsing and purchasing service products.
Centralized administrative control for managing mechanics and requests.

Key Features
User Features
Secure authentication (Signup and Login) via Firebase.
Service appointment booking and management.
Real-time status tracking and appointment cancellation.
User profile management.
Product store with filtering and "Add to Cart" functionality.

Admin Features
Comprehensive Admin Dashboard for system-wide overview.
User and Mechanic management modules.
Appointment oversight (Accept/Reject/Complete requests).
Product inventory management.
Customer inquiry and contact query management.

Notification System
Automated email alerts via EmailJS for:
Appointment acceptance.
Appointment rejection.
Service completion updates.

Tech Stack
Frontend
JavaScript
React.js

Vite (Build Tool)
Tailwind CSS (Styling)
Backend & Cloud
Firebase Authentication

Firestore Database
Firebase Hosting
Tools & Integrations
EmailJS (Notification services)

GitHub (Version control and CI/CD workflows)

Project Structure
Plaintext
mechano
├── .github
│   └── workflows
│       └── firebase-hosting-pull-request.yml
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ... (UI Components)
│   ├── context
│   │   ├── AuthContext.jsx
│   │   ├── AppointmentContext.jsx
│   │   └── CartContext.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── ... (View Pages)
│   ├── utils
│   │   ├── firebase.jsx
│   │   └── uploadProducts.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── firestore.rules
├── package.json
└── vite.config.js
Installation
To set up the project locally, follow these steps:

Clone the repository:

Bash
git clone https://github.com/62jhaanuj-dotcom/mechano.git
Navigate to the directory:

Bash
cd mechano
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
Environment Setup
Create a .env file in the root directory and populate it with your Firebase configuration credentials:

Code snippet
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
Deployment
To create a production build:

Bash
npm run build
To deploy using Firebase Hosting:

Bash
firebase deploy
Author
Anuj Jha

GitHub: 62jhaanuj-dotcom
