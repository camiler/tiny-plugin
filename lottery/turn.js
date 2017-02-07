;(function () {            
    function Lottery(options){

        this.options = options;
        this.$el = options.el;
        this.$startBtn = options.startBtn;
        this.singleAngle = (360/options.num).toFixed(2);
        this.runStatus = 0; 
        this.destory();
        this.listen();
    }

    Lottery.prototype = {

        /**
         *  监听集合
         */
        listen: function(){
            this.$startBtn.on('touchend',function(e){
                e.preventDefault();
                this.start();
            }.bind(this));
        },

        destory: function(){
            this.$startBtn.off('touchend');
        },

        /**
         *  设置状态信息，开始
         */
        start: function(){

            if ( !this.runStatus ) {
  
                if ( this.options.start ) {
                    if (this.options.start.call(this) === false) return;
                }
                
                //window.T = Date.now();
                this.runStatus = 1;
            }
        },

        /**
         *  开始转动
         */
        run: function(stopIndex){
            
            if ( this.runStatus === 0 ) {
                return;
            }

            var angle = 360*4 - (stopIndex-1) * this.singleAngle;
            
            this.runTimer = setTimeout(function(){

                $(document.body).off('touchstart','touchmove','touchend');
                
                this.$el.css({
                    '-webkit-transform': 'rotate('+angle+'deg)',
                    '-webkit-transition': 'all 4s ease-out'
                })
            }.bind(this), 10);

            this.stop();      
        },

        /**
         *  结束运行
         */
         stop: function(){
            var me = this;
            this.$el.on('webkitTransitionEnd', function(){
                
                me.runStatus = 0;
                if ( !me.runStatus ) {
                    me.$el.off('webkitTransitionEnd');
                    $(document.body).on('touchstart','touchmove','touchend');
                }
                
                me.runTimer && clearTimeout(me.runTimer);
                me.options.stop && me.options.stop.call(me);
            }, false); 

        },

        /**
         *  重置运行
         */
        reset: function(){
            this.runStatus = 0; 
            this.$el.remove();

            this.$startBtn.before('<div class="lottery-content" id="J_lotteryWrap"></div>');
            this.$el = this.$startBtn.prev('#J_lotteryWrap');
            //this.$el.attr('style','');
        }
    };


    var _globals = (function(){ return this || (0,eval)("this"); }());

    if (typeof module !== "undefined" && module.exports) {
        module.exports = Lottery;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return Lottery;});
    } else {
        _globals.Lottery = Lottery;
    }
})();