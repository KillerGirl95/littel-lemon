"use strict";

window.addEventListener("load", createLightbox);

function createLightbox() {
  // Lightbox Container
  let lightBox = document.getElementById("lightbox");

  // Parts of the lightbox
  let lbTitle = document.createElement("h1");
  let lbCounter = document.createElement("div");
  let lbPrev = document.createElement("div");
  let lbNext = document.createElement("div");
  let lbPlay = document.createElement("div");
  let lbImages = document.createElement("div");

  // Design the lightbox title
  lightBox.appendChild(lbTitle);
  lbTitle.id = "lbTitle";
  lbTitle.textContent = lightboxTitle;

  // Design the lightbox slide counter
  lightBox.appendChild(lbCounter);
  lbCounter.id = "lbCounter";
  let currentImg = 1;
  lbCounter.textContent = currentImg + " / " + imgCount;

  // Design the lightbox previous slide button
  lightBox.appendChild(lbPrev);
  lbPrev.id = "lbPrev";
  lbPrev.innerHTML = "&#9664;";
  lbPrev.onclick = showPrev;

  // Design the lightbox next slide button
  lightBox.appendChild(lbNext);
  lbNext.id = "lbNext";
  lbNext.innerHTML = "&#9654;";
  lbNext.onclick = showNext;

  // Design the lightbox Play-Pause button
  lightBox.appendChild(lbPlay);
  lbPlay.id = "lbPlay";
  lbPlay.innerHTML = "&#9199;";
  let timeID;
  lbPlay.onclick = function () {
    if (timeID) {
      // Stop the slideshow
      window.clearInterval(timeID);
      timeID = undefined;
    } else {
      // Start the slideshow
      showNext();
      timeID = window.setInterval(showNext, 1500);
    }
  };
  

  // Design the lightbox images container
  lightBox.appendChild(lbImages);
  lbImages.id = "lbImages";
  // Add images from the imgFiles array to the container
  for (let i = 0; i < imgCount; i++) {
    let image = document.createElement("img");
    image.src = imgFiles[i];
    image.alt = imgCaptions[i];
    image.onclick = createOverlay;
    lbImages.appendChild(image);
  }

  // Function to move forward through the image list
  function showNext() {
    lbImages.appendChild(lbImages.firstElementChild);
    currentImg < imgCount ? currentImg++ : (currentImg = 1);
    lbCounter.textContent = currentImg + " / " + imgCount;
  }

  // Function to move backward through the image list
  function showPrev() {
    lbImages.insertBefore(
      lbImages.lastElementChild,
      lbImages.firstElementChild
    );
    currentImg > 1 ? currentImg-- : (currentImg = imgCount);
    lbCounter.textContent = currentImg + " / " + imgCount;
  }
  // -------------------  OVERLAY FUNCTION ---------------------
  function createOverlay() {
   let overlay = document.createElement("div");
   overlay.id = "lbOverlay";
 
   // Add the figure box to the overlay
   let figureBox = document.createElement("figure");
   overlay.appendChild(figureBox);
       // Add the favorite button to the figure box
       let favoriteButton = document.createElement("a");
       favoriteButton.href = "#";
       favoriteButton.innerHTML = "Add to Favorites";
       favoriteButton.id = "lbOverlayFavorite";
       favoriteButton.addEventListener("click", addToFavorites);
       figureBox.appendChild(favoriteButton);
 
   // Add the image to the figure box
   let overlayImage = this.cloneNode("true");
   figureBox.appendChild(overlayImage);

   // Add the caption to the figure box
   let overlayCaption = document.createElement("figcaption");
   overlayCaption.textContent = this.alt;
   figureBox.appendChild(overlayCaption);
 
   // Add a close button to the overlay
   let closeBox = document.createElement("div");
   closeBox.id = "lbOverlayClose";
   closeBox.innerHTML = "&times;";
   closeBox.onclick = function() {
     document.body.removeChild(overlay);
   };
   overlay.appendChild(closeBox);
 
   document.body.appendChild(overlay);
 }
}
  // -------------------  addToFavorites FUNCTION ---------------------
function addToFavorites(event) {
   event.preventDefault();
   
   // img src = 
   let clickedImage = event.target.parentNode.querySelector("img");
   let imageSrc = clickedImage.src;
   
   // if image is in favorites?
   let favoriteImages = document.querySelectorAll("#lbFavoritesContainer img");
   let isAlreadyFavorite = Array.from(favoriteImages).some(img => img.src === imageSrc);
   
   if (!isAlreadyFavorite) {
     // Create a new favorite image element
     let favoriteImage = document.createElement("img");
     favoriteImage.src = imageSrc;
     
     // Add the favorite image to the favorites container
     let favoritesContainer = document.querySelector("#lbFavoritesContainer");
     if (favoritesContainer.children.length < 5) {
       favoritesContainer.appendChild(favoriteImage);
     } else {
       alert("You can only have up to 5 favorite images.");
       alert("Remove 1 favorite image to make room for another");
     }
   } else {
     // Remove the image from favorites
     let matchingImage = Array.from(favoriteImages).find(img => img.src === imageSrc);
     matchingImage.parentNode.removeChild(matchingImage);
   }
   
   // Favorite Button UI
   let favoriteButton = event.target;
   if (!isAlreadyFavorite) {
     favoriteButton.innerHTML = "Remove from Favorites";
   } else {
     favoriteButton.innerHTML = "Add to Favorites";
   }
 }
 
 function removeFavorite(imageSrc) {
   // Matching image source and removes it from container
   let favoriteImages = document.querySelectorAll("#lbFavoritesContainer img");
   for (let i = 0; i < favoriteImages.length; i++) {
     if (favoriteImages[i].src === imageSrc) {
       favoriteImages[i].remove();
       break;
     }
   }
   
 }

let favoriteContainer = document.createElement("div");
favoriteContainer.id = "lbFavoritesContainer";
document.body.appendChild(favoriteContainer);



 