//ресурс с JSON пакетами
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//проверка соединения
function makeGETRequest(url, callback) {
  var xhr;
  console.log('Получение данных...');

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}

//создание элемента корзины
class ItemBasket {
  constructor(title, price) {
    this.title = title; //имя элемента берется из бд(но у нас массив)
    this.price = price; //цена элемента берется из бд
  }
  //вывод элемента(продукта)
  render() {
    return `
<div class="goods-item">
  <img src="img/1.jpg" alt="${this.title}" class="goods-img">
  <a href="#" class="goods-title">${this.title}</a>
  <p class="goods-price">${this.price} ₽</p>
  <div class="goods-button">
    <button type="submit" id="fromBasket" onclick="list.from();">
     <svg style="width: 24px; height: 24px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 18"><g fill="none" fill-rule="evenodd"><path d="M-5-3h24v24H-5z"></path><path fill="currentColor" d="M10 4.001V16h1V4.001h1.999v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2.001-2v-12H3V16h1V4.001h2.5V16h1V4.001H10zM4.499 0L3.5 1.001H.999A1 1 0 0 0 0 2v1.001h14V2a1 1 0 0 0-1.001-.999H10.5L9.499 0h-5z"></path></g></svg>
    </button>
  </div>
</div>`;
  }
  //вывод суммы цен элемента(продукта)
  costs(nam) {
    return `<div class="price"><p class="price-title">Итого: ${nam} ₽</p><button type="submit" class="price-button">Перейти к оформлению</button></div>`;
  }
  //Вывод каталога продуктов
  renderProducts() {
    return `<a href="#" class="goods-title">${this.title}</a>
<button type="submit" class="goods-number" id="inBasket" onclick="list.in();">
В корзину
</button>
  <p class="goods-price">${this.price} ₽</p>`
  }
}

//продукты
class Products {
  constructor() {
    this.products = []; //масив продуктов
  }
  fetchProducts(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (products) => {
      this.products = JSON.parse(products);
      cb();
    })
  }
  render() {
    let listHtml = ''; //выводящая строчка
    //перебор массива продуктов с созданием нового массива
    this.products.forEach(item => {
      const productItem = new ItemBasket(item.product_name, item.price); //создается новый массив
      listHtml += productItem.renderProducts();
    });
    document.querySelector('.products').innerHTML = listHtml;
  }
}

//корзина
class Basket {
  constructor() {
    this.basket = []; //масив продуктов в карзине
  }
  fetchProducts() {
    makeGETRequest(`${API_URL}/getBasket.json`, (products) => {
      this.basket = JSON.parse(products);
    })
  }
  render() {
    let listHtml = ''; //выводящая строчка
    let money; //общая сумма товара
    let cost = ''; //выводит строчку с суммой
    let total = []; //масив только для цены
    //перебор массива продуктов с созданием нового массива
    if (this.basket.length != 0) {
      this.basket.contents.forEach(item => {
        const productItem = new ItemBasket(item.product_name, item.price); //создается новый массив
        listHtml += productItem.render(); //в новый массив записывается строчка из ItemBasket с подставленными значениями
        total.push(item.price); //записываются цены в масив total
        money = total.reduce((sum, current) => {
          return sum + current;
        }, 0); //суммирует данные из масива
        cost = productItem.costs(money); //выводит строчку с суммой
      });
      document.querySelector('.goods-list').innerHTML = listHtml + cost; //вывадим все а див
    } else {
      document.querySelector('.goods-list').innerHTML = 'Корзина пуста';
    }
  }
  // для удаления из корзины(ошибка: это не функция)
  from() {
      makeGETRequest(`${API_URL}/deleteFromBasket.json`, (products) => {
        console.log(JSON)
        //this.basket.splice(0, JSON.parse)
      })
    }
    // для добовления в корзину(ошибка: это не функция)
    in () {
      makeGETRequest(`${API_URL}/addToBasket.json`, (products) => {
        console.log(JSON)
        //this.basket.push(JSON.parse)
      })
    }
}
//создание каталога продуктов
const prod = new Products();
prod.fetchProducts(() => {
  prod.render();
});
//создаем новую корзину
const list = new Basket();
list.fetchProducts();
//открываем корзину поверх основного сайта
buttonBasket.onclick = function () {
  list.render();
  buttonBasket.className = "open-basket";
  buttonCloseBasket.className = "open-span";
};
//программа не знает о их существавании
//fromBasket.onclick = function () {
//  list.from();
//}
//inBasket.onclick = function () {
//  list.in();
//}

//закрываем корзину
buttonCloseBasket.onclick = function () {
  document.querySelector('.goods-list').innerHTML = "";
  buttonBasket.className = "close-basket";
  buttonCloseBasket.className = "close-span";
};
