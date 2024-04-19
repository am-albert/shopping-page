import data from './data/products';
const openCartButtons = document.querySelectorAll('[data-action="open-cart"');
const closeCartButtons = document.querySelectorAll('[data-action="close-cart"');
const cartWindow = document.getElementById('cart');
const addToCartButton = document.getElementById('add-to-cart');
const product = document.getElementById('product');
let cart = [];
const currencyFormat = new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'EUR'});
const notification = document.getElementById('notification');

const cartRender = () => {
    cartWindow.classList.add('cart--active');

    // Removing the previous products to restart the cart building
    const previousCartProducts = cartWindow.querySelectorAll('.cart__product');
    previousCartProducts.forEach((product) => {
        product.remove();
    })

    let total = 0;

    // Checking if there are products
    if(cart.length < 1) {
        // Add the empty cart class
        cartWindow.classList.add('cart--empty');
    } else {
        cartWindow.classList.remove('cart--empty');
        cart.forEach((cartProduct) => {
            data.products.forEach((databaseProduct) => {
                // Obtaining the price from products.js (database)
                if(databaseProduct.id === cartProduct.id) {
                    cartProduct.price = databaseProduct.price;

                    total+= databaseProduct.price * cartProduct.quantity;
                }
            })
    
            // Product image at the cart window
            let thumbSrc = product.querySelectorAll('.product__thumb-img')[0].src;
            if(cartProduct.color === 'red') {
                thumbSrc = './img/thumbs/red.jpg';
            } else if(cartProduct.color === 'yellow') {
                thumbSrc = './img/thumbs/yellow.jpg';
            }
    
            // Create a product template for the cart
            const productTemplate = `
            <div class="cart__product-info">
                <img src="${thumbSrc}" alt="" class="cart__thumb" />
                <div>
                    <p class="cart__product-name">
                        <span class="cart__product-quantity">${cartProduct.quantity} x </span>${cartProduct.name}
                    </p>
                    <p class="cart__product-properties">
                        Size:<span>${cartProduct.size}</span> Color:<span>${cartProduct.color}</span>
                    </p>
                </div>
            </div>
            <div class="cart__product-price-container">
                <button class="cart__remove-item-btn" data-action="remove-item-cart">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                    <path
                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                    />
                </svg>
                </button>
                <p class="cart__product-price">${currencyFormat.format(cartProduct.price * cartProduct.quantity)}</p>
            </div>
            `
            // Create the div for the cart
            const cartItem = document.createElement('div');
            // Add the class
            cartItem.classList.add('cart__product');
    
            // Adding the template to the div
            cartItem.innerHTML = productTemplate;
    
            //Add the product to the cart window
            cartWindow.querySelector('.cart__body').appendChild(cartItem);
        })
    }  
    cartWindow.querySelector('.cart__total').innerText = currencyFormat.format(total);
}

// Open cart

openCartButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        cartRender();
    })
});

// Close cart

closeCartButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        cartWindow.classList.remove('cart--active');
    })
});

addToCartButton.addEventListener('click', (e) => {
    const id = product.dataset.productId;
    const name = product.querySelector('.product__name').innerText;
    const quantity = parseInt(product.querySelector('#quantity').value);
    const color = product.querySelector('#color-property input:checked').value;
    const size = product.querySelector('#size-property input:checked').value;

    if(cart.length > 0) {
            let productInCart = false;

            cart.forEach((item) => {
                if(item.id === id && item.name === name && item.color === color && item.size === size) {
                item.quantity += quantity;
                productInCart = true;
                }
            })

            if(!productInCart) {
                cart.push({
                    id: id,
                    name: name,
                    quantity: quantity,
                    color: color,
                    size: size,
                });
            }

    } else {
        cart.push({
            id: id,
            name: name,
            quantity: quantity,
            color: color,
            size: size,
        });   
    }

    //Set the image path that we want to show
    let thumbSrc = product.querySelectorAll('.product__thumb-img')[0].src;
    if(color === 'red') {
        thumbSrc = './img/thumbs/red.jpg';
    } else if (color === 'yellow') {
        thumbSrc = './img/thumbs/yellow.jpg';
    }

    notification.querySelector('img').src = thumbSrc;
    // Show the notification
    notification.classList.add('notification--active');
    // After 5s we hide the notification
    setTimeout(() => notification.classList.remove('notification--active'), 5000);
});

// Remove from cart buttons

cartWindow.addEventListener('click', (e) => {
    if(e.target.closest('button')?.dataset.action === 'remove-item-cart') {
        const product = e.target.closest('.cart__product');
        const productIndex = [...cartWindow.querySelectorAll('.cart__product')].indexOf(product);
        cart = cart.filter((item, index) => {
            if(index !== productIndex) {
                return item;
            }
        })
       cartRender(); 
    }
});

// Buy button 

cartWindow.querySelector('#cart__buy-btn').addEventListener('click', () => {
    console.log('Sending purchase request');
});