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
/*
	注意，手动触发事件更好的做法是IE下用fireEvent，标准浏览器下用dispatchEvent
*/
document.body.click();
/*
	自定义事件
	比如我们实现一个天气预报的广播功能
*/
var weatherCenter1 = {};
/*
	缓存列表，存放订阅者的回调函数
	当listen的时候，实际上是把订阅者的回调fn放进数组中
*/
weatherCenter1.clientList = [];
weatherCenter1.listen = function(fn){
  	this.clientList.push(fn);
}
weatherCenter1.trigger = function(){
	for(var i = 0, fn; i < this.clientList.length; i++){
	    fn = this.clientList[i];
	    //trigger的时候用apply改变为trigger时的参数
	    fn.apply(this, arguments);
	}
}
//下面我们进行一些简单的测试
//A订阅消息(自定义回调函数，也就是自定义订阅消息的推送格式)
weatherCenter1.listen(function(type, temprature){
   console.log('温度=' + temprature);
   console.log('天气类型为' + type);
})
//B订阅消息b 
weatherCenter1.listen(function(type, temprature){
   console.log('温度=' + temprature);
   console.log('天气类型为' + type);
})   
weatherCenter1.trigger('rainy', '12');
weatherCenter1.trigger('sunny', '30');
/*
	至此，我们实现了简单的发布-订阅模式，
	但这里还有一点问题，假如A只想知道晴天的天气推送，
	那么我们有必要增加一个标识key，让订阅者只订阅自己感兴趣的消息
*/