# link-ping
Plugin for your HTML prototypes.

Inspired by [Invision](http://www.invisionapp.com/), when a user clicks outside a clickable link, clickable links are highlighted.

**Pro tip:** Hold `shift` to highlight all clickable areas.

## Install
```
$ npm install link-ping
```

## How to use
### Default usage
**index.html**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Link Ping Example</title>
    <meta charset="utf-8">
  </head>
  <body>
    <a href="link.html">Linky link</a> <!-- WILL highlight when clicked outside -->
    <a>Linky link</a> <!-- Will NOT highlight when clicked outside -->
    <a href="#">Linky link</a> <!-- Will NOT highlight when clicked outside -->
    <script src="./app.js" charset="utf-8"></script>
  </body>
</html>
```

**app.js**
```javascript
import LinkPing from '../dist/link-ping'

const linkPing = new LinkPing('body')
```

### Slightly more advanced usage
**index.html**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Link Ping Example</title>
    <meta charset="utf-8">
  </head>
  <body>
    <a href="link.html">Linky link</a> <!-- WILL highlight when clicked outside -->
    <span class="js-link">Linky link</span> <!-- WILL highlight when clicked outside -->
    <a href="#">Linky link</a> <!-- Will NOT highlight when clicked outside -->
    <script src="./app.js" charset="utf-8"></script>
  </body>
</html>
```

**app.js**
```javascript
import LinkPing from '../dist/link-ping'

const linkPing = new LinkPing('body', {
  include: ['.js-link']
})
```
