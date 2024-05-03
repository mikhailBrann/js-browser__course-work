/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const currentUser = localStorage.getItem('user');

    if(currentUser != 'undefined') {
        return JSON.parse(currentUser);
    }

    return currentUser;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    const currentUser = this.current();
    const url = this.URL + '/current';
    const userObj = this;

    const requestParams = {
      url: url,
      method: 'GET',
      callback: (err, response) => {
        if(response?.success && response?.success == true) {
          const currentUser = response.user;
          
          delete currentUser.password;
          userObj.setCurrent(currentUser);
        } 
        
        if(response?.success && response.success == false) {
          userObj.unsetCurrent();
        }
        

        callback(err, response);
      }
    }

    createRequest(requestParams);
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {

  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {

  }
}


// User.login({'email': 'demo@demo', 'password': 'demo'}, (err, response) => {
//   console.log(err);
//   console.log(response);
// });


User.fetch(( err, response ) => {
  console.log(response); // 2
  console.log(err); // 2
});