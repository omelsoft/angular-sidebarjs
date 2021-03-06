/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint import/no-unresolved: 0 */


var _sidebarjs = __webpack_require__(1);

__webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SidebarJSCtrl = function () {
  /* @ngInject */
  SidebarJSCtrl.$inject = ['$scope', '$element', 'SidebarJS'];
  function SidebarJSCtrl($scope, $element, SidebarJS) {
    _classCallCheck(this, SidebarJSCtrl);

    this.$scope = $scope;
    this.SidebarJS = SidebarJS;
    this.elem = $element[0];
  }

  _createClass(SidebarJSCtrl, [{
    key: '$onInit',
    value: function $onInit() {
      this.sidebarjsName = this.sidebarjsName || '';
      this.elem.setAttribute('sidebarjs', this.sidebarjsName);
    }
  }, {
    key: '$postLink',
    value: function $postLink() {
      var _this = this;

      var userConfig = this.sidebarjsConfig || {};
      var _onChangeVisibility = this.onChangeVisibility || userConfig.onChangeVisibility;
      var config = _extends({}, userConfig, {
        component: this.elem,
        container: this.elem.children[0],
        backdrop: this.elem.children[1],
        onOpen: this.onOpen || userConfig.onOpen,
        onClose: this.onClose || userConfig.onClose,
        onChangeVisibility: function onChangeVisibility(changes) {
          if (_onChangeVisibility) {
            _onChangeVisibility({ $event: changes });
          }
          _this.$scope.$applyAsync();
        }
      });
      this.SidebarJS.create(config);
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      this.SidebarJS.destroy(this.sidebarjsName);
    }
  }]);

  return SidebarJSCtrl;
}();

function SidebarJSDirective(action) {
  return {
    /* @ngInject */
    controller: ['SidebarJS', function controller(SidebarJS) {
      this.SidebarJS = SidebarJS;
    }],
    link: function link(scope, elem, attrs, ctrl) {
      if (!ctrl.SidebarJS.elemHasListener(elem[0])) {
        var sidebarName = attrs['sidebarjs' + (action.charAt(0).toUpperCase() + action.slice(1))];
        elem[0].addEventListener('click', function () {
          return ctrl.SidebarJS[action](sidebarName);
        });
        ctrl.SidebarJS.elemHasListener(elem[0], true);
      }
    }
  };
}

angular.module('ngSidebarJS', []).service('SidebarJS', _sidebarjs.SidebarService).component('sidebarjs', {
  template: '<div sidebarjs-container ng-transclude></div><div sidebarjs-backdrop></div>',
  transclude: true,
  controller: SidebarJSCtrl,
  bindings: {
    onOpen: '&?',
    onClose: '&?',
    onChangeVisibility: '&?',
    sidebarjsConfig: '<?',
    sidebarjsName: '@?'
  }
}).directive('sidebarjsOpen', SidebarJSDirective.bind(null, 'open')).directive('sidebarjsClose', SidebarJSDirective.bind(null, 'close')).directive('sidebarjsToggle', SidebarJSDirective.bind(null, 'toggle'));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * SidebarJS
 * Version 5.4.0
 * https://github.com/SidebarJS/sidebarjs#readme
 */

