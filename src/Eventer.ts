interface IEventerOptions {
  returnFullState?: boolean;
}

export class Eventer {
  public state: any[];
  private options: IEventerOptions;
  constructor(eventerOptions: IEventerOptions = {}) {
    this.options = {
      returnFullState: false,
      ...eventerOptions,
    };
    this.state = [{}];

    this.getState = this.getState.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  /**
   * Emits a custom event with the given event name, data, and options.
   *
   * @param {string} eventName - The name of the event to emit.
   * @param {any} data - The data to be passed along with the event.
   * @param {any} options - Additional options for customizing the event.
   * @return {void} No return value.
   */
  emit(eventName: string, data: any, options: any): void {
    let target = window;
    if (options?.target) {
      target = document.querySelector(options.target);
    }

    if (data) {
      this.updateState(data);
    }

    target.dispatchEvent(
      new CustomEvent(eventName, {
        detail: this.options.returnFullState
          ? this.getState()
          : options?.returnFull
          ? this.getState()
          : data,
        bubbles: true,
        passive: true,
        ...options,
      })
    );
  }

  /**
   * Attaches an event listener to the specified source or the window object.
   *
   * @param {string} eventName - The name of the event to listen for.
   * @param {any} handler - The function to be called when the event is triggered.
   * @param {any} options - Additional options for configuring the event listener.
   * @return {void} This function does not return a value.
   */
  on(eventName: string, handler: any, options?: any): void {
    const source = options?.source ? document.querySelector(options.source) : window;

    delete options.source;
    source.addEventListener(eventName, handler, options);
  }

  /**
   * Removes an event listener from the specified target or the window object.
   *
   * @param {string} eventName - The name of the event.
   * @param {any} handler - The event handler function to remove.
   * @param {any} source - The target element to remove the event listener from. If not provided, the window object will be used.
   * @return {void} This function does not return a value.
   */
  off(eventName: string, handler: any, source?: any): void {
    const target = source || window;
    target.removeEventListener(eventName, handler);
  }

  /**
   * A description of the entire function.
   *
   * @param {type} data - description of parameter
   * @return {void} No return value
   */
  updateState(data = {}): void {
    const cloned = structuredClone(this.getState());
    const newState = {
      ...cloned,
      ...data,
    };

    this.state.push(newState);
  }

  /**
   * Retrieves the state at the specified index. If no index is provided, returns the last state in the array.
   *
   * @param {number} index - The index of the state to retrieve. Optional.
   * @return {any} The state at the specified index, or the last state if no index is provided.
   */
  getState(index?: number): any {
    let requestedIndex = index !== undefined ? index : this.state.length - 1;
    return this.state[requestedIndex];
  }
}
