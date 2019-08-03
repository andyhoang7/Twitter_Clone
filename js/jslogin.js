console.log("jslogin")
var count = 5;

// SIGN-UP-Start-->>

const userStorage = JSON.parse(localStorage.getItem("usersTwitter")) || [];
const getuserStorage = () => userStorage;
const getCurrentUser = () => getuserStorage().currentUser;
const save = userTwitter => localStorage.setItem('pttAppState', JSON.stringify(userTwitter));


function createuserObject() {
    return {
        userName: document.getElementById("signUpusInput").value,
        userID: makeId(8),
        userEmail: document.getElementById("signUpEmailInput").value,
        userPassword: document.getElementById("signUppwInput").value
    }
}

// function save(userTwitter) {
//   localStorage.setItem("usersTwitter",JSON.stringify(userTwitter))
// }

function signUp() {
    userStorage.push(createuserObject())
    // console.log("hellllooooo",users)
    document.getElementById("signUpusInput").value = "",
    document.getElementById("signUpEmailInput").value = "",
    document.getElementById("signUppwInput").value = ""
    document.getElementById("signUpRePwInput").value = ""
    save(userStorage)
}


// <--- SIGN-UP-End


// LOG-IN-Start-->>
function validate() {
    var valid = false;
    var un = document.getElementById("loginUser");
    var pw = document.getElementById("loginPass");
    userStorage.map((person) =>{person.userName});
    userStorage.map((password) =>{password.userPassword});

    if ((userStorage.map((person) =>{person.userName = un}))) {
    valid = true;
    }

    if (valid) {
    alert("Login was successful");
    // window.location = "index.html";
    console.log("TRUEEEEEEEE")
    return false;
    }

    var again = " tries";
    if (count == 1) {
      again = " try";
    }
    if (count >= 1) {
      alert("Wrong username or password");
      count--;
    } else {
      alert("Incorrect username or password. You are now BLOCKED");
      document.login.username.value = "You are now BLOCKED";
      document.login.password.value = "Keep SILENT!";
      document.login.username.disabled = true;
      document.login.password.disabled = true;
      return false;
    }

  }

//   // <--- SIGN-UP-End


//   // function validate() {
//   //       var usernameArray = ["Mors", "Phuong", "Khuong", "Thien"];
//   //       var passwordArray = ["01234", "43210", "56789", "98765"];
      
//   // console.log('userClickLogin')
//   //       var un = document.getElementById("loginUser").value;
//   //       var pw = document.getElementById("loginPass").value;
//   //   var valid = false;
//   //   for (var i = 0; i < usernameArray.length; i++) {
//   //     if (un == usernameArray[i] && pw == passwordArray[i]) {
//   //       valid = true;
//   //       break;
//   //     }
//   //   }



//   console.log("Hello World!");
//   if (valid) {
//     alert("Login was successful");
//     window.location = "index.html";
//     return false;
//   }
//   var again = " tries";
//   if (count == 1) {
//     again = " try";
//   }
//   if (count >= 1) {
//     alert("Wrong username or password");
//     count--;
//   } else {
//     alert("Incorrect username or password. You are now BLOCKED");
//     document.login.username.value = "You are now BLOCKED";
//     document.login.password.value = "Keep SILENT!";
//     document.login.username.disabled = true;
//     document.login.password.disabled = true;
//     return false;
//   }
// }
function showPassword() {
    var x = document.getElementById("signUppwInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

function showRePassword() {
  var x = document.getElementById("signUpRePwInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showLoginPassword() {
  var x = document.getElementById("loginPass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}










