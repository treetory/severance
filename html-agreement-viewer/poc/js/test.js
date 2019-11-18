import { 
  createLabel, 
  createTextBox, 
  createDateTimePicker, 
  createDatePicker, 
  createPictureBox, 
  createSoapBox,
  createCheckBox,
  createRadio,
  createAttrNameBox
} from "./element.js";
//'use strict';

/**
 * 정렬되지 않은 items 를 받았으므로 선 정렬처리를 하기 위한 함수
 * @param {*} items 
 */
const sort = function(items) {
  // Rank 기준 정렬
  items.sort(function(a, b) {
    if (a.Rank > b.Rank) {
      return 1;
    }
    if (a.Rank < b.Rank) {
      return -1;
    }
    return 0;
  });
  // 수평 정렬
  items.sort(function(a, b) {
    if (a.Position_X > b.Position_X) {
      return 1;
    }
    if (a.Position_X < b.Position_X) {
      return -1;
    }
    return 0;
  });
  // 수직 정렬
  items.sort(function(a, b) {
    if (a.Position_Y > b.Position_Y) {
      return 1;
    }
    if (a.Position_Y < b.Position_Y) {
      return -1;
    }
    return 0;
  });
  return items;
};

/**
 * 결과 찍어보기 위함
 * @param {*} items     : console 로 풀어서 찍어보고 싶은 array
 * @param {*} attrKey   : items 의 각 row object 에서 출력하여 확인하고 싶은 attribute 의 속성 key 값, 지정된 속성만 콘솔에 찍어본다.
 */
const printResult = function(items, attrKey) {
  items.forEach(element => {
    if (attrKey == undefined || attrKey == null || attrKey == "") {
      console.log(element);
    } else {
      console.log(element[attrKey]);
    };
  });
};

/**
 * server 로부터 데이터 수령이 된 지점
 * @param {*} obj 
 */
const getData = (function(){
  
  let _prepare = (function(){
    let _execute = function() {
      ////////////////////////////////////////////////////////////////////////////////////
      // node.js 로 테스트 할 땐 이 구역은 주석처리할 것
      while (pages.hasChildNodes()) {
        pages.removeChild(pages.firstChild);
      }
      ////////////////////////////////////////////////////////////////////////////////////
    };
    return _execute;
  })();
  
  let _draw = (function(){
    
    let _execute = function(array) {

      // 밑에서 recursive 하게 돌면서 빨아들이게 하다 보니, 원본 데이터에 문제 발생
      let _items = sort(array);
      let _aggregation = aggregate(_items);
      let _result = createHtmlElement(_aggregation);

      let horizontal_table = document.createElement("div");
      horizontal_table.style.display = "table";
      horizontal_table.style.paddingTop = "5px";
      horizontal_table.style.paddingBottom = "5px";

      let row_div = null;

      _result.forEach(e => {
        
        switch (e.tag) {
          case "label" : 
            row_div = createLabel(e);
            horizontal_table.appendChild(row_div);
            break;
          case "input" : 
            switch (e.type) {
              case "text" : 
                if (e.hasOwnProperty("button")) {
                  row_div = createAttrNameBox(e);
                  horizontal_table.appendChild(row_div);
                } else {
                  row_div = createTextBox(e);
                  horizontal_table.appendChild(row_div);
                }
                break;
              case "datetime" : 
                row_div = createDateTimePicker(e);
                horizontal_table.appendChild(row_div);
                break;
              case "date" : 
                row_div = createDatePicker(e);
                horizontal_table.appendChild(row_div);
                break;
              case "radio" :
                row_div = createRadio(e);
                horizontal_table.appendChild(row_div);
              break;  
              case "checkbox" :
                row_div = createCheckBox(e);
                horizontal_table.appendChild(row_div);
                break;
            }
            break;  
          case "img" :
            row_div = createPictureBox(e);
            horizontal_table.appendChild(row_div);
            break;
          case "canvas" :
              row_div = createSoapBox(e);
              horizontal_table.appendChild(row_div);
            break;
        };

      });

      if (horizontal_table.hasChildNodes()) {
        pages.appendChild(horizontal_table);
      };

    };
    return _execute;

  })();

  let main = function(obj) {
    _prepare();
    _draw(obj);
  };
  return main;
})();

