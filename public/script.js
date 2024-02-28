$(document).ready(function(){
    // Function to reload content
    function reloadContent(getUrl) {
        var setUrl = getUrl;
        $.ajax({
            url: setUrl, // URL of the server script to fetch updated content
            type: 'GET',
            dataType: 'html', // Or 'POST' if needed
            success: function(data) {
                $('#content').html(data); 
                // $('#btn_main').html(btnContent);
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
        reloadContent("./tmp_dashboard.html");
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