/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    const form = this.element;

    User.register(data, (err, response) => {
      if(response.success && response.success == true) {
        const modal = App.getModal('register');

        App.setState('user-logged');
        form.reset();
        modal.close();
      }
    });
  }
}