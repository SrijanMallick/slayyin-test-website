<script>
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
          const faqItem = button.parentElement;
    faqItem.classList.toggle("active");
      });
  });
</script>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.getElementById("productsContainer");
  const customMerchContainer = document.getElementById(
    "customMerchContainer"
  );
  const categoryButtons = document.querySelectorAll(".category-btn");
  let currentCategory = "all";

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // Load products from Firebase with category filter
  function loadProducts(category = "all") {
    db.collection("products")
      .get()
      .then((snapshot) => {
        productsContainer.innerHTML = ""; // Clear existing products
        snapshot.forEach((doc) => {
          const product = doc.data();

          // Skip products that don't match the selected category
          if (category !== "all" && product.category !== category) {
            return;
          }

          const productCard = document.createElement("div");
          productCard.className = "product-card";
          productCard.innerHTML = `
                  <div class="product-image">
                      <img src="${product.images[0]}" alt="${
            product.name
          }">
                      <div class="wishlist-icon" onclick="event.stopPropagation(); addToWishlist('${
                        doc.id
                      }')">
                          <i class="fas fa-heart"></i>
                      </div>
                  </div>
                  <div class="product-info">
                      <h3>${product.name}</h3>
                      <div class="product-price">
                          ${
                            product.salePrice
                              ? `<span class="sale-price">₹${product.salePrice.toFixed(
                                  2
                                )}</span>
                               <span class="original-price">₹${product.price.toFixed(
                                 2
                               )}</span>`
                              : `<span>₹${product.price.toFixed(
                                  2
                                )}</span>`
                          }
                      </div>
                      <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${
                        doc.id
                      }')">Add to Cart</button>
                  </div>
              `;
          productCard.onclick = () =>
            (window.location.href = `product-details.html?id=${doc.id}`);
          productsContainer.appendChild(productCard);
        });
      })
      .catch((error) => {
        console.error("Error loading products: ", error);
        productsContainer.innerHTML =
          '<p class="error-message">Error loading products. Please try again later.</p>';
      });
  }

  // Add click event listeners to category buttons
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");
      // Update current category
      currentCategory = button.dataset.category;
      // Load products for selected category
      loadProducts(currentCategory);
    });
  });

  // Load all products when page loads
  loadProducts();

function revealOnScroll() {
    const containerPosition =
      productsContainer.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

  if (containerPosition < screenPosition) {
      productsContainer.classList.add("active");
  }
}

window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // Initialize cart
  updateCartCount();
});
</script>

<script>
  function openTypeform() {
  window.open(
    "https://form.typeform.com/to/GLGFo3ja",
    "TypeformPopup",
    "width=800,height=600"
  );
}

function scrollToCustomization() {
  document
    .getElementById("customization-section")
    .scrollIntoView({ behavior: "smooth" });
  }

  document.addEventListener("DOMContentLoaded", function () {
const whyChooseUs = document.querySelector(".why-choose-us");

function revealUSP() {
  const sectionPosition = whyChooseUs.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (sectionPosition < screenPosition) {
      whyChooseUs.classList.add("active");
  }
}

window.addEventListener("scroll", revealUSP);
revealUSP(); // Run once on load
});
</script>

<script>
// Account dropdown functionality
function toggleAccountDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById("account-dropdown");
  dropdown.classList.toggle("active");
}

// Close dropdown when clicking elsewhere
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("account-dropdown");
  if (dropdown && dropdown.classList.contains("active")) {
    dropdown.classList.remove("active");
  }
});

// Update account dropdown based on login status
function updateAccountDropdown() {
  const dropdown = document.getElementById("account-dropdown");
  if (!dropdown) return;

  const user = JSON.parse(localStorage.getItem("slayyin-user"));

  if (user && user.isLoggedIn) {
    // User is logged in, show logged-in options
    dropdown.innerHTML = `
          <a href="account.html" class="account-dropdown-item">
              <i class="fas fa-tachometer-alt"></i> Dashboard
          </a>
          <a href="account.html#orders" class="account-dropdown-item">
              <i class="fas fa-shopping-bag"></i> My Orders
          </a>
          <a href="account.html#profile" class="account-dropdown-item">
              <i class="fas fa-user-edit"></i> Update Info
          </a>
          <hr>
          <a href="#" class="account-dropdown-item" onclick="logout(); event.stopPropagation();">
              <i class="fas fa-sign-out-alt"></i> Logout
          </a>
      `;
  } else {
    // User is not logged in, show login/signup options
    dropdown.innerHTML = `
          <a href="login.html" class="account-dropdown-item">
              <i class="fas fa-sign-in-alt"></i> Login
          </a>
          <a href="signup.html" class="account-dropdown-item">
              <i class="fas fa-user-plus"></i> Create Account
          </a>
      `;
  }
}

// Logout function
function logout() {
  // Clear user data
  localStorage.removeItem("slayyin-user");

  // Update dropdown
  updateAccountDropdown();

  // Show notification
  if (typeof showNotification === "function") {
    showNotification("Logged out successfully!");
  }
}

