/**
 * @author treetory@gmail.com
 */
'use strict';

let singleUploadForm = document.querySelector('#singleUploadForm');
let singleFileUploadInput = document.querySelector('#singleFileUploadInput');
let singleFileUploadError = document.querySelector('#singleFileUploadError');
let singleFileUploadSuccess = document.querySelector('#singleFileUploadSuccess');

function uploadSingleFile(file) {
    let formData = new FormData();
    formData.append("file", file);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadFile");

    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText);
        if(xhr.status == 200) {
            localStorage.removeItem("token");
            localStorage.setItem("token", xhr.getResponseHeader("Authorization"));
            singleFileUploadError.style.display = "none";
            let _html = "<ul>";
            response.forEach(r => {
                if ((r.fileName).indexOf(".json") > -1) {
                    _html += "<li>";
                    _html += r.fileName;
                    _html += "</li>";
                }
            });
            _html += "</ul>";
            singleFileUploadSuccess.innerHTML = _html;
            singleFileUploadSuccess.style.display = "block";
        } else {
            singleFileUploadSuccess.style.display = "none";
            singleFileUploadError.innerHTML = (response && response.message) || "Some Error Occurred";
        }
    };

    xhr.setRequestHeader('Authorization', /*"Bearer "+*/localStorage.getItem("token"));
    xhr.send(formData);
}

singleUploadForm.addEventListener('submit', function(event){
    let files = singleFileUploadInput.files;
    if(files.length === 0) {
        singleFileUploadError.innerHTML = "Please select a file";
        singleFileUploadError.style.display = "block";
    }
    uploadSingleFile(files[0]);
    event.preventDefault();
}, true);
