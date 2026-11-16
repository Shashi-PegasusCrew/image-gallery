const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const searchInput = document.getElementById("imageSearch");
const categoryFilter = document.getElementById("categoryFilter");
const galleryImages = Array.from(document.querySelectorAll(".gallery-item img"));
let filteredGalleryImages = galleryImages.slice();
let currentIndex = 0;

function updateMainImage() {
    if (!filteredGalleryImages.length) return;
    fullImg.src = filteredGalleryImages[currentIndex].src;
    prevButton.style.visibility = currentIndex === 0 ? "hidden" : "visible";
    nextButton.style.visibility = currentIndex === filteredGalleryImages.length - 1 ? "hidden" : "visible";
}

function openfullImg(index) {
    currentIndex = index;
    fullImgBox.style.display = "flex";
    updateMainImage();
}

function showPrev() {
    if (currentIndex === 0) return;
    currentIndex--;
    updateMainImage();
}

function showNext() {
    if (currentIndex === filteredGalleryImages.length - 1) return;
    currentIndex++;
    updateMainImage();
}

function closefullImg() {
    fullImgBox.style.display = "none";
}

function filterGallery() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const currentImage = fullImg.src;

    filteredGalleryImages = [];
    galleryImages.forEach(function (image) {
        const item = image.closest(".gallery-item");
        const categories = item.dataset.categories.split(",");
        const matchesCategory = selectedCategory === "all" || categories.includes(selectedCategory);
        const searchableText = (image.alt + " " + categories.join(" ")).toLowerCase();
        const matchesSearch = searchableText.includes(searchTerm);
        const isVisible = matchesCategory && matchesSearch;

        item.hidden = !isVisible;
        if (isVisible) {
            filteredGalleryImages.push(image);
        }
    });

    const currentImageIndex = filteredGalleryImages.findIndex(function (image) {
        return image.src === currentImage;
    });
    if (fullImgBox.style.display === "flex") {
        if (currentImageIndex === -1) {
            closefullImg();
        } else {
            currentIndex = currentImageIndex;
            updateMainImage();
        }
    }
}

galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
        const index = filteredGalleryImages.indexOf(image);
        if (index !== -1) openfullImg(index);
    });
});

searchInput.addEventListener("input", filterGallery);
categoryFilter.addEventListener("change", filterGallery);
