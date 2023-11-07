const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

var emailfield = document.getElementById("email-field");
var emailerror = document.getElementById("email-error");
var passerror = document.getElementById("password-error");
var emaillabel = document.getElementById("email-label");
var passwordlabel = document.getElementById("password-label");

function validateEmail() {
    emaillabel.style.bottom = "45px";
    if (!emailfield.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailerror.innerHTML = "Email is not valid";
        emailfield.style.borderBottomColor = "red";
        return false;
    }
    emailerror.innerHTML = "";
    emailfield.style.borderBottomColor = "green";
    return true;
}

function verifyPassword() {
    var passfield = document.getElementById("password-field").value;
    passwordlabel.style.bottom = "45px";
    if (passfield.length < 6) {
        document.getElementById("password-error").innerHTML = "Enter at least 6 letters";
        return false;
    }
    passerror.innerHTML = "";
    return true;
}

function validateAll() {
    if (validateEmail() == true && verifyPassword() == true) {
        var username = "User123";
        sessionStorage.setItem("username", username);

        // Redirect to the index.html page
        location.href = "index.html";
    }
}

function myFunction() {
    alert("Account Created successfully");
}

function contact() {
    location.replace("signinup.html");
}

function goback() {
    location.replace("index.html");
}

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
