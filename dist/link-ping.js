(function(window, $) {
  var LinkPin;
  LinkPin = (function() {
    function LinkPin(el, options) {
      this.$el = $(el);
      this.addEventListener();
    }

    LinkPin.prototype.addEventListener = function() {
      return this.$el.on('click', (function(_this) {
        return function(event) {
          if (_this.sourceIsMisclick(event.target)) {
            return _this.ping(event);
          }
        };
      })(this));
    };

    LinkPin.prototype.sourceIsMisclick = function(source) {
      source = $(source);
      if (source.is('a')) {
        return false;
      }
      return true;
    };

    LinkPin.prototype.ping = function() {
      return this.$el.find('a').effect('highlight');
    };

    return LinkPin;

  })();
  return window.linkPin = LinkPin;
})(window, window.jQuery);