/**
 * 같은 그룹끼리 묶기 위한 함수
 */
const aggregate = (function() {

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // inner method (closure 를 이용하여 해당 scope 은 동일 scope boundary 에서 동작하도록 처리함)
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let _group = (function(){
    
    /**
     * 넘겨 받은 데이터의 Items로 부터 기준이 되는 대상을 생성하는 함수
     * @param {*} cur       : 현재 cursor 가 위치한 객체
     * @param {*} element   : element object format (acc 의 내부 요소가 동일한 key 를 가진 객체로 만들기 위해 사용했음)
     * @param {*} acc       : 같은 그룹끼리 묶어서 생성한 element object 를 누적시켜 쌓아놓을 accumulator array
     */
    let __makeElement = function(cur, element, acc) {
      
      element.FrmKey = cur.hasOwnProperty("FrmKey") == false ? null : cur.FrmKey;
      element.MRItemKey = cur.hasOwnProperty("MRItemKey") == false ? null : cur.MRItemKey;
      element.MRAttributeKey = cur.hasOwnProperty("MRAttributeKey") == false ? null : cur.MRAttributeKey;
      element.MRitCd = cur.hasOwnProperty("MRitCd") == false ? null : cur.MRitCd;
      element.AttrCd = cur.hasOwnProperty("AttrCd") == false ? null : cur.AttrCd;
      element.ControlCd = cur.hasOwnProperty("ControlCd") == false ? null : cur.ControlCd;
      element.LabelCd = cur.hasOwnProperty("LabelCd") == false ? null : cur.LabelCd;
      element.Position_X = cur.hasOwnProperty("Position_X") == false ? null : cur.Position_X;
      element.Position_Y = cur.hasOwnProperty("Position_Y") == false ? null : cur.Position_Y;
      element.MRItemType = cur.hasOwnProperty("MRItemType") == false ? null : cur.MRItemType;
      element.MRItemName = cur.hasOwnProperty("MRItemName") == false ? null : cur.MRItemName;
      element.MrContNm = cur.hasOwnProperty("MrContNm") == false ? null : cur.MrContNm;
      element.TextValue = cur.hasOwnProperty("TextValue") == false ? null : cur.TextValue;
      element.DataValue = cur.hasOwnProperty("DataValue") == false ? null : cur.DataValue;
      element.Rank = cur.hasOwnProperty("Rank") == false ? null : cur.Rank;
      element.InsType = cur.hasOwnProperty("InsType") == false ? null : cur.InsType;
      element.IsRequired = cur.hasOwnProperty("IsRequired") == false ? null : cur.IsRequired;
      element.QcMgtYn = cur.hasOwnProperty("QcMgtYn") == false ? null : cur.QcMgtYn;
      element.Width = cur.hasOwnProperty("Width") == false ? null : cur.Width;
      element.Height = cur.hasOwnProperty("Height") == false ? null : cur.Height;
      element.Image = cur.hasOwnProperty("Image") == false ? null : cur.Image;
      if (cur.hasOwnProperty("RefImages")) {
        if (cur.RefImages.length > 0) {
          element.ResultImage = cur.RefImages[0].ResultImage;
        }
      }
      if (cur.hasOwnProperty("TextInfo")) {
        if (cur.TextInfo != undefined || cur.TextInfo != null) {
          element.Button.ButtonAction = (cur.TextInfo).hasOwnProperty("ButtonAction") == false ? null : cur.TextInfo.ButtonAction;
          element.Button.ButtonName = (cur.TextInfo).hasOwnProperty("ButtonName") == false ? null : cur.TextInfo.ButtonName;
          element.Button.MaxLength = (cur.TextInfo).hasOwnProperty("MaxLength") == false ? null : cur.TextInfo.MaxLength;
          element.Button.MultiLnYn = (cur.TextInfo).hasOwnProperty("MultiLnYn") == false ? null : cur.TextInfo.MultiLnYn;
        }
      }
      
      return element;
    };

    /**
     * Radio, CheckBox 처럼 하위 Options 요소가 필요한 대상을 위해 해당 option object 를 생성하는 함수
     * @param {*} cur       : 현재 cursor 가 위치한 객체
     * @param {*} option    : option objext format
     * @param {*} acc       : 같은 그룹끼리 묶어서 생성한 element object 를 누적시켜 쌓아놓을 accumulator array
     */
    let __makeOption = function(cur, option, acc) {
      option.Position_X = cur.Position_X;
      option.Position_Y = cur.Position_Y;
      option.Rank = cur.Rank;
      option.MRItemName = cur.MRItemName;
      option.MrContNm = cur.MrContNm;
      option.TextValue = cur.TextValue;
      option.DataValue = cur.DataValue;

      return option;
    };

    /**
     * Label 을 묶기 위한 함수 (반응형 처리를 위해 개별 row로 쪼개진 것을 문단단위로 묶음)
     * @param {*} cur       : 현재 cursor 가 위치한 객체
     * @param {*} element   : element object format (acc 의 내부 요소가 동일한 key 를 가진 객체로 만들기 위해 사용했음)
     * @param {*} acc       : 같은 그룹끼리 묶어서 생성한 element object 를 누적시켜 쌓아놓을 accumulator array
     */
    let __aggregateMRLabel = function(cur, element, acc) {

      let last = acc[acc.length-1];
      if (last == undefined) {
        acc.push(__makeElement(cur, element, acc));
      } else {
        //console.log(last.MRItemName);
        if (last.MRItemType == cur.MRItemType) {
          let _pre = (last.MRItemName == null ? "" : last.MRItemName);
          let _cur = (cur.MRItemName == null ? "" : cur.MRItemName);
          acc[acc.length-1].MRItemName = _pre.concat(_cur);
        } else {
          acc.push(__makeElement(cur, element, acc));
        }
      }
      return acc;
    };

    /**
     * MRTextBox 를 위한 model 을 생성하기 위한 함수
     * @param {*} cur       : 현재 cursor 가 위치한 객체
     * @param {*} element   : element object format (acc 의 내부 요소가 동일한 key 를 가진 객체로 만들기 위해 사용했음)
     * @param {*} acc       : 같은 그룹끼리 묶어서 생성한 element object 를 누적시켜 쌓아놓을 accumulator array
     */
    let __getMRTextBox = function(cur, element, acc) {
      acc.push(__makeElement(cur, element, acc));
      return acc;
    };

    /**
     * MRDateTimePicker 를 위한 model 을 생성하기 위한 함수
     * @param {*} cur       : 현재 cursor 가 위치한 객체
     * @param {*} element   : element object format (acc 의 내부 요소가 동일한 key 를 가진 객체로 만들기 위해 사용했음)
     * @param {*} acc       : 같은 그룹끼리 묶어서 생성한 element object 를 누적시켜 쌓아놓을 accumulator array
     */
    let __getMRDateTimePicker = function (cur, element, acc) {
      acc.push(__makeElement(cur, element, acc));
      return acc;
    };

    /**
     * MRDatePicker 를 위한 model 을 생성하기 위한 함수
     * @param {*} cur       : 현재 cursor 가 위치한 객체
     * @param {*} element   : element object format (acc 의 내부 요소가 동일한 key 를 가진 객체로 만들기 위해 사용했음)
     * @param {*} acc       : 같은 그룹끼리 묶어서 생성한 element object 를 누적시켜 쌓아놓을 accumulator array
     */
    let __getMRDatePicker = function (cur, element, acc) {
      acc.push(__makeElement(cur, element, acc));
      return acc;
    };

    /**
     * MRPictureBox 를 위한 model 을 생성하기 위한 함수
     * @param {*} cur       : 현재 cursor 가 위치한 객체
     * @param {*} element   : element object format (acc 의 내부 요소가 동일한 key 를 가진 객체로 만들기 위해 사용했음)
     * @param {*} acc       : 같은 그룹끼리 묶어서 생성한 element object 를 누적시켜 쌓아놓을 accumulator array
     */
    let __getMRPictureBox = function (cur, element, acc) {
      acc.push(__makeElement(cur, element, acc));
      return acc;
    };

    /**
     * MRSoapBox 를 위한 model 을 생성하기 위한 함수
     * @param {*} cur       : 현재 cursor 가 위치한 객체
     * @param {*} element   : element object format (acc 의 내부 요소가 동일한 key 를 가진 객체로 만들기 위해 사용했음)
     * @param {*} acc       : 같은 그룹끼리 묶어서 생성한 element object 를 누적시켜 쌓아놓을 accumulator array
     */
    let __getMRSoapBox = function (cur, element, acc) {
      //console.log(cur);
      acc.push(__makeElement(cur, element, acc));
      return acc;
    };

    /**
     * MRRadio 을 묶기 위한 함수 (하위 속성 아이템이 분리되어 있는 것을 같은 obj 안에 속성 정의로 묶음 -> HTML element 생성을 용이하게 하기 위함)
     * @param {*} cur       : 현재 cursor 가 위치한 객체
     * @param {*} element   : element object format (acc 의 내부 요소가 동일한 key 를 가진 객체로 만들기 위해 사용했음)
     * @param {*} option    : option object format
     * @param {*} acc       : 같은 그룹끼리 묶어서 생성한 element object 를 누적시켜 쌓아놓을 accumulator array
     */
    let __aggregateMRRadio = function (cur, element, option, acc) {
      let last = acc[acc.length-1];
      if (last.MRItemType == cur.MRItemType) {
        acc[acc.length-1].Options.push(__makeOption(cur, option, acc));
      } else {
        let _element = __makeElement(cur, element, acc);
        _element.Options.push(__makeOption(cur, option, acc));
        acc.push(_element);
      }
      return acc;
    };

    /**
     * MRCheck 을 묶기 위한 함수 (하위 속성 아이템이 분리되어 있는 것을 같은 obj 안에 속성 정의로 묶음 -> HTML element 생성을 용이하게 하기 위함)
     * @param {*} cur       : 현재 cursor 가 위치한 객체
     * @param {*} element   : element object format (acc 의 내부 요소가 동일한 key 를 가진 객체로 만들기 위해 사용했음)
     * @param {*} option    : option object format
     * @param {*} acc       : 같은 그룹끼리 묶어서 생성한 element object 를 누적시켜 쌓아놓을 accumulator array
     */
    let __aggregateMRCheck = function (cur, element, option, acc) {
      let last = acc[acc.length-1];
      if (last.MRItemType == cur.MRItemType) {
        acc[acc.length-1].Options.push(__makeOption(cur, option, acc));
      } else {
        let _element = __makeElement(cur, element, acc);
        _element.Options.push(__makeOption(cur, option, acc));
        acc.push(_element);
      }
      return acc;
    };

    let __getMRAttrNameBox = function (cur, element, acc) {
      //console.log(cur);
      acc.push(__makeElement(cur, element, acc));
      return acc;
    }

    /**
     * 현재 closure scope 의 동작을 담당하는 main 함수
     * @param {*} item  : acc 에 객체 모양을 정제하여 넣어야 할 대상 item
     * @param {*} acc   : 정제된 item 을 옮겨 담은 accumulator array
     */
    let main = function(item, acc) {
      /**
       * element 객체 signature 라고 보면 됨, key 속성을 미리 정의해 놓은 것임.
       */
      let element = { 
        "FrmKey" : "",
        "MRItemKey" : "",
        "MRAttributeKey" : "",
        "MRitCd": "",
        "AttrCd": "",
        "ControlCd" : "",
        "LabelCd" : "",
        "Position_X": -1,
        "Position_Y": -1,
        "MRItemType": "",
        "MRItemName": "",
        "MrContNm": "",
        "TextValue": "",
        "DataValue": "",
        "Rank": -1,
        "Events": [],
        "Options" : [],
        "InsType" : "",
        "IsRequired" : false,
        "QcMgtYn" : null,
        "Width" : 0,
        "Image" : null,
        "Button" : {
          "ButtonAction" : null,
          "ButtonName" : null,
          "MaxLength" : -1,
          "MultiLnYn" : null
        }
      };

      /**
       * option 객체 signature 라고 보면 됨, key 속성을 미리 정의해 놓은 것임.
       */
      let option = {
        "Position_X": -1,
        "Position_Y": -1,
        "MRItemName": "",
        "MrContNm": "",
        "Rank": -1,
        "TextValue": "",
        "DataValue": ""
      };

      /**
       * MRItemType 별로 정제하여 acc 에 옮겨 담는 처리를 한다.
       */
      switch (item.MRItemType){
        case "MRLabel"          : acc = __aggregateMRLabel(item, element, acc);           break;
        case "MRTextBox"        : acc = __getMRTextBox(item, element, acc);               break;
        case "MRRadioBox"       : acc = __aggregateMRRadio(item, element, option, acc);   break;
        case "MRCheckBox"       : acc = __aggregateMRCheck(item, element, option, acc);   break;
        case "MRDateTimePicker" : acc = __getMRDateTimePicker(item, element, acc);        break;
        case "MRDatePicker"     : acc = __getMRDatePicker(item, element, acc);            break;
        case "MRPictureBox"     : acc = __getMRPictureBox(item, element, acc);            break;
        case "MRSoapBox"        : acc = __getMRSoapBox(item, element, acc);               break;
        case "MRAttrNameBox"    : acc = __getMRAttrNameBox(item, element, acc);           break;
        default:
          console.log({ "InsType" : item.InsType, "MRItemType" : item.MRItemType});
          break;
      };

      return acc;
    };
    return main;
  
  })();
  
  /**
   * 현재 closure scope 의 동작을 담당하는 main 함수
   * @param {*} items   : 묶어서 옮겨담아야 할 대상 items 정보 -> 의료원에서 넘겨받은 데이터 내부의 Regions[0].VisualTree.Items 항목
   * @param {*} acc     : 정제된 item 을 옮겨 담은 accumulator array
   */
  let main = function(items, acc = []) {

    let _items = items;
    
    if (_items.length == 0) {
      // 전체 아이템을 순회한 후 정제된 acc 를 반환한다.
      /*
      acc.forEach(e => {
        if (e.MRItemType == "MRCheckBox") {
          e.Options.forEach(o => console.log(o));
        }
      });
      */
      return acc;
    } else {
      // items 에서 하나씩 빼와서 그룹화해서 acc 에 옮겨 담을 수 있게 처리한다.
      let _item = _items[0];
      _items.shift();
      return main(_items, _group(_item, acc));
    };
  };
  return main;
    
})();

