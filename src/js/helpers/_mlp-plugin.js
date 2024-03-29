$.mlpFnName = function(fn) {
  return fn.name || (fn + '').split(/\s|\(/)[1];
};

$.mlpInit = function(fn, name, set) {
  if (typeof set == "undefined") {
    set = true;
  }
  window.MLP = window.MLP || {};
  window.MLP.apps = window.MLP.apps || {};
  window.MLP.instances = window.MLP.instances || {};
  if (fn && set) {
    name = name || $.mlpFnName(fn);
    window.MLP.apps[name] = fn;
  } else {
    return window.MLP.apps[fn];
  }
};
 
$.mlpPlugin = function(fn, name, bypass, elPluggin) {
  var obj;
  if (typeof bypass == "undefined") {
    bypass = false;
  }
  if (typeof elPluggin == "undefined") {
    elPluggin = true;
  }
  obj = {};
  $.mlpInit(fn, name);
  name = name || $.mlpFnName(fn);
  obj[name] = function() {
    var args, option, _el, _this = [];
    option = arguments[0];
    args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    _el = $(this).each(function() {
      var $this, data, key;
      $this = $(this);
      key = 'mlp-' + name;
      data = $this.data(key);
      if (!data || bypass) {
        $this.data('name', name);
        $this.data(key, (data = new fn(option, this)));
      }
      if (typeof option === 'string') {
        return data[option].apply(data, args);
      }
      _this.push(data);
      
    });
    return {mlp: _this, el: _el};
  };
  $.fn.extend(obj);
  if (!elPluggin) {
    obj[name] = function(option) {
      return new fn(option);
    };
    $.extend(obj);
  }
};

class MLPModule {

  defaults() {
    this.defaults = {};
  }

  constructor(options, element) {
    this.ops = $.extend({}, this.defaults, options);
    this.sel = this.sel || {};
    this.el = this.el || {};
    this.el.target = $(element);
    this.init();
    return this;
  }

  init() {
    this.classes = {
      active: 'is-active',
      offscreen: 'l-offscreen'
    };
    
    this.keys = {
      esc: 27,
      down: 40,
      up: 38,
      left: 37,
      right: 39,
      o: 79,
      space: 32,
      tab: 9,
      enter: 13
    };

    this.aria = {
      expanded: 'aria-expanded',
      hidden: 'aria-hidden',
      controls: 'aria-controls',
      selected: 'aria-selected',
      invalid: 'aria-invalid',
      pressed: 'aria-pressed',
      described: 'aria-describedby',
      checked: 'aria-checked',
      label: 'aria-label',
      labelled: 'aria-labelledby',
      popup: 'aria-haspopup'
    };
    
    this.attr = {
      tabindex: 'tabindex'
    };
  }

  stop(e) {
    e.preventDefault();
    return e.stopPropagation();
  }

  target(e) {
    return $(e.target);
  }

  currentTarget(e) {
    return $(e.currentTarget);
  }

  isEnter(e) {
    return this.keycode(e) === this.keys.enter;
  }

  isSpace(e) {
    return this.keycode(e) === this.keys.space;
  }

  isTab(e) {
    return this.keycode(e) === this.keys.tab;
  }

  isBackTab(e) {
    return e.shiftKey && this.isTab(e);
  }

  isEsc(e) {
    return this.keycode(e) === this.keys.esc;
  }

  isEnterOrSpace(e) {
    return this.isEnter(e) || this.isSpace(e);
  }

  keycode(e) {
    return e.which;
  }

  isIE(version) {
    if (typeof version == "undefined") {
      version = 8;
    }
    return bowser.msie && bowser.version === version;
  }
}

$.mlpInit(MLPModule, 'MLPModule');