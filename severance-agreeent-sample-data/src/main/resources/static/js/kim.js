/**
 * @author treetory@gmail.com
 */
import { getData } from "./test.js";
import { renewTokenIntoURL } from "./token.js";

let singleUploadForm = document.querySelector('#singleUploadForm');
let singleFileUploadInput = document.querySelector('#singleFileUploadInput');
let singleFileUploadError = document.querySelector('#singleFileUploadError');
let singleFileUploadSuccess = document.querySelector('#singleFileUploadSuccess');

const uploadSingleFile = function(file) {
    let formData = new FormData();
    formData.append("file", file);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadFile");

    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText);
        if(xhr.status == 200) {
            renewTokenIntoURL((xhr.getResponseHeader("Authorization")).split(" ")[1]);
            setUploadSingleFileResult(response);
        } else {
            singleFileUploadSuccess.style.display = "none";
            singleFileUploadError.innerHTML = (response && response.message) || "Some Error Occurred";
        }
    };

    xhr.setRequestHeader('Authorization', /*"Bearer "+*/localStorage.getItem("token"));
    xhr.send(formData);
}

const setUploadSingleFileResult = function(response) {

    console.log(response);

    singleFileUploadError.style.display = "none";
    let _html = "<ul>";
    response.forEach(r => {
        if ((r.fileName).indexOf(".json") > -1) {
            _html += "<li id='fileName'>";
            _html += r.fileName;
            _html += "</li>";
        }
    });
    _html += "</ul>";
    singleFileUploadSuccess.innerHTML = _html;
    singleFileUploadSuccess.style.display = "block";

};

singleUploadForm.addEventListener('submit', function(event){
    let files = singleFileUploadInput.files;
    if(files.length === 0) {
        singleFileUploadError.innerHTML = "Please select a file";
        singleFileUploadError.style.display = "block";
    }
    uploadSingleFile(files[0]);
    event.preventDefault();
}, true);

const setButtonEvent = function() {
    // 생성 버튼 이벤트 바인딩
    let createButton = window.document.getElementById("create");
    createButton.onclick = create;
}

const create = function() {

    let e = document.getElementById("fileName");
    let fileName = e.innerHTML;

    // CORS 때문에 동일한 웹서버에 위치한 경로로 호출해야 한다.
    let requestURL = "/sample/data/"+fileName;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                renewTokenIntoURL((xhr.getResponseHeader("Authorization")).split(" ")[1]);
                let result = JSON.parse(xhr.responseText);
                //console.log(typeof result);
                switch (typeof result) {
                    case "string":  alert(result);                              break;
                    case "object":  getData(result);                            break;
                    default:        alert("알 수 없는 유형의 데이터입니다.");      break;
                }
            } else {
                localStorage.clear();
                location.href = "https://blog.naver.com/kbearp";
            }
        };
    };
    xhr.onprogress = function(e) { /*console.log(e);*/ };
    xhr.onabort = function(e) { /*console.log(e);*/	};
    xhr.ontimeout = function(e) { /*console.log(e);*/ };
    xhr.open('GET', requestURL, true);
    xhr.setRequestHeader('Accept', "application/json;charset=UTF-8");
    xhr.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
    xhr.setRequestHeader('Authorization', /*"Bearer "+*/localStorage.getItem("token"));
    xhr.send();

}

export { create, setButtonEvent }