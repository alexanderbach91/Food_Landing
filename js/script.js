require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';


import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

document.addEventListener('DOMContentLoaded', () => {


    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal');
    timer('.timer', '2020-10-25');
    cards();
    forms('form');
    slider( {
        container :'.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        total: '#total',
        current : '#current',
        wrapper : '.offer__slider-wrapper',
        field : '.offer__slider-inner'

    });
    calc();
});