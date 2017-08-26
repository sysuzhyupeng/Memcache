/*
	想象这样一个场景：
	有一个电灯，电灯上只有一个开关，
	按下开关，电灯会关闭，
	再按一次，电灯会打开，
	开关在不同状态下，表现出来的行为不同，
	正常思路我们会用一个变量代表电灯目前状态
*/
var Light1 = function(){
	this.state = 'off';
	this.button = null;
}
Light1.prototype = {
	init: function(){
		var button = document.createElement('button'),
			self = this;
		button.innerHTML = '开关1';
		this.button = document.body.appendChild(button);
		this.button.style.cursor = 'pointer';
		this.button.onclick = function(){
			self.buttonWasPressed();
		}
	},
	buttonWasPressed: function(){
		if(this.state === 'off'){
			console.log('开灯');
			this.state = 'on';
		} else {
			console.log('关灯');
			this.state = 'off';
		}
	}
}
var light1 = new Light1();
light1.init();
/*
	然而当电灯的需求改变之后，比如
	第一次按下打开弱光，
	第二次按下打开强光，
	第三次才是关闭，
	那么代码就会变成这样
*/
function Light(){}
Light.prototype.buttonWasPressed = function(){
	if(this.state === 'off'){
		console.log('弱光');
		this.state = 'weakLight';
	} else if(this.state === 'weakLight'){
		console.log('强光');
		this.state = 'strongLight';
	} else if(this.state === 'strongLight'){
		console.log('关灯');
		this.state = 'off';
	}
}
/*
	很明显buttonWasPressed是违反开放-封闭原则的，
	每次修改light状态，都需要改动这个方法中的代码，
	这使得buttonWasPressed称为一个不稳定方法。
	这里就用到了状态模式，
	状态模式的关键是把事物的每种状态都封装成单独的类
*/
var OffLightState = function(light){
	//获取light对象，便于调用setState方法
	this.light = light;
}
OffLightState.prototype.buttonWasPressed = function(){
	console.log('弱光');
	this.light.setState(this.light.weakLightState);
}
var WeakLightState = function(light){
	this.light = light;
}
WeakLightState.prototype.buttonWasPressed = function(){
	console.log('强光');
	this.light.setState(this.light.strongLightState);
}
var StrongLightState = function(light){
	this.light = light;
}
StrongLightState.prototype.buttonWasPressed = function(){
	console.log('关灯');
	this.light.setState(this.light.offLightState);
}
var Light2 = function(){
	this.offLightState = new OffLightState(this);
	this.weakLightState = new WeakLightState(this);
	this.strongLightState = new StrongLightState(this);
	this.button = null;
}
Light2.prototype = {
	init: function(){
		var button = document.createElement('button'),
			self = this;
		button.innerHTML = '开关2';
		this.button = document.body.appendChild(button);
		this.button.style.cursor = 'pointer';

		this.currState = this.offLightState;

		//不同state调用的buttonWasPressed不同
		this.button.onclick = function(){
			self.currState.buttonWasPressed();
		}
	},
	//修改目前的state调用对象
	setState: function(newState){
		this.currState = newState;
	}
}
var light2 = new Light2();
light2.init();
/*
	状态模式的核心是委托，
	无论增加多少状态类，它们都必须实现buttonWasPressed方法，
	这个在Java中称为接口
*/
