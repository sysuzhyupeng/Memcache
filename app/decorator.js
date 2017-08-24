/*
	在面向对象中，给对象添加功能通常使用继承的方式，
	但是继承的同时也会破坏封装，
	继承的这种功能复用方式通常被称为‘白箱复用’，
	因为超类的内部细节是对子类可见的
*/
/*
	给对象动态添加职责的方式称为装饰者模式，
	装饰者模式能在不改变对象自身的情况下，
	在程序运行期间动态地添加职责
*/
var obj = {
	name: 'sysuzhyupeng',
	age: 25
}
/*
	这样的操作改变了对象上的属性，
	不符合装饰者模式的定义
*/
obj.age = obj.age + 1;

/*
	举一个飞机大战的例子,
	使用两个装饰类，
	先是调用原有对象的方法，
	再加上新的逻辑，
	plane的fire方法不断被重写
*/
/*
	和单纯重写fire的方法不同的地方在于，
	通过装饰者对象能不断在前面方法的基础上进行添加，
	装饰者对象和所装饰的对象拥有相同的接口
*/
var Plane = function(){};
Plane.prototype.fire = function(){
	console.log('发射子普通子弹');
}
var Decorator1 = function(plane){
	this.plane = plane;
}
Decorator1.prototype.fire = function(){
	this.plane.fire();
	console.log('发送导弹');
}
var Decorator2 = function(plane){
	this.plane = plane;
}
Decorator2.prototype.fire = function(){
	this.plane.fire();
	console.log('发送原子弹');
}

var plane = new Plane();
plane = new Decorator1(plane);
plane = new Decorator2(plane);

plane.fire();
/*
	当我们遇到window.onload的绑定时，
	我们通常会使用这样一种方式
*/
//原来的绑定
window.onload = function(){
	console.log('onload1');
}
var  _onload = window.onload;
window.onload = function(){
	console.log('onload2');
	return _onload.apply(document, arguments);
}
/*
	上面这样做显然不是很方便，
	那么我们可以用AOP(面向切面编程)来解决这个问题
*/
Function.prototype.before = function(beforefn){
	//保存原函数的引用
	var _self = this;
	return function(){
		beforefn.apply(this, arguments);
		//_self是原函数引用，直接执行
		return _self.apply(this, arguments);
	}
}
Function.prototype.after = function(afterfn){
	//保存原函数的引用
	var _self = this;
	return function(){
		//执行(before + 原函数)
		var res = _self.apply(this, arguments);
		afterfn.apply(this, arguments);
		return res;
	}
}
/*
	下面通过一个例子来使用AOP
*/
var log1 = function(){
	console.log('AOP', '调用之前');
}
var log2 = function(){
	console.log('AOP', '调用之后');
}
var fn = function(param){
	console.log('AOP', '调用参数为 ' + param);
}
fn =  fn.before(log1);
fn = fn.after(log2);
fn(1);

