import deepAssign from 'deep-assign';

function DrawBoard(options){
    this._setttings = deepAssign({},DrawBoard.defaults,options);
    this._init();
}


const pageWidth = 1000;
const pageHeight = 1000;
const pageBackgroundColor = "255,255,255";
const darkerColor = "242,242,242";
const darkestColor = "229,229,229"

DrawBoard.defaults = {
    containerId:null,
    pageWidth,
    pageHeight,
    pageBackgroundColor,
    darkerColor,
    darkestColor
}

DrawBoard.prototype = {
    constructor:DrawBoard,
    _init(){
        let {containerId,pageWidth,pageHeight,
            pageBackgroundColor,darkerColor,darkestColor} = this._setttings;
        this._canvas = $('<canvas />');

        let $canvas = this._canvas;
        $(`#${containerId}`).append($canvas);

        $canvas.attr({width: pageWidth, height: pageHeight});
        var canvas = $canvas[0].getContext("2d");
        canvas.clearRect(0, 0, pageWidth, pageHeight);
        var pagePadding = 20;
        var pageContentWidth = pageWidth - pagePadding * 2;
        var pageContentHeight = pageHeight - pagePadding * 2;
        canvas.fillStyle = "rgb(" + pageBackgroundColor + ")";
        canvas.beginPath();
        canvas.rect(pagePadding, pagePadding, pageContentWidth, pageContentHeight);
        canvas.fill();
        var gridSize = 15;
        if (gridSize < 10) {
            gridSize = 10
        }
        if (true) {
            canvas.translate(pagePadding, pagePadding);
            canvas.lineWidth = 1;
            canvas.save();
            var i = 0.5;
            var gridLineIndex = 0;
            while (i <= pageContentHeight) {
                canvas.restore();
                if (gridLineIndex % 4 == 0) {
                    canvas.strokeStyle = "rgb(" + darkestColor + ")"
                } else {
                    canvas.strokeStyle = "rgb(" + darkerColor + ")"
                }
                canvas.beginPath();
                canvas.moveTo(0, i);
                canvas.lineTo(pageContentWidth, i);
                i += gridSize;
                gridLineIndex++;
                canvas.stroke()
            }
            i = 0.5;
            gridLineIndex = 0;
            while (i <= pageContentWidth) {
                canvas.restore();
                if (gridLineIndex % 4 == 0) {
                    canvas.strokeStyle = "rgb(" + darkestColor + ")"
                } else {
                    canvas.strokeStyle = "rgb(" + darkerColor + ")"
                }
                canvas.beginPath();
                canvas.moveTo(i, 0);
                canvas.lineTo(i, pageContentHeight);
                i += gridSize;
                gridLineIndex++;
                canvas.stroke()
            }
        }
    },
    remove(){
        //移除掉渲染的效果
        this._canvas.remove();
    }
}


export default DrawBoard;

