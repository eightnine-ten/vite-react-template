## 前言

  本文的例子都是经过实践后总结的一些比较实用的技巧, 如果疑惑或者错误, 欢迎指正!
## thenby多重排序

  [github地址](https://github.com/Teun/thenBy.js)

  场景: 需要对数据进行多重排序

   ```js
    var data = [ { phare: 1, order: 1 }, { phare: 2, order: 2 }, { phare: 2, order: 1 } ];
    var sortData =  data.sort(
    firstBy(function(a, b) { return a.phare - b.phare })
    .thenBy(function(a, b) { return a.order - b.order })
    );
   ```

  输出: 
  (index) phare order
  0	1	1
  1	2	1
  2	2	2

  当然如果单纯的从小大排序, 在这里例子中还可以这么写:
  
  ```js
  data.sort(firstBy('phare').thenBy('order')) 
  ```

## 获取当前页面滚动位置

  场景: 获取页面往x或者y方向滚动了多少距离

  ```js
  const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  });
  ```

##  平滑的滚动到页面顶部

  场景: 当浏览网页的时候, 我们想快速地返回顶部

  ```js
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  }
  ```

## 判断当前元素在当前视图是否能够被看见

  ```js
  const elementIsVisibleInViewport = el => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  };
  ```

## 判断当前浏览器选项卡是否聚焦

  ```js
  const isBrowserTabFocused = () => !document.hidden;
  ```

## 获取中国省市区镇村二级三级四级五级联动地址数据

   [github地址](https://github.com/modood/Administrative-divisions-of-China)

   ```sh
    # 删除现有的数据
    $ rm dist/*.csv && rm dist/[a-z]*.json && rm dist/data.sqlite && touch dist/data.sqlite

    # 拉数据（这个步骤比较耗时）
    $ npm run fetch

    # 格式化 json csv 和联动数据等
    $ npm run build
   ```

## React路由缓存

  [github地址](https://github.com/CJY0208/react-router-cache-route)

  ```js
  import React from 'react'
  import { HashRouter as Router, Route } from 'react-router-dom'
  import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
  import List from './views/List'
  import Item from './views/Item'
  const App = () => (
    <Router>
      <CacheSwitch>
        <CacheRoute exact path="/list" component={List} />
        <Route exact path="/item/:id" component={Item} />
        <Route render={() => <div>404 Not Found</div>} />
      </CacheSwitch>
    </Router>
  )
  export default App
  ```

  ## React精美的toast组件

  [github地址](https://github.com/fkhadra/react-toastify)

  图片

  ```js
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  toast.warn("Warning Notification !", {
    position: toast.POSITION.BOTTOM_LEFT
  });
  ```

  ## 处理图片呈现方式的组件

  [demo地址](https://www.albertjuhe.com/react-lazy-load-image-component)

  我们来看一下正常不加任何处理图片展示效果: 

  gif

  接下来看一下使用 ```  effect="blur" ```属性后展示效果: 

  gif

  ```js
  import { LazyLoadImage } from 'react-lazy-load-image-component';
  import 'react-lazy-load-image-component/src/effects/blur.css';

  <LazyLoadImage
    alt="img"
    height={400}
    effect="blur"
    src="https://www.albertjuhe.com/images/07.jpg"
  />
  ```

  ## 根据DOM以及DOM的属性名获取属性的具体值

  ```js
  const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  const MOZ_HACK_REGEXP = /^moz([A-Z])/;

  const camelCase = function(name) {
    return name
      .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      })
      .replace(MOZ_HACK_REGEXP, 'Moz$1');
  };

  const getStyle = function(element, styleName) {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
      styleName = 'cssFloat';
    }
    try {
      var computed = document.defaultView.getComputedStyle(element, '');
      return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
      return element.style[styleName];
    }
  };

  getStyle(DOMRef.current, 'width')
  ```

  ## 巧用range计算内容的宽度

  场景: 获取div内所有节点的宽度之和

  ```js
  const range  = document.createRange();
  range.setStart(element, 0);
  range.setEnd(element, element.childNodes.length)
  range.getBoundingClientRect().width  
  ```
  ## 校验一组数据

  [github地址](https://github.com/jquense/yup)

  ```js
  let yup = require('yup');

  let schema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required().positive().integer(),
    email: yup.string().email(),
    website: yup.string().url(),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });

    // check validity
  schema
    .isValid({
      name: 'jimmy',
      age: 24,
    })
    .then(function (valid) {
      valid; // => true
    });

  // you can try and type cast objects to the defined schema
  schema.cast({
    name: 'jimmy',
    age: '24',
    createdOn: '2014-09-23T19:25:25Z',
  });
  ```


