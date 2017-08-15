/*
	命令模式是最简单的模式之一，
	命令模式中的命令command指的是一个执行某些特定事情的指令。
	命令模式最常见的应用场景是：有时候需要向某些对象发送请求，
	但是并不知道请求的接受者是谁，此时希望用一种松耦合的方式来设计程序，
	使得请求发送者和请求接收者能够消除彼此之间的耦合关系。
*/
var btn1 = document.getElementById('button1'),
    btn2 = document.getElementById('button2'),
    btn3 = document.getElementById('button3');

/*
	我们在这里可以找到使用命令模式的理由，点击了按钮之后，
	必须向某些负责具体行为的对象发送请求，
	但是对A来说，目前不知道接收者是什么对象，
	也不知道接收者究竟会做什么。
	设计模式的主题总是把不变的和变化的事物分离开来，
	以便揭开按钮和具体负责行为对象之间的耦合。
*/
var setCommand = function(button, command){
    button.onclick = function(){
        command.execute();
    }
}
/*
	最后负责编写点击按钮具体行为的提交了代码，
	他完成了刷新菜单界面，增加子菜单和删除子菜单这几个功能。
*/
//命令的接收对象，接收到命令之后，可以执行相应行为
var MenuBar = {
    refresh: function(){
       console.log('刷新菜单目录');
    }
}
var SubMenu = {
    add: function(){
        console.log('增加子菜单');
    },
    del: function(){
        console.log('删除子菜单');
    }
}
/*
	先把这些行为都封装在命令类的原型上，
	在每个类上封装execute方法
*/
var RefreshMenuBarCommand = function(receiver){
    this.receiver = receiver;
};
RefreshMenuBarCommand.prototype.execute = function(){
    this.receiver.refresh();
}
var AddSubMenuCommand = function(receiver){
    this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function(){
    this.receiver.add();
}
var DelSubMenuCommand = function(receiver){
    this.receiver = receiver;
};
DelSubMenuCommand.prototype.execute = function(){
    this.receiver.del();
}
/*
	最后就是把命令接收者传入到command对象中，
	并且把command对象安装在button上面
*/
var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);
setCommand(btn1, refreshMenuBarCommand);
setCommand(btn2, addSubMenuCommand);
setCommand(btn3, delSubMenuCommand);
/*
	也许我们会感到很奇怪，所谓的命令模式，
	看起来就是给对象的某个方法取了execute的名字，引入command对象和receiver对象把简单的事情复杂化了。
	命令模式的由来，其实是回调函数的一个面向对象的替代品。 
	在js中，函数作为一等对象，本身就可以被当作参数传递
*/
var btn4 = document.getElementById('button4'),
    btn5 = document.getElementById('button5');

var setCommand2 = function(button, func){
    button.onclick = function(){
        func();
    }
}
var MenuBar = {
    refresh: function(){
        console.log('刷新菜单界面');
    }
}
var RefreshMenuBarCommand1 = function(receiver){
    return function(){
        receiver.refresh();
    }
}
var refreshMenuBarCommand = RefreshMenuBarCommand1(MenuBar);
setCommand2(btn4, refreshMenuBarCommand);
/*
	除了执行命令之外，将来还可能提供撤销命令等操作，
	那我们最好把执行函数改为调用execute方法
*/
var RefreshMenuBarCommand2 = function(receiver){
  	return {
      	execute: function(){
          	receiver.refresh();
      	}
  	}
}
var setCommand3 = function(button, command){
  	button.onclick = function(){
      	command.execute();
  	}
}
var refreshMenuBarCommand = RefreshMenuBarCommand2(MenuBar);
setCommand3(btn5, refreshMenuBarCommand);