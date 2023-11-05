// чтоб по центру был текст в intro
document.addEventListener("DOMContentLoaded", function () {
  const floatingMenu = document.querySelector(".header");
  if (floatingMenu) {
    const floatingMenuHeight = floatingMenu.offsetHeight;

    // Применяем высоту плавающего меню к стилю header
    const intro = document.querySelector(".intro");
    intro.style.paddingTop = `${floatingMenuHeight}px`;
  }

  // const form = document.getElementById("form");
  // form.addEventListener("submit", formSend);

  // async function formSend(e) {
  //   e.preventDefault();
  // }
  //  для плавной навигации, к ссылкам добавь scroll класс
  var scrollLinks = document.querySelectorAll(".scroll");

  for (var i = 0; i < scrollLinks.length; i++) {
    scrollLinks[i].addEventListener("click", smoothScroll);
  }

  function smoothScroll(e) {
    e.preventDefault();
    var targetId = this.getAttribute("href").substr(1);
    var targetElement = document.getElementById(targetId);

    if (targetElement) {
      var offsetTop =
        targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth", // Это добавляет плавный эффект
      });
    }
  }
});

// Получаем элемент заголовка
const header = document.querySelector(".header");

let prevScrollPos = window.pageYOffset;

// Обработчик события прокрутки страницы
window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // Прокрутка вверх
    header.style.transform = "translateY(0)";
  } else {
    // Прокрутка вниз
    header.style.transform = "translateY(-100%)";
  }

  prevScrollPos = currentScrollPos;
});

const popupLinks = document.querySelectorAll(".popup-link");

const body = document.querySelector("body");
//  lockPadding чтоб контент и скролл не ездили, в этом случае ничего не ездит поэтому тебе он не нужен, так же как и lock для body.
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault(); //блокируем обычную работу, в этом примере запрещаем ссылке переходить куда-то
    });
  }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      // bodyLock();
    }
    currentPopup.classList.add("open");
    // currentPopup.style.paddingTop = `${floatingMenuHeight}px`;

    currentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        //все что не входит в popup__content
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}
//dounblock = false если в поп апе есть еще один поп ап, тогда смысла блокать нету так как может появится два скрола
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    popupActive.style.paddingTop = "0px";
    if (doUnlock) {
      // bodyUnlock();
    }
  }
}

function bodyLock() {
  //ширина скролла
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;

  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock"); //для заморозки скролла body
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});

(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
});
