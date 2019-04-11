//создание элемента корзины
class ItemBasket {
  constructor(title, price) {
    this.title = title; //имя элемента берется из бд(но у нас массив)
    this.price = price; //цена элемента берется из бд
  }
  render() {
    return `
<div class="goods-item">
  <img src="img/${this.title}.jpg" alt="${this.title}" class="goods-img">
  <a href="#" class="goods-title">${this.title}</a>
  <p class="goods-price">${this.price} ₽</p>
  <div class="goods-button">
    <button type="submit">
      <svg style="width: 24px; height: 24px;" viewBox="0 0 22 19" xmlns="http://www.w3.org/2000/svg"><path d="M2.72 5.986c0-2.684 1.755-3.664 3.2-3.664 2.528 0 4.8 3.612 4.8 3.612s2.27-3.612 4.798-3.612c1.496 0 3.2.98 3.2 3.664 0 3.25-3.458 7.482-8.05 10.01-4.49-2.58-7.947-6.81-7.947-10.01zM15.57 0c-2.736 0-3.768 1.29-4.8 2.632C9.738 1.29 8.706 0 5.972 0 3.185 0 .45 2.012.45 5.986c0 4.644 4.8 9.958 10.32 12.59 5.522-2.632 10.32-7.946 10.32-12.59C21.09 2.012 18.356 0 15.57 0z" fill="currentColor" fill-rule="evenodd"></path></svg>
    </button>
    <button type="submit">
     <svg style="width: 24px; height: 24px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 18"><g fill="none" fill-rule="evenodd"><path d="M-5-3h24v24H-5z"></path><path fill="currentColor" d="M10 4.001V16h1V4.001h1.999v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2.001-2v-12H3V16h1V4.001h2.5V16h1V4.001H10zM4.499 0L3.5 1.001H.999A1 1 0 0 0 0 2v1.001h14V2a1 1 0 0 0-1.001-.999H10.5L9.499 0h-5z"></path></g></svg>
    </button>
    <button type="submit" class="goods-number">-</button>
    <input autocomplete="off" type="number" maxlength="3" min="1" max="15" class="centered-text" setwidthbymaxlength="true">
    <button type="submit" class="goods-number">+</button>
  </div>
</div>`;
  } //вывод элемента(продукта)
  costs(nam) {
    return `<div class="price"><p class="price-title">Итого: ${nam} ₽</p><button type="submit" class="price-button">Перейти к оформлению</button></div>`;
  } //вывод суммы цен элемента(продукта)
}
//корзина
class Basket {
  constructor() {
    this.products = []; //масив продуктов
  }
  fetchProducts() {
    this.products = [
      {
        title: 'shirt',
        price: 150
      },
      {
        title: 'socks',
        price: 50
      },
      {
        title: 'jacket',
        price: 350
      },
      {
        title: 'shoes',
        price: 250
      },
    ]; //эти данные берутся из бд и записываются в конструктор
  }
  render() {
    let listHtml = ''; //выводящая строчка
    let money; //общая сумма товара
    let cost = ''; //выводит строчку с суммой
    let total = []; //масив только для цены
    //перебор массива продуктов с созданием нового массива
    this.products.forEach(item => {
      const productItem = new ItemBasket(item.title, item.price); //создается новый массив
      listHtml += productItem.render(); //в новый массив записывается строчка из ItemBasket с подставленными значениями
      total.push(item.price); //записываются цены в масив total
      money = total.reduce((sum, current) => {
        return sum + current;
      }, 0); //суммирует данные из масива
      cost = productItem.costs(money); //выводит строчку с суммой
    });
    document.querySelector('.goods-list').innerHTML = listHtml + cost; //вывадим все а див
  }
}

const list = new Basket();
list.fetchProducts();
buttonBasket.onclick = function () {
  list.render();
  buttonBasket.className = "open-basket";
  buttonCloseBasket.className = "open-span";
};
buttonCloseBasket.onclick = function () {
  document.querySelector('.goods-list').innerHTML = "";
  buttonBasket.className = "close-basket";
  buttonCloseBasket.className = "close-span";
};