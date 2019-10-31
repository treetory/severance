import { SIGNPAD } from "./signpad.js";
'use strict';

/**
 * 라벨 tag 를 담고 있는 영역을 만든다.
 */
const createLabel = (function(){

    let main = function(e) {

        // row 영역
        let horizontal_div = document.createElement("div");
        horizontal_div.style.display = "table-row";
        horizontal_div.style.width = "100%";
        horizontal_div.style.height = "100%";
        
        // cell 영역
        let cell_div = document.createElement("div");
        cell_div.id = "DIV_"+e.id;
        cell_div.style.display = e.style.display;
        cell_div.style.height = e.style.height;
        cell_div.style.padding = "10px 10px 10px 10px";
        
        // cell 안에 실제 보여줄 아이템
        // TODO 실제 라벨에 해당되는 element 가 만들어지는 부분 -> 컴포넌트 화 시킬 필요 있음
        let label = document.createElement("label");
        label.id = e.id;
        label.innerText = e.innerText;

        cell_div.appendChild(label);

        horizontal_div.appendChild(cell_div);

        return horizontal_div;
    };
    return main;

})();

/**
 * input text 를 담고 있는 영역을 만든다.
 */
const createTextBox = (function(){

    let main = function(e) {

        // row 영역
        let horizontal_div = document.createElement("div");
        horizontal_div.style.display = "table-row";
        horizontal_div.style.width = "100%";
        horizontal_div.style.height = "100%";
        
        // cell 영역
        let cell_div = document.createElement("div");
        cell_div.id = "DIV_"+e.id;
        cell_div.style.display = e.style.display;
        cell_div.style.height = e.style.height;
        cell_div.style.padding = "10px 10px 10px 10px";
        
        // cell 내부 좌측 label 영역
        let left_div = document.createElement("div");
        left_div.style.display = "table-cell";
        left_div.style.width = "180px";
        left_div.style.padding = "10px 10px 10px 10px";

        let label = document.createElement("label");
        label.innerText = e.innerText;
        label.style.height = "20px";

        left_div.appendChild(label);

        // cell 내부 우측 input 영역
        let right_div = document.createElement("div");
        right_div.style.display = "table-cell";
        right_div.style.padding = "10px 10px 10px 10px";

        // TODO 실제 TextBox에 해당되는 element 가 만들어지는 부분 -> 컴포넌트 화 시킬 필요 있음
        let input = document.createElement("input");
        input.type = e.type;
        input.id = e.id;
        input.class = e.class;
        input.value = e.value;
        input.style.height = "20px";
        input.style.border = "solid 1px";
        input.style.borderColor = "#319BE7";

        right_div.appendChild(input);

        cell_div.appendChild(left_div);
        cell_div.appendChild(right_div);

        horizontal_div.appendChild(cell_div);

        return horizontal_div;
    };
    return main;

})();

/**
 * input datetime 을 담고 있는 영역을 만든다.
 */
const createDateTimePicker = (function(){

    let main = function(e) {

        // row 영역
        let horizontal_div = document.createElement("div");
        horizontal_div.style.display = "table-row";
        horizontal_div.style.width = "100%";
        horizontal_div.style.height = "100%";
        
        // cell 영역
        let cell_div = document.createElement("div");
        cell_div.id = "DIV_"+e.id;
        cell_div.style.display = e.style.display;
        cell_div.style.height = e.style.height;
        cell_div.style.padding = "10px 10px 10px 10px";
        
        // cell 내부 좌측 label 영역
        let left_div = document.createElement("div");
        left_div.style.display = "table-cell";
        left_div.style.width = "180px";
        left_div.style.padding = "10px 10px 10px 10px";

        let label = document.createElement("label");
        label.innerText = e.innerText;
        label.style.height = "20px";
        
        left_div.appendChild(label);

        // cell 내부 우측 input 영역
        let right_div = document.createElement("div");
        right_div.style.display = "table-cell";
        right_div.style.padding = "10px 10px 10px 10px";

        // TODO 실제 datetime에 해당되는 element 가 만들어지는 부분 -> 컴포넌트 화 시킬 필요 있음 (이건 현재 컴포넌트 동작도 안되므로 필수임)
        let input = document.createElement("input");
        input.type = e.type;
        input.id = e.id;
        input.class = e.class;
        input.value = e.value;
        input.style.height = "20px";
        input.style.border = "solid 1px";
        input.style.borderColor = "#319BE7";

        right_div.appendChild(input);

        cell_div.appendChild(left_div);
        cell_div.appendChild(right_div);

        horizontal_div.appendChild(cell_div);

        return horizontal_div;
    };
    return main;

})();

/**
 * input date 을 담고 있는 영역을 만든다.
 */
