export default class Parser {
  constructor(func) {
    func({});
    this.parse = func;
  }

  toString() {
    return this.parse.toString();
  }
}