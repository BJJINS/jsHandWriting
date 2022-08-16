class Subject {
  observerList = [];
  constructor() {}
  addObserver(observer) {
    this.observerList.push(observer);
  }
  removeObserver(observer) {
    const index = this.observerList.findIndex((o) => o.name === observer.name);
    this.observerList.splice(index, index);
  }
  notifyObservers(message) {
    const observers = this.observerList;
    observers.forEach((observer) => observer.notified(message));
  }
}
class Observer {
  name;
  constructor(name, subject) {
    this.name = name;
    if (subject) {
      subject.addObserver(this);
    }
  }
  notified(message) {
    console.log("this.name,message", this.name, message);
  }
}
const subject = new Subject();
const observerA = new Observer("observerA", subject);
const observerB = new Observer("observerB");
subject.addObserver(observerB);
subject.notifyObservers("Hello from subject");
subject.removeObserver(observerA);
subject.notifyObservers("Hello again");
