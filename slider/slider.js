;(function(){
    function Slider(opts){
        this.list = opts.list;
        this.outer = opts.wrap;
        this.direction = opts.direction;
        this.delay = opts.delay || '0.2s';
        this.animation = opts.animation || 'ease-out';
        this.init();
        this.bindDOM();
    }

    Slider.prototype.init = function() {

        this.scale = this.direction === 'h' ? window.innerHeight : window.innerWidth;
        this.transition = '-webkit-transform ' + this.delay + ' ' + this.animation;
        this.idx = 0;
        
        this.list.forEach(function(item, i){
            if (this.direction === 'h') {
                item.style.height = this.scale +'px';
            }else{
                item.style.width = this.scale +'px';
            }
            item.style.webkitTransform = this.setTranslate(i*this.scale);
        }.bind(this));
    };

    Slider.prototype.setTranslate = function(size){
        if (this.direction === 'h') {
            return 'translate3d(0,'+ size +'px, 0)';
        }else{
            return 'translate3d('+ size +'px, 0, 0)';
        }
    };

    Slider.prototype.goIndex = function(n){
        var idx = this.idx,
            lis = this.list,
            len = lis.length,
            cidx;

        if(typeof n == 'number'){
            cidx = idx;
        }else if(typeof n == 'string'){
            cidx = idx + n*1;
        }

        if(cidx > len-1){
            cidx = len - 1;
        }else if(cidx < 0){
            cidx = 0;
        }

        this.idx = cidx;

        lis[cidx].style.webkitTransition = this.transition;
        lis[cidx-1] && (lis[cidx-1].style.webkitTransition = this.transition);
        lis[cidx+1] && (lis[cidx+1].style.webkitTransition = this.transition);

        lis[cidx].style.webkitTransform = 'translate3d(0, 0, 0)';
        lis[cidx-1] && (lis[cidx-1].style.webkitTransform = this.setTranslate(0-this.scale));
        lis[cidx+1] && (lis[cidx+1].style.webkitTransform = this.setTranslate(this.scale));
        
    };

    Slider.prototype.bindDOM = function(){
        var self = this;
        var scale = self.scale;
        var outer = self.outer;
        var len = self.list.length;

        var startHandler = function(evt){

            self.startTime = new Date() * 1;

            self.startPoint = self.direction === 'h' ? evt.touches[0].pageY : evt.touches[0].pageX;
            self.offset = 0;
        };

        var moveHandler = function(evt){
            evt.preventDefault();
            self.offset = self.direction === 'h' ? (evt.targetTouches[0].pageY - self.startPoint) : (evt.targetTouches[0].pageX - self.startPoint);

            var lis = self.list, i = self.idx - 1, m = i + 3;

            for(i; i < m; i++){
                lis[i] && (lis[i].style.webkitTransition = self.transition);
                lis[i] && (lis[i].style.webkitTransform = self.setTranslate((i-self.idx)*self.scale + self.offset));
            }
        };

        var endHandler = function(evt){
            evt.preventDefault();
            var boundary = scale/6;

            var endTime = new Date() * 1;
            var lis = self.list;
            if(endTime - self.startTime > 300){
                if(self.offset >= boundary){
                    self.goIndex('-1');
                }else if(self.offset < 0 && self.offset < -boundary){
                    self.goIndex('+1');
                }else{
                    self.goIndex('0');
                }
            }else{
                
                if(self.offset > 50){
                    self.goIndex('-1');
                }else if(self.offset < -50){
                    self.goIndex('+1');
                }else{
                    self.goIndex('0');
                }
            }
        };

        outer.addEventListener('touchstart', startHandler);
        outer.addEventListener('touchmove', moveHandler);
        outer.addEventListener('touchend', endHandler);
    };

    var _globals = (function(){ return this || (0,eval)("this"); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Slider;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return Slider;});
    } else {
        _globals.Slider = Slider;
    }
})()