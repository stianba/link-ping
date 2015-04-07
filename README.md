# link-ping
Prototyping tool inspired by Invision. When a user clicks outside a link, clickable links are highlighted.

## Install
Using [Bower](http://bower.io/)
```
$ bower install link-ping
```
Or, you can [manually download](https://github.com/stianba/link-ping/releases) the plugin and use one of the files below:
```
dist/link-ping.js
dist/link-ping.min.js
```

## How to use
**Note:** This plugin requires jQuery to work.
#### Default usage
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

    <script src="jquery.min.js"></script>
    <script src="link-ping.min.js"></script>
    <script>
      new linkPing('body');
    </script>
  </body>
</html>
```
#### Slightly advanced usage

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Link Ping Example</title>
    <meta charset="utf-8">
  </head>
  <body>
    <a href="link.html">Linky link</a> <!-- WILL highlight when clicked outside -->
    <a class="js-link">Linky link</a> <!-- WILL highlight when clicked outside -->
    <a href="#">Linky link</a> <!-- Will NOT highlight when clicked outside -->

    <script src="jquery.min.js"></script>
    <script src="link-ping.min.js"></script>
    <script>
      new linkPing('body', {
        links: ['.js-link']
      });
    </script>
  </body>
</html>
```
