//##Подписчик на события##

let eventCheckers = [
    ['#hfs', 'keydown'],
    ['.projects__toggle', 'focus'],
    ['[type = "radio"]', 'keydown'],
    ['.projects__switch', 'blur'],
    ['.valid-input', 'blur'],
    ['.valid-input', 'input'],
    ['.valid-form', 'change']
];
eventCheckers.forEach(function(item, i) {
    document.querySelectorAll(item[0]).forEach(function(el){el.addEventListener(item[1],function(event){

        //##Фокус элементов навигации##

        if(i == 0) {
            if(event.key=='Enter'){
                if(!this.checked){this.checked=!0}else{this.checked=!1}
            }
        }
        else if (i == 1) {
            document.querySelector('#' + this.getAttribute('for')).focus();
        }
        else if (i == 2) {
            if(event.key=='ArrowUp' || event.key=='ArrowDown'){
                event.preventDefault();
                this.blur();
            }
            if(event.key=='Tab'){
                if (this.getAttribute('id') == 'psp1' || this.getAttribute('id') == 'sas-g') {
                    event.preventDefault();
                    this.nextElementSibling.focus();
                }
            }
            if(event.key=='Enter'){
                this.checked = 1;
            }
        }
        else if (i == 3) {
            if (event.relatedTarget && event.relatedTarget.dataset.change) {
                document.querySelector('.service-tab__switch_cat_gen').focus();      
            } 
        }
        else if (i == 4 || i == 5) {
            changeDefaultFormMessage(event); 
        }
        else if (i == 6) {
            changeFormHandler(event); 
        }
    })})
})

//##Инициализация Яндекс.Карты##

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
                // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.76659735488058,37.63137024464414],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 15,
        controls: []
    });
}

//##Валидация форм##

function changeFormHandler(e) {
    let iterate = e.currentTarget;

    if (e.target.checkValidity()) {
        iterate.querySelector('.valid-submit').removeAttribute('disabled');
    }
}

function changeDefaultFormMessage(e) {
    let verificationClass = 'valid-input_invalid';
    let verificationAttr = 'data-invalid';
    let iterate = e.target;
    
    if (e.type == 'input'){
        iterate.setAttribute(verificationAttr, true);
        if(iterate.classList.contains(verificationClass)){
            iterate.classList.remove(verificationClass);
        }
    }
    if (e.type == 'blur'){
        if (e.target.getAttribute(verificationAttr)) {
            e.preventDefault();
            iterate.classList.add(verificationClass);
            iterate.removeAttribute(verificationAttr);
            if (!iterate.checkValidity()) {
                iterate.setAttribute('aria-invalid', true);
            }
        }
    }
}