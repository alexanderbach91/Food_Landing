/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
    // Calculator

    const result = document.querySelector('.calculating__result');
    //если в localStorage уже есть значение, то используем по умолчанию его
    //иначе используем стандартные значения
    let sex, height, weight, age, ratio;
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    //тоже самое для ратио
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    //функция для отображения статуса активности дивов, если они есть в localStorage
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    //функция для расчета результата
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'Не хватает данных';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    //вызываем чтобы не отображался рез-тат по дефолту
    calcTotal();

    //навешиваем обработчики событий на нужные нам элементы выборки
    //получаем пол и ратио, записываем их и устанавливаем класс активности
    function getStaticInformation(parentSelector, activeClass) {
        //получаем дивы выборки внутри родительского селектора
        const elements = document.querySelectorAll(`${parentSelector} div`);
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                //если кликнули в див ратио,то записываем в него значение по аттрибуту data
                //иначе при клике в пол, записываем id того дива куда кликнули
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    //чтобы у пользователя запоминался пол и ратио
                    //добаавим в локальное хранилище
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                console.log(ratio, sex);

                //для всех элементов убираем класс активности 
                // и ставим в класс активности в кликнутый див
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            });
        });



    }
    //вызываем два раза для двух родительских дивов
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');


    //функция для инпутов
    function getDynamicInfo(inputSelector) {
        const input = document.querySelector(inputSelector);
        const warning = document.createElement('div');

        //вещаем обработчик событий на инпут и проверяем с каким 
        //инпутом работаем
        input.addEventListener('input', () => {

            //если в инпуте не число, меням бг на красный
            //и сообщаем о том,что нужно вводить цифры
            if (input.value.match(/\D/g)) {
                input.style.backgroundColor = 'red';
                warning.innerHTML = `Введите числовое значение`;
                warning.style.maxWidth = '100px';
                input.insertAdjacentElement('afterEnd', warning);

            } else {
                input.style.backgroundColor = 'white';
                warning.remove();
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });

    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}


/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function cards() {
    class MenuItem {
        constructor(image, alt, header, description, price, parentSelector, ...classes) {
            this.image = image;
            this.alt = alt;
            this.header = header;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.convertPrice = 70;
        }

        convertToRub() {
            return +this.price * this.convertPrice;
        }
        //метод с возвращением элемента без отрисовки
        // createItem() {
        //     const div = document.createElement('div');
        //     div.innerHTML = `<div class="menu__item">
        //         <img src=${this.image} alt=${this.alt}>
        //         <h3 class="menu__item-subtitle">${this.header}</h3>
        //         <div class="menu__item-descr">>${this.description}</div>
        //         <div class="menu__item-divider"></div>
        //         <div class="menu__item-price">
        //             <div class="menu__item-cost">Цена:</div>
        //             <div class="menu__item-total"><span>${this.convertToRub()}</span> грн/день</div>
        //         </div>
        //     </div>`;
        //     return div;
        // }

        //создание элемента и отрисовка на страницу
        render() {
            const div = document.createElement('div');
            div.innerHTML = `
                           <img src=${this.image} alt=${this.alt}>
                           <h3 class="menu__item-subtitle">${this.header}</h3>
                           <div class="menu__item-descr">${this.description}</div>
                           <div class="menu__item-divider"></div>
                           <div class="menu__item-price">
                               <div class="menu__item-cost">Цена:</div>
                               <div class="menu__item-total"><span>${this.convertToRub()}</span> руб/день</div>
                           </div>`;
            //добавляем классы новосозданному элемент
            if (this.classes.length === 0) {
                this.classes = "menu__item";
                div.classList.add(this.classes);

            } else {
                this.classes.forEach(classItem => div.classList.add(classItem));
            }
            this.parent.append(div);
        }
    }

    //Создаем новые элементы и сразу их отрисовываем на страницу
    

    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getItemData"])('http://localhost:3000/menu')
        .then(data => {
            console.log(data);
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // //Второй способ без шаблонизации
    // getItemData('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const elem = document.createElement('div');

    //         elem.classList.add('menu__item');

    //         elem.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> руб/день</div>
    //             </div>`;

    //         document.querySelector('.menu .container').append(elem);
    //     });
    // }

    // new MenuItem(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     `Меню "Фитнес"`,
    //     `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    //     29,
    //     '.menu .container',
    //     'menu__item'
    // ).render();
    // new MenuItem(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     `Меню “Премиум”`,
    //     `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
    //     50,
    //     '.menu .container',
    //     'menu__item'
    // ).render();
    // new MenuItem(
    //     "img/tabs/post.jpg",
    //     "post",
    //     `Меню "Постное"`,
    //     `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
    //     30,
    //     '.menu .container',
    //     'menu__item'
    // ).render();
}


/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector);

const message = {
    loading: 'img/forms/Spinner-1s-200px.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(form => {
    bindPostData(form);
});

function bindPostData(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
        statusMessage.classList.add('status');
        //form.appendChild(statusMessage);
        form.insertAdjacentElement('afterEnd', statusMessage);
        //отправка formData
        const formData = new FormData(form);
        //для json
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        // formData.forEach( (value, key) => {
        //     object[key] = value;
        // });

        //Fetch
        Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
                statusMessage.remove();
            }).finally(() => {
                clearForm();
            });


        function clearForm() {
            form.reset();

            // setTimeout(()=>{
            //         statusMessage.remove();
            //     }, 3000);
        }



        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');
            prevModalDialog.classList.remove('show');
            prevModalDialog.classList.add('hide');
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal');

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            //вспомогательный класс , чтобы убрать окно, если мы
            //закрыли окно с благодарностями и в ручную открыли заново
            thanksModal.classList.add('thanks__modal');
            thanksModal.innerHTML = `
                    <div class="modal__content">
                        <div class="modal__close" data-close>
                        ×
                        </div>
                        <div class="modal__title">${message}</div>
                    </div>
                `;

            document.querySelector('.modal').append(thanksModal);

            // const closeBtn = document.querySelector('[data-close]');
            // closeModal(closeBtn, modal);

            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModalHelp"])('.modal');
            }, 2000);

        }


    });


}
//get запрос
// fetch('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => response.json())
// .then(json => console.log(json));

