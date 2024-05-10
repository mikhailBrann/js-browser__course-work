/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const currentUser = User.current();
    const selectField = this.element.querySelector("[name=account_id]");

    if(!currentUser?.id) {
      return;
    }

    console.log(selectField);

    Account.list(currentUser.id, (err, response) => {
      if(response && response.data) {
        selectField.innerHTML = "";
        response.data.forEach(item => selectField.insertAdjacentHTML("beforeend", `<option value="${item.id}">${item.name}</option>`));
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const form = this.element;
    let modal = false;

    if(data?.type == 'income') {
      modal = App.getModal('newIncome');
    }

    if(data?.type == 'expense') {
      modal = App.getModal('newExpense');
    }

    Transaction.create(data, (err, response) => {
      if(response && response.success == true) {
        form.reset();
        modal.close();
        App.update();
      }
    });
  }
}