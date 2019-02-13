const goods = [
  {
    title: 'Shirt',
    price: 150
  },
  {
    title: 'Socks',
    price: 50
  },
  {
    title: 'Jacket',
    price: 350
  },
  {
    title: 'Shoes',
    price: 250
  },
];

but.onclick = function () {
  for (var i = 0; i < goods.length; i++) {
    var div = document.createElement('div');
    div.className = "goods-list";
    div.innerHTML = '<h3 class="title">' + goods[i].title + '</h3><p class="price">' + goods[i].price + '</p>';
    main.appendChild(div);
  }
};
/*
//генирирует часть будующего массива
const renderGoodsItem = (title, price) => {
  return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};
const renderGoodsList = () => {
  //map функция перебора исоздания нового массива 
  //goodsList - название нового массива
  //goods - массив который мы перебираем
  //item - переменная стрелочной функции принимает значения от 0 до goods.length
  //renderGoodsItem - вызываемая функция в которую передается goods[item].title и записывается в goodsList
  let goodsList = goods.map(item => renderGoodsItem(item.title, item.price));
  //querySelector - вернется первый элемент в документе с классом goods-list
  //Выводятся запятые потому, что мы вывадим массив, а разделителем в массиве ясляется ','
  document.querySelector('.goods-list').innerHTML = goodsList;
}
renderGoodsList();
*/

//В этом примере убрала функцию генирирует часть будующего массива
//перенесла ее в стрелочную функцию item и уменьнила код тем самым на 3 строки
//Дабавила значения по умолчанию для аргументов функции (list = goods)
//join('') - выводит массив с указанным разделителем
const renderGoodsList = (list = goods) => {
  let goodsList = list.map(item => `<div class="goods-item"><h3>${item.title}</h3><p>${item.price}</p></div>`);
  document.querySelector('.goods-list').innerHTML = goodsList.join('');
}
renderGoodsList();