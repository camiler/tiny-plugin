(function(){

  var CircleAni = {
    init: function(options, svg){
      this.options = options;
      this.direction = options.direction || 1;
      this.strokeWidth = options.strokeWidth || 10;
      this.stroke = options.stroke;
      this.ratio = options.ratio || 30;
      this.dur = options.dur || 2;

      this.firstStartX = this.strokeWidth + this.ratio;
      this.firstStartY = this.strokeWidth;

      this.initSvg(svg);
      this.caculatePos();

      this.createPath(svg);
    },
    initSvg: function(svg){
      var svgSize = (this.strokeWidth + this.ratio) * 2;
      svg.setAttribute("width", svgSize);
      svg.setAttribute("height", svgSize);
    },
    caculatePos: function(){
      var strokeObj = this.stroke;
      var ratio = this.ratio;

      var len = strokeObj.length, pos = [];
      for(var i = 0; i < len; i++){
        var color = strokeObj[i][0];

        var prevAngle = 0;
        for(var j = 0; j < i; j++){
            prevAngle = prevAngle + strokeObj[j][1]*360;
        }

        var angle = Math.ceil(prevAngle + strokeObj[i][1]*360);
        var isBig = strokeObj[i][1]*360 >= 180 ? '1' : '0'; //是大角度弧还是小角度
        
        var anidur = Number(this.dur * strokeObj[i][1]).toFixed(2); //每个动画的时间

        var rl = Math.ceil(2 * Math.PI * ratio * strokeObj[i][1]); //这一段弧长
        var y, x;
          
        if (angle >= 180 && angle < 270) {
          angle = angle - 180;
          x = this.firstStartX - this.direction * Math.floor(ratio * Math.sin(Math.PI/180 * angle));
          y = this.firstStartY + ratio + Math.floor(ratio * Math.cos(Math.PI/180 * angle));

        }else if(angle >= 270){
          angle = 360 - angle;
          x = this.firstStartX - this.direction * Math.floor(ratio * Math.sin(Math.PI/180 * angle));
          y = this.firstStartY + ratio - Math.floor(ratio * Math.cos(Math.PI/180 * angle));
            
        }else if(angle < 180 && angle >= 90){
          angle = 180 - angle;
          x = this.firstStartX + this.direction * Math.floor(ratio * Math.sin(Math.PI/180 * angle));
          y = this.firstStartY + ratio + Math.floor(ratio * Math.cos(Math.PI/180 * angle));
        }else{
          x = this.firstStartX + this.direction * Math.floor(ratio * Math.sin(Math.PI/180 * angle));
          y = this.firstStartY + ratio - Math.floor(ratio * Math.cos(Math.PI/180 * angle)); 
        }

        pos.push([x, y, isBig, rl, color, anidur]);
      }
      this.pos = pos;
    },
    createPath: function(svg){
      var pos = this.pos;
      var ratio = this.ratio;
      for(var p = 0; p < pos.length; p++){
        var svgNS="http://www.w3.org/2000/svg";
        var path = document.createElementNS(svgNS, 'path');

        var beginX, beginY;
        if (p === 0) {
          beginX = this.firstStartX;
          beginY = this.firstStartY;
        } else {
          beginX = pos[p-1][0];
          beginY = pos[p-1][1];
        }

        var dir = this.direction === -1 ? 0 : 1;
        var d = 'M' + beginX + ',' + beginY + ' A' + ratio + ',' + ratio + ' 0 ' + pos[p][2] + ' ' + dir + ' ' + pos[p][0] + ',' + pos[p][1];
        
        path.setAttribute('d', d);
        path.setAttribute('style', 'stroke:' + pos[p][4] + ';stroke-width: ' + this.strokeWidth + ';fill: none');
        path.setAttribute('stroke-dasharray', pos[p][3]);
        path.setAttribute('stroke-dashoffset', pos[p][3]);

        var animate = document.createElementNS(svgNS, 'animate');
        animate.setAttribute('attributeName', 'stroke-dashoffset');
        animate.setAttribute('type', 'translate');
        animate.setAttribute('from', pos[p][3]);
        animate.setAttribute('to', 0);
        animate.setAttribute('dur',pos[p][5]);

        var delay = 0;
        for(var j = 0; j < p; j++){
          delay = delay + Number(pos[j][5]);
        }
        animate.setAttribute('begin', delay);
        animate.setAttribute('fill', 'freeze');
        path.appendChild(animate);
        svg.appendChild(path);
      }
    }
  }

  var _globals = (function(){ return this || (0,eval)("this"); }());
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Object.create(CircleAni);
  } else if (typeof define === "function" && define.amd) {
    define(function(){return Object.create(CircleAni);});
  } else {
    _globals.CircleAni = Object.create(CircleAni);
  }
  
})();