window.onload = function() {
	waterfall('main', 'box');
	var img = 0;
	window.onscroll = function() {
		if(checkScrollSlide()) {
			if(img>90){
				return;
			}
			for(var num = 0; num < 5; num++) {
				var main = document.getElementById('main');
				var newbox = document.createElement('div');
				newbox.className = 'box';
				var newpic = document.createElement('div');
				newpic.className = 'pic';
				newbox.appendChild(newpic);
				var newimg = document.createElement('img');
				newimg.src = 'img/images/' + img+'.jpg';
				newpic.appendChild(newimg);
				main.appendChild(newbox);
				img++;
			}		
		}
		waterfall('main', 'box');
	};
};

function waterfall(parent, box) {
	var iParent = document.getElementById(parent);
	var iBoxs = getByClass(iParent, box);
	//计算整个页面显示的列数（页面框/盒子宽度）
	var iBoxsW = iBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth / iBoxsW);
	iParent.style.cssText = "width:" + iBoxsW * cols + "px;margin:0 auto;";
	var heightArr = [];
	for(var i = 0; i < iBoxs.length; i++) {
		if(i < cols) {
			//第一行
			heightArr.push(iBoxs[i].offsetHeight);
		} else {
			var minH = Math.min.apply(null, heightArr); //使用apply方法
			var pos = getMinH(heightArr, minH);
			iBoxs[i].style.position = "absolute";
			iBoxs[i].style.top = minH + "px";
			iBoxs[i].style.left = pos * iBoxsW + "px";
			heightArr[pos] += iBoxs[i].offsetHeight;
		}
	}
}

function getMinH(arr, val) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == val) {
			return i;
		}
	}
	return i;
}

function getByClass(parent, cls) {
	if(parent) {
		var tags = parent.getElementsByTagName('*');
		var result = [];
		for(var i = 0; i < tags.length; i++) {
			if(tags[i].className == cls) {
				result.push(tags[i]);
			}
		}
		return result;
	} else {
		return;
	}
}
//检测是否具备滚动加载新数据的条件
function checkScrollSlide() {
	//console.log('check');
	var iParent = document.getElementById('main');
	var iBoxs = getByClass(iParent, 'box');
	var lastboxH = iBoxs[iBoxs.length - 1].offsetTop + Math.floor(iBoxs[iBoxs.length - 1].offsetHeight / 2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //获取滚动距离
	var height = document.body.clientHeight || document.documentElement.clientHeight; //获取窗口高度
	console.log((lastboxH < scrollTop + height) ? true : false+" "+lastboxH+" "+(scrollTop + height));
	return(lastboxH < scrollTop + height) ? true : false;
}