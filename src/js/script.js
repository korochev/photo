let eventCheckers = [
    ['#hfs', 'keydown'],
    ['.projects__toggle', 'focus'],
    ['[type = "radio"]', 'keydown'],
    ['.projects__switch', 'blur']
];
eventCheckers.forEach(function(item, i) {
    document.querySelectorAll(item[0]).forEach(function(el){el.addEventListener(item[1],function(event){
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
    })})
})

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
        center: [55.769535,37.639985],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 15,
        controls: []
    });
}