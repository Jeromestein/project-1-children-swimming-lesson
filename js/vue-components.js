// Hero Banner Component
Vue.component('hero-banner', {
    template: `
        <div class="hero-banner">
            <div class="container">
                <h1>{{ title }}</h1>
                <p>{{ subtitle }}</p>
                <a href="pages/contact.html" class="cta-button">Join Us Today!</a>
            </div>
        </div>
    `,
    data() {
        return {
            title: 'Dive Into Confidence',
            subtitle: 'Join our swimming programs and build lifelong skills'
        }
    }
});

// Debug component
Vue.component('debug-info', {
    template: `
        <div class="alert alert-info">
            Vue is working! Current time: {{ currentTime }}
        </div>
    `,
    data() {
        return {
            currentTime: new Date().toLocaleTimeString()
        }
    },
    mounted() {
        setInterval(() => {
            this.currentTime = new Date().toLocaleTimeString()
        }, 1000)
    }
});

// Weather Component
Vue.component('weather', {
    template: `
        <div class="weather">
            <div v-if="loading" class="text-center p-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else-if="error" class="alert alert-danger">
                {{ error }}
            </div>
            <div v-else class="card">
                <div class="container">
                    <h2>Weather in {{ city }}</h2>
                    <p>Temperature: {{ weather.temp }}°C</p>
                    <p>Humidity: {{ weather.humidity }}%</p>
                    <p>Description: {{ weather.description }}</p>
                    <img :src="'http://openweathermap.org/img/wn/' + weather.icon + '@2x.png'" alt="Weather Icon">
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            city: 'Los Angeles',
            weather: {
                temp: 0,
                humidity: 0,
                description: '',
                icon: ''
            },
            loading: false,
            error: null
        }
    },
    mounted() {
        this.fetchWeather();
        // Refresh weather data every 30 minutes
        setInterval(() => {
            this.fetchWeather();
        }, 30 * 60 * 1000);
    },
    methods: {
        fetchWeather() {
            const API_KEY = '215c3707ee0f7b702640546b8f4de28c'; 
            const city = 'Los Angeles';
            
            this.loading = true;
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
                .then(response => {
                    if (!response.ok) {
                        console.error('Weather API Response:', response.status, response.statusText);
                        throw new Error('Weather data not available');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Weather data received:', data); // Debug log
                    this.weather = {
                        temp: Math.round(data.main.temp),
                        humidity: data.main.humidity,
                        description: data.weather[0].description,
                        icon: data.weather[0].icon
                    };
                    this.loading = false;
                    this.error = null;
                })
                .catch(err => {
                    this.error = 'Weather data loading failed. Please try again later.';
                    this.loading = false;
                    console.error('Weather API Error:', err.message);
                });
        }
    }
});

// Initialize Vue
new Vue({
    el: '#app'
});
