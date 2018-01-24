class Bar{
  constructor(items, datas) {
    this.len = items.length;
    this.items = items;
    this.datas = datas;

    this.init();
    this.show();
  }
  init() {
    this.outerWidths = [];
    this.items.forEach((item, index) => {
      this.outerWidths.push(item.parentNode.offsetWidth);
    })
    const max = this.compare();
    this.coef = Math.ceil(max)+2;
  }
  show() {
    const coef = this.coef;
    this.items.forEach((bar, i) => {
      bar.style.width = this.num[i]/coef * this.outerWidths[i] +"px";
      bar.style.webkitTransition = 'width 2s';
    });
  }
  compare() {
    const num = [];
    for(let i = 0; i < this.len; i++){
      num.push(Number(this.datas[i].replace("%","")));
    }
    this.num = num;
    return Math.max.apply(null,num);
  }
}