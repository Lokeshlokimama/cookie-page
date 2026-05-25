/* 
   CRUMBLE & CO. | Luxury Gourmet Cookie Storefront Logic
   Handles dynamic products, e-commerce cart, custom box customizer, and checkout wizard.
*/

// --- 1. Product Catalog Database ---
const PRODUCTS = [
    {
        id: "classic-choc",
        name: "Classic Chocolate Chip",
        price: 4.50,
        rating: 4.9,
        reviews: 312,
        desc: "Our award-winning signature recipe. Rich browned-butter dough packed with molten chunks of single-origin Belgian milk chocolate and finished with flaky Maldon sea salt.",
        ingredients: ["Brown Butter", "Belgian Milk Chocolate Chunks", "Maldon Sea Salt", "Organic Flour"],
        image: "assets/cookie_classic.png"
    },
    {
        id: "double-choc",
        name: "Double Chocolate Lava",
        price: 4.99,
        rating: 4.8,
        reviews: 245,
        desc: "A chocolate lover's dream. Decadent dark cocoa dough with a molten liquid fudge core that flows upon breaking. Sprinkled with fleur de sel.",
        ingredients: ["Dutch Process Cocoa", "Fudge Core", "Dark Chocolate Chips", "Sea Salt Crystals"],
        image: "assets/cookie_double_choc.png"
    },
    {
        id: "red-velvet",
        name: "Red Velvet Dream",
        price: 4.75,
        rating: 4.9,
        reviews: 189,
        desc: "Beautiful crimson red velvet dough, velvety soft in texture, loaded with white chocolate chips and stuffed with a rich sweet cream cheese frosting center.",
        ingredients: ["Red Velvet Cocoa", "Cream Cheese Filling", "Premium White Chocolate Chips"],
        image: "assets/cookie_red_velvet.png"
    },
    {
        id: "salted-caramel",
        name: "Salted Caramel Pecan",
        price: 4.99,
        rating: 4.7,
        reviews: 154,
        desc: "Thick, chewy dough packed with toasted buttery Georgia pecans, gooey salted caramel pockets that caramelize on the edges, and caramel drizzle.",
        ingredients: ["Georgia Pecans", "House Caramel Drizzle", "Browned Butter", "Sea Salt"],
        image: "assets/cookie_salted_caramel.png"
    },
    {
        id: "matcha-white",
        name: "Matcha White Chocolate",
        price: 4.75,
        rating: 4.8,
        reviews: 112,
        desc: "Crafted with authentic Uji ceremonial green tea matcha, offering a rich earthy aroma perfectly balanced by sweet, creamy Belgian white chocolate drops.",
        ingredients: ["Uji Ceremonial Matcha", "Belgian White Chocolate Chips", "Organic Cane Sugar"],
        image: "assets/cookie_matcha.png"
    }
];

// --- 2. State Variables ---
let cart = JSON.parse(localStorage.getItem("crumble_cart")) || [];
let customBox = {
    size: 6,
    price: 24.99,
    items: [] // Array of flavor IDs inside the custom box
};

// --- 3. DOM Elements Cache ---
const nav = document.getElementById("main-nav");
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav-panel");
const productsContainer = document.getElementById("products-container");
const cartBtn = document.getElementById("cart-btn");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartBackdrop = document.getElementById("cart-backdrop");
const cartItemsList = document.getElementById("cart-items-list");
const cartCountBadge = document.getElementById("cart-count");
const cartSubtotalText = document.getElementById("cart-subtotal");
const cartShippingText = document.getElementById("cart-shipping");
const cartTotalText = document.getElementById("cart-total");
const cartSummaryBlock = document.getElementById("cart-summary-block");
const shippingWarning = document.getElementById("shipping-warning");

// Box Builder Elements
const size6Btn = document.getElementById("size-6");
const size12Btn = document.getElementById("size-12");
const customizerFlavors = document.getElementById("customizer-flavors");
const boxSlotsGrid = document.getElementById("box-slots-grid");
const boxFillCountText = document.getElementById("box-fill-count");
const boxMaxCountText = document.getElementById("box-max-count");
const boxProgressBar = document.getElementById("box-progress");
const clearBoxBtn = document.getElementById("clear-box-btn");
const addBoxToCartBtn = document.getElementById("add-box-to-cart");

