document.addEventListener('DOMContentLoaded', () => {
  // 1. Бургер-меню
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav ul');
  if (burger) burger.onclick = () => nav.classList.toggle('open');

  // 2. Слайдер отзывов
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let cur = 0;
  const showSlide = (n) => {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[n].classList.add('active');
    dots[n].classList.add('active');
    cur = n;
  };
  if (dots.length) {
    dots.forEach((d, i) => d.onclick = () => showSlide(i));
    setInterval(() => showSlide((cur + 1) % slides.length), 5000);
  }

  // 3. Выбор дома + Модальное окно
  const barrels = document.querySelectorAll('.barrel.free');
  const modal = document.getElementById('bookingModal');
  let chosen = null;

  barrels.forEach(b => b.onclick = function() {
    barrels.forEach(x => x.classList.remove('selected'));
    this.classList.add('selected');
    chosen = this.textContent.trim();
  });

  // Эмуляция booking.txt (для локального запуска без CORS)
  const barrelData = {
    'Дом №3': 'Уютный дом-бочка. 2 спальных места, душ, мини-кухня, отопление.',
    'Дом №5': 'Просторный дом с террасой. 3 места, камин, панорамные окна, Wi-Fi.',
    'Дом №8': 'Стандартный комфорт. 2 места, санузел внутри, мини-холодильник.'
  };

  const openBtn = document.getElementById('openModal');
  const modalText = document.getElementById('modalInfo');
  const agreeBtn = document.getElementById('agreeBtn');

  if (openBtn) openBtn.onclick = () => {
    if (!chosen) return alert('Пожалуйста, выберите свободный дом-бочку!');
    modalText.textContent = barrelData[chosen] || 'Информация о доме загружена.';
    modal.style.display = 'flex';
  };

  if (modal) {
    modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
    document.querySelector('.modal-close').onclick = () => modal.style.display = 'none';
  }
  if (agreeBtn) agreeBtn.onclick = () => window.location.href = 'booking.html';

  // 4. Бронирование: гости + расчёт цены
  const addBtn = document.getElementById('addGuest');
  const guestsList = document.getElementById('guestsList');
  const totalEl = document.getElementById('totalCost');
  const pricePerGuest = 4500;
  const servicePrice = 300;

  const calcTotal = () => {
    const count = guestsList.querySelectorAll('.guest-block').length;
    let srv = 0;
    document.querySelectorAll('.srv-check').forEach(c => { if (c.checked) srv += servicePrice; });
    totalEl.textContent = (count * (pricePerGuest + srv)).toLocaleString('ru-RU') + ' ₽';
  };

  if (addBtn) addBtn.onclick = () => {
    const div = document.createElement('div');
    div.className = 'guest-block';
    div.innerHTML = `
      <span class="remove-guest">✕</span>
      <div class="grid">
        <input type="text" placeholder="Фамилия" required>
        <input type="text" placeholder="Имя" required>
        <input type="text" placeholder="Отчество">
        <input type="date" required>
        <input type="text" placeholder="Номер документа" required>
      </div>`;
    guestsList.appendChild(div);
    div.querySelector('.remove-guest').onclick = () => {
      if (guestsList.querySelectorAll('.guest-block').length > 1) { div.remove(); calcTotal(); }
    };
    calcTotal();
  };

  document.querySelectorAll('.remove-guest').forEach(btn => {
    btn.onclick = function() {
      if (guestsList.querySelectorAll('.guest-block').length > 1) {
        this.closest('.guest-block').remove(); calcTotal();
      }
    };
  });
  document.querySelectorAll('.srv-check').forEach(c => c.onchange = calcTotal);
  calcTotal();

  // 5. Форма поиска (переход без перезагрузки)
  const searchForm = document.querySelector('form[action="search.html"]');
  if (searchForm) searchForm.onsubmit = e => { e.preventDefault(); window.location.href = 'search.html'; };
});