const loginId = document.getElementById("userId");
const loginBtn = document.getElementById("Loginbtn");
const loginPw = document.getElementById("password");
const loginrPw = document.getElementById("r_password");

function login() {
  if (loginId.value == "" || loginPw.value == "") {
    alert("Please check your email or password");
  } else {
    location.href = "appointment.html";
  }
}

function color() {
  if (
    loginId.value.length > 0 &&
    loginId.value.indexOf("@") !== -1 &&
    loginPw.value.length >= 5
  ) {
    loginBtn.style.backgroundColor = "#0095F6";
    loginBtn.disabled = false;
  } else {
    loginBtn.style.backgroundColor = "#C0DFFD";
    loginBtn.disabled = true;
  }
}

function back() {
  history.go(-1);
}

function create_id() {
  if (loginId.value == "" || loginPw.value == "" || loginrPw.value == "") {
    alert("Please check your email or password");
  } else {
    if (loginPw.value !== login_rPw.value) {
      alert("Please check your password");
    } else {
      location.href = "appointment.html";
    }
  }
}

loginId.addEventListener("keyup", color);
loginPw.addEventListener("keyup", color);
loginBtn.addEventListener("click", moveToMain);
loginBtn.addEventListener("change", color);
