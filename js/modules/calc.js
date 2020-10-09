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


export default calc;