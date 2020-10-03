function modal() {
    // Модальное окно

    const btnsOpenModal = document.querySelectorAll('button[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');




    //вспомогательная функция для открытия модального окна

    function openModal(modalWindow) {
        modalWindow.classList.remove('hide');
        modalWindow.classList.add('show');
        document.body.style.overflow = 'hidden'; //убираем прокрутку сайта 
    }

    //вспомогательная функция для закрытия окна

    function closeModalHelp(modalWindow) {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';
    }

    //Показать модальное окно при клике на кнопку
    btnsOpenModal.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(modal);
            clearInterval(modalTimerId);
        });
    });
    // закрыть модальное окно на крестик
    //закрываем при клике не на модальное окно
    modal.addEventListener('click', (event) => {

        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModalHelp(modal);
        }
    });
    //закрываем при нажатии клавиши Esc
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModalHelp(modal);
        }
    });




    //Всплытие окна через 3 секунды + при прокруте до низу страницы

    const modalTimerId = setTimeout(() => {
        openModal(modal);
    }, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal(modal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}



module.exports = modal;