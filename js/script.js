// Ждём загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
  
  // === 1. БУРГЕР-МЕНЮ ===
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav ul');
  if(burger) {
    burger.onclick = function() {
      nav.classList.toggle('open');
    }
  }

  // === 2. СЛАЙДЕР ОТЗЫВОВ ===
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  
  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[n].classList.add('active');
    dots[n].classList.add('active');
    current = n;
  }
  
  if(dots.length > 0) {
    dots.forEach((dot, i) => {
      dot.onclick = function() { showSlide(i); }
    });
    // Автопереключение каждые 4 секунды
    setInterval(function() {
      showSlide((current + 1) % slides.length);
    }, 4000);
  }

  // === 3. ВЫБОР ДОМА + МОДАЛКА ===
  const barrels = document.querySelectorAll('.barrel.free');
  const modal = document.getElementById('bookingModal');
  let selectedBarrel = null;

  // Клик по дому
  barrels.forEach(barrel => {
    barrel.onclick = function() {
      barrels.forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      selectedBarrel = this.textContent.trim();
    }
  });

  // Эмуляция booking.txt (данные о домах)
  const bookingInfo = {
    'Дом №3': 'Уютный дом-бочка. 2 спальных места, душ, туалет, мини-кухня.',
    'Дом №5': 'Просторный дом с террасой. 3 места, камин, панорамные окна.',
    'Дом №8': 'Стандартный комфорт. 2 места, отопление, Wi-Fi.'
  };

  // Открытие модалки
  const openModalBtn = document.getElementById('openModalBtn');
  const modalText = document.getElementById('modalText');
  const agreeBtn = document.getElementById('agreeBtn');

  if(openModalBtn) {
    openModalBtn.onclick = function() {
      if(!selectedBarrel) {
        alert('Пожалуйста, выберите свободный дом-бочку!');
        return;
      }
      modalText.textContent = bookingInfo[selectedBarrel] || 'Информация о доме.';
      modal.style.display = 'flex';
    }
  }

  // Закрытие модалки
  if(modal) {
    modal.onclick = function(e) {
      if(e.target === modal) {
        modal.style.display = 'none';
      }
    }
    document.querySelector('.modal-close').onclick = function() {
      modal.style.display = 'none';
    }
  }

  // Переход к бронированию
  if(agreeBtn) {
    agreeBtn.onclick = function() {
      window.location.href = 'booking.html';
    }
  }

  // === 4. БРОНИРОВАНИЕ: ДОБАВЛЕНИЕ ГОСТЕЙ ===
  const addGuestBtn = document.getElementById('addGuestBtn');
  const guestsList = document.getElementById('guestsList');
  const basePrice = 4500; // цена за человека в сутки

  function calculateTotal() {
    const guestCount = guestsList.querySelectorAll('.guest').length;
    let serviceCost = 0;
    
    // Считаем услуги
    document.querySelectorAll('.service-check').forEach(checkbox => {
      if(checkbox.checked) serviceCost += 300; // +300₽ за услугу на человека
    });
    
    const total = guestCount * (basePrice + serviceCost);
    document.getElementById('totalPrice').textContent = total.toLocaleString('ru-RU') + ' ₽';
  }

  if(addGuestBtn) {
    addGuestBtn.onclick = function() {
      // Создаём блок для нового гостя
      const guestDiv = document.createElement('div');
      guestDiv.className = 'guest';
      guestDiv.innerHTML = `
        <span class="remove-guest">✕</span>
        <div class="grid">
          <input type="text" placeholder="Фамилия" required>
          <input type="text" placeholder="Имя" required>
          <input type="text" placeholder="Отчество">
          <input type="date" required>
          <input type="text" placeholder="Номер документа" required>
        </div>
      `;
      guestsList.appendChild(guestDiv);
      calculateTotal();
      
      // Добавляем удаление для нового гостя
      guestDiv.querySelector('.remove-guest').onclick = function() {
        if(guestsList.querySelectorAll('.guest').length > 1) {
          guestDiv.remove();
          calculateTotal();
        }
      }
    }
  }

  // Удаление гостей (для уже существующих)
  document.querySelectorAll('.remove-guest').forEach(btn => {
    btn.onclick = function() {
      if(guestsList.querySelectorAll('.guest').length > 1) {
        this.closest('.guest').remove();
        calculateTotal();
      }
    }
  });

  // Пересчёт при изменении услуг
  document.querySelectorAll('.service-check').forEach(checkbox => {
    checkbox.onchange = calculateTotal;
  });

  // Первый расчёт
  calculateTotal();

  // === 5. ОТПРАВКА ФОРМЫ ПОИСКА ===
  const searchForm = document.getElementById('searchForm');
  if(searchForm) {
    searchForm.onsubmit = function(e) {
      e.preventDefault(); // Отменяем стандартную отправку
      // В реальном проекте тут был бы AJAX, но для олимпиады просто переход:
      window.location.href = 'search.html';
    }
  }
});