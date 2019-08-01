var count = 2;

let usr = JSON.parse(localStorage.getItem("ip01"));

var npwd = document.getElementById("ip001").value;
var rpwd = document.getElementById("ip002").value;
var usernameArray = ["Mors", "Phuong", "Khuong", "Thien"];
var passwordArray = ["01234", "43210", "56789", "98765"];

function storeUserToStorage(usr) {
    localStorage.setItem("ip01",JSON.stringify(usr))
}

function storePWToStorage(pwd) {
    localStorage.setItem("ip001",JSON.stringify(pwd) => {
        if (npwd = rpwd) {
            let npwd = JSON.parse(localStorage.getItem("ip001"))
            
        }
    })
}



function validate() {
      var usernameArray = ["Mors", "Phuong", "Khuong", "Thien"];
      var passwordArray = ["01234", "43210", "56789", "98765"];
    //   var un = document.getElementById("ip01").value;
    //   var pw = document.getElementById("ip001").value;
  var valid = false;
  for (var i = 0; i < usernameArray.length; i++) {
    if (usr == usernameArray[i] && pwd == passwordArray[i]) {
      valid = true;
      break;
    }
  }
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
  var x = document.getElementById("ip001");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showRePassword() {
  var x = document.getElementById("ip002");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
