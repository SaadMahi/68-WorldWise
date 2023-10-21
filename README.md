
# WorldWise

Lorem ipsum Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad ipsum possimus, officia rerum laudantium quibusdam at dolorem atque repellendus, odio corporis illo assumenda! Eius ipsa adipisci quos tempore. Fugiat, expedita!



## FAQ


#### What is Routing?

When we use routing in a web application we basically match different url's to different Ui views, in the specific case of React we match each url to a specific React component. 

![react-routing](https://github.com/SaadMahi/68-Worldwise/assets/117567622/4586f7e3-6e5d-4964-84ce-49fc8b11b487)


#### How to install Router Package?

```bash
  npm i react-router-dom
```


#### How do we use React Routes?

```javascript
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='product' element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```



