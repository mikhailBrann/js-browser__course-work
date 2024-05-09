/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    const form = this.element;

    User.login(data, (err, response) => {
      if(response.success && response.success == true) {
        const modal = App.getModal('login');

        App.setState('user-logged');
        form.reset();
        modal.close();
      }
    });
  }
}