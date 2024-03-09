$(document).ready(function () {
    // Function to reload content
    function reloadContent(getUrl) {
        var setUrl = getUrl;
        $.ajax({
            url: setUrl, // URL of the server script to fetch updated content
            type: 'GET', // Or 'POST' if needed
            dataType: 'html',
            success: function (data) {
                $('#content').html(data);

            },
            error: function (xhr, status, error) {
                console.error('Error check /script.js:', status, error);
                console.log("xhr", xhr);
            }
        });
    }
    function logout() {
        // Clear user session/token from local storage
        sessionStorage.removeItem('token'); // Assuming token is stored in local storage
    
        // Redirect to the login page
        window.location.href = '/login.html'; // Replace '/login.html' with the URL of your login page
    }
    
    // Example of attaching the logout function to a logout button
    document.getElementById('logoutButton').addEventListener('click', logout);

 
    // Call reloadContent() when the button is clicked
    $('#btn_dashboard').click(function () {
        reloadContent("/tmp_dashboard.html");
    });
    $('#btn_projects').click(function () {
        reloadContent("/tmp_projects.html");
    });
    $('#btn_tasks').click(function () {
        reloadContent("/tmp_tasks.html");
    });
    $('#btn_users').click(function () {
        reloadContent("/tmp_users.html");
    });
});

