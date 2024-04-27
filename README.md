# custom-event-store

## install

```
npm install custom-event-store
```

## usage

```
import { createStore } from "custom-event-store";

const store  = createStore();

// inside some component
store.emit("myComponentsAction", {data: 'to emit'});

// some other component
store.on("myComponentsAction", callback)
```
