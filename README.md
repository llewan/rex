# Rex
Simple library for helping share and manage state in react applications  

## Installation
```
npm install --save rex-react
```

And then import it:
```
// ES6 modules
import { Provider, Listener } from 'rex-react';

// commonjs
const Provider = require('rex-react').Provider;
const Listener = require('rex-react').Listener;
```

## Guide
First, wrap your main component with `Provider` and pass an array of objects or `entities` by prop. 
```
const App = (props) => {
  return (
    <Provider entities={[Counter]}>
      <Counter />
      <Display />
    </Provider>
  );
};
```
`Entities` are plain JS objects that represent the business logic of the application. You're free to model the logic of the program as you wish and every change on those objects will fire a setState, so,  make sure to use inmutable data types or re-render won't be fired. 
In this case:
 
```
const Counter = {
  counter: 1,
  increment() {
    this.counter++;
  },
  decrement() {
    this.counter--;
  },
  getCounter() {
    return this.counter;
  }
};
```
finally, every component that needs to be aware of the Counter object can do it this way:
```
const Counter = props => {
  return (
    <Listener>
      {counter => (
        <div>
          <button onClick={() => counter.increment()}>Increment</button>
          <button onClick={() => counter.decrement()}>Decrement</button>
        </div>
      )}
    </Listener>
  );
};

const Display = props => {
  return (
    <Listener>
      {counter => (<span>
        {counter.getCounter()}
      </span>)}
    </Listener>
  );
};
```
It doesn't matter where the component is located along the tree, it can access and fire methods of Counter.

And that's all you need! An easy way to share state among components and a clear separation between app logic and views, which is cool and very important. 

 


