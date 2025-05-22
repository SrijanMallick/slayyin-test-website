// Custom Merch Showcase Data
const customMerchItems = [
    {
        id: 1,
        title: "Basketball Oversized T-Shirt by Slayyin",
        collegeName: "NIT Agartala - Hoopers",
        image: "hoopers-showcase.jpg",
        description: "Premium quality oversized t-shirt designed for the NIT Agartala basketball team. Features a bold, eye-catching design with the team logo and player numbers. Made from 100% cotton for comfort and durability."
    },
    {
        id: 2,
        title: "Polo T-Shirt",
        collegeName: "Business Club - NIT Agartala",
        image: "bclub-merch.jpg",
        description: "Elegant polo t-shirt for the Business Club members. Professional design with subtle branding, perfect for networking events and club meetings. Crafted from premium pique cotton for a polished look."
    },
];

// Function to create and display custom merch cards
function displayCustomMerch() {
    const slider = document.getElementById('customMerchSlider');
    const dotsContainer = document.getElementById('customMerchDots');
    if (!slider) return;

    slider.innerHTML = ''; // Clear existing content
    dotsContainer.innerHTML = ''; // Clear existing dots

    // Create cards and dots
    customMerchItems.forEach((item, index) => {
        // Create card
        const card = document.createElement('div');
        card.className = 'custom-merch-card';
        if (index === 0) card.classList.add('active');

        card.innerHTML = `
            <div class="custom-merch-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="custom-merch-info">
                <h3>${item.title}</h3>
                <p class="custom-merch-college">${item.collegeName}</p>
                <p class="custom-merch-description">${item.description}</p>
            </div>
        `;

        slider.appendChild(card);

        // Create dot
        const dot = document.createElement('div');
        dot.className = 'custom-merch-dot';
        dot.setAttribute('data-index', index);
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Set up navigation
    const prevBtn = document.getElementById('prevCard');
    const nextBtn = document.getElementById('nextCard');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => navigateSlider('prev'));
        nextBtn.addEventListener('click', () => navigateSlider('next'));
    }

    // Initialize slider
    currentSlide = 0;
    updateSliderPosition();
}

// Slider navigation variables
let currentSlide = 0;
const slideCount = customMerchItems.length;

// Function to navigate the slider
function navigateSlider(direction) {
    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % slideCount;
    } else {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    }
    
    updateSliderPosition();
}

// Function to go to a specific slide
function goToSlide(index) {
    currentSlide = index;
    updateSliderPosition();
}

// Function to update slider position
function updateSliderPosition() {
    const cards = document.querySelectorAll('.custom-merch-card');
    const dots = document.querySelectorAll('.custom-merch-dot');
    
    // Update cards
    cards.forEach((card, index) => {
        if (index === currentSlide) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Initialize the display when the DOM is loaded
document.addEventListener('DOMContentLoaded', displayCustomMerch); 