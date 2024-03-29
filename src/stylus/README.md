FE Lab > Stylus Sources
=================

Instructions
-------------

- Use BEM
- Namespace class/id names with appropriate namespace prefix: .c-, .ic-, .l-, .txt 
- Beware heavy nesting and/or long definitions where it requires excessive scrolling to realise the context parent class/id
- Do not tightly couple styles based on location, code the css in terms of components. What do we mean by components? See here, (example only): [Ionic](http://ionicframework.com/docs/components/)
- Document the stylus files so styleguide can be generated

[Documentation](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

Internet Explorer
-------------
- Handle IE8 supported projects through the _ie.styl/mixin, example:
```
.c-carousel
  display inline-block
  +ie(8)
    display inline  // This will only appear in app-ie.css file
```

BEM
-------------
```
// BEM: Block Element Modifier
// Use __ for sub-level objects, and -- for style differentiators
// e.g. .c-bar, .c-bar__nav, .c-bar--small, .c-bar__nav--small, .hr

// 1. Global: These are random styles or utilities that can be used in unrelated places. 
// Changing the styles can cause breaks in a number of places.
// 
//--------------------------------------------------
// e.g. .hr, .theme-mid-blue, .theme--colored-bg, .bg-, .link-

  // l- : Layout
  //--------------------------------------------------
  // .l-desktop
  // .l-margin-left-10

// 2. c- : A component; a piece of concrete, implementation-specific UI; changing styles should not affect any other components
//--------------------------------------------------
// .c-component
// .c-modal
// .c-modal__title
// .c-modal--gallery

// 3. is-, has- : A class for styling a specific way due to a certain state or condition
//--------------------------------------------------
// .is-open
// .has-dropdown

// 4. _ : A hack... Should not be repeated or re-used
//--------------------------------------------------
// ._<namespace>hack-name
// ._c-footer-mobile

// 5. js- : The element has some JavaScript behaviour applied to it. Not used for styling.
//--------------------------------------------------
// .js-component-name
// .js-modal

// 6. qa- : A reserved hook to highlight that the element is undergoing an automated UI test
//--------------------------------------------------
// .qa-node-name
// .qa-error-login (a class that an automated test can look for)
```