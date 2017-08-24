/*
	迭代器模式是指通过一种方法顺序访问一个聚合对象的各个元素，
	而又不需要暴露该对象的内部表示，
	在使用迭代器模式之后，
	即使不关心对象的内部构造，也可以按顺序访问其中的每个元素
*/
/*
	现在我们自己实现一个each函数，
	接受两个参数，
	第一个为被循环的数组，
	第二个为循环中的每一步将被触发的回调函数
*/
var each = function(arr, callback){
	for(var i = 0, len = arr.length; i < len; i++){
		//把下标和元素，当做参数传给callback函数
		callback.call(arr[i], i, arr[i]);
	}
}
each([1, 2, 3], function(k, v){
	console.log('each', k, v);
});
/*
   each属于内部迭代器，
   each函数的内部已经定义好了迭代规则，
   外界不用关心迭代器的实现，跟迭代器的交互也仅仅是一次初始调用，
   但如果现在有个需求，要判断2个数组元素的值是否相等，
   如果不改写each函数的代码，只能在callback中实现
*/
var compare = function(arr1, arr2){
	var len1 = arr1.length,
		len2 = arr2.length;
	if(len1 !== len2){
		throw new Error('arr1和arr2不相等');
	}
	each(arr1, function(k, v){
		if(v !== arr2[k]){
			throw new Error('arr1和arr2不相等');
		}
	});
	console.log('compare', 'arr1和arr2相等');
}
compare([1, 2, 3], [1, 2, 3]);
/*
	外部迭代器必须显示地请求下一个迭代元素，
	增加了一些调用的复杂度，
	但相对也增强了迭代器的灵活性
*/
var Iterator = function(obj){
	var current = 0;

	var next = function(){
		current++;
	}
	var isDone = function(){
		return current >= obj.length;
	}
	var getCurrItem = function(){
		return obj[current];
	}
	return {
		next: next,
		isDone: isDone,
		getCurrItem: getCurrItem
	}
}
/*
	再看看如何改写compare函数
*/
var compare2 = function(iterator1, iterator2){
	while(!iterator1.isDone && !iterator2.isDone){
		if(iterator1.getCurrItem() !== iterator2.getCurrItem()){
			throw new Error('iterator1和iterator2不相等');
		}
		iterator1.next();
		iterator2.next();
	}
	console.log('compare2', 'iterator1和iterator1相等');
}
var iterator1 = Iterator([1, 2, 3]),
	iterator2 = Iterator([1, 2, 3]);
compare2(iterator1, iterator2);
/*
	迭代器模式不仅可以迭代数组，
	还可以迭代一些类数组的对象，
	比如jQuery中提供了each函数来封装各种迭代行为	
*/
var $each = function(obj, callback){
	var value,
		i = 0,
		len = obj.length,
		isArray = obj instanceof Array;
		if(isArray){
			for(; i < len; i++){
				//callback中有一个return值，如果false则结束迭代
				value = callback.call(obj[i], i , obj[i]);
				if(value === false){
					break;
				}
			}
		} else {
			for(i in obj){
				value = callback.call(obj[i], i , obj[i]);
				if(value === false){
					break;
				}
			}
		}
	return obj;
}
$each({ 
	x: 1,
	y: 2
}, function(k, v){
	v++;
	console.log('$each', v);
});
