[["#hfs","keydown"],[".projects__toggle","focus"],['[type = "radio"]',"keydown"],[".projects__switch","blur"],[".valid-input","blur"],[".valid-input","input"],[".valid-form","change"],[".service-tab__toggle","focus"],["*","focus"]].forEach((function(e,t){document.querySelectorAll(e[0]).forEach((function(n){n.addEventListener(e[1],(function(e){0==t?"Enter"==e.key&&(this.checked?this.checked=!1:this.checked=!0):1==t||7==t?(e.preventDefault(),document.querySelector("#"+this.getAttribute("for")).focus()):2==t?("ArrowUp"!=e.key&&"ArrowDown"!=e.key||(e.preventDefault(),this.blur()),"Tab"==e.key&&("psp1"!=this.getAttribute("id")&&"sas-g"!=this.getAttribute("id")||(e.preventDefault(),this.nextElementSibling.focus()),"sas-r"==this.getAttribute("id")&&(e.preventDefault(),this.checked?(console.log(this),document.querySelector("#dsret").focus()):document.querySelector("#dsgen").focus())),"Enter"==e.key&&(this.checked=1)):3==t?e.relatedTarget&&e.relatedTarget.dataset.change&&document.querySelector(".service-tab__switch_cat_gen").focus():4==t||5==t?function(e){let t="valid-input_invalid",n="data-invalid",i=e.target;"input"==e.type&&(i.setAttribute(n,!0),i.classList.contains(t)&&i.classList.remove(t));"blur"==e.type&&e.target.getAttribute(n)&&(e.preventDefault(),i.classList.add(t),i.removeAttribute(n),i.checkValidity()||i.setAttribute("aria-invalid",!0))}(e):6==t&&function(e){let t=e.currentTarget.querySelector(".valid-submit");e.target.checkValidity()?t.removeAttribute("disabled"):t.setAttribute("disabled",!0)}(e)}))}))})),document.addEventListener("DOMContentLoaded",(function(e){var t=[].slice.call(document.querySelectorAll(".lazy > source"));if("IntersectionObserver"in window){console.log("I was here");let e=new IntersectionObserver((function(t,n){t.forEach((function(t){if(t.isIntersecting){let n=t.target;n.srcset=n.dataset.srcset,n.nextElementSibling.srcset=n.dataset.srcset,n.nextElementSibling.classList.add("fade-in"),n.parentElement.classList.remove("lazy"),e.unobserve(n)}}))}));t.forEach((function(t){e.observe(t)}))}else t.forEach((function(e){e.nextElementSibling.src=e.nextElementSibling.dataset.srcset}))}));var e=document.querySelector("#map-container"),t=function(e){var t=window.pageYOffset+e.getBoundingClientRect().top,n=window.pageXOffset+e.getBoundingClientRect().left,i=window.pageXOffset+e.getBoundingClientRect().right,o=window.pageYOffset+e.getBoundingClientRect().bottom,c=window.pageYOffset,s=window.pageXOffset,r=window.pageXOffset+document.documentElement.clientWidth,a=window.pageYOffset+document.documentElement.clientHeight;if(o>c&&t<a&&i>s&&n<r){console.clear(),console.log("Вы видите элемент :)"),ymaps.ready((function(){new ymaps.Map("map",{center:[55.76659735488058,37.63137024464414],zoom:15,controls:[]})}))}else console.clear()};window.addEventListener("scroll",(function(){t(e)})),t(e);