const createDatePicker = (function(){

    let main = function(e) {

        // row 영역
        let horizontal_div = document.createElement("div");
        horizontal_div.style.display = "table-row";
        horizontal_div.style.width = "100%";
        horizontal_div.style.height = "100%";
        
        // cell 영역
        let cell_div = document.createElement("div");
        cell_div.id = "DIV_"+e.id;
        cell_div.style.display = e.style.display;
        cell_div.style.height = e.style.height;
        cell_div.style.padding = "10px 10px 10px 10px";
        
        // cell 내부 좌측 label 영역
        let left_div = document.createElement("div");
        left_div.style.display = "table-cell";
        left_div.style.width = "180px";
        left_div.style.padding = "10px 10px 10px 10px";

        let label = document.createElement("label");
        label.innerText = e.innerText;
        label.style.height = "20px";

        left_div.appendChild(label);

        // cell 내부 우측 input 영역
        let right_div = document.createElement("div");
        right_div.style.display = "table-cell";
        right_div.style.padding = "10px 10px 10px 10px";

        // TODO 실제 date에 해당되는 element 가 만들어지는 부분 -> 컴포넌트 화 시킬 필요 있음
        let input = document.createElement("input");
        input.type = e.type;
        input.id = e.id;
        input.class = e.class;
        input.value = e.value;
        input.style.height = "20px";
        input.style.border = "solid 1px";
        input.style.borderColor = "#319BE7";

        right_div.appendChild(input);

        cell_div.appendChild(left_div);
        cell_div.appendChild(right_div);

        horizontal_div.appendChild(cell_div);

        return horizontal_div;
    };
    return main;

})();

/**
 * input date 을 담고 있는 영역을 만든다.
 */
const createPictureBox = (function(){

    let main = function(e) {

        // row 영역
        let horizontal_div = document.createElement("div");
        horizontal_div.style.display = "table-row";
        horizontal_div.style.width = "100%";
        horizontal_div.style.height = "100%";
        
        // cell 영역
        let cell_div = document.createElement("div");
        cell_div.id = "DIV_"+e.id;
        cell_div.style.display = e.style.display;
        cell_div.style.height = e.style.height;
        cell_div.style.padding = "10px 10px 10px 10px";
        
        // cell 내부 위측 label 영역
        let upper_div = document.createElement("div");
        upper_div.style.display = "block";
        upper_div.style.padding = "10px 10px 10px 10px";

        let label = document.createElement("label");
        label.innerText = e.innerText;
        label.style.height = "20px";

        upper_div.appendChild(label);

        // cell 내부 아래측 img 영역
        let down_div = document.createElement("div");
        //down_div.style.display = "table-cell";
        down_div.style.padding = "10px 10px 10px 10px";

        down_div.style.display = "inline-block";

        let left_div = document.createElement("div");
        left_div.style.width = "180px";
        left_div.style.padding = "10px 10px 10px 10px";
        left_div.style.display = "inline-block";

        let right_div = document.createElement("div");
        right_div.style.display = "inline-block";
        //right_div.style.padding = "10px 10px 10px 10px";
        right_div.style.width = (e.style.width+20)+"px";
        right_div.style.height = (e.style.height+20)+"px";

        // TODO 실제 img에 해당되는 element 가 만들어지는 부분 -> 컴포넌트 화 시킬 필요 있음
        let img = document.createElement("img");
        img.id = e.id;
        img.class = e.class;
        img.style.border = "solid 1px";
        img.style.borderColor = "#319BE7";
        img.src = 
        (e.src == null ? 
            "data:image/jpeg;base64,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"
            : e.src);

        right_div.appendChild(img);

        down_div.appendChild(left_div);
        down_div.appendChild(right_div);
        
        cell_div.appendChild(upper_div);
        cell_div.appendChild(down_div);

        horizontal_div.appendChild(cell_div);

        return horizontal_div;
    };
    return main;

})();

/**
 * 서명패드 를 담고 있는 영역을 만든다.
 */
