// ==========================================
// 1. Управление модальным окном быстрого заказа
// ==========================================
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

if (orderDialog && orderButtons.length > 0) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product || 'Товар';
      if (selectedProductInput) {
        selectedProductInput.value = productName;
      }
      orderDialog.showModal();
    });
  });
}

if (orderDialog && closeDialogButton) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

// ==========================================
// 2. Валидация модальной формы
// ==========================================
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    if (successMessage) {
      successMessage.hidden = false;
    }
    orderForm.reset();
    if (orderDialog) {
      orderDialog.close();
    }
  });
}

// ==========================================
// 3. Валидация формы на отдельной странице (order.html)
// ==========================================
const pageOrderForm = document.getElementById('page-order-form');
const pageSuccessMessage = document.getElementById('page-success-message');

if (pageOrderForm) {
  pageOrderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(pageOrderForm.elements);
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!pageOrderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      pageOrderForm.reportValidity();
      return;
    }

    if (pageSuccessMessage) {
      pageSuccessMessage.hidden = false;
      pageSuccessMessage.scrollIntoView({ behavior: 'smooth' });
    }
    pageOrderForm.reset();
  });
}