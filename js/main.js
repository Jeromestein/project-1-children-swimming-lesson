$(document).ready(function() {
    // jQuery AJAX example for blog posts
    function loadLatestPosts() {
        $.ajax({
            url: 'https://api.example.com/posts',
            method: 'GET',
            success: function(response) {
                // Handle the response
                console.log('Posts loaded successfully');
            },
            error: function(xhr, status, error) {
                console.error('Error loading posts:', error);
            }
        });
    }

    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Smooth scroll for anchor links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
    });
}); 