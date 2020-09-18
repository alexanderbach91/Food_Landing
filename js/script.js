document.addEventListener('DOMContentLoaded', () => {
    //Работа с табами

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    //скрываем весь контент табов
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
            item.classList.remove('fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    //показываем контент нужного таба
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    //ставим обработчик событий, при клике отображаем нужный таб

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Работа с таймером

    const deadline = '2020-09-12';
    //const deadline = '2020-09-14';

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

    setClock('.timer', deadline);

    // Модальное окно

    const btnsOpenModal = document.querySelectorAll('button[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('div[data-close]');
        

    //Показать модальное окно при клике
    function showModal(buttons, modalWindow) {
        buttons.forEach(item => {
            item.addEventListener('click', (event) => {
                //modal.style.display = "block";
                modalWindow.classList.remove('hide');
                modalWindow.classList.add('show');
                document.body.style.overflow = 'hidden'; /* //убираем прокрутку сайта  */
                clearInterval(modalTimerId); //очищаем интервал если открыли модальное окно в ручную
            });
        });
    }
    // закрыть модальное окно на крестик
    function closeModal(closeButton, modalWindow) {
        closeButton.addEventListener('click', () => {
            closeModalHelp(modalWindow);
        });
        //закрываем при клике не на модальное окно
        modal.addEventListener('click', (event) => {
            if (event.target === modalWindow) {
                closeModalHelp(modalWindow);
            }
        });
        //закрываем при нажатии клавиши Esc
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
                closeModalHelp(modalWindow);
            }
        });

        function closeModalHelp(modalWindow) {
            modalWindow.classList.remove('show');
            modalWindow.classList.add('hide');
            document.body.style.overflow = '';
        }


    }

    showModal(btnsOpenModal, modal);
    closeModal(modalClose, modal);

    //Всплытие окна через 3 секунды + при прокруте до низу страницы

    function openModal(modalWindow) {
                modalWindow.classList.remove('hide');
                modalWindow.classList.add('show');
                document.body.style.overflow = 'hidden';
    }

    const modalTimerId = setTimeout(() => {
        openModal(modal);
    }, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight 
            >= document.documentElement.scrollHeight) {
                openModal(modal);
                window.removeEventListener('scroll', showModalByScroll);
            }
    }

    window.addEventListener('scroll', showModalByScroll);

    //генерация меню

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
            } else {
                this.classes.forEach(classItem => div.classList.add(classItem));
            }
            this.parent.append(div);
        }
    }

    // const menuContainer = document.querySelector('[data-menu]');
    // const menu1Obj = new MenuItem("img/tabs/vegy.jpg", `Меню "Фитнес"`, `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`, 229);
    // const menu1 = menu1Obj.createItem();
    // const menu2Obj = new MenuItem("img/tabs/elite.jpg", `Меню “Премиум”`, `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,550);
    // const menu2 = menu2Obj.createItem();
    // const menu3Obj = new MenuItem("img/tabs/post.jpg", `Меню "Постное"`,`Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,430);
    // const menu3 = menu3Obj.createItem();

    // function appendMenu(container, menuItem) {
    //     //  container.innerHTML += menuItem;
    //     container.append(menuItem);
    //  }

    //  appendMenu(menuContainer, menu1);
    //  appendMenu(menuContainer, menu2);
    //  appendMenu(menuContainer, menu3);

    //Создаем новые элементы и сразу их отрисовываем на страницу
    new MenuItem(
        "img/tabs/vegy.jpg",
        "vegy",
        `Меню "Фитнес"`,
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        29,
        '.menu .container',
        'menu__item'
    ).render();
    new MenuItem(
        "img/tabs/elite.jpg",
        "elite",
        `Меню “Премиум”`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        50,
        '.menu .container',
        'menu__item'
    ).render();
    new MenuItem(
        "img/tabs/post.jpg",
        "post",
        `Меню "Постное"`,
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        30,
        '.menu .container',
        'menu__item'
    ).render();









});