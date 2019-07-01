const mockDataProxyHandler = {
  get: () => new Proxy({}, mockDataProxyHandler)
}

export default class Parser {
  constructor(func) {
    this.parse = eval(`(${func})`);
    const mockData = new Proxy({}, mockDataProxyHandler);
    this.parse(mockData);
  }

  toString() {
    return this.parse.toString();
  }
}