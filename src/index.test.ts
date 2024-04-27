import { describe, it, expect } from "bun:test";
import { createStore } from "./index";
import { Eventer } from "./Eventer";

describe("createStore", () => {
  it("should return an Eventer instance", () => {
    const eventer = createStore();
    expect(eventer).toBeInstanceOf(Eventer);
  });
});
