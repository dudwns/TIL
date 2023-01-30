class UserStorage {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((id == "ellie" && password == "dream") || (id == "coder" && password == "academy")) {
          resolve(id);
        } else {
          reject(new Error("not found"));
        }
      }, 2000);
    });
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === "ellie") {
          resolve({ name: "ellie", role: "admin" });
        } else {
          reject(new Error("no access"));
        }
      }, 1000);
    });
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage
  .loginUser(id, password) //로그인을 하고, 로그인을 성공하면 유저가 전달되니까
  .then(userStorage.getRoles) // 그 유저를 이용해서 getRoles를 호출하고
  .then((user) => alert(`Hello ${user.name}, you have a ${user.role} role`)) //모든게 다 성공적으로 동작하면 최종적으로 name과 role을 띄움
  .catch(console.log); // 실패하면 에러를 출력
