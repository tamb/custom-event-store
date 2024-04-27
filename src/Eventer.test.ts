import { describe, it, expect } from "bun:test";
import { Eventer } from "./Eventer";

describe("Eventer", () => {
  it("should return an Eventer instance", () => {
    const eventer = new Eventer();
    expect(eventer).toBeInstanceOf(Eventer);
  });

  it("initializes state with an empty object", () => {
    const eventer = new Eventer();
    expect(eventer.state).toEqual([{}]);
    expect(eventer.getState()).toEqual({});
  });

  it("updates state with an object", () => {
    const eventer = new Eventer();
    eventer.updateState({ a: 1 });
    expect(eventer.getState()).toEqual({ a: 1 });
  });

  it("does not mutate the original state", () => {
    const eventer = new Eventer();
    const originalState = { a: 1 };
    eventer.updateState(originalState);
    expect(eventer.getState()).toEqual({ a: 1 });
    eventer.updateState({ b: 2 });
    expect(eventer.getState()).toEqual({ a: 1, b: 2 });
    expect(eventer.getState(1)).toEqual({ a: 1 });
  });

  it("gets the state at the specified index", () => {
    const eventer = new Eventer();
    eventer.updateState({ a: 1 });
    eventer.updateState({ b: 2 });
    expect(eventer.getState(2)).toEqual({ a: 1, b: 2 });
    expect(eventer.getState(1)).toEqual({ a: 1 });
    expect(eventer.getState(0)).toEqual({});
  });
});