// Initialize account dropdown on page load
document.addEventListener("DOMContentLoaded", function () {
  updateAccountDropdown();

  // Other existing initialization code...
});
</script>

<script>
function scrollToFeaturedProducts() {
  document
    .getElementById("featured-products")
    .scrollIntoView({ behavior: "smooth" });
}
</script>

<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-storage-compat.js"></script>

<!-- Database Files -->
<script src="firebase-config.js"></script>
<script src="database.js"></script>
<script src="custom-merch.js"></script>
<script>
// Contact Form Handling with Google Sheets
document
  .getElementById("contactForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwWJbQMkgj2L7WC0yg9ZgHXTc5DeOapZ3AGVanrBV_6yEgV8Jave29mIx8RpjUTw1bk/exec";

    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          alert(
            "Thank you for your message! We will get back to you soon."
          );
          document.getElementById("contactForm").reset();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Sorry, there was an error sending your message.");
      });
  });
</script>

<script>
// Search functionality
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
let searchTimeout;

searchInput.addEventListener("input", function () {
  clearTimeout(searchTimeout);
  const searchTerm = this.value.toLowerCase().trim();

  if (searchTerm.length < 2) {
    searchResults.classList.remove("active");
    return;
  }

  searchTimeout = setTimeout(() => {
    searchProducts(searchTerm);
  }, 300);
});

async function searchProducts(searchTerm) {
  try {
    const snapshot = await firebase
      .firestore()
      .collection("products")
      .get();
    const results = [];

    snapshot.forEach((doc) => {
      const product = doc.data();
      const productName = product.name.toLowerCase();
      const productPrice = product.salePrice
        ? `<span class="sale-price">₹${product.salePrice.toFixed(
            2
          )}</span>
                   <span class="original-price">₹${product.price.toFixed(
                     2
                   )}</span>`
        : `<span>₹${product.price.toFixed(2)}</span>`;

      if (productName.includes(searchTerm)) {
        results.push({
          id: doc.id,
          name: product.name,
          price: productPrice,
          image: product.images[0] || "placeholder.jpg",
        });
      }
    });

    displaySearchResults(results);
  } catch (error) {
    console.error("Error searching products:", error);
    searchResults.innerHTML =
      '<div class="search-result-item no-results">Error searching products</div>';
    searchResults.classList.add("active");
  }
}

function displaySearchResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML =
      '<div class="search-result-item no-results">No products found</div>';
  } else {
    searchResults.innerHTML = results
      .map(
        (product) => `
              <div class="search-result-item" onclick="window.location.href='product-details.html?id=${product.id}'">
                  <img src="${product.image}" alt="${product.name}">
                  <div class="product-info">
                      <div class="product-name">${product.name}</div>
                      <div class="product-price">${product.price}</div>
                  </div>
              </div>
          `
      )
      .join("");
  }
  searchResults.classList.add("active");
}

// Close search results when clicking outside
document.addEventListener("click", function (event) {
  if (!event.target.closest(".search-container")) {
    searchResults.classList.remove("active");
  }
});
</script>

<script>
function handleWishlistClick() {
  const user = JSON.parse(localStorage.getItem("slayyin-user"));
  if (user && user.isLoggedIn) {
    toggleWishlist();
  } else {
    window.location.href = "login.html?redirect=wishlist";
  }
}
</script>

<script>
// Wishlist functionality
function addToWishlist(productId) {
  const user = JSON.parse(localStorage.getItem("slayyin-user"));

  if (!user || !user.isLoggedIn) {
    window.location.href = "login.html?redirect=wishlist";
    return;
  }

  // Get current wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Get the clicked wishlist icon
  const wishlistIcon = event.currentTarget;
  const heartIcon = wishlistIcon.querySelector("i");

  // Check if product is already in wishlist
  if (wishlist.includes(productId)) {
    // Remove from wishlist
    wishlist = wishlist.filter((id) => id !== productId);
    wishlistIcon.classList.remove("active");
    heartIcon.style.color = "#fff";
    showNotification("Removed from wishlist");
  } else {
    // Add to wishlist
    wishlist.push(productId);
    wishlistIcon.classList.add("active");
    heartIcon.style.color = "#000";
    showNotification("Added to wishlist");
  }

  // Update wishlist in localStorage
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Initialize wishlist on page load
document.addEventListener("DOMContentLoaded", function () {
  // Update wishlist icons for products in wishlist
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.forEach((productId) => {
    const wishlistIcon = document.querySelector(
      `[onclick*="${productId}"]`
    );
    if (wishlistIcon) {
      wishlistIcon.classList.add("active");
    }
  });
});

// Notification function
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  // Trigger reflow
  notification.offsetHeight;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}
</script>

