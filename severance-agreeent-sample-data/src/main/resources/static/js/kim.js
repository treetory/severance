/**
 * @author treetory@gmail.com
 *
 * 세브란스 연세의료원에서 테스트 할 수 있도록 테스트 파일럿 형태로 구성함
 */
import { getData } from "./test.js";
import { renewTokenIntoURL } from "./token.js";

/**
 *  업로드 파일 선택 폼
 */
let singleUploadForm = document.querySelector('#singleUploadForm');
singleUploadForm.addEventListener('submit', function(event){
    let files = singleFileUploadInput.files;
    if(files.length === 0) {
        singleFileUploadError.innerHTML = "Please select a file";
        singleFileUploadError.style.display = "block";
    }
    uploadSingleFile(files[0]);
    event.preventDefault();
}, true);

let singleFileUploadInput = document.querySelector('#singleFileUploadInput');
let singleFileUploadError = document.querySelector('#singleFileUploadError');
let singleFileUploadSuccess = document.querySelector('#singleFileUploadSuccess');

let consentData = {};       // 전역변수 : 일단 의료원으로부터 수신한 동의서식을 저장한 후, 수정하거나 하면 여기에 반영되도록 했음 -> MVVM 형태로 할 거면 이렇게 쓰지 않는게 좋을 것 같은데... 테스트니까 그냥 함

/**
 * 파일 업로드 기능
 *
 * @param file
 */
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

/**
 * 파일 업로드 기능 수행 후, callback
 *
 * @param response
 */
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

/**
 * 화면 버튼 이벤트 바인딩
 */
const setButtonEvent = function() {
    // 생성 버튼 이벤트 바인딩
    let createButton = window.document.getElementById("create");
    createButton.onclick = create;
    // 전송 버튼 이벤트 바인딩
    let sendButton = window.document.getElementById("send");
    sendButton.onclick = send;
}

/**
 * 전송 버튼 기능
 */
const send = function() {

    if (!window.document.getElementById("pages").hasChildNodes()) {
        alert("전송할 동의서 정보가 아직 렌더링 되지 않았습니다.");
        return;
    }

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
                //console.log(_cur);
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

/**
 * 생성 버튼 기능
 */
const create = function() {

    if (window.document.getElementById("fileName") == null) {
        alert("렌더링할 동의서 정보가 아직 업로드 되지 않았습니다.");
        return;
    } 

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

export { setButtonEvent }