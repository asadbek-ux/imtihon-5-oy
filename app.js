document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
});


const productsContainer = document.querySelector('.products-container');
const categoryButtons = document.querySelectorAll('.category-buttons button');
let products = []; 
let currentIndex = 0; 
const limit = 4; 


fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        products = data; 
        renderProducts(products);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });


function renderProducts(filteredProducts) {
    const slicedProducts = filteredProducts.slice(currentIndex, currentIndex + limit);
    
    
 
    slicedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('item');

        productElement.innerHTML = `
            <a href="productdetails.html?id=${product.id}">
                <img src="${product.image}" alt="${product.title}" style="width: 150px; height: 150px;">
            </a>
            <h2>${product.title}</h2>
            <p class="price">$${product.price}</p>
            <p><span class="stars">${generateStars(product.rating.rate)}</span> (<span class="review-count">${product.rating.count} reviews</span>)</p>
        `;

        productsContainer.appendChild(productElement);
    });
    
    currentIndex += limit;
}


function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '&#9733;'; 
    }

    if (halfStar) {
        stars += '&#9734;';
    }

    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
        stars += '&#9734;';
    }

    return stars;
}



categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active')); // Faol tugmani olib tashlash
        button.classList.add('active'); 

        const category = button.getAttribute('data-category');
        
        currentIndex = 0; 
        productsContainer.innerHTML = ''; 
        
        
        if (category === 'all') {
            renderProducts(products); 
        } else {
            const filteredProducts = products.filter(product => product.category === category);
            renderProducts(filteredProducts); 
        }
    });
});


document.querySelector('.see-more').addEventListener('click', () => {
    const activeCategory = document.querySelector('.category-buttons button.active'); // Faol kategoriya
    const category = activeCategory ? activeCategory.getAttribute('data-category') : null;

    if (category === 'all' || !category) {
        renderProducts(products); 
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        renderProducts(filteredProducts); 
    }
});

