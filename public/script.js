$(document).ready(function(){
    // Function to reload content
    function reloadContent(getUrl) {
        var setUrl = getUrl;
        $.ajax({
            url: setUrl, // URL of the server script to fetch updated content
            type: 'GET', // Or 'POST' if needed
            dataType: 'html', 
            success: function(data) {
                $('#content').html(data); 
                // console.log(data);// Replace the content of the '#content' div with the fetched data
            },
            error: function(xhr, status, error) {
                console.error('Error check /script.js:', status, error);
                console.log("xhr",xhr);
            }
        });
    }

    // Call reloadContent() when the button is clicked
    $('#btn_dashboard').click(function(){
        reloadContent("/tmp_dashboard.html");
    });
    $('#btn_projects').click(function(){
        reloadContent("/tmp_projects.html");
    });
    $('#btn_tasks').click(function(){
        reloadContent("/tmp_tasks.html");
    });
    $('#btn_users').click(function(){
        reloadContent("/tmp_users.html");
    });
});