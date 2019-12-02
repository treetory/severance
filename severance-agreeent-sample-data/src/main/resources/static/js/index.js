/**
 * @author treetory@gmail.com
 */
const login = function() {

    let uid = document.getElementById("userId");
    let pwd = document.getElementById("password");

    let requestURL = "/login";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                let result = JSON.parse(xhr.responseText);
                console.log(result);
                if (result.hasOwnProperty("token")) {
                    localStorage.setItem("token", result.token);
                    location.href = result.page+"?token="+((result.token).split(" "))[1];
                } else {
                    alert(result);
                    localStorage.clear();
                }

            }
        };
    };
    xhr.onprogress = function(e) { /*console.log(e);*/ };
    xhr.onabort = function(e) { /*console.log(e);*/	};
    xhr.ontimeout = function(e) { /*console.log(e);*/ };
    xhr.open('POST', requestURL, true);
    xhr.setRequestHeader('Accept', "application/json;charset=UTF-8");
    xhr.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ "userId" : uid.value, "password" : pwd.value  }));

}

const setButtonEvent = function() {
    // 로그인 버튼 이벤트 바인딩
    let loginButton = window.document.getElementById("login");
    loginButton.onclick = login;

    let password = window.document.getElementById("password");
    password.onkeydown = function(e) {
        if (e.code == "Enter") {
            loginButton.click();
        }
    };

}

export { login, setButtonEvent }