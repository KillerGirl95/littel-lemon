"using strict";
document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const updateBtn = document.getElementById('updateBtn');
    let currentIndex = 0;
    let images = [];

    // Function to make XMLHttpRequest
    function makeRequest(method, url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log(JSON.parse(xhr.responseText));
                callback(JSON.parse(xhr.responseText));
            } else {
                console.error('Request failed:', xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Request failed:', xhr.statusText);
        };
        xhr.send();
    }

    

    function displayImages() {
        if (images[currentIndex]) {
          gallery.innerHTML = `<img src="${images[currentIndex].name}" alt="Image">`;
          autoRotate(); // Start auto-rotation after displaying the current image
        } else {
          // Handle the case where images haven't been loaded yet (optional)
          console.log("Images not loaded yet.");
        }
    }

    // Function to rotate images automatically
    function autoRotate() {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            displayImages();
        }, images[currentIndex].time);
    }

    // Function to handle manual rotation
    function rotate(direction) {
        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        } else if (direction === 'next') {
            currentIndex = (currentIndex + 1) % images.length;
        }
        displayImages();
    }



    // Function to update/reset images from API
    function updateImages(callback) {
        makeRequest('GET', 'https://comp125-a4-api.onrender.com/imagelist', function(data) {
            images = data;
            console.log("data",data);
            currentIndex = 0;
            displayImages();
            if (typeof callback === 'function') {
                callback(); // Execute callback once images are loaded
            }
        });
    }

    // Event listeners
    prevBtn.addEventListener('click', () => rotate('prev'));
    nextBtn.addEventListener('click', () => rotate('next'));
    updateBtn.addEventListener('click', updateImages);

    // Initial setup
    updateImages();
    
});
console.log("attatched")