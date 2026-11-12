function showBox(boxName) {
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("homeBox").style.display = "none";

    if (boxName === "register") document.getElementById("registerBox").style.display = "block";
    if (boxName === "login") document.getElementById("loginBox").style.display = "block";
    if (boxName === "home") document.getElementById("homeBox").style.display = "block";
}

function validateRegister(e) {
    e.preventDefault();
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let pass = document.getElementById("regPass").value;

    let isValid = true;

    // Reset errors
    document.getElementById("regNameErr").innerText = "";
    document.getElementById("regEmailErr").innerText = "";
    document.getElementById("regPassErr").innerText = "";

    if (name === "") {
        document.getElementById("regNameErr").innerText = "Name is required";
        isValid = false;
    }

    if (email === "" || !email.includes("@") || !email.includes(".")) {
        document.getElementById("regEmailErr").innerText = "Enter a valid email address";
        isValid = false;
    }

    if (pass.length < 6) {
        document.getElementById("regPassErr").innerText = "Password must be at least 6 characters";
        isValid = false;
    }

    if (isValid) {
        alert("Registration validated successfully! Redirecting to login...");
        showBox("login");
    }
}

function validateLogin(e) {
    e.preventDefault();
    let email = document.getElementById("loginEmail").value.trim();
    let pass = document.getElementById("loginPass").value;

    let isValid = true;

    document.getElementById("loginEmailErr").innerText = "";
    document.getElementById("loginPassErr").innerText = "";

    if (email === "") {
        document.getElementById("loginEmailErr").innerText = "Email is required";
        isValid = false;
    }

    if (pass === "") {
        document.getElementById("loginPassErr").innerText = "Password is required";
        isValid = false;
    }

    if (isValid) {
        alert("Login details are valid! Welcome.");
        showBox("home");
    }
}

/*
================================================================================
HOW TO RUN EXPERIMENT 3 IN VS CODE:
1. In VS Code, right-click "index.html" -> "Open with Live Server" (or double-click).
2. Test submitting empty fields or invalid emails to see validation errors.
3. On valid submit, it navigates from Register -> Login -> Welcome page!
================================================================================
*/
