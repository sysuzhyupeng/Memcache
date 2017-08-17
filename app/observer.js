/*
	发布-订阅模式又叫观察者模式，
	它定义对象间的一种一对多的依赖关系，
	当一个对象的状态改变时，所有依赖于它的对象都将得到通知
	实际上我们在DOM节点上绑定事件处理函数，就是一种发布-订阅模式
*/
document.body.addEventListener('click', function(){
	alert(1);
}, false);
/*
	当loginBtn1节点被点击时，
	loginBtn1节点便会向订阅者发布这个消息。
	当然我们还可以随意增加或者删除订阅者，
	增加任何订阅者都不会影响发布者代码的编写
*/
document.body.addEventListener('click', function(){
	alert(2);
}, false);
document.body.addEventListener('click', function(){
	alert(3);
}, false);
document.body.click();
/*
	注意，手动触发事件更好的做法是IE下用fireEvent，标准浏览器下用dispatchEvent
*/
/*
	自定义事件

	比如我们实现一个天气预报的广播功能
*/