//ресурс с JSON пакетами
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//проверка соединения
function makeGETRequest(url) {
  var xhr;
  return new Promise((resolve, reject) => { //Ура промис для каталога готов)
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) { //потому что он проходит цикл от 1 до 4
        if (xhr.status == 200) { //дожидаемся положительного результата
          resolve(xhr.responseText); //возвращаем данные
        } else {
          reject(xhr.error);
        }
      }
    }
    xhr.open('GET', url, true);
    xhr.send();
  });
}
//отправка данных
function spendGETRequest(url) {
  //тут ajax, но пока буду работать с обычным массивом
}


//продукты
class Products {
  constructor() {
    this.products = []; //массив продуктов
  }
  fetchProducts(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`)
      .then((products) => {
          // Колбэк для resolve()
          this.products = JSON.parse(products);
          cb();
        },
        () => {
          console.log('error')
          // Колбэк для reject()
        });
  }
  render() {
    let listHtml = ''; //выводящая строчка
    let i = 0;
    //перебор массива продуктов с созданием нового массива
    this.products.forEach(item => {
      const productItem = new ItemBasket(i, item.product_name, item.price); //создается новый массив
      listHtml += productItem.renderProducts();
      i++;
    });
    document.querySelector('.products').innerHTML = listHtml;
  }
}

//корзина
class Basket {
  constructor() {
    this.basket = []; //массив продуктов в корзине
  }
  fetchProducts(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`)
      .then((basket) => {
          // Колбэк для resolve()
          this.basket = JSON.parse(basket);
          cb();
        },
        () => {
          console.log('error')
          // Колбэк для reject()
        });
  }
  render() {
    let listHtml = ''; //выводящая строчка
    let money; //общая сумма товара
    let cost = ''; //выводит строчку с суммой
    let total = []; //массив только для цены
    let i = 0;
    //перебор массива продуктов с созданием нового массива
    if (this.basket.length != 0) {
      this.basket.forEach(item => {
        const productItem = new ItemBasket(i, item.product_name, item.price); //создается новый массив
        listHtml += productItem.render(); //в новый массив записывается строчка из ItemBasket с подставленными значениями
        total.push(item.price); //записываются цены в массив total
        money = total.reduce((sum, current) => {
          return sum + current;
        }, 0); //суммирует данные из массива
        cost = productItem.costs(money); //выводит строчку с суммой
        i++;
      });
      document.querySelector('.goods-list').innerHTML = listHtml + cost; //выводим всё а див
    } else {
      document.querySelector('.goods-list').innerHTML = 'Корзина пуста';
    }
  }
  // для удаления из корзины(a должен быть метод post для отправки данных с помощью ajax и php)
  from(event) {
      this.basket.splice(event.target.id, 1);
      this.render();
    }
  // для добавления в корзину
  in(event) {
    this.basket.push(prod.products[event.target.id]);
    this.render();
  }
}

//создание элемента корзины
class ItemBasket {
  constructor(i, title, price) {
    this.id_product = i; //имя кнопки 
    this.title = title; //имя элемента 
    this.price = price; //цена элемента 
  }
  //вывод элемента(продукта)
  render() {
    return `
<div class="goods-item">
  <img src="img/1.jpg" alt="${this.title}" class="goods-img">
  <a href="#" class="goods-title">${this.title}</a>
  <p class="goods-price">${this.price} ₽</p>
  <div class="goods-button">
    <button type="submit" id="${this.id_product}" onclick="list.from(event);">
     Удалить
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
<button type="submit" class="goods-number" id="${this.id_product}" onclick="list.in(event);">
В корзину
</button>
  <p class="goods-price">${this.price} ₽</p>`
  }
}

//создание каталога продуктов
const prod = new Products();
prod.fetchProducts(() => {
  prod.render();
});
//создаем новую корзину
const list = new Basket();
//list.fetchProducts();
//открываем корзину поверх основного сайта
buttonBasket.onclick = function () {
  list.fetchProducts(() => {
    list.render();
  });

  buttonBasket.className = "open-basket";
  buttonCloseBasket.className = "open-span";
};

//закрываем корзину
buttonCloseBasket.onclick = function () {
  document.querySelector('.goods-list').innerHTML = "";
  buttonBasket.className = "close-basket";
  buttonCloseBasket.className = "close-span";
};
