/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    try {
      if(!element) {
        throw new Error("Такого элемента нет в рендере страницы!");
      }

      this.element = element;
      this.registerEvents();
    } catch(error) {
      console.error(error);
    }

  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const incomeCallFormBtn = document.querySelector(".create-income-button");
    const expenseCallFormBtn = document.querySelector(".create-expense-button");
    const clickEventHendler = modalId => {
      const modal = App.getModal(modalId);
      modal.open();
    };

    if(incomeCallFormBtn) {
      incomeCallFormBtn.addEventListener("click", () => clickEventHendler("newIncome"));
    }

    if(expenseCallFormBtn) {
      expenseCallFormBtn.addEventListener("click", () => clickEventHendler("newExpense"));
    }
  }
}
