// aa={
//     a:{b:0.4},
//     d:{b:0.5},
//     c:{b:0.6}
//     }
//     arr =[]
//     arr2 =[]

//     console.log(aa.a.b)
//     console.log(aa['a'].b)
//     // arr2.push(aa.a.b)
//     // arr2.push(aa.a.b)
//     // arr2.push(aa.a.b)
//     console.log(arr2)
//     console.log('aa : ',aa)
//     // arr.push(aa['a'].b)
//     bb=Object.keys(aa)
//     console.log('bb: ',bb)
//     for (i in aa){
//         arr2.push(aa.a.b)
//         arr.push({name:i, data:arr2})
//     }
//     console.log(arr)

// str = 'abcdefg'
// var res = str.slice(0, -1);
// console.log(res)

// const inventory = {
//     a: {name: 'apples', quantity: 2},
//     b:{name: 'bananas', quantity: 0},
//     c:{name: 'cherries', quantity: 5}
// };
// const inventory = [
//     {name: 'apples', quantity: 2},
//     {name: 'bananas', quantity: 0},
//     {name: 'cherries', quantity: 5}
//   ];
//   const result = inventory.find( ({ name }) => name === 'cherries' ); //for each name='cherries in the filtered object find it in inventory object
//   //the same as :
//   //const result = inventory.find( function({ name }) { 
//   //  return name === 'cherries' ;
//   console.log(result) // { name: 'cherries', quantity: 5 }


  myArray = [{'id':'73','foo':'bar'},{'id':'45','foo':'bar'}]
  console.log(myArray.find(x => x.id === '45').foo)
  console.log(myArray.findIndex(x => x.id === '45'))
  console.log(myArray.filter(x => x.id === '45'))

  


