const GOODS = [
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

// при нажатии на кнопку отрисовывоем товары
but.onclick = function () {
  for (let i = 0; i < GOODS.length; i++) {
    let div = document.createElement('div');              //создает элемент div
    div.className = "goods-list";                         //присваевает ему класс 
    div.innerHTML =                                       //записывает содержимое
      `<h3 class="title">${GOODS[i].title}</h3><p class="price">${GOODS[i].price}</p>`;   
    main.append(div);                                     //добавляет элемент на страницу
  }
};

/*
map - функция перебора и создания нового массива 
goodsList - название нового массива
GOODS - массив который мы перебираем
item - переменная стрелочной функции принимает значения от 0 до goods.length
renderGoodsList - вызываемая функция в которую передается goods[item].title и записывается в goodsList
querySelector - вернется первый элемент в документе с классом goods-list
Выводятся запятые потому, что мы вывадим массив, а разделителем в массиве ясляется ','
В этом примере убрала функцию генирирует часть будующего массива
перенесла ее в стрелочную функцию item и уменьнила код тем самым на 3 строки
join('') - выводит массив с указанным разделителем
*/
const renderGoodsList = (list) => {
let goodsList = list.map(item =>
    `<div class="goods-item"><h3>${item.title}</h3><p>${item.price}</p></div>`);
  document.querySelector('.goods-list').innerHTML = goodsList.join('');
}
renderGoodsList(GOODS);