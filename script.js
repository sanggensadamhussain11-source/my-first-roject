const bookingForm = document.querySelector('#booking-form');
const bookingDate = document.querySelector('#booking-date');
const formMessage = document.querySelector('#form-message');
const filterButtons = document.querySelectorAll('.filter-button');
const menuCards = document.querySelectorAll('.menu-card');

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
bookingDate.min = localToday;

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            const isSelected = filterButton === button;
            filterButton.classList.toggle('is-active', isSelected);
            filterButton.setAttribute('aria-pressed', String(isSelected));
        });

        menuCards.forEach((card) => {
            card.hidden = selectedFilter !== 'all' && card.dataset.category !== selectedFilter;
        });
    });
});

bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.classList.remove('is-error');

    if (!bookingForm.reportValidity()) {
        return;
    }

    const formData = new FormData(bookingForm);
    const name = formData.get('name').trim();
    const guests = formData.get('guests');
    const time = formData.get('time');
    const occasion = formData.get('occasion');
    const date = new Date(`${formData.get('date')}T00:00:00`);
    const formattedDate = new Intl.DateTimeFormat('en', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(date);

    formMessage.textContent = `Thanks, ${name}! Your ${occasion.toLowerCase()} table for ${guests} on ${formattedDate} at ${time} is ready to request. Please call us to confirm.`;
    bookingForm.reset();
    bookingDate.min = localToday;
});