//Post запрос
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method : "POST",
//     body: JSON.stringify({name: 'Alex'}),
//     headers: 
//         {
//             'Content-type' : 'application/json'
//         }
// })
// .then(response => response.json())
// .then(json => console.log(json));

fetch('http://localhost:3000/menu')
.then(data => data.json())
.then(res => console.log(res));
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, closeModalHelp, openModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModalHelp", function() { return closeModalHelp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
  //вспомогательная функция для открытия модального окна

  function openModal(modalWindow) {
      const modal = document.querySelector(modalWindow);
      modal.classList.remove('hide');
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; //убираем прокрутку сайта 
  }

  //вспомогательная функция для закрытия окна

  function closeModalHelp(modalWindow) {
      const modal = document.querySelector(modalWindow);
      modal.classList.remove('show');
      modal.classList.add('hide');
      document.body.style.overflow = '';
  }

  function modal(triggerSelector, modalWindow) {
      // Модальное окно

      const btnsOpenModal = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalWindow);

      //Показать модальное окно при клике на кнопку
      btnsOpenModal.forEach(btn => {
          btn.addEventListener('click', () => {
              openModal(modalWindow);
              clearInterval(modalTimerId);
          });
      });
      // закрыть модальное окно на крестик
      //закрываем при клике не на модальное окно
      modal.addEventListener('click', (event) => {

          if (event.target === modal || event.target.getAttribute('data-close') == '') {
              closeModalHelp(modalWindow);
          }
      });
      //закрываем при нажатии клавиши Esc
      document.addEventListener('keydown', (event) => {
          if (event.code === 'Escape' && modal.classList.contains('show')) {
              closeModalHelp(modalWindow);
          }
      });




      //Всплытие окна через 3 секунды + при прокруте до низу страницы

      const modalTimerId = setTimeout(() => {
          openModal(modalWindow);
      }, 5000);

      function showModalByScroll() {
          if (window.pageYOffset + document.documentElement.clientHeight >=
              document.documentElement.scrollHeight) {
              openModal(modalWindow);
              window.removeEventListener('scroll', showModalByScroll);
          }
      }

      window.addEventListener('scroll', showModalByScroll);
  }



  /* harmony default export */ __webpack_exports__["default"] = (modal);
  
  

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({container, slide, nextArrow, prevArrow, total, current, wrapper, field}) {
    //Слайдер 

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        arrowNext = document.querySelector(nextArrow),
        arrowPrev = document.querySelector(prevArrow),
        currentCounter = document.querySelector(current),
        totalCounter = document.querySelector(total),
        sliderWrapper = document.querySelector(wrapper),
        sliderField = document.querySelector(field),
        width = window.getComputedStyle(sliderWrapper).width; //ширина,сколько места занимает блок

    //Индекс для определения номера слайдера

    let sliderIndex = 1;

    // Вариант 1


    // if (slides.length < 10) {
    //     totalCounter.textContent = `0${slides.length}`;
    // }

    // sliderChange(sliderIndex);

    // function sliderChange(id) {
    //     if (id > slides.length) {
    //         sliderIndex = 1;
    //     }

    //     if (id < 1) {
    //         sliderIndex = slides.length;
    //     }
    //     slides.forEach(item => {
    //         item.classList.remove('show');
    //         item.classList.add('hide');
    //     });
    //     slides[sliderIndex- 1].classList.add('show');
    //     if (slides.length < 10) {
    //         currentCounter.textContent = `0${sliderIndex}`;
    //     } else {
    //         currentCounter.textContent = `${sliderIndex}`;
    //     }
    // }

    // function plusSlides(n) {
    //     sliderChange(sliderIndex += n);
    // }

    // arrowPrev.addEventListener('click', () => {
    //     plusSlides(-1);

    // });

    // arrowNext.addEventListener('click', () => {
    //     plusSlides(1);

    // });

    //Слайдер вариант 2

    //вспомогательная переменная для определения насколько прокрутили слайды
    let offset = 0;

    //добавляем нули в счетчик
    if (slides.length < 10) {
        totalCounter.textContent = `0${slides.length}`;
        currentCounter.textContent = `0${sliderIndex}`;
    } else {
        totalCounter.textContent = slides.length;
        currentCounter.textContent = sliderIndex;
    }
    //устанавливаем ширину и стили нижней обертки слайдеров
    //чтобы они поместились  и были в одну строку
    sliderField.style.width = 100 * slides.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';

    //у верхней обертки делаем оверфлоу хидден,чтобы она показывала ровно один слайд
    sliderWrapper.style.overflow = 'hidden';

    //устанавливаем ширину каждого слайдера
    slides.forEach(slide => {
        slide.style.width = width;
    });


    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
    //обработчик события на кнопку дальше
    arrowNext.addEventListener('click', () => {
        //если отступ будет равен ширина одного слайда, умноженного
        //на кол-во слайдов, то устанавливаем ofsset в 0, чтобы вернуться обратно
        //используем slice чтобы отрезать два последних символа и 
        //и превращаем в число
        if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            //добавляем к offset ширину одного слайда
            offset += +width.slice(0, width.length - 2);
        }

        //сдвиг вправо с помощью translate
        sliderField.style.transform = `translateX(-${offset}px)`;

        //меняем индекс слайда, если дошли до конца то ставим в 1
        //или же просто прибавляем
        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }
        //если слайдов меньше чем 10, прибавляем 0,
        //иначе оставляем
        if (slides.length < 10) {
            currentCounter.textContent = `0${sliderIndex}`;
        } else {
            currentCounter.textContent = sliderIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[sliderIndex - 1].style.opacity = 1;
    });

    arrowPrev.addEventListener('click', () => {
        //тоже самое что и в предыдущем случае,только
        //если мы дошли до начала и нажимаем еще раз назад,
        //то перемещаемся в конец
        if (offset === 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            //отнимаем от offset ширину одного слайда
            offset -= +width.slice(0, width.length - 2);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;


        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }

        if (slides.length < 10) {
            currentCounter.textContent = `0${sliderIndex}`;
        } else {
            currentCounter.textContent = sliderIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[sliderIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            sliderIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            sliderField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                currentCounter.textContent = `0${sliderIndex}`;
            } else {
                currentCounter.textContent = sliderIndex;
            }

            dots.forEach(dot => {
                dot.style.opacity = '.5';
            });
            dots[sliderIndex - 1].style.opacity = 1;
        });
    });

}



