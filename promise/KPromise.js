class KPromise {
  constructor(handle) {
    this.status = "padding";
    this.value = null;

    // this.resolveFn = null;
    // this.rejectFn = null;
    //数组队列
    this.resolveQueue = [];
    this.rejectQueue = [];
    handle(this._resolve.bind(this), this._reject.bind(this));
  }
  _resolve(res) {
    this.status = "fulfilled";
    this.value = res;
    const run = () => {
      let cb;
    //   let a = this.resolveQueue;
    //   console.log(a);
      while ((cb = this.resolveQueue.shift())) {
        // console.log(cb);
        cb && cb(res);
      }
    };
    //MutationObserver是一个新的微任务，会被加到本次大型任务的微任务的结尾，所以会先then，再来执行，模拟成setTimeout的效果
    const ob = new MutationObserver(run);
    ob.observe(document.body, { attributes: true });
    document.body.setAttribute("microTesk", "Simulated micro task");
    // setTimeout(run);
  }
  _reject(rej) {
    this.status = "rejected";
    this.value = rej;
    const run = () => {
      let cb;
      while ((cb = this.rejectQueue.shift())) {
        cb && cb(rej);
      }
    };
    const ob = new MutationObserver(run);
    ob.observe(document.body, { attributes: true });
    document.body.setAttribute("microTesk", "Simulated micro task");
  }
  then(onResolved, onRejected) {
    return new KPromise((resolve, reject) => {
      this.resolveQueue.push((val) => {
        let res = onResolved && onResolved(val);
        if (res instanceof KPromise) {
          return res;
        }
        resolve(res);
      });
      this.resolveQueue.push((val) => {
        let rej = onRejected && onRejected(val);
        if (rej instanceof KPromise) {
          return rej;
        }
        reject(rej);
      });
    });
  }
}
