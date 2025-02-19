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
            Current time: {{ currentTime }}
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
        <div class="weather-widget">
            <div v-if="loading" class="text-center p-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else-if="error" class="alert alert-danger">
                {{ error }}
            </div>
            <div v-else class="card">
                <div class="card-body">
                    <div class="weather-header">
                        <i class="fas fa-map-marker-alt location-icon"></i>
                        <h2>{{ city }}</h2>
                    </div>
                    <div class="weather-content">
                        <div class="temperature-section">
                            <span class="temperature">{{ weather.temp }}°</span>
                            <img :src="'http://openweathermap.org/img/wn/' + weather.icon + '@2x.png'" 
                                 :alt="weather.description" 
                                 class="weather-icon">
                        </div>
                        <div class="weather-details">
                            <div class="weather-description">
                                {{ weather.description }}
                            </div>
                            <div class="humidity-section">
                                <i class="fas fa-tint"></i>
                                <span>{{ weather.humidity }}% Humidity</span>
                            </div>
                            <div class="update-time">
                                Last updated: {{ lastUpdateTime }}
                            </div>
                        </div>
                    </div>
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
            error: null,
            lastUpdateTime: ''
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
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather',
                method: 'GET',
                data: {
                    q: city,
                    units: 'metric',
                    appid: API_KEY
                },
                timeout: 5000, // 5 seconds timeout
                cache: false,  // Disable caching
                beforeSend: () => {
                    this.loading = true;
                },
                success: (data) => {
                    console.log('Weather data received:', data);
                    this.weather = {
                        temp: Math.round(data.main.temp),
                        humidity: data.main.humidity,
                        description: data.weather[0].description,
                        icon: data.weather[0].icon
                    };
                    this.loading = false;
                    this.error = null;
                    this.lastUpdateTime = new Date().toLocaleTimeString();
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    this.error = 'Weather data loading failed. Please try again later.';
                    this.loading = false;
                    console.error('Weather API Error:', textStatus, errorThrown);
                },
                complete: () => {
                    console.log('Weather API request completed');
                }
            });
        }
    }
});

// Initialize Vue
new Vue({
    el: '#app'
});