/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //Работа с табами

    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);
    //скрываем весь контент табов
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
            item.classList.remove('fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    //показываем контент нужного таба
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    //ставим обработчик событий, при клике отображаем нужный таб

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards */ "./js/modules/cards.js");


function timer(timerSelector, deadline) {
    //Работа с таймером

    function getTimeLeft(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //получаем разницу с дедлайном в мс
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //получаем кол-во дней
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'), //получем элементы со страницы
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            //вызываем функцию каждую секунду для обновления счетчика
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); //Вызываем один раз чтобы верстка не моргала

        function updateClock() {
            const t = getTimeLeft(endtime); //получаем оставшееся время 
            //и добавляем внутрь html элементов

            //счетчик закончился, то перестаем вызывать функцию
            if (t.total <= 0) {
                days.innerHTML = '0';
                hours.innerHTML = '0';
                minutes.innerHTML = '0';
                seconds.innerHTML = '0';
                clearInterval(timeInterval);

            } else {
                days.innerHTML = addZero(t.days);
                hours.innerHTML = addZero(t.hours);
                minutes.innerHTML = addZero(t.minutes);
                seconds.innerHTML = addZero(t.seconds);
            }




        }
    }
    //добавляем нули к датам меньше 10, ex. 03:09:25
    function addZero(num) {
        if (num < 10 && num >= 0) {
            return '0' + num;
        } else {
            return num;
        }
    }

    setClock(timerSelector, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");








document.addEventListener('DOMContentLoaded', () => {


    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal');
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2020-10-25');
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form');
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])( {
        container :'.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        total: '#total',
        current : '#current',
        wrapper : '.offer__slider-wrapper',
        field : '.offer__slider-inner'

    });
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getItemData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItemData", function() { return getItemData; });
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json();
};

const getItemData = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not get data from ${url} , status: ${result.status}`);
    }

    return await result.json();
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map