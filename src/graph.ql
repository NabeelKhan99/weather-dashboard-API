weather-dashboard/
│
├── public/
│   └── index.html            # Main HTML file with placeholders for chart canvases and UI
│
├── src/
│   ├── css/
│   │   └── styles.css        # Light + Dark mode styles, animations, layout
│   │
│   ├── js/
│   │   ├── charts/
│   │   │   ├── temperatureChart.js     # Setup + update logic for temp chart
│   │   │   ├── precipitationChart.js   # Setup + update logic for precip chart
│   │   │   └── compareChart.js         # Chart for comparing pinned cities
│   │   │
│   │   ├── features/
│   │   │   ├── darkMode.js             # Dark mode toggle + chart theme update
│   │   │   ├── pinCities.js            # Pin/unpin logic + max 3 pin limit
│   │   │   └── chartAnimation.js       # Animation logic on location change
│   │   │
│   │   ├── utils/
│   │   │   └── weatherData.js          # Fetch and structure weather data
│   │   │
│   │   └── main.js                     # App init, city input, render charts, glue code
│
├── .gitignore                         # Node modules, build files, etc.
├── README.md                          # Project instructions and setup
└── package.json                       # If using build tools, can be a plain static project too
