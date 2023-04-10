class User {
  constructor(username, email, password) {
    this.#username = username;
    this.#email = email;
    this.#password = password;
  }

  getUsername() {
    return this.#username;
  }

  setUsername(newName) {
    this.#username = newName;
    //Update database
  }

  getEmail() {
    return this.#email;
  }

  setEmail(newEmail) {
    this.#email = newEmail;
    //Update database
  }

  getPassword() {
    return this.#password;
  }

  setPassword(newPwd) {
    this.#password = newPwd;
    //Update database
  }
}

export default User;
