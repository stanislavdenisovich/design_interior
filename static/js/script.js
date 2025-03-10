document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const burger = document.getElementById("burger");
const navMenu = document.getElementById("nav-menu");

// Добавляем обработчик события для клика на бургер
burger.addEventListener("click", function () {
  // Переключаем класс активности для бургер-меню
  this.classList.toggle("active");

  // Переключаем максимальную высоту для меню, чтобы оно раскрылось
  const menu = navMenu.querySelector("ul");
  if (menu.style.maxHeight) {
    menu.style.maxHeight = null;
  } else {
    menu.style.maxHeight = menu.scrollHeight + "px";
  }
});

// Получаем элементы
const modal = document.getElementById("promo__box");
const openModalBtn = document.querySelector(".js-open-modal");
const closeBtn = document.querySelector(".close-btn");
const form = document.getElementById("calculatorForm");
const result = document.getElementById("result");

// Открытие модального окна при клике на кнопку
openModalBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Чтобы не было перехода по ссылке
  modal.style.display = "flex"; // Отображаем модальное окно
});

// Закрытие модального окна при клике на кнопку "X"
closeBtn.addEventListener("click", function () {
  modal.style.display = "none"; // Скрываем модальное окно
});

// Закрытие модального окна при клике вне его
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none"; // Если кликнули вне окна, скрываем его
  }
});

// Логика расчета
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Не отправляем форму

  const squareMeters = parseFloat(
    document.getElementById("squareMeters").value
  );

  if (isNaN(squareMeters) || squareMeters <= 0) {
    result.innerHTML = "<p>Пожалуйста, введите правильную площадь.</p>";
    return;
  }

  // Цены за квадратный метр
  const priceWithoutSupervision = 6000; // Без авторского надзора
  const priceWithSupervision = 9000; // С авторским надзором

  const totalWithoutSupervision = priceWithoutSupervision * squareMeters;
  const totalWithSupervision = priceWithSupervision * squareMeters;

  result.innerHTML = `
<div class="pricing-container">

  <div class="price-column">
    <div class="price">
      Цена без авторского надзора: 
        <span>${totalWithoutSupervision} ₸</span>
        </div>
    <div class="description">
      1. Передача всех чертежей и планов в форматах для самостоятельной реализации.<br>
      2. Без контроля за реализацией и выполнением дизайна.
    </div>
</div>


  <div class="separator"> </div>


  <div class="price-column">
    <div class="price">
      Цена с авторским надзором: 
        <span>${totalWithSupervision} ₸</span>
    </div>
    <div class="description">
      1. Регулярный контроль за выполнением проекта на всех этапах.<br>
      2. Посещение строительного объекта для проверки соответствия проекту.
    </div>
  </div>


  `;
});

function toggleTariffDetails(event) {
  const targetId = event.target.getAttribute("data-target");
  const details = document.getElementById(targetId);

  details.classList.toggle("collapsed");

  if (details.classList.contains("collapsed")) {
    event.target.textContent = "Скрыть описание тарифа";
  } else {
    event.target.textContent = "Показать описание тарифа";
  }
}
