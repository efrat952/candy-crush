function register() {
    let playerName = document.getElementById("playerName").value;
    let bornDate = document.getElementById("playerBirthDate").value;
    let mail = document.getElementById("playerMail").value;
    let password = document.getElementById("password").value;
    let record = 0;
    
    if (playerName === "" || bornDate === "" || mail === "" || password === "") {
        alert("נא מלא את כל השדות לפני לחיצה על התחברות.");
        return false;
    }

    let user = {
        playerName: playerName,
        bornDate: bornDate,
        mail: mail,
        password: password,
        record: record
    }
    
    if (sessionStorage.getItem(password) != undefined) {
        alert("משתמש קיים, מתחבר למערכת")
        setTimeout(() => {
            window.location.href = "../pages/levels.html";
        }, 1000); 
    }

    else {
        sessionStorage.setItem(password, JSON.stringify(user));
        localStorage.setItem("currentUser",password );
        
            window.location.href = "../pages/levels.html";
        
    }
}