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



export default slider;