/**
 * aggregate 과정을 통해 정제된 것을 대상으로 HtmlElement 생성
 */
const createHtmlElement = (function(){

  /**
   * 유형별로 tag 만들기 위한 객체로 다시 정제한다.
   * @param {*} element 
   */
  let _create = function(element) {

    let _element = {
      "label" : "",
      "style" : {
        "display" : "block",
        "padding" : "10px 10px 10px 10px",
        "width" : "100%",
        "height" : "100%",
        "border" : "0px",
        "paddingLeft" : "0px"
      },
      "class" : "",
      "id" : "",
      "name" : "",
      "innerText" : "",
      "tag" : "",
      "type" : "",
      "src" : "",
      "readonly" : false,
      "disabled" : false,
      "checked" : false,
      "options" : [],
      "button" : {
        "action" : null,
        "name" : null,
        "maxLength" : -1,
        "multiLnYn" : null
      }
    };
    
    switch (element.MRItemType) {
      case "MRLabel" : 
        _element.style.display = "table-cell";
        delete _element.style.width;
        _element.style.height = "100%";
        _element.innerText = element.MRItemName;
        _element.tag = "label";
        _element.id = element.LabelCd;
        //_element.class = element.LabelCd;
        _element.style.paddingLeft = element.Position_X+"px";
        break;
      case "MRTextBox" :
        _element.style.display = "table-cell";
        delete _element.style.width;
        _element.style.height = "100%";
        _element.innerText = element.MRItemName;
        _element.tag = "input";
        _element.type = "text";
        _element.id = element.MRItemKey;
        _element.class = element.MRItemKey;
        _element.style.paddingLeft = element.Position_X+"px";
        _element.value = (element.TextValue == undefined || element.TextValue == null ? "" : element.TextValue);
        break;
      case "MRDateTimePicker" :
        _element.style.display = "table-cell";
        delete _element.style.width;
        _element.style.height = "100%";
        _element.innerText = element.MRItemName;
        _element.tag = "input";
        _element.type = "datetime-local";
        _element.id = element.MRItemKey;
        _element.class = element.MRItemKey;
        _element.style.paddingLeft = element.Position_X+"px";
        _element.value = (element.TextValue == undefined || element.TextValue == null ? "" : element.TextValue);
        break;  
      case "MRDatePicker" :
        _element.style.display = "table-cell";
        delete _element.style.width;
        _element.style.height = "100%";
        _element.innerText = element.MRItemName;
        _element.tag = "input";
        _element.type = "date";
        _element.id = element.MRItemKey;
        _element.class = element.MRItemKey;
        _element.style.paddingLeft = element.Position_X+"px";
        _element.value = (element.TextValue == undefined || element.TextValue == null ? "" : element.TextValue);
        break;
      case "MRPictureBox" :
        _element.style.display = "table-cell";
        //delete _element.style.width;
        _element.style.width = element.Width;
        _element.style.height = "100%";
        _element.innerText = element.MRItemName;
        _element.tag = "img";
        _element.id = element.MRItemKey;
        _element.class = element.MRItemKey;
        _element.style.paddingLeft = element.Position_X+"px";
        // 이미지 어디에 담아서 보내주는지 확인 필요
        _element.src = element.Image;
        break;    
      case "MRSoapBox" :
        _element.label = element.MRItemName;
        _element.style.display = "table-cell";
        _element.style.width = element.Width;
        _element.style.height = element.Height;
        _element.tag = "canvas";
        _element.id = element.ControlCd;
        _element.class = element.MRItemKey;
        _element.style.paddingLeft = element.Position_X+"px";
        // 이미지 어디에 담아서 보내주는지 확인 필요
        _element.src = element.ResultImage;
        break;
      case "MRRadioBox" : 
        _element.style.display = "table-cell";
        delete _element.style.width;
        _element.style.height = "100%";
        _element.innerText = element.MrContNm;
        _element.tag = "input";
        _element.type = "radio";
        _element.id = element.MRItemKey;
        _element.class = element.MRItemKey;
        _element.style.paddingLeft = element.Position_X+"px";
        _element.options = element.Options;
        break;
      case "MRCheckBox" : 
        _element.style.display = "table-cell";
        delete _element.style.width;
        _element.style.height = "100%";
        _element.innerText = element.MrContNm;
        _element.tag = "input";
        _element.type = "checkbox";
        _element.id = element.MRItemKey;
        _element.class = element.MRItemKey;
        _element.style.paddingLeft = element.Position_X+"px";
        _element.options = element.Options;
        break;
      case "MRAttrNameBox" :
        _element.style.display = "table-cell";
        delete _element.style.width;
        _element.style.height = "100%";
        _element.innerText = element.MRItemName;
        _element.tag = "input";
        _element.type = "text";
        _element.id = element.MRItemKey;
        _element.class = element.MRItemKey;
        _element.style.paddingLeft = element.Position_X+"px";
        _element.value = (element.TextValue == undefined || element.TextValue == null ? "" : element.TextValue);
        _element.button.action = element.Button.ButtonAction;
        _element.button.name = element.Button.ButtonName;
        _element.button.maxLength = element.Button.MaxLength;
        _element.button.multiLnYn = element.Button.MultiLnYn;
        break;  
      default:
        _element = null;
        break;
    }

    return _element;
  };

  /**
   * 현재 closure scope 의 동작을 담당하는 main 함수
   * @param {*} elements    : 한번 그룹화하여 정제한 데이터들의 목록
   * @param {*} acc         : 정제된 item 을 옮겨 담은 accumulator array
   */
  let main = function(elements, acc = []) {
      if (elements.length == 0) {
        /*
        acc.forEach(e => {
          console.log(e);
        });
        */
        return acc;
      } else {
        //acc.push(elements[0]);
        // 하나씩 돌면서 다시 정제해서 옮겨 담는다
        let _element = _create(elements[0]);
        if (_element != null) {
          acc.push(_element);
        }
        elements.shift();
        return main(elements, acc);
      }
  }
  
  return main;
})();

export { getData };
//console.log(getData(data1));