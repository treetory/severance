/**
 * @author treetory@gmail.com
 */
'use strict';

const SIGNPAD = (function() {

    const SIGNPAD = (function(){
        let construct = function (e, div) {
            this.self = init(e);
            this.parent = div;
            this.parent.appendChild(this.self);
        }
        return construct;
    })();

    const init = (function(){
        let main = function(e) {
            window.requestAnimFrame = (function (callback) {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimaitonFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000/60);
                    };
            })();
            
            let canvas = document.createElement("canvas");
            canvas.id = e.id;
            // width, height 는 number 타입이어야만 함
            canvas.width = e.style.width;
            canvas.height = e.style.height;
            //canvas.style.border = "solid 1px";
            canvas.style.borderStyle = "outset";
            canvas.style.borderColor = "#319BE7";
            canvas.style.borderSpacing = "inherit";
            canvas.style.borderWidth = "7px";

            let drawing = false;
            let mousePos = { x:0, y:0 };
            let lastPos = mousePos;
            let ctx = canvas.getContext("2d");

            canvas.addEventListener("mousedown", function (e) {
                drawing = true;
                lastPos = getMousePos(canvas, e);
            }, false);
            canvas.addEventListener("mouseup", function (e) {
                drawing = false;
            }, false);
            canvas.addEventListener("mousemove", function (e) {
                mousePos = getMousePos(canvas, e);
            }, false);

            // Set up touch events for mobile, etc
            canvas.addEventListener("touchstart", function (e) {
                mousePos = getTouchPos(canvas, e);
                let touch = e.touches[0];
                let mouseEvent = new MouseEvent("mousedown", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(mouseEvent);
            }, false);
            canvas.addEventListener("touchend", function (e) {
                let mouseEvent = new MouseEvent("mouseup", {});
                canvas.dispatchEvent(mouseEvent);
            }, false);
            canvas.addEventListener("touchmove", function (e) {
                // Prevent scroll event when start touchmove.
                e.preventDefault();
                let touch = e.touches[0];
                let mouseEvent = new MouseEvent("mousemove", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(mouseEvent);
            }, false);

            // 이미지 데이터 값 있으면 canvas에 올린다.
            let img = new Image();
            if (canvas.getContext) {
                img.src = (e.src == null ? 
                    "data:image/png;base64,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"
                      : e.src);
                img.addEventListener("load", function(event){
                    ctx.drawImage(img, 0, 0);
                }, {passive:false});
            };

            // Allow for animation
            (function drawLoop () {
                requestAnimFrame(drawLoop);
                let result = renderCanvas(ctx, drawing, lastPos, mousePos);
                lastPos = result.lastPos;
                mousePos = result.mousePos;
            })();

            return canvas;
        };
        return main;
    })();

    const setCanvas = function(e) {
        
    }

    // Get the position of the mouse relative to the canvas
    const getMousePos = function(canvasDom, mouseEvent) {
        let rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    };

    // Get the position of a touch relative to the canvas
    const getTouchPos = function (canvasDom, touchEvent) {
        let rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    // Draw to the canvas
    const renderCanvas = function (ctx, drawing, lastPos, mousePos) {
        if (drawing) {
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
        }
        return { lastPos: lastPos, mousePos : mousePos };
    }

    function clearCanvas(canvas) {
        canvas.width = canvas.width;
        if (window.MyJavascriptInterface != null) {
            window.MyJavascriptInterface.showClearMessage("캔버스 초기화");
        } else {
            console.log("캔버스 초기화");
        }
    }

    SIGNPAD.prototype.getAppendedResult = function() {
        return this.parent;
    }

    return SIGNPAD;

}());

export { SIGNPAD };