(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.SidebarJS = {})));
}(this, (function (exports) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var sidebarElement = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var SIDEBARJS = 'sidebarjs';
	var SIDEBARJS_CONTENT = 'sidebarjs-content';
	var IS_VISIBLE = SIDEBARJS + "--is-visible";
	var IS_MOVING = SIDEBARJS + "--is-moving";
	var LEFT_POSITION = 'left';
	var RIGHT_POSITION = 'right';
	var POSITIONS = [LEFT_POSITION, RIGHT_POSITION];
	var SidebarElement = /** @class */ (function () {
	    function SidebarElement(config) {
	        if (config === void 0) { config = {}; }
	        var _this = this;
	        this.toggle = function () {
	            _this.isVisible() ? _this.close() : _this.open();
	        };
	        this.open = function () {
	            _this.component.classList.add(IS_VISIBLE);
	            _this.setBackdropOpacity(_this.backdropOpacity);
	        };
	        this.close = function () {
	            _this.component.classList.remove(IS_VISIBLE);
	            _this.clearStyle(_this.backdrop);
	        };
	        this.__onTouchStart = function (e) {
	            _this.initialTouch = e.touches[0].pageX;
	        };
	        this.__onTouchMove = function (e) {
	            var swipeDirection = -(_this.initialTouch - e.touches[0].clientX);
	            var sidebarMovement = _this.container.clientWidth + (_this.hasLeftPosition() ? swipeDirection : -swipeDirection);
	            if (sidebarMovement <= _this.container.clientWidth) {
	                _this.touchMoveSidebar = Math.abs(swipeDirection);
	                _this.moveSidebar(swipeDirection);
	            }
	        };
	        this.__onTouchEnd = function () {
	            _this.component.classList.remove(IS_MOVING);
	            _this.clearStyle(_this.container);
	            _this.clearStyle(_this.backdrop);
	            _this.touchMoveSidebar > (_this.container.clientWidth / 3.5) ? _this.close() : _this.open();
	            _this.initialTouch = null;
	            _this.touchMoveSidebar = null;
	        };
	        this.__onSwipeOpenStart = function (e) {
	            if (_this.targetElementIsBackdrop(e)) {
	                return;
	            }
	            var touchPositionX = e.touches[0].clientX;
	            var documentTouch = _this.hasLeftPosition() ? touchPositionX : document.body.clientWidth - touchPositionX;
	            if (documentTouch < _this.documentSwipeRange) {
	                _this.__onTouchStart(e);
	            }
	        };
	        this.__onSwipeOpenMove = function (e) {
	            if (!_this.targetElementIsBackdrop(e) && _this.initialTouch && !_this.isVisible()) {
	                var documentSwiped = e.touches[0].clientX - _this.initialTouch;
	                var hasLeftPosition = _this.hasLeftPosition();
	                var swipeX = hasLeftPosition ? documentSwiped : -documentSwiped;
	                var sidebarMovement = _this.container.clientWidth - swipeX;
	                if (sidebarMovement > 0 && swipeX >= _this.documentMinSwipeX) {
	                    _this.openMovement = hasLeftPosition ? -sidebarMovement : sidebarMovement;
	                    _this.moveSidebar(_this.openMovement);
	                }
	            }
	        };
	        this.__onSwipeOpenEnd = function () {
	            if (_this.openMovement) {
	                _this.openMovement = null;
	                _this.__onTouchEnd();
	            }
	        };
	        this.__onTransitionEnd = function () {
	            var isVisible = _this.isVisible();
	            if (isVisible && !_this.__wasVisible) {
	                _this.__wasVisible = true;
	                if (_this.__emitOnOpen) {
	                    _this.__emitOnOpen();
	                }
	            }
	            else if (!isVisible && _this.__wasVisible) {
	                _this.__wasVisible = false;
	                if (_this.__emitOnClose) {
	                    _this.__emitOnClose();
	                }
	            }
	            if (_this.__emitOnChangeVisibility) {
	                _this.__emitOnChangeVisibility({ isVisible: isVisible });
	            }
	        };
	        var component = config.component, container = config.container, backdrop = config.backdrop, _a = config.documentMinSwipeX, documentMinSwipeX = _a === void 0 ? 10 : _a, _b = config.documentSwipeRange, documentSwipeRange = _b === void 0 ? 40 : _b, nativeSwipe = config.nativeSwipe, nativeSwipeOpen = config.nativeSwipeOpen, _c = config.responsive, responsive = _c === void 0 ? false : _c, mainContent = config.mainContent, _d = config.position, position = _d === void 0 ? 'left' : _d, _e = config.backdropOpacity, backdropOpacity = _e === void 0 ? 0.3 : _e, onOpen = config.onOpen, onClose = config.onClose, onChangeVisibility = config.onChangeVisibility;
	        var hasCustomTransclude = container && backdrop;
	        this.component = component || document.querySelector("[" + SIDEBARJS + "]");
	        this.container = hasCustomTransclude ? container : SidebarElement.create(SIDEBARJS + "-container");
	        this.backdrop = hasCustomTransclude ? backdrop : SidebarElement.create(SIDEBARJS + "-backdrop");
	        this.documentMinSwipeX = documentMinSwipeX;
	        this.documentSwipeRange = documentSwipeRange;
	        this.nativeSwipe = nativeSwipe !== false;
	        this.nativeSwipeOpen = nativeSwipeOpen !== false;
	        this.isStyleMapSupported = SidebarElement.isStyleMapSupported();
	        this.responsive = Boolean(responsive);
	        this.mainContent = this.shouldDefineMainContent(mainContent);
	        this.backdropOpacity = backdropOpacity;
	        this.backdropOpacityRatio = 1 / backdropOpacity;
	        this.__emitOnOpen = onOpen;
	        this.__emitOnClose = onClose;
	        this.__emitOnChangeVisibility = onChangeVisibility;
	        if (!hasCustomTransclude) {
	            try {
	                this.transcludeContent();
	            }
	            catch (e) {
	                throw new Error('You must define an element with [sidebarjs] attribute');
	            }
	        }
	        this.setSwipeGestures(true);
	        if (this.responsive || this.mainContent) {
	            this.setResponsive();
	        }
	        this.setPosition(position);
	        this.addAttrsEventsListeners(this.component.getAttribute(SIDEBARJS));
	        this.addTransitionListener();
	        this.backdrop.addEventListener('click', this.close, { passive: true });
	    }
	    SidebarElement.prototype.isVisible = function () {
	        return this.component.classList.contains(IS_VISIBLE);
	    };
	    SidebarElement.prototype.destroy = function () {
	        var _this = this;
	        this.removeNativeGestures();
	        this.container.removeEventListener('transitionend', this.__onTransitionEnd, { passive: true });
	        this.backdrop.removeEventListener('click', this.close, { passive: true });
	        this.removeNativeOpenGestures();
	        this.removeAttrsEventsListeners(this.component.getAttribute(SIDEBARJS));
	        this.removeComponentClassPosition();
	        while (this.container.firstElementChild) {
	            this.component.appendChild(this.container.firstElementChild);
	        }
	        this.component.removeChild(this.container);
	        this.component.removeChild(this.backdrop);
	        Object.keys(this).forEach(function (key) { return _this[key] = null; });
	    };
	    SidebarElement.prototype.setPosition = function (position) {
	        var _this = this;
	        this.component.classList.add(IS_MOVING);
	        this.position = POSITIONS.indexOf(position) >= 0 ? position : LEFT_POSITION;
	        var resetMainContent = (document.querySelectorAll("[" + SIDEBARJS + "]") || []).length === 1;
	        this.removeComponentClassPosition(resetMainContent);
	        this.component.classList.add(SIDEBARJS + "--" + this.position);
	        if (this.responsive && this.mainContent) {
	            this.mainContent.classList.add(SIDEBARJS_CONTENT + "--" + this.position);
	        }
	        setTimeout(function () { return _this.component && _this.component.classList.remove(IS_MOVING); }, 200);
	    };
	    SidebarElement.prototype.addAttrsEventsListeners = function (sidebarName) {
	        var _this = this;
	        this.forEachActionElement(sidebarName, function (element, action) {
	            if (!SidebarElement.elemHasListener(element)) {
	                element.addEventListener('click', _this[action], { passive: true });
	                SidebarElement.elemHasListener(element, true);
	            }
	        });
	    };
	    SidebarElement.prototype.removeAttrsEventsListeners = function (sidebarName) {
	        var _this = this;
	        this.forEachActionElement(sidebarName, function (element, action) {
	            if (SidebarElement.elemHasListener(element)) {
	                element.removeEventListener('click', _this[action]);
	                SidebarElement.elemHasListener(element, false);
	            }
	        });
	    };
	    SidebarElement.prototype.setSwipeGestures = function (value) {
	        if (typeof value !== 'boolean') {
	            throw new Error("You provided a " + typeof value + " value but setSwipeGestures needs a boolean value.");
	        }
	        if (this.nativeSwipe) {
	            value ? this.addNativeGestures() : this.removeNativeGestures();
	            if (this.nativeSwipeOpen) {
	                value ? this.addNativeOpenGestures() : this.removeNativeOpenGestures();
	            }
	        }
	    };
	    SidebarElement.prototype.addTransitionListener = function () {
	        this.__wasVisible = this.isVisible();
	        this.container.addEventListener('transitionend', this.__onTransitionEnd, { passive: true });
	    };
	    SidebarElement.prototype.forEachActionElement = function (sidebarName, func) {
	        var actions = ['toggle', 'open', 'close'];
	        for (var i = 0; i < actions.length; i++) {
	            var elements = document.querySelectorAll("[" + SIDEBARJS + "-" + actions[i] + "=\"" + sidebarName + "\"]");
	            for (var j = 0; j < elements.length; j++) {
	                func(elements[j], actions[i]);
	            }
	        }
	    };
	    SidebarElement.prototype.removeComponentClassPosition = function (resetMainContent) {
	        for (var i = 0; i < POSITIONS.length; i++) {
	            this.component.classList.remove(SIDEBARJS + "--" + POSITIONS[i]);
	            if (resetMainContent && this.mainContent) {
	                this.mainContent.classList.remove(SIDEBARJS_CONTENT + "--" + POSITIONS[i]);
	            }
	        }
	    };
	    SidebarElement.prototype.hasLeftPosition = function () {
	        return this.position === LEFT_POSITION;
	    };
	    SidebarElement.prototype.hasRightPosition = function () {
	        return this.position === RIGHT_POSITION;
	    };
	    SidebarElement.prototype.transcludeContent = function () {
	        while (this.component.firstChild) {
	            this.container.appendChild(this.component.firstChild);
	        }
	        while (this.component.firstChild) {
	            this.component.removeChild(this.component.firstChild);
	        }
	        this.component.appendChild(this.container);
	        this.component.appendChild(this.backdrop);
	    };
	    SidebarElement.prototype.addNativeGestures = function () {
	        this.component.addEventListener('touchstart', this.__onTouchStart, { passive: true });
	        this.component.addEventListener('touchmove', this.__onTouchMove, { passive: true });
	        this.component.addEventListener('touchend', this.__onTouchEnd, { passive: true });
	    };
	    SidebarElement.prototype.removeNativeGestures = function () {
	        this.component.removeEventListener('touchstart', this.__onTouchStart, { passive: true });
	        this.component.removeEventListener('touchmove', this.__onTouchMove, { passive: true });
	        this.component.removeEventListener('touchend', this.__onTouchEnd, { passive: true });
	    };
	    SidebarElement.prototype.addNativeOpenGestures = function () {
	        document.addEventListener('touchstart', this.__onSwipeOpenStart, { passive: true });
	        document.addEventListener('touchmove', this.__onSwipeOpenMove, { passive: true });
	        document.addEventListener('touchend', this.__onSwipeOpenEnd, { passive: true });
	    };
	    SidebarElement.prototype.removeNativeOpenGestures = function () {
	        document.removeEventListener('touchstart', this.__onSwipeOpenStart, { passive: true });
	        document.removeEventListener('touchmove', this.__onSwipeOpenMove, { passive: true });
	        document.removeEventListener('touchend', this.__onSwipeOpenEnd, { passive: true });
	    };
	    SidebarElement.prototype.moveSidebar = function (movement) {
	        this.component.classList.add(IS_MOVING);
	        this.applyStyle(this.container, 'transform', "translate(" + movement + "px, 0)", true);
	        this.updateBackdropOpacity(movement);
	    };
	    SidebarElement.prototype.updateBackdropOpacity = function (movement) {
	        var swipeProgress = 1 - (Math.abs(movement) / this.container.clientWidth);
	        var opacity = swipeProgress / this.backdropOpacityRatio;
	        this.setBackdropOpacity(opacity);
	    };
	    SidebarElement.prototype.setBackdropOpacity = function (opacity) {
	        this.applyStyle(this.backdrop, 'opacity', opacity.toString());
	    };
	    SidebarElement.prototype.targetElementIsBackdrop = function (e) {
	        return e.target.hasAttribute(SIDEBARJS + "-backdrop");
	    };
	    SidebarElement.prototype.setResponsive = function () {
	        if (!this.responsive && this.mainContent) {
	            throw new Error("You provide a [" + SIDEBARJS_CONTENT + "] element without set {responsive: true}");
	        }
	        if (this.responsive && !this.mainContent) {
	            throw new Error("You have set {responsive: true} without provide a [" + SIDEBARJS_CONTENT + "] element");
	        }
	        this.component.classList.add('sidebarjs--responsive');
	    };
	    SidebarElement.prototype.shouldDefineMainContent = function (mainContent) {
	        if (mainContent) {
	            mainContent.setAttribute(SIDEBARJS_CONTENT, '');
	            return mainContent;
	        }
	        else {
	            return document.querySelector("[" + SIDEBARJS_CONTENT + "]");
	        }
	    };
	    SidebarElement.prototype.applyStyle = function (el, prop, val, vendorify) {
	        if (this.isStyleMapSupported) {
	            el.attributeStyleMap.set(prop, val);
	        }
	        else {
	            el.style[prop] = val;
	            if (vendorify) {
	                el.style['Webkit' + prop.charAt(0).toUpperCase() + prop.slice(1)] = val;
	            }
	        }
	    };
	    SidebarElement.prototype.clearStyle = function (el) {
	        if (this.isStyleMapSupported) {
	            el.attributeStyleMap.clear();
	        }
	        else {
	            el.removeAttribute('style');
	        }
	    };
	    SidebarElement.isStyleMapSupported = function () {
	        return Boolean(window.CSS && CSS.number);
	    };
	    SidebarElement.create = function (element) {
	        var el = document.createElement('div');
	        el.setAttribute(element, '');
	        return el;
	    };
	    SidebarElement.elemHasListener = function (elem, value) {
	        return elem && typeof value === 'boolean' ? elem.sidebarjsListener = value : !!elem.sidebarjsListener;
	    };
	    return SidebarElement;
	}());
	exports.SidebarElement = SidebarElement;

	});

	unwrapExports(sidebarElement);
	var sidebarElement_1 = sidebarElement.SidebarElement;

	var sidebarService = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var SidebarService = /** @class */ (function () {
	    function SidebarService() {
	        this.instances = {};
	    }
	    SidebarService.prototype.create = function (options) {
	        if (options === void 0) { options = {}; }
	        var name = options.component && options.component.getAttribute('sidebarjs') || '';
	        this.instances[name] = new sidebarElement.SidebarElement(options);
	        return this.instances[name];
	    };
	    SidebarService.prototype.open = function (sidebarName) {
	        if (sidebarName === void 0) { sidebarName = ''; }
	        if (this.instances[sidebarName]) {
	            this.instances[sidebarName].open();
	        }
	    };
	    SidebarService.prototype.close = function (sidebarName) {
	        if (sidebarName === void 0) { sidebarName = ''; }
	        if (this.instances[sidebarName]) {
	            this.instances[sidebarName].close();
	        }
	    };
	    SidebarService.prototype.toggle = function (sidebarName) {
	        if (sidebarName === void 0) { sidebarName = ''; }
	        if (this.instances[sidebarName]) {
	            this.instances[sidebarName].toggle();
	        }
	    };
	    SidebarService.prototype.isVisible = function (sidebarName) {
	        if (sidebarName === void 0) { sidebarName = ''; }
	        return !!this.instances[sidebarName] && this.instances[sidebarName].isVisible();
	    };
	    SidebarService.prototype.setPosition = function (position, sidebarName) {
	        if (sidebarName === void 0) { sidebarName = ''; }
	        if (this.instances[sidebarName]) {
	            this.instances[sidebarName].setPosition(position);
	        }
	    };
	    SidebarService.prototype.elemHasListener = function (elem, value) {
	        return sidebarElement.SidebarElement.elemHasListener(elem, value);
	    };
	    SidebarService.prototype.destroy = function (sidebarName) {
	        if (sidebarName === void 0) { sidebarName = ''; }
	        if (this.instances[sidebarName]) {
	            this.instances[sidebarName].destroy();
	            this.instances[sidebarName] = null;
	            delete this.instances[sidebarName];
	        }
	    };
	    return SidebarService;
	}());
	exports.SidebarService = SidebarService;

	});

	unwrapExports(sidebarService);
	var sidebarService_1 = sidebarService.SidebarService;

	var src = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.SidebarElement = sidebarElement.SidebarElement;

	exports.SidebarService = sidebarService.SidebarService;

	});

	var index = unwrapExports(src);
	var src_1 = src.SidebarElement;
	var src_2 = src.SidebarService;

	exports.default = index;
	exports.SidebarElement = src_1;
	exports.SidebarService = src_2;

	Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);