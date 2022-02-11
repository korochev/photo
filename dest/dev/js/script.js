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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGV2ZW50Q2hlY2tlcnMgPSBbXHJcbiAgICBbJyNoZnMnLCAna2V5ZG93biddLFxyXG4gICAgWycucHJvamVjdHNfX3RvZ2dsZScsICdmb2N1cyddLFxyXG4gICAgWydbdHlwZSA9IFwicmFkaW9cIl0nLCAna2V5ZG93biddLFxyXG4gICAgWycucHJvamVjdHNfX3N3aXRjaCcsICdibHVyJ11cclxuXTtcclxuZXZlbnRDaGVja2Vycy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGkpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbVswXSkuZm9yRWFjaChmdW5jdGlvbihlbCl7ZWwuYWRkRXZlbnRMaXN0ZW5lcihpdGVtWzFdLGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBpZihpID09IDApIHtcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5PT0nRW50ZXInKXtcclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmNoZWNrZWQpe3RoaXMuY2hlY2tlZD0hMH1lbHNle3RoaXMuY2hlY2tlZD0hMX1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpID09IDEpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyB0aGlzLmdldEF0dHJpYnV0ZSgnZm9yJykpLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGkgPT0gMikge1xyXG4gICAgICAgICAgICBpZihldmVudC5rZXk9PSdBcnJvd1VwJyB8fCBldmVudC5rZXk9PSdBcnJvd0Rvd24nKXtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsdXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihldmVudC5rZXk9PSdUYWInKXtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnaWQnKSA9PSAncHNwMScgfHwgdGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJykgPT0gJ3Nhcy1nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0RWxlbWVudFNpYmxpbmcuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihldmVudC5rZXk9PSdFbnRlcicpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpID09IDMpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnJlbGF0ZWRUYXJnZXQgJiYgZXZlbnQucmVsYXRlZFRhcmdldC5kYXRhc2V0LmNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlcnZpY2UtdGFiX19zd2l0Y2hfY2F0X2dlbicpLmZvY3VzKCk7ICAgICAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgfSl9KVxyXG59KVxyXG5cclxuLy8g0KTRg9C90LrRhtC40Y8geW1hcHMucmVhZHkoKSDQsdGD0LTQtdGCINCy0YvQt9Cy0LDQvdCwLCDQutC+0LPQtNCwXHJcbi8vINC30LDQs9GA0YPQt9GP0YLRgdGPINCy0YHQtSDQutC+0LzQv9C+0L3QtdC90YLRiyBBUEksINCwINGC0LDQutC20LUg0LrQvtCz0LTQsCDQsdGD0LTQtdGCINCz0L7RgtC+0LLQviBET00t0LTQtdGA0LXQstC+LlxyXG55bWFwcy5yZWFkeShpbml0KTtcclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgLy8g0KHQvtC30LTQsNC90LjQtSDQutCw0YDRgtGLLlxyXG4gICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcFwiLCB7XHJcbiAgICAgICAgLy8g0JrQvtC+0YDQtNC40L3QsNGC0Ysg0YbQtdC90YLRgNCwINC60LDRgNGC0YsuXHJcbiAgICAgICAgICAgICAgICAvLyDQn9C+0YDRj9C00L7QuiDQv9C+INGD0LzQvtC70YfQsNC90LjRjjogwqvRiNC40YDQvtGC0LAsINC00L7Qu9Cz0L7RgtCwwrsuXHJcbiAgICAgICAgLy8g0KfRgtC+0LHRiyDQvdC1INC+0L/RgNC10LTQtdC70Y/RgtGMINC60L7QvtGA0LTQuNC90LDRgtGLINGG0LXQvdGC0YDQsCDQutCw0YDRgtGLINCy0YDRg9GH0L3Rg9GOLFxyXG4gICAgICAgIC8vINCy0L7RgdC/0L7Qu9GM0LfRg9C50YLQtdGB0Ywg0LjQvdGB0YLRgNGD0LzQtdC90YLQvtC8INCe0L/RgNC10LTQtdC70LXQvdC40LUg0LrQvtC+0YDQtNC40L3QsNGCLlxyXG4gICAgICAgIGNlbnRlcjogWzU1Ljc2OTUzNSwzNy42Mzk5ODVdLFxyXG4gICAgICAgIC8vINCj0YDQvtCy0LXQvdGMINC80LDRgdGI0YLQsNCx0LjRgNC+0LLQsNC90LjRjy4g0JTQvtC/0YPRgdGC0LjQvNGL0LUg0LfQvdCw0YfQtdC90LjRjzpcclxuICAgICAgICAvLyDQvtGCIDAgKNCy0LXRgdGMINC80LjRgCkg0LTQviAxOS5cclxuICAgICAgICB6b29tOiAxNSxcclxuICAgICAgICBjb250cm9sczogW11cclxuICAgIH0pO1xyXG59Il0sImZpbGUiOiJzY3JpcHQuanMifQ==
