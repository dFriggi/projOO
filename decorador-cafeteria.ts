interface Drink {
  getPrice(): number;
}

class Coffe implements Drink {
  getPrice(): number {
    return 5;
  }
}

class Cappuccino implements Drink {
  getPrice(): number {
    return 8;
  }
}

class Tea implements Drink {
  getPrice(): number {
    return 4;
  }
}

class DrinkDecorator implements Drink {
  protected drink: Drink;
  constructor(drink: Drink) {
    this.drink = drink;
  }

  public getPrice(): number {
    return this.drink.getPrice();
  }
}

class Milk extends DrinkDecorator {
  public constructor(drink: Drink) {
    super(drink);
  }

  public getPrice(): number {
    return super.getPrice() + 3;
  }
}

class Chantilly extends DrinkDecorator {
  public constructor(drink: Drink) {
    super(drink);
  }

  public getPrice(): number {
    return super.getPrice() + 8;
  }
}

class ChocolateSyrup extends DrinkDecorator {
  public constructor(drink: Drink) {
    super(drink);
  }

  public getPrice(): number {
    return super.getPrice() + 5;
  }
}

class Cinnamon extends DrinkDecorator {
  public constructor(drink: Drink) {
    super(drink);
  }

  public getPrice(): number {
    return super.getPrice() + 1;
  }
}

const coffe1 = new Milk(new Chantilly(new Cinnamon(new Coffe())));
console.log(coffe1.getPrice());
