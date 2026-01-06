function chooseLevel(event) {
    if (event.currentTarget.className == "level1")
        localStorage.setItem("currentLevel", "level1");
    if (event.currentTarget.className == "level2")
        localStorage.setItem("currentLevel", "level2")
    if (event.currentTarget.className == "level3")
        localStorage.setItem("currentLevel", "level3")

    window.location.href = "../pages/candy-crush1.html";
}
