import data from './data/products';

const product = document.getElementById('product');
const productImage = product.querySelector('.product__image');
const thumbs = product.querySelector('.product__thumbs');
const colorProperty = product.querySelector('#color-property');
const increaseQuantityButton = product.querySelector('#increase-quantity');
const decreaseQuantityButton = product.querySelector('#decrease-quantity');
const quantityInput = product.querySelector('#quantity');



// Thumbnails
thumbs.addEventListener('click', (e) => {
    if(e.target.tagName === 'IMG') {
        const imageSrc = e.target.src;

        //Obtaining position of the last /
        const lastIndex = imageSrc.lastIndexOf('/');

        // Cutting up the string, obtaining the image name
        const imageName = imageSrc.substring(lastIndex + 1);

        // Changing the product image path
        productImage.src = `./img/tennis/${imageName}`;
    }
});

// Colors
colorProperty.addEventListener('click', (e) => {
    if(e.target.tagName === 'INPUT') {
        productImage.src = `./img/tennis/${e.target.value}.jpg`

    }
});

// Quantity buttons

increaseQuantityButton.addEventListener('click', (e) => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
});

decreaseQuantityButton.addEventListener(`click`, (e) => {
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) -1;
    }
});