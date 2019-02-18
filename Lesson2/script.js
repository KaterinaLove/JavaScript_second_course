class ItemBasket {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
  costs(nam) {
    return `<div class="goods-item"><p>Общая сумма товара: ${nam}</p></div>`;
    
  }
}

class Basket {
  constructor() {
    this.products = [];
  }
  fetchProducts() {
    this.products = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }
  render() {
    let listHtml = '';
    let money;
    let cost = '';
    let total = [];
    this.products.forEach(item => {
      const productItem = new ItemBasket(item.title, item.price);
      listHtml += productItem.render();
      total.push(item.price);
      money = total.reduce((sum, current) => {
        return sum + current;
      }, 0);
      cost = productItem.costs(money);
    });
    document.querySelector('.goods-list').innerHTML = listHtml + cost;
  }
}


const list = new Basket();
list.fetchProducts();
list.render();
