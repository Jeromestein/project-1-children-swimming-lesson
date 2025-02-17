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

// Initialize Vue
new Vue({
    el: '#app'
});
