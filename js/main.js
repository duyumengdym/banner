var $banner=(function(){
  var $carousel=$('<div>'
                  +'<div class="slider" id="slider">'
                  +'<div class="slide"><img src="img/b5.png" alt=""></div>'
                  +'<div class="slide"><img src="img/b1.png" alt=""></div>'
                  +'<div class="slide"><img src="img/b2.png" alt=""></div>'
                  +'<div class="slide"><img src="img/b3.png" alt=""></div>'
                  +'<div class="slide"><img src="img/b4.png" alt=""></div>'
                  +'<div class="slide"><img src="img/b5.png" alt=""></div>'
                  +'<div class="slide"><img src="img/b1.png" alt=""></div>'
                  +'</div>'
                  +'<span id="left"><</span>'
                  +'<span id="right">></span>'
                  +'<ul class="nav" id="navs">'
                  +'<li class="active">1</li>'
                  +'<li>2</li>'
                  +'<li>3</li>'
                  +'<li>4</li>'
                  +'<li>5</li>'
                  +'</ul>'
                  +'</div>'
                  );
  var cfg={container:"box"};
  var $slider = $carousel.find('#slider');
  var $left = $carousel.find('#left');
  var $right = $carousel.find('#right');
  var $oNavlist =$carousel.find("#navs").children();
  var index = 1;
  var timer;
  var isMoving = false;
  function getStyle(obj, attr){
  	return obj.css(attr);
  }
  function animate(obj, json, callback) {
  	clearInterval(obj.timer);
  	obj.timer = setInterval(function () {
  		var flag = true;
  		for (var attr in json) {
  			(function (attr) {
  				if (attr == "opacity") {
  					var now = parseInt(getStyle(obj, attr) * 100);
  					var dest = json[attr] * 100;
  				} else {
  					var now = parseInt(getStyle(obj, attr));
  					var dest = json[attr];
  				}
  				var speed = (dest - now) / 6;
  				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
  				if (now != dest) {
  					flag = false;
  					if (attr == "opacity") {
              obj.css(attr,(now + speed) / 100);
  					} else {
              obj.css(attr, now + speed + "px");
  					}
  				}
  			})(attr);
  		}
  		if (flag) {
  			clearInterval(obj.timer);
  			callback && callback();
  		}
  	}, 30);
  }
  function show(conf){
      var $box=$('#'+conf.container);
      $box.append($carousel);
      $.extend(cfg,conf);
      console.log($oNavlist.length); 
      $box.mouseover(function () {
        animate($left, {
          opacity: 0.6
        })
        animate($right, {
          opacity: 0.6
        })
        clearInterval(timer);
      })
      $box.mouseout(function () {
        animate($left, {
          opacity: 0
        })
        animate($right, {
          opacity: 0
        })
        timer = setInterval(next, 3000);
      })
      $right.click(next);
      $left.click(prev);
      function next() {
          if (isMoving) {
            return;
          }
          isMoving = true;
          index++;
          navmove();
          animate($slider, {
            left: -1200 * index
          }, function () {
            if (index == 6) {
              $slider.css("left","-1200px");
              index = 1;
            }
            isMoving = false;
          });
        }
        function prev() {
          if (isMoving) {
            return;
          }
          isMoving = true;
          index--;
          navmove();
          animate($slider, {
            left: -1200 * index
          }, function () {
            if (index == 0) {
              $slider.css("left","-6000px");
              index = 5;
            }
            isMoving = false;
          });
        }
      //按钮点击切换
      for (var i = 0; i < $oNavlist.length; i++) {
        $oNavlist[i].index = i;
        $oNavlist[i].onclick = function () {
          index = this.index + 1;
          navmove();
          animate($slider, {
            left: -1200 * index
          });
        }
  
      }
      //按钮样式
      function navmove() {
        for (var i = 0; i < $oNavlist.length; i++) {
          $oNavlist[i].className = "";
        }
        if (index > 5) {
          $oNavlist[0].className = "active";
        } else if (index <= 0) {
          $oNavlist[4].className = "active";
        } else {
          $oNavlist[index - 1].className = "active";
        }
      }
      timer = setInterval(next, 3000);
  }
  return{
      show:show
  }
}());