'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $ = require('jquery');

var LinkPing = (function () {
  function LinkPing(el, options) {
    _classCallCheck(this, LinkPing);

    this.$el = $(el);

    try {
      this.options = this.validateOptions(options || {});
    } catch (e) {
      console.log(e);
    }

    this.selector = 'a[href][href!="#"]' + this.options.include;
    this.addEventListeners();
  }

  _createClass(LinkPing, [{
    key: 'validateOptions',
    value: function validateOptions(options) {
      options.include = options.include || [];

      if (!(options.include instanceof Array)) {
        throw new Error('Includes has to be an array');
      }

      if (options.include.length) {
        options.include = ', ' + options.include.join(', ');
      }

      return options;
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      var _this = this;

      this.$el.on('click', function (event) {
        if (_this.sourceIsMisclick(event.target)) _this.ping();
      });

      $(document).on('keydown', function (e) {
        if (e.keyCode === 16) _this.ping('hold'); // Shift key
      });

      $(document).on('keyup', function (e) {
        if (e.keyCode === 16) _this.flushPings(); // Shift key
      });
    }
  }, {
    key: 'sourceIsMisclick',
    value: function sourceIsMisclick(source) {
      if (!$(source).parents().andSelf().is(this.selector)) return true;
      return false;
    }
  }, {
    key: 'ping',
    value: function ping(duration) {
      duration = duration || 'short';

      this.$el.find(this.selector).each(function () {
        var $elem = $(this);
        var $hl = $('<div/>');

        $hl.addClass('link-ping--flash');
        $hl.css({
          background: 'rgba(0, 123, 255, .4)',
          border: '1px solid rgba(0, 123, 255, .6)',
          display: 'none',
          height: $elem.outerHeight() + 'px',
          left: $elem.offset().left + 'px',
          position: 'absolute',
          top: $elem.offset().top + 'px',
          width: $elem.outerWidth() + 'px',
          zIndex: 99999
        });

        $hl.appendTo('body').fadeIn(200);
      });

      if (duration === 'short') this.flushPings(200);
    }
  }, {
    key: 'flushPings',
    value: function flushPings(delay, speed) {
      delay = typeof delay === 'number' ? delay : 0;
      speed = typeof speed === 'number' ? speed : 200;

      $('.link-ping--flash').delay(delay).fadeOut(speed, function () {
        this.remove();
      });
    }
  }]);

  return LinkPing;
})();

module.exports = LinkPing;