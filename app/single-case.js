/*
	惰性单例指的是在需要的时候才创建对象实例。
	我们先来看一个例子，假如需求是一个唯一的登录窗口，
	第一种解决方案是在页面加载完成的时候便创建好这个div浮窗，
	这个浮窗肯定一开始是隐藏状态的
*/
var loginLayer = (function() {
	var div = document.createElement('div');
	div.innerHTML = '我是登录浮窗1';
	div.style.display = 'none';
	div.style.width = '100px';
	div.style.height = '100px';
	div.style.backgroundColor = 'red';
	document.body.appendChild(div);
	return div;
})()
document.getElementById('loginBtn1').onclick = function() {
	loginLayer.style.display = 'block';
}

/*
	这样做一个问题，很多游客并不想登录，
	如果登录浮窗总是一开始就被创建好，
	那么很有可能白白浪费一些Dom节点，
	现在改写一下使用户点击登录按钮的时候才开始创建浮窗
*/
var createLoginLayer = function() {
		var div = document.createElement('div');
		div.innerHTML = '我是登录浮窗2';
		div.style.width = '100px';
		div.style.height = '100px';
		div.style.backgroundColor = 'yellow';
		document.body.appendChild(div);
		return div;
	}
	//当点击btn2的时候会不断创建新的登录弹窗
document.getElementById('loginBtn2').onclick = function() {
		var loginLayer = createLoginLayer();
		loginLayer.style.display = 'block';
	}
	/*
		虽然现在达到了惰性的目的，但失去了单例的效果。
		我们可以使用一个变量来判断是否已经创建过登录浮窗
	*/
var createLoginLayer2 = (function() {
	//使用闭包来保存这个变量
	var div;
	return function() {
		if (!div) {
			div = document.createElement('div');
			div.innerHTML = '我是登录浮窗3';
			div.style.width = '100px';
			div.style.height = '100px';
			div.style.backgroundColor = 'orange';
			div.style.display = 'none';
			document.body.appendChild(div);
		}
		return div;
	}
})()
document.getElementById('loginBtn3').onclick = function() {
		var loginLayer = createLoginLayer2();
		loginLayer.style.display = 'block';
	}
	/*
		通用的惰性单例
		上面的代码还是有问题，创建对象和管理单例的逻辑都放在createLoginLayer对象内部。
		如果我们想再创建页面中唯一的一个iframe或者script标签，
		就要把刚才的创建函数几乎照抄一遍,
		我们需要把不变的逻辑抽离出来
	*/
var obj;
if (!obj) {
	obj = xxx;
}
/*
	现在我们就把如何管理单例的逻辑从原来的代码中抽离出来
*/
var getSingle = function(fn) {
	var result;
	return function() {
		return result || (result = fn.apply(this, arguments))
	}
}