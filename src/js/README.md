FE Lab > JS Sources
=================

Instructions
-------------

- Do not attach plugins via class/id name, use a standard attribute like data-js-plugin-name
```
// jade
a(data-js-plugin-name="foo").btn-next

// js
$('[data-js-plugin-name]').PluginName();
```
- Use js- selector names to show that certain elements have JS behaviour attached  
``` 
// jade
a.js-btn.btn-next

// js
$('.js-btn').on('click', function(){
  console.log('Hello world.');
});
```

- Long functions should be split into bite sizes

[Documentation](http://csswizardry.com/2016/11/nesting-your-bem/)
[Documentation1](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)