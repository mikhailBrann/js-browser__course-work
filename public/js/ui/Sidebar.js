/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarControlBtn = document.querySelector('.sidebar-toggle');
    const showMenuElem = document.querySelector('body');

    if(sidebarControlBtn) {
      sidebarControlBtn.addEventListener("click", (event) => {
        event.preventDefault();

        //выставим начальное состояние для body
        let flag = true;
        const classArr = ['sidebar-open', 'sidebar-collapse'];

        classArr.forEach(className => {
          if(showMenuElem.classList.contains(className)) {
            flag = false;
          }
        });

        if(flag) {
          showMenuElem.classList.add('sidebar-collapse');
        }

        //меняем классы
        ['sidebar-open', 'sidebar-collapse'].forEach(className => showMenuElem.classList.toggle(className));
      });
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const clickEventHelper = (elem, modalSelector) => {
      elem.preventDefault();

      const modalObj = App.getModal(modalSelector);
      modalObj.open();
    };

    const registerCallFormBtn = document.querySelector(".menu-item_register");
    const loginCallFormBtn = document.querySelector(".menu-item_login");
    const logoutCallFormBtn = document.querySelector(".menu-item_logout");

    if(registerCallFormBtn) {
      registerCallFormBtn.addEventListener("click", (event) => clickEventHelper(event, "register"));
    }

    if(loginCallFormBtn) {
      loginCallFormBtn.addEventListener("click", (event) => clickEventHelper(event, "login"));
    }

    if(logoutCallFormBtn) {
      logoutCallFormBtn.addEventListener("click", (event) => {
        event.preventDefault();

        User.logout((err, response) => {
          if(response.success && response.success == true) {
            App.setState('init');
          }
        })
      });
    }
  }
}