const createSoapBox = (function(){

    let main = function(e) {

        // row 영역
        let horizontal_div = document.createElement("div");
        horizontal_div.style.display = "table-row";
        horizontal_div.style.width = "100%";
        horizontal_div.style.height = "100%";
        
        // cell 영역
        let cell_div = document.createElement("div");
        cell_div.id = "DIV_"+e.id;
        cell_div.style.display = "100%";
        cell_div.style.height = "100%";
        cell_div.style.padding = "10px 10px 10px 10px";
        
        // cell 내부 위측 label 영역
        let upper_div = document.createElement("div");
        upper_div.style.display = "block";
        upper_div.style.padding = "10px 10px 10px 10px";

        let label = document.createElement("label");
        label.innerText = e.label;
        label.style.height = "20px";

        upper_div.appendChild(label);

        // cell 내부 아래측 canvas 영역
        let down_div = document.createElement("div");
        down_div.style.display = "inline-block";

        let left_div = document.createElement("div");
        left_div.style.width = "180px";
        left_div.style.padding = "10px 10px 10px 10px";
        left_div.style.display = "inline-block";

        let right_div = document.createElement("div");
        right_div.style.display = "inline-block";
        right_div.style.padding = "10px 10px 10px 10px";
        right_div.style.width = (e.style.width+20)+"px";
        right_div.style.height = (e.style.height+20)+"px";

        // TODO 실제 서명패드 해당되는 element 가 만들어지는 부분 -> 컴포넌트 화 시킬 필요 있음
        let canvas = new SIGNPAD(e, right_div);
        //console.log(canvas);

        down_div.appendChild(left_div);
        down_div.appendChild(right_div);

        cell_div.appendChild(upper_div);
        cell_div.appendChild(down_div);

        horizontal_div.appendChild(cell_div);

        return horizontal_div;
    };
    return main;

})();

/**
 * CheckBox 를 담고 있는 영역을 만든다.
 */
const createCheckBox = (function(){

    let main = function(e) {
        
        // row 영역
        let horizontal_div = document.createElement("div");
        horizontal_div.style.display = "inline-block";
        horizontal_div.style.width = "100%";
        horizontal_div.style.height = "100%";
        
        // cell 영역
        let cell_div = document.createElement("div");
        cell_div.id = "DIV_"+e.id;
        cell_div.style.height = e.style.height;
        cell_div.style.padding = "10px 10px 10px 10px";
        /*
        // cell 내부 좌측 label 영역
        let left_div = document.createElement("div");
        left_div.style.display = "inline-block";
        left_div.style.width = "180px";
        left_div.style.padding = "10px 10px 10px 10px";

        // cell 내부 우측 input 영역
        let right_div = document.createElement("div");
        right_div.style.display = "inline-block";
        right_div.style.padding = "10px 10px 10px 10px";
        right_div.style.width = "75%";
        */
        // TODO 실제 CheckBox 해당되는 element 가 만들어지는 부분 -> 컴포넌트 화 시킬 필요 있음
        e.options.forEach(o => {
            
            let row_div = document.createElement("div");
            row_div.style.display = "inline-block";
            row_div.style.padding = "10px 10px 10px 10px";

            let input = document.createElement("input");
            input.type = e.type;
            input.id = e.id;
            input.name = e.id;
            input.value = o.Rank;

            row_div.appendChild(input);   
            
            let label = document.createElement("label");
            label.innerText = o.MrContNm;
            label.style.height = "20px";
            label.style.paddingRight = "10px";

            row_div.appendChild(label);

            cell_div.appendChild(row_div);   
        });
        
        //cell_div.appendChild(left_div);
        //cell_div.appendChild(right_div);

        horizontal_div.appendChild(cell_div);

        return horizontal_div;
    }
    return main;

})();

/**
 * Radio 를 담고 있는 영역을 만든다.
 */
const createRadio = (function(){

    let main = function(e) {
        
        // row 영역
        let horizontal_div = document.createElement("div");
        horizontal_div.style.display = "inline-block";
        horizontal_div.style.width = "100%";
        horizontal_div.style.height = "100%";
        
        // cell 영역
        let cell_div = document.createElement("div");
        cell_div.id = "DIV_"+e.id;
        cell_div.style.height = e.style.height;
        cell_div.style.padding = "10px 10px 10px 10px";
        
        // cell 내부 좌측 label 영역
        let left_div = document.createElement("div");
        left_div.style.display = "inline-block";
        left_div.style.width = "180px";
        left_div.style.padding = "10px 10px 10px 10px";

        // cell 내부 우측 input 영역
        let right_div = document.createElement("div");
        right_div.style.display = "inline-block";
        right_div.style.padding = "10px 10px 10px 10px";
        right_div.style.width = "75%";

        // TODO 실제 Radio 에 해당되는 element 가 만들어지는 부분 -> 컴포넌트 화 시킬 필요 있음
        e.options.forEach(o => {
            let input = document.createElement("input");
            input.type = e.type;
            input.id = e.id;
            input.name = e.id;
            input.value = o.Rank;

            right_div.appendChild(input);   
            
            let label = document.createElement("label");
            label.innerText = o.MrContNm;
            label.style.height = "20px";
            label.style.paddingRight = "10px";

            right_div.appendChild(label);   
        });
        
        cell_div.appendChild(left_div);
        cell_div.appendChild(right_div);

        horizontal_div.appendChild(cell_div);

        return horizontal_div;
    }
    return main;

})();

export { 
    createLabel, 
    createTextBox, 
    createDateTimePicker, 
    createDatePicker, 
    createPictureBox ,
    createSoapBox,
    createCheckBox,
    createRadio
};