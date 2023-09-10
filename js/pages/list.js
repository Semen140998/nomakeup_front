// const URL = '../../data.json';
const URL = 'https://vatagacatalogue.pythonanywhere.com/get_apartments';

const $properties = document.getElementById('properties');

const STATE = {
    list: [],
    single: {},
}

const myButton = document.getElementById('inputGroupFileAddon04');
const fileInput = document.getElementById('inputGroupFile04');

// Добавляем обработчик события click
myButton.addEventListener('click', async function () {
    // Этот код будет выполняться при нажатии на кнопку
    if (fileInput.files.length > 0) {
        // Получаем первый выбранный файл (если разрешено выбирать несколько файлов)
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        // Отправляем POST-запрос на сервер
        const response = await fetch('http://localhost:8095/ingredients/parseComposition', {
            method: 'POST',
            body: formData,
        });
        let data = await response.json();
        renderList(data);
    } else {
        console.log('Файл не выбран.');
    }
});

async function renderList(data){

    STATE.list = data;
    console.log(STATE.list);

    const listItem = document.createElement('li');
    STATE.list.forEach((item) => {
        // Создаем элемент span
        const spanElement = document.createElement('span');
        // Устанавливаем текст для span (здесь item представляет данные из вашего массива)
        spanElement.textContent = item.ingredientName;
        spanElement.title = item.ingredientDescription;
        let className;
        if (item.ingredientClass == 0) {
            className = 'badge bg-light text-dark';
        } else if (item.ingredientClass == 1) {
            className = 'badge bg-danger';
        } else if (item.ingredientClass == 2) {
            className = 'badge bg-warning text-dark';
        } else if (item.ingredientClass == 3) {
            className = 'badge bg-info text-dark';
        } else if (item.ingredientClass == 4) {
            className = 'badge bg-success';
        }
        spanElement.setAttribute('class', className);
        // Добавляем span в li
        listItem.appendChild(spanElement);
    });
    // Добавляем li в родительский список (предположим, что у вас есть ul с id "myList")
    document.getElementById('properties').appendChild(listItem);
}


async function renderListItem(){

}

async function renderSingle(id){


}