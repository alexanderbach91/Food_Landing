function timer() {
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
}

module.exports = timer;