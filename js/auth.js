// Authentication functions
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkAuth();
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const userType = document.getElementById('userType').value;
            
            // Simple validation
            if (!username || !password || !userType) {
                alert('Please fill all fields');
                return;
            }
            
            // Store user session (in real app, this would be server-side)
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userType', userType);
            
            // Redirect based on user type
            if (userType === 'admin') {
                window.location.href = 'admin.html';
            } else if (userType === 'user') {
                window.location.href = 'user.html';
            } else if (userType === 'vendor') {
                window.location.href = 'vendor.html';
            }
        });
    }
    
    // Logout functionality
    const logoutButtons = document.querySelectorAll('#logout');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.clear();
            window.location.href = 'login.html';
        });
    });
});

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userType = sessionStorage.getItem('userType');
    const currentPage = window.location.pathname.split('/').pop();
    
    // If not logged in, redirect to login page (except for index and login pages)
    if (!isLoggedIn && currentPage !== 'index.html' && currentPage !== 'login.html') {
        window.location.href = 'login.html';
        return;
    }
    
    // Check user permissions
    if (isLoggedIn) {
        // Admin can access all pages except login
        if (userType === 'admin') {
            if (currentPage === 'login.html') {
                window.location.href = 'admin.html';
            }
        }
        // User cannot access maintenance
        else if (userType === 'user') {
            if (currentPage === 'maintenance.html') {
                window.location.href = 'user.html';
            }
        }
        // Vendor specific checks can be added here
    }
}