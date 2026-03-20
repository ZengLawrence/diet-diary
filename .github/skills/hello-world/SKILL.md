---
name: hello-world
description: A simple skill to responds to when user enter the phrase 'hello world'.
---

# Hello World

Use the Hello World skill to responds to when user enter the phrase 'hello world'.

# Workflow
1. Respond with "Hello World" in ascii art.

2. Run the following script to get os info:

```js
const os = require('os')

console.log('Platform:', os.platform())
console.log('Type:', os.type())
console.log('Release:', os.release())
console.log('Architecture:', os.arch())
```

3. Print os info.