// Checkout Elements
const proceedCheckoutBtn = document.getElementById("proceed-checkout-btn");
const checkoutModal = document.getElementById("checkout-modal");
const checkoutBackdrop = document.getElementById("checkout-backdrop");
const checkoutCloseBtn = document.getElementById("checkout-close-btn");
const shippingForm = document.getElementById("shipping-form");
const paymentForm = document.getElementById("payment-form");
const checkoutSummaryTotal = document.getElementById("checkout-summary-total");
const backToShippingBtn = document.getElementById("back-to-shipping-btn");
const successHomeBtn = document.getElementById("success-home-btn");
const orderRefNumText = document.getElementById("order-ref-num");
const successEmailText = document.getElementById("success-email-text");

// Steps Panels
const stepPanel1 = document.getElementById("checkout-step-1");
const stepPanel2 = document.getElementById("checkout-step-2");
const stepPanel3 = document.getElementById("checkout-step-3");
const stepDot1 = document.getElementById("step-dot-1");
const stepDot2 = document.getElementById("step-dot-2");
const stepDot3 = document.getElementById("step-dot-3");

// Customer Order details cache
let orderDetails = {
    email: "",
    name: "",
    address: ""
};

// --- 4. Initialization & Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
    initApp();
    setupEventListeners();
});

function initApp() {
    renderProducts();
    renderCustomizerMenu();
    renderBoxSlots();
    updateCartUI();
    initScrollReveal();
    startCrumbsEmitter();
}

function setupEventListeners() {
    // Navbar Scroll Effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    // Double-Opening Sidebar Navigation Toggle
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileNav.classList.toggle("open");
        menuToggle.classList.toggle("active");
        
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Disable scroll
        } else {
            document.body.style.overflow = ""; // Enable scroll
        }
    });

    // Mobile link clicks collapse menu
    document.querySelectorAll(".mobile-nav-item").forEach(item => {
        item.addEventListener("click", () => {
            mobileNav.classList.remove("open");
            menuToggle.classList.remove("active");
            document.body.style.overflow = ""; // Re-enable scroll
        });
    });

    // Cart Drawer Open/Close
    cartBtn.addEventListener("click", openCart);
    cartCloseBtn.addEventListener("click", closeCart);
    cartBackdrop.addEventListener("click", closeCart);

    // Box Customizer Size Toggles
    size6Btn.addEventListener("click", () => setBoxSize(6, 24.99, size6Btn, size12Btn));
    size12Btn.addEventListener("click", () => setBoxSize(12, 44.99, size12Btn, size6Btn));
    clearBoxBtn.addEventListener("click", resetCustomBox);
    addBoxToCartBtn.addEventListener("click", addCustomBoxToCart);

    // Checkout Wizard Toggles
    proceedCheckoutBtn.addEventListener("click", openCheckout);
    checkoutCloseBtn.addEventListener("click", closeCheckout);
    checkoutBackdrop.addEventListener("click", closeCheckout);
    backToShippingBtn.addEventListener("click", () => showCheckoutStep(1));
    
    // Forms Submits
    shippingForm.addEventListener("submit", handleShippingSubmit);
    paymentForm.addEventListener("submit", handlePaymentSubmit);
    successHomeBtn.addEventListener("click", () => {
        closeCheckout();
        showCheckoutStep(1);
    });

    // Format Credit Card input spaces
    const cardNumInput = document.getElementById("card-num");
    cardNumInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let matches = value.match(/\d{4,16}/g);
        let match = (matches && matches[0]) || '';
        let parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length > 0) {
            e.target.value = parts.join(' ');
        } else {
            e.target.value = value;
        }
    });

    // Format Expiry MM/YY
    const cardExpiryInput = document.getElementById("card-expiry");
    cardExpiryInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 2) {
            e.target.value = val.slice(0, 2) + "/" + val.slice(2, 4);
        } else {
            e.target.value = val;
        }
    });
}

// --- 5. Render Functions ---

