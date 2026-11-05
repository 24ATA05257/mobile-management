/* ==========================================
   ROHITH MOBILE SHOP
   COMPLETE JAVASCRIPT
========================================== */


/* ==========================================
   ADD TO CART
========================================== */

function addToCart(productName, price, image) {

    let cart =
        JSON.parse(localStorage.getItem("rohithCart")) || [];

    const existingProduct =
        cart.find(item => item.name === productName);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: Number(price),
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem(
        "rohithCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(
        "🛒 " +
        productName +
        " added to your cart!"
    );
}


/* ==========================================
   UPDATE CART COUNT
========================================== */

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("rohithCart")) || [];

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.innerText =
            totalItems +
            (totalItems === 1
                ? " Item"
                : " Items");
    }
}


/* ==========================================
   DISPLAY CART
========================================== */

function displayCart() {

    const cartContainer =
        document.getElementById("cartItems");

    if (!cartContainer) return;

    const cart =
        JSON.parse(localStorage.getItem("rohithCart")) || [];

    const count =
        document.getElementById("cartCount");

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    Your Cart is Empty
                </h3>

                <p>
                    You haven't added any smartphones
                    to your cart yet.
                </p>

                <a href="mobiles.html"
                   class="btn primary-btn">

                    Start Shopping

                </a>

            </div>
        `;

        if (count) {
            count.innerText = "0 Items";
        }

        updateCartSummary();

        return;
    }


    if (count) {

        const totalItems =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );

        count.innerText =
            totalItems +
            (totalItems === 1
                ? " Item"
                : " Items");
    }


    cartContainer.innerHTML =
        cart.map(
            (item, index) => `

            <div class="cart-product">

                <img
                    src="${item.image}"
                    alt="${item.name}">

                <div class="cart-product-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>

                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>


                <div class="cart-product-right">

                    <strong>
                        ₹${(
                            item.price *
                            item.quantity
                        ).toLocaleString("en-IN")}
                    </strong>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${index})">

                        Remove

                    </button>

                </div>

            </div>
        `
        )
        .join("");

    updateCartSummary();
}


/* ==========================================
   CHANGE QUANTITY
========================================== */

function changeQuantity(index, change) {

    let cart =
        JSON.parse(localStorage.getItem("rohithCart")) || [];

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);
    }

    localStorage.setItem(
        "rohithCart",
        JSON.stringify(cart)
    );

    displayCart();

    updateCartCount();
}


/* ==========================================
   REMOVE FROM CART
========================================== */

function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("rohithCart")) || [];

    const productName =
        cart[index].name;

    cart.splice(index, 1);

    localStorage.setItem(
        "rohithCart",
        JSON.stringify(cart)
    );

    displayCart();

    updateCartCount();

    alert(
        "❌ " +
        productName +
        " removed from cart."
    );
}


/* ==========================================
   CART SUMMARY
========================================== */

function updateCartSummary() {

    const cart =
        JSON.parse(localStorage.getItem("rohithCart")) || [];

    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
            item.price *
            item.quantity;
    });


    /* Delivery */

    const delivery =
        subtotal > 0 ? 0 : 0;


    /* Discount */

    let discount =
        Number(
            localStorage.getItem(
                "rohithDiscount"
            )
        ) || 0;


    const total =
        subtotal +
        delivery -
        discount;


    const subtotalElement =
        document.getElementById(
            "cartSubtotal"
        );

    const deliveryElement =
        document.getElementById(
            "deliveryCharge"
        );

    const discountElement =
        document.getElementById(
            "cartDiscount"
        );

    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (subtotalElement) {

        subtotalElement.innerText =
            "₹" +
            subtotal.toLocaleString("en-IN");
    }

    if (deliveryElement) {

        deliveryElement.innerText =
            "₹" +
            delivery.toLocaleString("en-IN");
    }

    if (discountElement) {

        discountElement.innerText =
            "₹" +
            discount.toLocaleString("en-IN");
    }

    if (totalElement) {

        totalElement.innerText =
            "₹" +
            Math.max(
                total,
                0
            ).toLocaleString("en-IN");
    }
}


/* ==========================================
   COUPON
========================================== */

function applyCoupon() {

    const couponInput =
        document.getElementById(
            "coupon"
        );

    const message =
        document.getElementById(
            "couponMessage"
        );

    if (!couponInput || !message)
        return;


    const code =
        couponInput.value
            .trim()
            .toUpperCase();


    const cart =
        JSON.parse(
            localStorage.getItem(
                "rohithCart"
            )
        ) || [];


    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
            item.price *
            item.quantity;
    });


    if (subtotal === 0) {

        message.innerText =
            "Add products to your cart first.";

        return;
    }


    /* Available coupons */

    if (code === "ROHITH10") {

        const discount =
            Math.round(
                subtotal * 0.10
            );

        localStorage.setItem(
            "rohithDiscount",
            discount
        );

        message.innerText =
            "🎉 10% discount applied!";

        updateCartSummary();

    } else if (code === "WELCOME500") {

        const discount =
            Math.min(
                500,
                subtotal
            );

        localStorage.setItem(
            "rohithDiscount",
            discount
        );

        message.innerText =
            "🎉 ₹500 discount applied!";

        updateCartSummary();

    } else {

        localStorage.removeItem(
            "rohithDiscount"
        );

        message.innerText =
            "❌ Invalid coupon code.";

        updateCartSummary();
    }
}


/* ==========================================
   CHECKOUT
========================================== */

function checkout() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                "rohithCart"
            )
        ) || [];


    if (cart.length === 0) {

        alert(
            "🛒 Your cart is empty!\n\n" +
            "Please add a smartphone before checkout."
        );

        return;
    }


    alert(
        "✅ Proceeding to checkout!\n\n" +
        "Thank you for shopping with " +
        "Rohith Mobile Shop."
    );
}


/* ==========================================
   MOBILE SEARCH
========================================== */

function searchMobiles() {

    const input =
        document.getElementById(
            "mobileSearch"
        );

    if (!input) return;

    const searchValue =
        input.value
            .toLowerCase()
            .trim();

    const products =
        document.querySelectorAll(
            ".mobile-card"
        );


    products.forEach(
        function(product) {

            const productName =
                product.innerText
                    .toLowerCase();


            if (
                productName.includes(
                    searchValue
                )
            ) {

                product.style.display =
                    "block";

            } else {

                product.style.display =
                    "none";
            }
        }
    );
}


/* ==========================================
   LOGIN - SHOW / HIDE PASSWORD
========================================== */

function togglePassword() {

    const password =
        document.getElementById(
            "loginPassword"
        );

    if (!password) return;


    if (
        password.type ===
        "password"
    ) {

        password.type =
            "text";

    } else {

        password.type =
            "password";
    }
}


/* ==========================================
   LOGIN
========================================== */

function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    if (
        email === "" ||
        password === ""
    ) {

        alert(
            "Please enter your email and password."
        );

        return;
    }


    if (password.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;
    }


    alert(
        "✅ Login successful!\n\n" +
        "Welcome to Rohith Mobile Shop!"
    );


    document
        .getElementById("loginForm")
        .reset();
}


/* ==========================================
   PAGE LOAD
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayCart();

        console.log(
            "ROHITH Mobile Store Loaded Successfully!"
        );
    }
);