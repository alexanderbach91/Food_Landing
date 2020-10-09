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



  export default modal;
  export {
      closeModalHelp
  };
  export {
      openModal
  };