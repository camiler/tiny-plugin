;(function(){
    function Bar(items, datas){
        this.len = items.length;
        this.items = items;
        this.datas = datas;
        
        this.init();
        this.show();
    }

    Bar.prototype = {
        init: function($bar){
            this.outerWidths = [];
            this.items.forEach(function(item, index){
                this.outerWidths.push(item.parentNode.offsetWidth);
            }.bind(this));
            var max = this.compare();
            this.coef = Math.ceil(max)+2;
        },
        show: function(){
            var coef = this.coef;
            this.items.forEach(function(bar, i){
                bar.style.width = this.num[i]/coef * this.outerWidths[i] +"px";
                bar.style.webkitTransition = 'width 2s';
            }.bind(this));
        },
        compare: function(){
            var num = [];
            for(var i=0;i<this.len;i++){
                num.push(Number(this.datas[i].replace("%","")));
            }
            this.num = num;
            return Math.max.apply(null,num);
        }
    }
    var _globals = (function(){ return this || (0,eval)("this"); }());

    if (typeof module !== "undefined" && module.exports) {
        module.exports = Bar;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return Bar;});
    } else {
        _globals.Bar = Bar;
    }

})();