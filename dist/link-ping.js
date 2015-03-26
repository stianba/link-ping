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
          return _this.ping(event);
        };
      })(this));
    };

    LinkPin.prototype.ping = function(event) {
      if (this.checkThatSourceIsNotLink(event.target)) {
        return this.pingLinks();
      }
    };

    LinkPin.prototype.checkThatSourceIsNotLink = function(source) {
      source = $(source);
      if (source.is('a')) {
        return false;
      }
      return true;
    };

    LinkPin.prototype.pingLinks = function() {
      return $(this.$el).find('a').effect('highlight');
    };

    return LinkPin;

  })();
  return window.linkPin = LinkPin;
})(window, window.jQuery);