// Render main products menu grid
function renderProducts() {
    productsContainer.innerHTML = "";
    PRODUCTS.forEach((product, idx) => {
        const card = document.createElement("article");
        card.className = "product-card card-glass scroll-reveal slide-up";
        card.style.transitionDelay = `${idx * 0.1}s`;
        
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name} - ${product.desc}" class="product-img" loading="lazy">
            </div>
            <div class="product-info-header">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-price">$${product.price.toFixed(2)}</span>
            </div>
            <div class="product-rating">
                <span>★</span><span>${product.rating.toFixed(1)}</span>
                <span style="color: var(--text-muted); margin-left: 0.5rem; font-size: 0.85rem;">(${product.reviews} reviews)</span>
            </div>
            <p class="product-desc">${product.desc}</p>
            <button class="glowing-btn add-cart-btn" onclick="addToCart('${product.id}')">
                Add to Cart
            </button>
        `;
        
        // Add 3D Tilt Hover Effect for desktop devices
        if (window.matchMedia("(pointer: fine)").matches) {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const mouseX = e.clientX - rect.left - rect.width / 2;
                const mouseY = e.clientY - rect.top - rect.height / 2;
                
                // Tilt angles (max 10 degrees)
                const rotateY = (mouseX / (rect.width / 2)) * 10;
                const rotateX = -(mouseY / (rect.height / 2)) * 10;
                
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                card.style.borderColor = "var(--border-glass-hover)";
                card.style.boxShadow = "0 30px 60px rgba(0, 0, 0, 0.85), 0 0 25px rgba(197, 168, 128, 0.2)";
            });
            
            card.addEventListener("mouseleave", () => {
                card.style.transform = "rotateX(0deg) rotateY(0deg)";
                card.style.borderColor = "var(--border-glass)";
                card.style.boxShadow = "var(--shadow-premium)";
            });
        }
        
        productsContainer.appendChild(card);
    });
}

// Render flavors buttons inside customizer panel
function renderCustomizerMenu() {
    customizerFlavors.innerHTML = "";
    PRODUCTS.forEach(product => {
        const btn = document.createElement("button");
        btn.className = "flavor-trigger-btn";
        btn.innerHTML = `
            <span>+ ${product.name}</span>
        `;
        btn.addEventListener("click", () => addFlavorToBox(product.id));
        customizerFlavors.appendChild(btn);
    });
}

// --- 6. Custom Box Builder Logics ---

function setBoxSize(size, price, activeBtn, inactiveBtn) {
    customBox.size = size;
    customBox.price = price;
    activeBtn.classList.add("active");
    inactiveBtn.classList.remove("active");
    
    // Adjust visual overlay columns style
    boxSlotsGrid.className = `slots-overlay slots-grid-${size}`;
    
    // Clear elements if changing sizes
    resetCustomBox();
}

function addFlavorToBox(flavorId) {
    if (customBox.items.length >= customBox.size) {
        showToast("Your box is full. Reset it or add it to your cart.", "info");
        return;
    }
    
    customBox.items.push(flavorId);
    renderBoxSlots();
    updateBoxStatusUI();
    showToast("Added to Box", "success");
}

function removeFlavorFromBox(index) {
    customBox.items.splice(index, 1);
    renderBoxSlots();
    updateBoxStatusUI();
}

function resetCustomBox() {
    customBox.items = [];
    renderBoxSlots();
    updateBoxStatusUI();
}

function updateBoxStatusUI() {
    const filled = customBox.items.length;
    const max = customBox.size;
    boxFillCountText.innerText = filled;
    boxMaxCountText.innerText = max;
    
    // Calculate progress percent
    const percent = (filled / max) * 100;
    boxProgressBar.style.width = `${percent}%`;
    
    // Toggle cart add button
    if (filled === max) {
        addBoxToCartBtn.removeAttribute("disabled");
        boxProgressBar.style.backgroundColor = "var(--success)";
    } else {
        addBoxToCartBtn.setAttribute("disabled", "true");
        boxProgressBar.style.backgroundColor = "var(--accent)";
    }
}

function renderBoxSlots() {
    boxSlotsGrid.innerHTML = "";
    const size = customBox.size;
    
    for (let i = 0; i < size; i++) {
        const slot = document.createElement("div");
        slot.className = "box-slot";
        
        if (i < customBox.items.length) {
            // Filled slot
            const productId = customBox.items[i];
            const product = PRODUCTS.find(p => p.id === productId);
            slot.classList.add("filled");
            slot.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="slot-img">
                <button class="slot-remove-btn" onclick="removeFlavorFromBox(${i})" aria-label="Remove item">✕</button>
            `;
        } else {
            // Empty slot
            slot.innerHTML = `<span class="slot-label-placeholder">${i + 1}</span>`;
        }
        boxSlotsGrid.appendChild(slot);
    }
}

