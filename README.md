# Zetta Photocell Mock Driver

## Install

```
$> npm install zetta-photocell-mock-driver
```

## Usage

```javascript
var zetta = require('zetta');
var Photocell = require('zetta-photocell-mock');

zetta()
  .use(Photocell)
  .listen(1337)
```

