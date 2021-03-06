js设计模式
--


单例模式：
-

  demo在`tmpl/Single case.html`中,详细讲解在[js单例模式](http://blog.csdn.net/sysuzhyupeng/article/details/68953103)中。单例模式很好理解，就是对于一个类或者构造函数，只创建一个实例。惰性单例指的是在需要的时候才创建对象实例。
  
命令模式：
-
  demo在`tmpl/command.html`中,详细讲解在[js命令模式](http://blog.csdn.net/sysuzhyupeng/article/details/70224146)中。命令模式中的命令command指的是一个执行某些特定事情的指令。命令模式最常见的应用场景是：有时候需要向某些对象发送请求，但是并不知道请求的接受者是谁，此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。

模板模式：
-
  demo在`tmpl/template.html`中,详细讲解在[js模板模式](http://blog.csdn.net/sysuzhyupeng/article/details/70226944)中，模版方法模式由两部分结构组成(核心是抽离相同逻辑，所以适用于两个或多个很相似的对象)。在模版方法模式中，子类实现中的逻辑相同部分被上移到父类中，而将不同的部分留待子类来实现。
  
观察者模式：
-
  demo在`tmpl/observer.html`中,详细讲解在[js观察者模式](http://blog.csdn.net/sysuzhyupeng/article/details/69043583)中。观察者模式又叫发布-订阅模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态改变时，所有依赖于它的对象都将得到通知实际上我们在DOM节点上绑定事件处理函数，就是一种发布-订阅模式。

迭代器模式：
-
  demo在`tmpl/iterator.html`中，迭代器模式是指通过一种方法顺序访问一个聚合对象的各个元素，而又不需要暴露该对象的内部表示，在使用迭代器模式之后，
即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

装饰者模式：
-
  demo在`tmpl/decorator.html`中。在面向对象中，给对象添加功能通常使用继承的方式，但是继承的同时也会破坏封装，因为超类的内部细节是对子类可见的。给对象动态添加职责的方式称为装饰者模式，装饰者模式能在不改变对象自身的情况下，在程序运行期间动态地添加职责。(也就是不通过继承来扩展对象)，比如通过面向切面编程的修改Function.prototype.before。或者将函数传入后return一个新函数。

状态模式：
-
  demo在`tmpl/state.html`中。状态模式的关键是把事物的每种状态都封装成单独的类。避免将事物的的多种状态挤在一个对象中，不容易扩展。

元素属性模式：
-
  demo在`tmpl/flyweight.html`中，元素属性模式是一种用于性能优化的模式，解决的是内存分配的问题。当需要批量创建多个对象的时候，需要对对象属性做一些优化。

