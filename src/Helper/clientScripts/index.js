import 'lazysizes';
// import 'lazysizes/plugins/blur-up/ls.blur-up';

import { Swiper, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';

Swiper.use([Navigation]);

var banner_main = new Swiper('.banner-main .swiper-container', {
    // virtual:true,
    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    // lazy: true,
    navigation: {
        prevEl: '.banner-main .swiper-button-prev',
        nextEl: '.banner-main .swiper-button-next',
    },
});
