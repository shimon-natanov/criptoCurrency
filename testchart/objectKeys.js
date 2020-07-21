var obj = {"1":5,"2":7,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0}
console.log(Object.keys(obj))
//[
//    '1', '2',  '3',  '4',
//     '5', '6',  '7',  '8',
//     '9', '10', '11', '12'
//   ]

console.log(Object.entries(obj)) //Calling entries, as shown here, will return [key, value] pairs
var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
console.log(result);
// [
//     [ '1', 5 ],  [ '2', 7 ],
//     [ '3', 0 ],  [ '4', 0 ],
//     [ '5', 0 ],  [ '6', 0 ],
//     [ '7', 0 ],  [ '8', 0 ],
//     [ '9', 0 ],  [ '10', 0 ],
//     [ '11', 0 ], [ '12', 0 ]
//   ]

const obj1={"1":9,"2":8,"3":7,"4":6,"5":5,"6":4,"7":3,"8":2,"9":1,"10":0,"12":5};
console.log(Object.entries(obj1).map(([k,v])=>[+k,v]));
//[[1,9],[2,8],[3,7],[4,6],[5,5],[6,4],[7,3],[8,2],[9,1],[10,0],[12,5]]

let r=new Map(Object.entries(obj1));
r.get("4"); //6
r.has(8); //true

const obj2 = {
    '1': 29,
    '2': 42
  };
const arr = Array.from(Object.keys(obj2), k=>[`${k}`, obj[k]]);
console.log('obj2 : ',arr);
// [ [ '1', 5 ], [ '2', 7 ] ]

var obj3 = {
    "1": 5,
    "2": 7,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": 0,
    "11": 0,
    "12": 0
  };
  // get all object property names
  var res = Object.keys(obj3)
    // iterate over them and generate the array
    .map(function(k) {
      // generate the array element 
      return [+k, obj3[k]];
    });
    console.log('res',res)

    // res  [
    //     [ 1, 5 ],  [ 2, 7 ],
    //     [ 3, 0 ],  [ 4, 0 ],
    //     [ 5, 0 ],  [ 6, 0 ],
    //     [ 7, 0 ],  [ 8, 0 ],
    //     [ 9, 0 ],  [ 10, 0 ],
    //     [ 11, 0 ], [ 12, 0 ]
    //   ]
  



o = {
    zoc : { name : 'shimon', age : 45},
    zoa : { name : 'shimon', age : 45},
    zob : { name : 'shimon', age : 45}
}
a = Object.keys(o).map ( key => o[key]) // on each key return o[key]
console.log('a : ', a)
// a :  [
//     { name: 'shimon', age: 45 },
//     { name: 'shimon', age: 45 },
//     { name: 'shimon', age: 45 }
//   ]

var o4 = {
    a:{name:'aab',age:1},
    b:{name:'aac',age:12},
    c:{name:'aad',age:13},
    d:{name:'aae',age:14},
    e:{name:'aaf',age:15},
    f:{name:'aag',age:16}
}
temp = Object.keys(o4)
console.log('temp : ', temp)
// temp :  [ 'a', 'b', 'c', 'd', 'e', 'f' ]