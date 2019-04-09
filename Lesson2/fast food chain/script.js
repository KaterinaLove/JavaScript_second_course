'use strict'

class Hamburger {
  constructor(size, sauce, flavoring, mayo) {
    this.size = size;//размер гамбургера
    this.sauce = sauce;//начинка
    this.flavoring = flavoring;//приправа
    this.mayo = mayo;//майонез
    this.price = 0;
    this.calories = 0;
  }
  count() {
    //проверка размера
    if (this.size == 'small') {
      this.price += 50;
      this.calories += 20;
    } else {
      this.price += 100;
      this.calories += 40;
    }
    //проверка начинки
    switch (this.sauce) {
      case 'cheese':
        this.price += 10;
        this.calories += 20;
        break;
      case 'salad':
        this.price += 20;
        this.calories += 5;
        break;
      case 'potatoes':
        this.price += 15;
        this.calories += 10;
        break;
    }
    //проверка наличия приправы
    if (this.flavoring) {
      this.price += 15;
      this.calories += 5;
    }
    //проверка наличия майонеза
    if (this.mayo) {
      this.price += 20;
      this.calories += 0;
    }

    return count.innerHTML = `
<span>Цена: ${this.price}</span>
<span>Каллории: ${this.calories}</span>`;
  }
}

submit.onclick = function () {
  const hamburger = new Hamburger(size.value, sauce.value, flavoring.checked, mayo.checked);
  hamburger.count();
};