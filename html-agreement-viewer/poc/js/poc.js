import { getData } from "./test.js";
import { data1, data2, data3 } from "./sample.js";

const create = function() {

    let e = document.getElementById("fileName");
    let fileName = e.options[e.selectedIndex].value;

    // CORS 때문에 동일한 웹서버에 위치한 경로로 호출해야 한다.
    let requestURL = "/sample/data/"+fileName;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) { 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);
                //console.log(typeof result);
                switch (typeof result) {
                    case "string":  alert(result);                              break;
                    case "object":  getData(result);                            break;
                    default:        alert("알 수 없는 유형의 데이터입니다.");      break;
                }
            } else {  
                let _items = [];
                switch (fileName) {
                    case "data1" :  
                        _items = data1.Regions[0].VisualTree.Items;
                        break;
                    case "data2" :  
                        _items = data2.Regions[0].VisualTree.Items;
                        break;
                    case "data3" :  
                        _items = data3.Regions[0].VisualTree.Items;
                        break;
                };
                if (_items.length > 0) {
                    getData(_items);
                } else {
                    let flag = confirm("페이지 refresh를 위해 다시 실행할까요?");
                    if (flag) {
                        location.reload();
                    } else {
                        alert("ㅜㅜ 그럼 여기 블로그 가서 추천 좀...");
                        location.href = "https://blog.naver.com/kbearp";
                    }
                };
            }
        };        
    };
    xhr.onprogress = function(e) { /*console.log(e);*/ };
    xhr.onabort = function(e) { /*console.log(e);*/	};
    xhr.ontimeout = function(e) { /*console.log(e);*/ };
    xhr.open('GET', requestURL, true);
    xhr.setRequestHeader('Accept', "application/json;charset=UTF-8");
    xhr.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
    xhr.send();
}

const setButtonEvent = function() {
    // 생성 버튼 이벤트 바인딩
    let createButton = window.document.getElementById("create");
    createButton.onclick = create;
}

const setConsentFormList = function() {
    // CORS 때문에 동일한 웹서버에 위치한 경로로 호출해야 한다.
    let requestURL = "/sample/list";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) { 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);
                //console.log(typeof result);
                if (result.length > 0) {
                    setConsentFormListToSelectBox(result);
                }
            } else {
                setConsentFormListToSelectBox(
                  [
                    {"FrmCd" : "data1", "FrmDescription" : "MRI비급여 동의서 양식"}, 
                    {"FrmCd" : "data2", "FrmDescription" : "마취 동의서 양식"},
                    {"FrmCd" : "data3", "FrmDescription" : "Yoo-AllItems"}
                  ]
                );
            }
        };        
    };
    xhr.onprogress = function(e) { /*console.log(e);*/ };
    xhr.onabort = function(e) { /*console.log(e);*/	};
    xhr.ontimeout = function(e) { /*console.log(e);*/ };
    xhr.open('GET', requestURL, true);
    xhr.setRequestHeader('Accept', "application/json;charset=UTF-8");
    xhr.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
    xhr.send();
}

const setConsentFormListToSelectBox = (function(){
    let _execute = function(array) {
        let _selectBox = document.getElementById("fileName");
        array.forEach(element => {
            let _option = document.createElement("option");
            _option.id = element.FrmCd;
            _option.value = element.FrmCd;
            _option.innerHTML = element.FrmDescription;
            _selectBox.appendChild(_option);
        });
    };
    return _execute;
})();

export { create, setButtonEvent, setConsentFormList }