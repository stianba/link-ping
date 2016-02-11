'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkPing = function () {
  function LinkPing(container) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? { include: [] } : arguments[1];

    _classCallCheck(this, LinkPing);

    this.$container = (0, _jquery2.default)(container);

    try {
      this.options = this.validateOptions(options || {});
    } catch (e) {
      return console.error(e);
    }

    this.selector = 'a[href][href!="#"]' + this.options.include;
    this.addEventListeners();
  }

  _createClass(LinkPing, [{
    key: 'validateOptions',
    value: function validateOptions(options) {
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

      this.$container.on('click', function (e) {
        if (_this.sourceIsMisclick(e.target)) _this.ping();
      });

      (0, _jquery2.default)(document).on('keydown', function (e) {
        if (e.keyCode === 16) _this.ping('hold'); // Shift key
      });

      (0, _jquery2.default)(document).on('keyup', function (e) {
        if (e.keyCode === 16) _this.flushPings(); // Shift key
      });
    }
  }, {
    key: 'sourceIsMisclick',
    value: function sourceIsMisclick(source) {
      return !(0, _jquery2.default)(source).parents().andSelf().is(this.selector);
    }
  }, {
    key: 'ping',
    value: function ping(duration) {
      duration = duration || 'short';

      this.$container.find(this.selector).each(function () {
        var $elem = (0, _jquery2.default)(this);
        var $hl = (0, _jquery2.default)('<div/>');

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

      (0, _jquery2.default)('.link-ping--flash').delay(delay).fadeOut(speed, function () {
        this.remove();
      });
    }
  }]);

  return LinkPing;
}();

module.exports = LinkPing;
