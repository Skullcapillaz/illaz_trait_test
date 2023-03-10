// Define array of overlay image URLs
var overlayImages = [
  "tattoo.png",
  "jacket.png",
  "gm.png.png",
  "face tatto-01.png",
  "hoodie gray-01.png",
  "hoodie green-01.png",
  "camo jacket-01.png",
];

var overlays = []; // Keep track of current overlays

function getNFT() {
  var tokenID = document.getElementById("tokenID").value;
  var nftContainer = document.getElementById("nft");
  var loading = document.getElementById("loading");

  // Show loading animation
  loading.style.display = "block";

  // Hide NFT container
  nftContainer.style.display = "none";

  // Get NFT image from OpenSea API
  var url = "https://api.opensea.io/api/v1/asset/0x007f8F8bA11b75cA7030ed563eb7Ca1A16F966EC/" + tokenID + "/";
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Get image URL from OpenSea API response
      var imageUrl = data.image_url;

      // Create new image element and set its source to the NFT image URL
      var image = new Image();
      image.onload = function() {
        // Hide loading animation
        loading.style.display = "none";

        // Show NFT container
        nftContainer.style.display = "block";

        // Add image to NFT container
        nftContainer.innerHTML = "";
        nftContainer.appendChild(image);

        // Add any existing overlays
        for (var i = 0; i < overlays.length; i++) {
          overlayImage(nftContainer, overlays[i]);
        }
      };
      image.src = imageUrl;
    })
    .catch(function(error) {
      console.log("Error:", error);
    });
}

function overlayImage(container, imageUrl) {
  // Create new image element and set its source to the overlay image URL
  var overlay = new Image();
  overlay.classList.add("overlay"); // Add class to identify overlay images
  overlay.onload = function() {
    // Set the position and size of the overlay image to match the original image
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";

    // Add overlay image to container
    container.appendChild(overlay);

    // Add overlay to list of current overlays
    overlays.push(imageUrl);
  };
  overlay.src = imageUrl;
}

function clearOverlays() {
  var nftContainer = document.getElementById("nft");

  // Remove all overlay images
  var overlayImages = nftContainer.querySelectorAll(".overlay");
  for (var i = 0; i < overlayImages.length; i++) {
    nftContainer.removeChild(overlayImages[i]);
  }

  // Clear list of current overlays
  overlays = [];
}

// Add event listeners to overlay image buttons
var overlayButtons = document.querySelectorAll(".overlay-button");
for (var i = 0; i < overlayButtons.length; i++) {
  overlayButtons[i].addEventListener("click", function() {
    var imageUrl = this.getAttribute("data-image-url");
    var nftContainer = document.getElementById("nft");
    overlayImage(nftContainer, imageUrl);
  });
}

// Add event listener to clear button
var clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", function() {
  clearOverlays();
});

function downloadImage() {
  var nftContainer = document.getElementById("nft");
  var image = nftContainer.querySelector("img");
  var link = document.createElement('a');
  link.download = 'my-nft.png';
  link.href = image.src;
  link.click();
}

var downloadButton = document.getElementById("download-button");
downloadButton.addEventListener("click", function() {
  downloadImage();
});