function addCustomBoxToCart() {
    if (customBox.items.length !== customBox.size) return;
    
    // Map array of IDs to flavor names
    const boxFlavors = customBox.items.map(id => {
        const prod = PRODUCTS.find(p => p.id === id);
        return prod.name;
    });

    // Create unique key for this customized combination
    const combinationKey = customBox.items.sort().join("|");
    const cartItemId = `custom-box-${customBox.size}-${combinationKey}`;
    
    // Check if identical custom box already exists in cart
    const existingIndex = cart.findIndex(item => item.id === cartItemId);
    
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            id: cartItemId,
            name: `Custom ${customBox.size}-Pack Box`,
            price: customBox.price,
            qty: 1,
            image: "assets/cookie_box.png",
            flavors: boxFlavors
        });
    }
    
    saveCart();
    updateCartUI();
    resetCustomBox();
    showToast("Added custom box to cart");
    
    // Open Cart Drawer automatically
    setTimeout(openCart, 500);
}

// --- 7. Main Shopping Cart Logics ---

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const existingIndex = cart.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            image: product.image,
            flavors: null
        });
    }
    
    saveCart();
    updateCartUI();
    showToast(`Added ${product.name} to cart`);
}

function updateCartQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
        showToast("Item removed from cart", "info");
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showToast("Item removed from cart", "info");
}

// Persist cart to LocalStorage
function saveCart() {
    localStorage.setItem("crumble_cart", JSON.stringify(cart));
}

function updateCartUI() {
    // Total count of cookies
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadge.innerText = totalCount;
    
    // Render Items
    cartItemsList.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="cart-empty-message">
                <p>Your cart is empty. Fill it with luxury baked treats.</p>
                <button class="glowing-btn" onclick="document.getElementById('cart-backdrop').click()">Browse Flavors</button>
            </div>
        `;
        cartSummaryBlock.style.display = "none";
        return;
    }
    
    cartSummaryBlock.style.display = "block";
    
    let subtotal = 0;
    
    cart.forEach((item, idx) => {
        subtotal += item.price * item.qty;
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        
        let descHtml = "";
        if (item.flavors) {
            // It's a custom box, summarize counts of each flavor
            const summary = {};
            item.flavors.forEach(f => summary[f] = (summary[f] || 0) + 1);
            const descText = Object.entries(summary).map(([name, count]) => `${count}x ${name.split(' ')[0]}`).join(", ");
            descHtml = `<p class="cart-item-desc">${descText}</p>`;
        }
        
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                ${descHtml}
                <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateCartQty(${idx}, -1)">-</button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" onclick="updateCartQty(${idx}, 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${idx})" aria-label="Remove item">✕</button>
        `;
        cartItemsList.appendChild(itemDiv);
    });
    
    // Totals calculations
    const shipping = subtotal >= 35 ? 0 : 4.99;
    const total = subtotal + shipping;
    
    cartSubtotalText.innerText = `$${subtotal.toFixed(2)}`;
    cartShippingText.innerText = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
    cartTotalText.innerText = `$${total.toFixed(2)}`;
    checkoutSummaryTotal.innerText = `$${total.toFixed(2)}`;
    
    // Shipping promo banner helper
    if (subtotal >= 35) {
        shippingWarning.innerHTML = "You have unlocked <strong>FREE Shipping</strong>";
        shippingWarning.style.color = "var(--accent)";
    } else {
        const needed = 35 - subtotal;
        shippingWarning.innerHTML = `Add <strong>$${needed.toFixed(2)}</strong> more for FREE Shipping`;
        shippingWarning.style.color = "var(--text-muted)";
    }
}

// Drawer visibility controllers
function openCart() {
    cartDrawer.classList.add("open");
    cartBackdrop.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Disable body scroll
}

function closeCart() {
    cartDrawer.classList.remove("open");
    cartBackdrop.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Enable scroll
}

// --- 8. Checkout Wizard Logics ---

function openCheckout() {
    closeCart();
    checkoutModal.classList.add("open");
    checkoutBackdrop.classList.add("open");
    checkoutModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    showCheckoutStep(1);
}

