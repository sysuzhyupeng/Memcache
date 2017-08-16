/*
	模版方法模式由两部分结构组成(核心是抽离相同逻辑，所以适用于两个或多个很相似的对象)
	第一部分是抽象父类，
	第二部分是具体的实现子类。
	在模版方法模式中，子类实现中的逻辑相同部分被上移到父类中，
	而将不同的部分留待子类来实现,
	咖啡与茶是一个经典的例子，泡咖啡的步骤如下
*/
var Coffee1 = function(){};
Coffee1.prototype = {
    boilWater: function(){
       console.log('把水煮沸');
    },
    brewCoffeeGriends: function(){
       console.log('用沸水泡咖啡');
    },
    pourInCup: function(){
       console.log('把咖啡倒进杯子里');
    },
    addSugarAndMilk: function(){
       console.log('加糖和牛奶');
    }
}
Coffee1.prototype.init = function(){
    this.boilWater();
    this.brewCoffeeGriends();
    this.pourInCup();
    this.addSugarAndMilk();
}
/*
	泡一壶茶的步骤如下：
*/
var Tea = function(){};
Tea.prototype = {
    boilWater: function(){
       console.log('把水煮沸');
    },
    steepTeaBag: function(){
       console.log('用沸水泡茶叶');
    },
    pourInCup: function(){
       console.log('把茶叶倒进杯子里');
    },
    addLemon: function(){
       console.log('加柠檬');
    }
}
Tea.prototype.init = function(){
    this.boilWater();
    this.steepTeaBag();
    this.pourInCup();
    this.addLemon();
}
/*
抽离相同逻辑

我们可以发现泡咖啡和泡茶主要由以下不同点:

	原料不同。一个是咖啡，一个是茶，但我们可以把它们都抽象为饮料。
	泡的方式不同，咖啡是冲泡，茶叶是浸泡，我们可以把它们都抽象为泡。
	加入的调料不同，一个是糖和牛奶，一个柠檬，但我们可以把他们都抽象为调料。
*/
var Beverage = function(){};
Beverage.prototype = {
	/*
		Beverage.prototype.init方法就是我们的模版方法，
		该方法封装了子类的算法框架，它作为一个算法的模版，
		指导子类以何种顺序去执行哪些方法
	*/
    init: function(){
       this.boilWater();
       this.brew();
       this.pourInCup();
       this.addCondiments();
       /*
       		如果我们上述的步骤有一些额外的操作，想加入一些回调怎么办？
       		钩子(hook)方法可以用来解决问题，
       		放置钩子是隔离变化的一种常见手段，
       		我们在父类中容易变化的地方放置钩子(可以调用子对象方法)。
       */
        if(this.customerWantsCondiments()){
           this.addCondiments();
        }
    },
    //相同的，不需要被重写的方法直接定义实现
    boilWater: function(){
       console.log('把水煮沸');
    },
    //空方法，由子类重写，相当于java的抽象类(这里没有强制子类继承)
    brew: function(){
    },
    pourInCup: function(){
    },
    addCondiments: function(){
    }
}
var Coffee = function(){};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function(){
    console.log('用沸水泡咖啡');
}
Coffee.prototype.pourInCup = function(){
    console.log('把咖啡倒进杯子里');
}
Coffee.prototype.addCondiments = function(){
    console.log('加柠檬');
}
/*
	在实际开发中，有时候需要给一些公用的ajax方法中传入回调，这时候回调也可以写成公用的钩子形式
*/
Coffee.prototype.customerWantsCondiments = function(){
    return window.confirm('请问需要调料吗');
}
document.getElementById('loginBtn1').onclick = function(){
	var coffee = new Coffee();
	coffee.init();
}