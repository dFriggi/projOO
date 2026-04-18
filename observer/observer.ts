class PCD {
  observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer): void {}

  public notifyObserver() {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}

class Attributes extends PCD {
  private temp?: number;
  private ph?: number;
  private pa?: number;
  private ufa?: number;

  getTemp(): number | undefined {
    return this.temp;
  }

  setTemp(temp: number) {
    this.temp = temp;
    this.notifyObserver();
  }

  setPh(ph: number) {
    this.ph = ph;
    this.notifyObserver();
  }

  setPa(pa: number) {
    this.pa = pa;
    this.notifyObserver();
  }

  setUfa(ufa: number) {
    this.ufa = ufa;
    this.notifyObserver();
  }
}

interface Observer {
  update(subject: PCD): void;
}

class University implements Observer {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  public update(subject: PCD): void {
    console.log(`The attributes have changed for ${this.name}`);
  }
}

const river1 = new Attributes();
const river2 = new Attributes();
const river3 = new Attributes();
const river4 = new Attributes();

const unicamp = new University("Unicamp");
const unifesp = new University("Unifesp");
const usp = new University("Usp");
const ufpr = new University("Ufpr");
const ufmg = new University("Ufmg");

river1.addObserver(unicamp);
river1.addObserver(unifesp);
river1.addObserver(usp);

river2.addObserver(unicamp);
river2.addObserver(ufpr);

river3.addObserver(ufmg);

river4.addObserver(ufpr);
river4.addObserver(unifesp);
river4.addObserver(ufmg);

console.log(`River 1`);
river1.setTemp(36);
console.log(`River 2`);
river2.setPh(36);
console.log(`River 3`);
river3.setPa(36);
console.log(`River 4`);
river4.setUfa(36);
