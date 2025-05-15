//Burger-Menu

const burgerButton = document.querySelector("[data-burger-menu]");
const linkMenu = document.querySelector("[data-link-menu]");
const linksShadow = document.querySelector("[data-link-shadow]");
const menuCloseButton = document.querySelector("[data-burger-close]");
const navLinks = document.querySelectorAll("[data-link]");

const showMenu = (view) =>{
    view ? linkMenu.classList.add("nav-link-menu-open") : linkMenu.classList.remove("nav-link-menu-open");
}

burgerButton?.addEventListener("click", (e) => {
    showMenu(true)
})

linksShadow?.addEventListener("click", (e) => {
    showMenu(false)
})

menuCloseButton?.addEventListener("click", (e) => {
    showMenu(false)
})

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        showMenu(false)
    })
})



// Bestseller list
const productsWrapper = document.querySelector('[data-swiper-elements]');
const PRODUCTS_LIST = [
    {
        id: 1,
        name: 'Dark blue alpine climbing jacket',
        price: '€300,00 EUR',
        img: './images/products/kurtka1.png',
        special: 'bestseller'
    },
    {
        id: 2,
        name: 'Orange helmet for alpine TOUNDRA',
        price: '€300,00 EUR',
        img: './images/products/kask.png',
        special: 'limited'
    },
    {
        id: 3,
        name: 'Grey alpine climbing jacket',
        price: '€300,00 EUR',
        img: './images/products/kurtka2.png',
    },
    {
        id: 4,
        name: 'Grey alpine climbing jacket',
        price: '€300,00 EUR',
        img: './images/products/kurtka3.png',
        special: 'bestseller'
    },
    {
        id: 5,
        name: 'Dark blue alpine climbing jacket',
        price: '€300,00 EUR',
        img: './images/products/kurtka1.png',
        special: 'bestseller'
    },
    {
        id: 6,
        name: 'Orange helmet for alpine TOUNDRA',
        price: '€300,00 EUR',
        img: './images/products/kask.png',
        special: 'limited'
    },
    {
        id: 7,
        name: 'Grey alpine climbing jacket',
        price: '€300,00 EUR',
        img: './images/products/kurtka2.png',
    },
    {
        id: 8,
        name: 'Grey alpine climbing jacket',
        price: '€300,00 EUR',
        img: './images/products/kurtka3.png',
    },
    {
        id: 9,
        name: 'Dark blue alpine climbing jacket',
        price: '€300,00 EUR',
        img: './images/products/kurtka1.png',
        special: 'bestseller'
    },
]

const createProduct = (element) => {
    return `
<div  class="swiper-slide">
    <div data-element-id="${element.id}" class="product-box">
        <div class="swiper-image-wrapper">
          <img src="${element.img}" alt="featured image" />
          <div class="swiper-image-buttons ${!element.special ? 'no-badge' : ''}">
          ${element?.special === 'bestseller' ? '<div class="product-badge f-16px-w-500-upper bestseller">bestseller</div>' : ''}
          ${element?.special === 'limited' ? '<div class="product-badge f-16px-w-500-upper limited">limited edition</div>' : ''}
           <div class="favorite"></div>
         </div>
        </div>
        <div class="swiper-info-wrapper">
          <span class="swiper-info-title">${element.name}</span>
          <span class="swiper-info-price">${element.price}</span>
       </div>
    </div>
</div>
`
}

PRODUCTS_LIST.forEach(product => {
    productsWrapper.insertAdjacentHTML('beforeend', createProduct(product));
});


//Main Products

const mainProductsGrid = document.querySelector('[data-product-grid]');
const customSelect = document.querySelector('[data-product-select]');
const customOptions = document.querySelectorAll('[data-custom-option]');
const customSelectSelected = document.querySelector('[data-custom-select-selected]');
let isLoading = false;

customSelect.addEventListener('click', () => {
    customSelect.classList.toggle('custom-select-open');
})

customOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        const value = e.target.dataset.value;
        currentSize = value;
        customSelectSelected.textContent = value

        loadProducts();
    })
})


const createMainProduct = (item) => {
    const id = item.id < 10 ? `0${item.id}`: item.id

    return `
    <div data-product-id="${id}" class="single-product-box">
        <div class="image-wrapper loading">
            <img src="${item.image}" alt="${item.text}" loading="lazy" />
        </div>
        <span>ID : ${id}</span>
    </div>`;
};

let currentPage = 1;
let currentSize = 14;

let lastSize = currentSize;

const loadProducts = async () => {
    if (isLoading) return;
    isLoading = true;

    try {
        if (currentSize !== lastSize) {
            currentPage = 1;
            mainProductsGrid.innerHTML = '';
            lastSize = currentSize;
        }

        const response = await fetch(
            `https://brandstestowy.smallhost.pl/api/random?pageNumber=${currentPage}&pageSize=${currentSize}`
        );
        const data = await response.json();

        data.data.forEach(item => {
            mainProductsGrid.insertAdjacentHTML('beforeend', createMainProduct(item));
        });

        // obsługa klas loading → loaded
        const images = mainProductsGrid.querySelectorAll('.image-wrapper.loading img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.parentElement.classList.replace('loading', 'loaded');
            });
        });

        currentPage++;  // przejdź do kolejnej "strony"
    } catch (error) {
        console.error('Błąd podczas pobierania produktów:', error);
    } finally {
        isLoading = false;
    }
};

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadProducts();
    }
});

// Start - załaduj pierwsze produkty
loadProducts();

const images = mainProductsGrid.querySelectorAll('.image-wrapper img');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.parentElement.classList.remove('loading');
        img.parentElement.classList.add('loaded');
    });
});

//PopUp

const popupMain = document.querySelector('.popup-main');
const popupImage = document.querySelector('[data-popup-image]');
const popupTitle = document.querySelector('.popup-title');
const popup = document.querySelector('.popup');
const popupShadow = document.querySelector('[data-popup-shadow]');
const popupCloseBtn = document.querySelector('[data-popup-close]');

popupShadow.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.remove('popup-active')
})
popupCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.remove('popup-active')
})

mainProductsGrid.addEventListener('click', e => {
    const box = e.target.closest('.single-product-box');
    if (!box) return;

    const id = box.dataset.productId;
    const imgSrc = box.querySelector('img').src;

    popupMain.classList.remove('loaded');
    popupMain.classList.add('loading');
    popupImage.src = '';
    popupImage.alt = `Produkt ${id}`;

    popupTitle.textContent = `ID: ${id}`;
    popup.classList.add('popup-active');

    popupImage.src = imgSrc;

    popupImage.addEventListener('load', () => {
        popupMain.classList.remove('loading');
        popupMain.classList.add('loaded');
    }, { once: true });
});



document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: false, // UWAGA: loop musi być OFF, bo inaczej zawsze możesz "iść dalej"
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        on: {
            init: function () {
                updateNavigation(this);
            },
            slideChange: function () {
                updateNavigation(this);
            },
            update: function () {
                updateNavigation(this)
            }
        }
    });

    function updateNavigation(swiper) {
        const prevButton = document.querySelector('.swiper-button-prev');
        const nextButton = document.querySelector('.swiper-button-next');

        if (swiper.isBeginning) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block';
        }

        if (swiper.isEnd) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'block';
        }
    }
});
