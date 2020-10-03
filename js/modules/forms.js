function forms() {
    const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/forms/Spinner-1s-200px.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(form => {
    bindPostData(form);
});

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
        postData('http://localhost:3000/requests', json)
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
            openModal(modal);

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
                closeModalHelp(modal);
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

module.exports = forms;