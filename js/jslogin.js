console.log("jslogin")
var count = 5;

// SIGN-UP-Start-->>

let users = JSON.parse(localStorage.getItem("users")) || [];
console.log("USERS",users);

function createuserObject() {
    return {
        userName: document.getElementById("signUpusInput").value,
        userID: makeId(8),
        userEmail: document.getElementById("signUpEmailInput").value,
        userPassword: document.getElementById("signUppwInput").value
    }
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }
  
  function makeId(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (i = 0; i < length; i++) {
      result += characters.charAt(getRandomIntInclusive(1, charactersLength));
    }
    return result;
  }


function signup() {
   users.push(createuserObject())
    // console.log("hellllooooo",users)
    storeUserToStorage(users)
    document.getElementById("signUpusInput").value = "",
    document.getElementById("signUpEmailInput").value = "",
    document.getElementById("signUppwInput").value = ""
    
}
console.log(users)







// <--- SIGN-UP-End

function storeUserToStorage(user) {
    localStorage.setItem("users",JSON.stringify(user))
}


function validate() {
    //   var usernameArray = ["Mors", "Phuong", "Khuong", "Thien"];
    //   var passwordArray = ["01234", "43210", "56789", "98765"];
    // users.map((user,idx) => {
    //     if (user.userName[idx] 
    // })
console.log('userClickLogin')
      var un = document.getElementById("loginUser").value;
      var pw = document.getElementById("loginPass").value;
  var valid = false;
//   for (var i = 0; i < usernameArray.length; i++) {
//     if (un == usernameArray[i] && pw == passwordArray[i]) {
//       valid = true;
//       break;
//     }
//   }

const = users.filter


  console.log("Hello World!");
  if (valid) {
    alert("Login was successful");
    window.location = "index.html";
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
function showPassword() {
    var x = document.getElementById("signUppwInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

function showPassword() {
  var x = document.getElementById("loginPass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}








