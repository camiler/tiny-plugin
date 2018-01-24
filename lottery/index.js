class Lottery {
  constructor(options) {
    this.options = options;
    this.$el = options.el;
    this.$startBtn = options.startBtn;
    this.singleAngle = (360/options.num).toFixed(2);
    this.runStatus = 0;
    this.destory();
    this.listen();
  }
  listen() {
    this.$startBtn.on('touchend', (e) => {
      e.preventDefault();
      this.start();
    });
  }
  destory() {
    this.$startBtn.off('touchend');
  }
  start() {
    if ( !this.runStatus ) {

      if ( this.options.start ) {
        if (this.options.start.call(this) === false) return;
      }

      //window.T = Date.now();
      this.runStatus = 1;
    }
  }
  run(stopIndex) {
    if ( this.runStatus === 0 ) {
      return;
    }

    const angle = 360*4 - (stopIndex-1) * this.singleAngle;

    this.runTimer = setTimeout(() => {
      $(document.body).off('touchstart','touchmove','touchend');
      this.$el.css({
        '-webkit-transform': 'rotate('+angle+'deg)',
        '-webkit-transition': 'all 4s ease-out'
      })
    }, 10);

    this.stop();
  }
  stop() {
    this.$el.on('webkitTransitionEnd', () => {
      this.runStatus = 0;
      if ( !this.runStatus ) {
        this.$el.off('webkitTransitionEnd');
        $(document.body).on('touchstart','touchmove','touchend');
      }

      this.runTimer && clearTimeout(this.runTimer);
      this.options.stop && this.options.stop.call(this);
    }, false);
  }
  reset() {
    this.runStatus = 0;
    this.$el.remove();

    this.$startBtn.before('<div class="lottery-content" id="J_lotteryWrap"></div>');
    this.$el = this.$startBtn.prev('#J_lotteryWrap');
    //this.$el.attr('style','');
  }
}
