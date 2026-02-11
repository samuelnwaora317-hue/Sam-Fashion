let total = 0;

function addToCart(productName, price) {
    const cartItems = document.getElementById("cart-items");
    const li = document.createElement("li");

    li.textContent = productName + " - $" + price;
    cartItems.appendChild(li);

    total += price;
    document.getElementById("total").textContent = total;
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;


        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="increaseQty(${index})">+</button>
            <button onclick="decreaseQty(${index})">-</button>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
    });

    totalElement.textContent = total;
}

function addToCart(name, price) {
    const existing = cart.find(item => 

item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    renderCart();
}

function increaseQty(index) {
    cart[index].quantity++;
    saveCart();
    renderCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;

    } else {
        cart.splice(index, 1);
    }
    saveCart();
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Load cart when page loads
renderCart();

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Validate form
    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields');
        return;
    }

    // Show success message
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerText;
    submitButton.innerText = '✓ Message Sent!';
    submitButton.disabled = true;
    submitButton.style.background = '#10b981';

    // Reset form
    setTimeout(() => {
        form.reset();
        submitButton.innerText = originalText;
        submitButton.disabled = false;
        submitButton.style.background = '';
    }, 3000);

    // In a real application, you would send this data to a server
    console.log('Form submitted:', {
        name,
        email,
        subject,
        message
    });
}
