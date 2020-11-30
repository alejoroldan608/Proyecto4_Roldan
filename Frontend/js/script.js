function start() {
    let username = document.getElementById("user");
    let pass = document.getElementById("pass");
    let resp = document.getElementById("resp");

    sessionStorage.clear();

    fetch('http://localhost:3000/usuarios/login', {
        method:'POST',
        body:`{"username":"${username.value}","pass":"${pass.value}"}`,
        headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
                sessionStorage.setItem("jwt", data);
                location.href = "../html/contactos.html";
            });
        } else {
            username.value = "";
            pass.value = "";
            resp.textContent = "Credenciales incorrectas";
        }
    });
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};