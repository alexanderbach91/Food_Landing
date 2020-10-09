import {getItemData} from '../services/services';


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
    

    getItemData('http://localhost:3000/menu')
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


export default cards;