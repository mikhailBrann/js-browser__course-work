/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    try {
      if(!element) {
        throw new Error("Элемент не существует!");
      }

      this.element = element;
      this.registerEvents();
      this.update();
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccountBtn = document.querySelector(".create-account");
    
    if(createAccountBtn) {
      createAccountBtn.addEventListener("click", () => {
        const modal = App.getModal('createAccount');
        modal.open();
      });
    }
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const currentUser = User.current();
    const accountObj = this;
    const accountRequest = (err, response) => {
      if(response && response.success == true) {
        accountObj.clear();
        accountObj.renderItem(response.data);
      }
    }

    if(currentUser && currentUser.id) {
      Account.list(currentUser.id, accountRequest);
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const removeElemsArr = Array.from(this.element.querySelectorAll(".account"));

    if(removeElemsArr.length) {
      removeElemsArr.forEach(elem => elem.remove());
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    const activeElems = Array.from(document.querySelectorAll(".account.active"));

    if(activeElems.length) {
      activeElems.forEach(elem => elem.classList.remove("active"));
    }

    element.classList.add("active");
    App.showPage( 'transactions', { account_id: element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const accountObj = this;

    if(item) {
      const renderElem = document.createElement('li');

      renderElem.classList.add('account');
      renderElem.dataset.id = item?.id;
      renderElem.innerHTML = `<a href="#">
        <span>${item?.name}</span> /
        <span>${item?.sum} ₽</span>
      </a>`;
      renderElem.onclick = (event) => {
        event.preventDefault();
        accountObj.onSelectAccount(event.currentTarget)
      };
      
      return renderElem;
    }
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    if(data.length) {
      const accountObj = this;

      data.forEach(item => {
        const itemNode = accountObj.getAccountHTML(item);
        accountObj.element.append(itemNode);
      });
    }
  }
}
