//##Подписчик на события##

let eventCheckers = [
    ['#hfs', 'keydown'],
    ['.projects__toggle', 'focus'],
    ['[type = "radio"]', 'keydown'],
    ['.projects__switch', 'blur'],
    ['.valid-input', 'blur'],
    ['.valid-input', 'input'],
    ['.valid-form', 'change'],
    ['.service-tab__toggle', 'focus'],
    ['*' , 'focus']
];
eventCheckers.forEach(function(item, i) {
    document.querySelectorAll(item[0]).forEach(function(el){el.addEventListener(item[1],function(event){

        //##Фокус элементов навигации##

        if(i == 0) {
            if(event.key=='Enter'){
                if(!this.checked){this.checked=!0}else{this.checked=!1}
            }
        }
        else if (i == 1 || i == 7) {
            event.preventDefault();
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
                if (this.getAttribute('id') == 'sas-r') {
                    event.preventDefault();
                    if (!this.checked) {
                        document.querySelector('#dsgen').focus();
                    } else {
                        console.log(this);
                        document.querySelector('#dsret').focus();
                    }
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

//##Валидация форм##

function changeFormHandler(e) {
    let iterate = e.currentTarget;
    let btn = iterate.querySelector('.valid-submit');

    if (e.target.checkValidity()) {
        btn.removeAttribute('disabled');
    }
    else {
        btn.setAttribute('disabled', true);
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

/* ##Lazy Load Изображений## */

document.addEventListener("DOMContentLoaded", function(event) {
    var lazyImages =[].slice.call(
     document.querySelectorAll(".lazy > source")
    )
 
    if ("IntersectionObserver" in window) {
        console.log('I was here');
       let lazyImageObserver = 
        new IntersectionObserver(function(entries, observer) {
           entries.forEach(function(entry) {
            if (entry.isIntersecting) {      
               let lazyImage = entry.target;
               lazyImage.srcset = lazyImage.dataset.srcset;
               lazyImage.nextElementSibling.srcset = lazyImage.dataset.srcset;
               lazyImage.nextElementSibling.classList.add('fade-in');
               lazyImage.parentElement.classList.remove("lazy");
              lazyImageObserver.unobserve(lazyImage);
             }
          });
         });
 
       lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
       });
    } else {

     lazyImages.forEach(function(image){
         image.nextElementSibling.src = image.nextElementSibling.dataset.srcset;
       });
     }
   });

   /* ##Lazy Load Яндекс.Карты## */

   // Получаем нужный элемент
var element = document.querySelector('#map-container');

var Visible = function (target) {
  // Все позиции элемента
  var targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      left: window.pageXOffset + target.getBoundingClientRect().left,
      right: window.pageXOffset + target.getBoundingClientRect().right,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    },
    // Получаем позиции окна
    windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };

  if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
    targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
    targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
    targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
    // Если элемент полностью видно, то запускаем следующий код
    console.clear();
    console.log('Вы видите элемент :)');
    
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
  } else {
    // Если элемент не видно, то запускаем этот код
    console.clear();
  };
};

// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function() {
  Visible (element);
});

// А также запустим функцию сразу. А то вдруг, элемент изначально видно
Visible (element);