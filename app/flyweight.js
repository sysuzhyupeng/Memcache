/*
	享元模式是一种用于性能优化的模式，
	解决的是内存分配的问题
*/
/*
	假设有一个衣服工厂，产品有50种男士衣服和50种女式衣服，
	工厂决定让模特穿上他们衣服拍照，
	正常需要50个男模特和50个女模特，
	不使用享元模式的情况下，也许会这么写
*/
var Model1 = function(sex, clothes){
	this.sex = sex;
	this.clothes = clothes;
}
Model1.prototype.takePhoto = function(){
	console.log('sex = ' + this.sex + ' clothes = ' + this.clothes); 
}
for(var i = 1; i <= 50; i++){
	var maleModel = new Model1('male', 'male clothes' + i);
	maleModel.takePhoto();
	var femaleModel = new Model1('female', 'female clothes' + i);
	femaleModel.takePhoto();
}
/*
	明显我们只需要两个模特即可
*/
var Model2 = function(sex){
	this.sex = sex;
}
Model2.prototype.takePhoto = function(){
	console.log('sex = ' + this.sex + ' clothes = ' + this.clothes); 
}
var maleModel = new Model('male'),
	femaleModel = new Model('female');
for(var i = 1; i <= 50; i++){
	maleModel.clothes = 'male clothes' + i;
	maleModel.takePhoto();
	femaleModel = 'female clothes' + i;
	femaleModel.takePhoto();
}
/*
   这样其实是把clothes的属性不断重写，
   clothes属性对于我们的对象来说是一个外部状态，
   因为他可以不断被改变，
   享元模式的核心就是区分内部状态和外部状态
*/