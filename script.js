$(document).ready(function(){
    // Function to reload content
    function reloadContent(getUrl) {
        var setUrl = getUrl;
        $.ajax({
            url: setUrl, // URL of the server script to fetch updated content
            type: 'GET', // Or 'POST' if needed
            success: function(data) {
                var htmlContent = generateContent();
                var btnContent = btnPrContent();
                $('#content').html(htmlContent); 
                $('#btn_main').html(btnContent);
                console.log(data);// Replace the content of the '#content' div with the fetched data
            },
            error: function(xhr, status, error) {
                console.error('Error:', status, error);
                console.log("xhr",xhr);
            }
        });
    }

    // Call reloadContent() when the button is clicked
    $('#btn_dashboard').click(function(){
        reloadContent("./dashboard.js");
    });
    $('#btn_projects').click(function(){
        reloadContent("./projects.js");
    });
    $('#btn_tasks').click(function(){
        reloadContent("./tasks.js");
    });
    $('#btn_users').click(function(){
        reloadContent("./users.js");
    });
});