<!-- Scripts -->
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-storage-compat.js"></script>
<script src="firebase-config.js"></script>
<script src="database.js"></script>
<script src="custom-merch.js"></script>
<script>
// Load products from Firebase
async function loadProducts() {
  try {
    const products = await productService.getAllProducts();
    const productsContainer =
      document.getElementById("productsContainer");
    productsContainer.innerHTML = ""; // Clear existing products

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      // Create image element with error handling
      const img = document.createElement("img");
      img.src = product.images[0] || "placeholder.jpg";
      img.alt = product.name;
      img.onerror = function () {
        this.src = "placeholder.jpg";
        console.error(
          `Failed to load image for product: ${product.name}`
        );
      };

      productCard.innerHTML = `
                  <div class="product-image">
                      ${img.outerHTML}
                      <div class="wishlist-icon" onclick="event.stopPropagation(); addToWishlist('${
                        product.id
                      }')">
                          <i class="fas fa-heart"></i>
                      </div>
                  </div>
                  <div class="product-info">
                      <h3>${product.name}</h3>
                      <div class="product-price">
                          ${
                            product.salePrice
                              ? `<span class="sale-price">₹${product.salePrice.toFixed(
                                  2
                                )}</span>
                               <span class="original-price">₹${product.price.toFixed(
                                 2
                               )}</span>`
                              : `<span>₹${product.price.toFixed(
                                  2
                                )}</span>`
                          }
                      </div>
                      <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${
                        product.id
                      }')">
                          Add to Cart
                      </button>
                  </div>
              `;

      productCard.onclick = () =>
        (window.location.href = `product-details.html?id=${product.id}`);
      productsContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error loading products: ", error);
    const productsContainer =
      document.getElementById("productsContainer");
    productsContainer.innerHTML =
      '<p class="error-message">Error loading products. Please try again later.</p>';
  }
}

// Load products when the page loads
document.addEventListener("DOMContentLoaded", loadProducts);
</script>

<script>
// Toggle wishlist sidebar
function toggleWishlist() {
  const wishlistSidebar = document.getElementById("wishlist-sidebar");
  const overlay = document.getElementById("overlay");

  if (!wishlistSidebar) {
    console.error("Wishlist sidebar element not found");
    return;
  }

  wishlistSidebar.classList.toggle("active");

  if (overlay) {
    overlay.classList.toggle("active");
  }

  // If opening the sidebar, make sure to load the wishlist
  if (wishlistSidebar.classList.contains("active")) {
    updateWishlistDisplay();
  }
}

// Update wishlist display
function updateWishlistDisplay() {
  const wishlistItemsContainer =
    document.getElementById("wishlist-items");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    wishlistItemsContainer.innerHTML = `
              <div class="empty-wishlist">
                  <i class="fas fa-heart"></i>
                  <p>Your wishlist is empty</p>
              </div>
          `;
    return;
  }

  // Load products data from Firebase
  const productsRef = firebase.firestore().collection("products");
  productsRef.get().then((querySnapshot) => {
    const products = {};
    querySnapshot.forEach((doc) => {
      products[doc.id] = doc.data();
    });

    let wishlistHTML = "";
    wishlist.forEach((productId) => {
      const product = products[productId];
      if (product) {
        wishlistHTML += `
                      <div class="wishlist-item" data-id="${productId}">
                          <div class="wishlist-item-image">
                              <img src="${
                                product.images &&
                                product.images.length > 0
                                  ? product.images[0]
                                  : "placeholder.jpg"
                              }" alt="${product.name}">
                          </div>
                          <div class="wishlist-item-details">
                              <h4>${product.name}</h4>
                              <div class="wishlist-item-price">₹${
                                product.price
                              }</div>
                              <div class="wishlist-item-actions">
                                  <button class="add-to-cart-btn" onclick="addToCart('${productId}')">Add to Cart</button>
                                  <button class="remove-from-wishlist-btn" onclick="removeFromWishlist('${productId}')">Remove</button>
                              </div>
                          </div>
                      </div>
                  `;
      }
    });

    wishlistItemsContainer.innerHTML = wishlistHTML;
  });
}

// Remove from wishlist
function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter((id) => id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  // Update wishlist count
  updateWishlistCount();

  // Update wishlist display
  updateWishlistDisplay();

  // Update wishlist icon
  const wishlistIcon = document.querySelector(
    `[onclick*="${productId}"]`
  );
  if (wishlistIcon) {
    wishlistIcon.classList.remove("active");
  }

  showNotification("Removed from wishlist");
}

// The handleWishlistClick function is already defined earlier in the file
// Removing the duplicate implementation here
</script>

<script>
document.addEventListener("DOMContentLoaded", function () {
  // Add click event listener to overlay to close sidebars
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.addEventListener("click", function () {
      // Close cart sidebar if open
      const cartSidebar = document.getElementById("cart-sidebar");
      if (cartSidebar && cartSidebar.classList.contains("active")) {
        toggleCart();
      }

      // Close wishlist sidebar if open
      const wishlistSidebar = document.getElementById("wishlist-sidebar");
      if (
        wishlistSidebar &&
        wishlistSidebar.classList.contains("active")
      ) {
        toggleWishlist();
      }
    });
  }

  // Initialize wishlist count
  updateWishlistCount();
});
</script>