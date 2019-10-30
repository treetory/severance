'use strict';

let SIGNPAD = (function() {

    let tagType;
    let id;
    let width;
    let height;
    let src;
    let parent;
    let self;

    function SIGNPAD(htmlElement, parent) {
        this.tagType = htmlElement.tagType;
        this.id = htmlElement.ControlCd;
        this.width = htmlElement.Width;
        this.height = htmlElement.Height;
        this.src = htmlElement.src;
        this.parent = parent;
        this.self = init(this);
        this.parent.appendChild(this.self);
    }

    let init = function(_signPad) {
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

        let canvas = document.createElement(_signPad.tagType);
        canvas.id = _signPad.id;
        canvas.width = _signPad.width;
        canvas.height = _signPad.height;

        // Set up mouse events for drawing
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

        let img = new Image();
        if (canvas.getContext) {
            img.src = _signPad.src;
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
    }

    // Get the position of the mouse relative to the canvas
    let getMousePos = function(canvasDom, mouseEvent) {
        let rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    };

    // Get the position of a touch relative to the canvas
    let getTouchPos = function (canvasDom, touchEvent) {
        let rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    // Draw to the canvas
    let renderCanvas = function (ctx, drawing, lastPos, mousePos) {
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