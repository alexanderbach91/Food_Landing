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

    const deadline = '2020-08-12';

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

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);
            
            //счетчик закончился, то перестаем вызывать функцию
            if (t.total <= 0) {
                clearInterval(timeInterval);
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
                document.body.style.overflow = 'hidden'; //убираем прокрутку сайта 
            });
        });
    }
    // закрыть модальное окно на крестик
    function closeModal(closeButton , modalWindow) {
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

    


});