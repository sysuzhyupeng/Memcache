/*
	发布-订阅模式又叫观察者模式，
	它定义对象间的一种一对多的依赖关系，
	当一个对象的状态改变时，所有依赖于它的对象都将得到通知
	实际上我们在DOM节点上绑定事件处理函数，就是一种发布-订阅模式
*/
document.body.addEventListener('click', function(){
	console.log(1);
}, false);
/*
	当loginBtn1节点被点击时，
	loginBtn1节点便会向订阅者发布这个消息。
	当然我们还可以随意增加或者删除订阅者，
	增加任何订阅者都不会影响发布者代码的编写
*/
document.body.addEventListener('click', function(){
	console.log(2);
}, false);
document.body.addEventListener('click', function(){
	console.log(3);
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
   console.log('温度=' + temprature, 'from weatherCenter1');
   console.log('天气类型为' + type);
})
//B订阅消息b 
weatherCenter1.listen(function(type, temprature){
   console.log('温度=' + temprature, 'from weatherCenter1');
   console.log('天气类型为' + type);
})   
// weatherCenter1.trigger('rainy', '12');
// weatherCenter1.trigger('sunny', '30');
/*
	至此，我们实现了简单的发布-订阅模式，
	但这里还有一点问题，假如A只想知道晴天的天气推送，
	那么我们有必要增加一个标识key，让订阅者只订阅自己感兴趣的消息
*/
var weatherCenter2 = {};
weatherCenter2.clientList = {};
weatherCenter2.listen = function(key, fn){
    if(!this.clientList[key]){
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
}
weatherCenter2.trigger = function(){
    var key = Array.prototype.shift.call(arguments),
        //取出该消息对应的回调函数集合
        fns = this.clientList[key];
    if(!fns || fns.length === 0){
        return false;
    }
    for(var i = 0; i < fns.length; i++){
    	fn = fns[i];
        //arguments对象的第一个参数已经被shift
        fn.apply(this, arguments);
    }
}
weatherCenter2.listen('sunny', function(temprature){
    console.log('温度=' + temprature, 'from weatherCenter2');
})
weatherCenter2.listen('rainy', function(temprature){
    console.log('温度=' + temprature, 'from weatherCenter2');
})
weatherCenter2.trigger('rainy', '14');
weatherCenter2.trigger('sunny', '30');
/*
	发布-订阅模式的通用实现
	我们假设小明又去其他气象中心订阅了天气，
	那这段代码是否应该在另一个气象中心上重写一次呢，
	有没有办法可以让所有对象都拥有发布-订阅功能呢 
	所以我们把发布-订阅的功能提取出来，放在一个单独的对象内
*/
var event = {
      clientList = [],
      listen: function(key, fn){
         if(!this.clientList[key]){
            this.clientList[key] = [];
         }
         this.clientList[key].push(fn);
      },
      trigger: function(){
         var key = Array.prototype.shift.call(arguments),
           fns = this.clientList(key);
         if(!fn || fn.length === 0){
            return false;
         }
         for(var i = 0, fn; fn = fns[i++]){
            //arguments对象的第一个参数已经被shift
            fn.apply(this, arguments);
         }
      }
   }