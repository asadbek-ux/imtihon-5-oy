// Mahsulot tafsilotlarini olish va ko'rsatish
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-title').innerText = product.title;
        document.getElementById('product-price').innerText = `Price: $${product.price}`;
        document.getElementById('product-description').innerText = product.description;
        document.getElementById('product-rating').innerHTML = generateStars(product.rating.rate);
        document.getElementById('product-review-count').innerText = product.rating.count;
    })
    .catch(error => {
        console.error('Error fetching product details:', error);
    });

// Yulduzlarni generatsiya qilish funksiyasi
function generateStars(rating) {
    const fullStars = Math.floor(rating); // To'liq yulduzlar soni
    const halfStar = rating % 1 !== 0; // Yarim yulduz bormi
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '&#9733;'; // To'liq yulduz
    }

    if (halfStar) {
        stars += '&#9733;'; // Yarim yulduz
    }

    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
        stars += '&#9734;'; // Bo'sh yulduz
    }

    return stars;
}
