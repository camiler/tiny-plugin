# svg path占比圆圈动画

引入circle-ani.js   

```
//顺时针例子
CircleAni.init({
    direction: 1, //-1 逆时针  1 顺时针
    strokeWidth: 10, //px，圆圈的宽度
    ratio: 30, //px 半径
    stroke: [['#cccc00', 0.6], ['#00ff00', 0.25], ['#F39800', 0.15]],  //各个颜色占比, 按大小排
    dur: 2, //动画时间 默认2s
}, document.getElementById('circle-svg'));

//逆时针例子
CircleAni.init({
    stroke: [['#e61919', 0.35], ['#309c40', 0.25], ['#FFFF33', 0.20], ['#217ac0', 0.20]],
    dur: 1,
    strokeWidth: 5,
    ratio: 40,
    direction: -1,
}, document.getElementById('svg2'));
```