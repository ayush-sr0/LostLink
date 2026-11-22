# LostLink 🔍

> An intelligent community lost & found recovery network connecting students, commuters, and staff across campuses and hubs.

LostLink allows users to quickly report lost belongings, list found items, and match them with real-time updates powered by Supabase.

---

## 🚀 Features

- **Quick Reporting**: Report lost or found valuables in under 60 seconds with item descriptions, categories, and locations.
- **Smart Search & Filters**: Search lost and found items by keywords, categories, date, and status.
- **Interactive Dashboard**: Track reported items, view claim statuses, and manage your listings.
- **Authentication**: User authentication and profile management powered by Supabase.
- **Responsive Design**: Clean and modern UI tailored for desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6+)
- **Backend / Database**: [Supabase](https://supabase.com/) (Auth, Database, Storage)
- **Icons & Fonts**: Google Fonts (Plus Jakarta Sans, Inter), Material Symbols

---

## 📂 Project Structure

```
lostlink/
├── index.html            # Landing / Home page
├── search.html           # Item search and exploration page
├── report-lost.html      # Form to report a lost item
├── report-found.html     # Form to report a found item
├── item-details.html     # Detailed item view and claiming
├── dashboard.html        # User dashboard and item management
├── login.html            # Login and sign-up page
├── css/
│   └── styles.css        # Custom styles
├── js/
│   ├── supabase-client.js # Supabase client initialization
│   ├── home.js           # Home page logic
│   ├── search.js         # Search and filtering logic
│   ├── dashboard.js      # Dashboard interactions
│   ├── report-lost.js    # Lost item submission logic
│   ├── report-found.js   # Found item submission logic
│   ├── item-details.js   # Item detail handling
│   └── login.js          # Auth handler
└── assets/               # Static assets (images, icons)
```

---

## 🚦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayush-sr0/LostLink.git
   cd LostLink
   ```

2. **Open the project:**
   You can serve the project using any local web server, for example:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   ```
   Or open `index.html` directly in your browser.

---

## 📄 License

This project is licensed under the MIT License.
