
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
                    location.href = result.page;
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
    // 생성 버튼 이벤트 바인딩
    let createButton = window.document.getElementById("login");
    createButton.onclick = login;
}

export { login, setButtonEvent }