---
name: hello-world
description: A simple skill to responds to when user enter the phrase 'hello, my name is [name]'.
---

# Hello World

Use the Hello World skill to responds to when user enter the phrase 'hello, my name is [name]'.

# Workflow
1. Extract user name from prompt and generate a greeting message in the format "Hello, {user_name}!" in ascii art format.

2. Run the following [script](./get-system-info.js) to get os info.

3. Respond with the [template](./TEMPLATE.md), and replace the `{greeting}` with ascii art from step 1 and the `{system_info}` with the result from step 2.