// Hero Banner Component
Vue.component('hero-banner', {
    template: `
        <div class="hero-banner">
            <div class="container">
                <h1>{{ title }}</h1>
                <p>{{ subtitle }}</p>
            </div>
        </div>
    `,
    data() {
        return {
            title: 'Explore the World',
            subtitle: 'Your journey begins here'
        }
    }
});

// Initialize Vue
new Vue({
    el: '#app'
}); 