import DoublyLinkedList from './doubly_linked_list';

/**
 * Implementation of the Queue interface using a doubly-linked list
 */
class DLLQueue {
  /**
   * Create an empty queue
   */

  constructor() {
    this.storage = new DoublyLinkedList();
    this.counter = 0;
  }
  /**
   * Add an element to the back of the queue
   * 
   * @param {any} element Data to track
   * @returns {ticket} Cancellation ticket
   */
  enqueue(element) {
    if (element !== undefined) {
      // element = LL's node here
      this.storage.insertTail(element)
      this.counter++;
      return this.storage._tail();

    }
  }

  /**
   * Remove an element from the queue
   * 
   * @param {ticket} ticket Cancellation ticket, as returned by `enqueue`
   * @returns Stored element
   */
  cancel(ticket) {
    const cancelledTicket = this.storage.remove(ticket);
    if (cancelledTicket !== undefined) {
      this.counter-- ;
    }
    return cancelledTicket;
  }

  /**
   * Remove the element at the front of the queue
   * 
   * @returns Stored element
   */
  dequeue() {
    // skip cancelled elements at the front of the queue
    const prevHead = this.storage._head();
    if (this.counter !== 0) {
      this.storage.removeHead();
      this.counter-- ;
    }
    return prevHead.element

  }

  /**
   * How many elements are currently in the queue?
   * 
   * @returns {number} Current count
   */
  count() {
    return this.counter;

  }

  /**
   * @callback forEachCallback
   * @param element The element stored at this position
   * @param {number} index The index of this element
   * @param {DLLQueue} queue This queue
   */

  /**
   * Invoke a callback on each element in the queue, in insertion order
   * 
   * @param {forEachCallback} callback Function to invoke
   */
  forEach(callback) {
    let node = this.storage._head();
    let i = 0;
    while (node !== this.storage._sentinel) {
      callback(node.element, i, this);
      node = node.next;
      i++;
    }
  }
}

export default DLLQueue;