function closeCheckout() {
    checkoutModal.classList.remove("open");
    checkoutBackdrop.classList.remove("open");
    checkoutModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function showCheckoutStep(stepNumber) {
    // Hide all steps
    stepPanel1.classList.remove("active");
    stepPanel2.classList.remove("active");
    stepPanel3.classList.remove("active");
    stepDot1.classList.remove("active");
    stepDot2.classList.remove("active");
    stepDot3.classList.remove("active");
    
    // Activate targeted steps
    if (stepNumber === 1) {
        stepPanel1.classList.add("active");
        stepDot1.classList.add("active");
    } else if (stepNumber === 2) {
        stepPanel2.classList.add("active");
        stepDot1.classList.add("active");
        stepDot2.classList.add("active");
    } else if (stepNumber === 3) {
        stepPanel3.classList.add("active");
        stepDot1.classList.add("active");
        stepDot2.classList.add("active");
        stepDot3.classList.add("active");
    }
}

function handleShippingSubmit(e) {
    e.preventDefault();
    
    // Read details
    orderDetails.email = document.getElementById("c-email").value;
    orderDetails.name = document.getElementById("c-name").value;
    orderDetails.address = document.getElementById("c-address").value;
    
    // Switch Step
    showCheckoutStep(2);
}

function handlePaymentSubmit(e) {
    e.preventDefault();
    
    const submitBtn = paymentForm.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    submitBtn.setAttribute("disabled", "true");
    submitBtn.innerHTML = "Processing Payment...";
    
    // Simulate payment API roundtrip
    setTimeout(() => {
        // Create randomized order number
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        orderRefNumText.innerText = `#CC-${randomNum}`;
        successEmailText.innerText = orderDetails.email;
        
        // Clear local shopping cart
        cart = [];
        saveCart();
        updateCartUI();
        
        // Re-enable and reset button
        submitBtn.removeAttribute("disabled");
        submitBtn.innerHTML = originalText;
        
        // Switch Step to success screen
        showCheckoutStep(3);
    }, 2000);
}

// --- 9. Toast Notification System ---

function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    const prefix = type === "success" ? "Done" : "Info";
    toast.innerHTML = `<span style="color: var(--accent); margin-right: 0.5rem;">[${prefix}]</span><span>${message}</span>`;
    
    container.appendChild(toast);
    
    // Clean up toast after completion animation
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// --- 10. Background Decor Emitters & Parallax Reveal ---

function startCrumbsEmitter() {
    const container = document.getElementById("crumbs-container");
    
    setInterval(() => {
        if (document.hidden) return; // Pause when page is minimized
        
        const particle = document.createElement("div");
        particle.className = "crumb-particle";
        
        // Random dimensions and placements
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Randomize speed
        const duration = Math.random() * 5 + 7; // 7 to 12 seconds
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = Math.random() * 0.2 + 0.1;
        
        container.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }, 1500);
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animation triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05, // Trigger when 5% of element is in view
        rootMargin: "0px 0px -40px 0px"
    });
    
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add("active");
        } else {
            observer.observe(el);
        }
    });
}

// --- 11. Custom Cursor Trail Logic ---
const cursor = document.getElementById("custom-cursor");
const cursorDot = document.getElementById("custom-cursor-dot");

let mouseX = 0, mouseY = 0; // Target mouse position
let cursorX = 0, cursorY = 0; // Interpolated ring position

// Show cursor only on desktop devices with fine pointer
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Inner dot follows mouse position immediately
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        
        // Make cursor visible on first movement
        if (window.getComputedStyle(cursor).opacity === "0") {
            cursor.style.opacity = "1";
            cursorDot.style.opacity = "1";
        }
    });

    // Lagged ring movement loop
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        // Move 15% closer to target each frame
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Expand cursor when hovering interactive elements
    document.addEventListener("mouseover", (e) => {
        const target = e.target;
        const isInteractive = target.closest("a, button, select, input, .box-slot, .flavor-trigger-btn, .menu-toggle-btn, .qty-btn, .cart-close, .modal-close");
        if (isInteractive) {
            cursor.classList.add("hover");
        } else {
            cursor.classList.remove("hover");
        }
    });

    // Hide custom cursor when mouse leaves window viewport
    document.addEventListener("mouseout", (e) => {
        if (!e.relatedTarget) {
            cursor.style.opacity = "0";
            cursorDot.style.opacity = "0";
        }
    });

    // Shrink cursor on click
    document.addEventListener("mousedown", () => cursor.classList.add("active"));
    document.addEventListener("mouseup", () => cursor.classList.remove("active"));
}
