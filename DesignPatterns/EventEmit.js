class EventEmit {
  events = {};
  constructor() {}
  on(evtName, callback) {
    const eventHandler = this.events[evtName];
    if (eventHandler) {
      this.events[evtName].push(callback);
    } else {
      this.events[evtName] = [callback];
    }
  }
  trigger(evtName, ...args) {
    if (this.events[evtName]) {
      this.events[evtName].forEach((eventListener) => {
        eventListener(...args);
      });
    }
  }
}
const weatherEvent = new EventEmit();

weatherEvent.on("warning", function () {
  console.log("buildingsite.stopwork()");
});

weatherEvent.on("warning", function () {
  console.log("ships.mooring()");
});

weatherEvent.on("warning", function () {
  console.log("tourists.canceltrip()");
});
weatherEvent.trigger("warning");
