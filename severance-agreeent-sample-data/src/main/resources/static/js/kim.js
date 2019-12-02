/**
 * @author treetory@gmail.com
 */
import { getData } from "./test.js";
import { renewTokenIntoURL } from "./token.js";

let singleUploadForm = document.querySelector('#singleUploadForm');
let singleFileUploadInput = document.querySelector('#singleFileUploadInput');
let singleFileUploadError = document.querySelector('#singleFileUploadError');
let singleFileUploadSuccess = document.querySelector('#singleFileUploadSuccess');

let consentData = {};

const uploadSingleFile = function(file) {

    document.getElementById("pages").innerHTML = "";

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
    singleFileUploadInput.value = null;

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
    // 전송 버튼 이벤트 바인딩
    let sendButton = window.document.getElementById("send");
    sendButton.onclick = send;
}

const send = function() {
    let _data = consentData.Regions[0].VisualTree.Items;
    let _keys = Object.keys(_data);
    _keys.forEach(_key => {
        let _cur = _data[_key];
        let _mrItemType = _cur["MRItemType"];
        switch(_mrItemType) {
            case "MRTextBox":
                _cur["TextValue"] = document.getElementById(_cur["MRItemKey"]).value;
                break;
            case "MRLabel":
                break;
            default:
                console.log(_cur);
                break;
        }
    });

    //console.log(consentData);

    let requestURL = "/updateJSON";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                renewTokenIntoURL((xhr.getResponseHeader("Authorization")).split(" ")[1]);
                let result = JSON.parse(xhr.responseText);
                //console.log(result);
                let _flag = confirm(result);
                if (_flag) {
                    window.document.getElementById("pages").innerHTML = "";
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
    xhr.open('POST', requestURL, true);
    xhr.setRequestHeader('Accept', "application/json;charset=UTF-8");
    xhr.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
    xhr.setRequestHeader('Authorization', /*"Bearer "+*/localStorage.getItem("token"));
    xhr.send(JSON.stringify(consentData));

}

const create = function() {

    let e = document.getElementById("fileName");
    let fileName = e.innerHTML;

    if (singleFileUploadSuccess.hasChildNodes()) {
        singleFileUploadSuccess.innerHTML = "";
    }

    // CORS 때문에 동일한 웹서버에 위치한 경로로 호출해야 한다.
    let requestURL = "/sample/data/"+fileName;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                renewTokenIntoURL((xhr.getResponseHeader("Authorization")).split(" ")[1]);
                let result = JSON.parse(xhr.responseText);
                // 얕은 복사로 처리가 안됨 -> 깊은 복사를 하기 위해 그냥 한번 더 parse 했음
                consentData = JSON.parse(xhr.responseText);
                switch (typeof result) {
                    case "string":  alert(result);                                break;
                    //case "object":  getData(result);                            break;
                    case "object":  getData(result.Regions[0].VisualTree.Items);  break;
                    default:        alert("알 수 없는 유형의 데이터입니다.");       break;
                }
                console.log(consentData);
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