class ArrayQueue {
  constructor() {
    this.storage = [];

    // pointers
    this.head = 0;
    this.tail = 0;

    // Number of cancelled elements between head and tail
    this.cancelCount = 0;
  }

  enqueue(element) {
    const ticket = this.tail;
    this.storage[this.tail] = element;
    this.tail += 1;
    // Return element just added to queue 
    return ticket;
  }

  cancel(ticket) {
    if (this.storage[ticket] !== undefined) {
      this.storage[ticket] = undefined;
      this.cancelCount += 1;
    }
  }

  dequeue() {
    // skip cancelled elements at the front of the queue
    while (this.head < this.tail && this.storage[this.head] === undefined) {
      this.head += 1;
      this.cancelCount -= 1;
    }

    // if there's only one element in array
    if (this.head === this.tail) {
      return undefined;
    }

    // mark first non-undefined element in array 
    const element = this.storage[this.head];
    this.storage[this.head] = undefined;
    this.head += 1;
    return element;
  }

  // counts total existance of elements in array
  count() {
    return this.tail - this.head - this.cancelCount;
  }

  forEach(callback) {
    let skipCount = 0;
    for (let i = this.head; i < this.tail; i += 1) {
      if (this.storage[i] === undefined) {
        skipCount += 1;
        continue;
      }
      const index = i - this.head - skipCount;
      callback(this.storage[i], index, this);
    }
  }
}

export default ArrayQueue;