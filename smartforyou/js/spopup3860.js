(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

},{}],2:[function(require,module,exports){
var Cookies = require('js-cookie');

(function(window, document){
  var KEY_LAST_URL = '$$SOBLASTURL$$';
  var KEY_LAST_SRC = '$$SOBLASTSRC$$';
  var KEY_DONT_SHOW = '$$SOBDONTSHOW$$';
  var doPopup = function() {
    var target = document.getElementById('sobPopupBanner');
    if (!target) {
      return;
    }

    var lastUrl = Cookies.get(KEY_LAST_URL) || '';
    var lastSrc = Cookies.get(KEY_LAST_SRC) || '';
    var dontShow = Cookies.get(KEY_DONT_SHOW) || 'false';

    var curUrl = '';
    var curSrc = '';
    if (target.querySelector('a')) {
      curUrl = target.querySelector('a').href;
    }
    if (target.querySelector('img')) {
      curSrc = target.querySelector('img').src;
    }
    Cookies.set(KEY_LAST_URL, curUrl, {expires: 1});
    Cookies.set(KEY_LAST_SRC, curSrc, {expires: 1});
    Cookies.set(KEY_DONT_SHOW, dontShow, {expires: 1});
    if (
      (lastUrl === curUrl) &&
      (lastSrc) === (curSrc) &&
      (dontShow === 'true')
    ) {
      target.parentNode.removeChild(target);
      return;
    }

    Cookies.set(KEY_DONT_SHOW, 'false', {expires: 1});
    var closeBtn = document.createElement('a');
    closeBtn.className = 'sob-popup-close-btn';
    closeBtn.href = '#';
    closeBtn.innerText = '×';
    closeBtn.onclick = function() {
      target.parentNode.removeChild(target);
      return false;
    };
    target.appendChild(closeBtn);
    var closeText = document.createElement('a');
    closeText.className = 'sob-popup-close-txt';
    closeText.href = '#';
    closeText.innerText = '×次回から表示しない';
    closeText.onclick = function() {
      Cookies.set(KEY_DONT_SHOW, 'true', {expires: 1});
      target.parentNode.removeChild(target);
      return false;
    };
    target.appendChild(closeText);
    target.className = 'sob__fade';
  };

  if (
    document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)
  ) {
    doPopup();
  } else {
    document.addEventListener('DOMContentLoaded', doPopup);
  }
})(window, document);
},{"js-cookie":1}]},{},[2]);
