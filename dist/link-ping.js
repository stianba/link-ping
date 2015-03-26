(function(window, $) {
  var LinkPing;
  LinkPing = (function() {
    function LinkPing(el, options) {
      this.$el = $(el);
      this.addEventListener();
    }

    LinkPing.prototype.addEventListener = function() {
      return this.$el.on('click', (function(_this) {
        return function(event) {
          if (_this.sourceIsMisclick(event.target)) {
            return _this.ping();
          }
        };
      })(this));
    };

    LinkPing.prototype.sourceIsMisclick = function(source) {
      source = $(source);
      if (source.is('a')) {
        return false;
      }
      return true;
    };

    LinkPing.prototype.ping = function() {
      return this.$el.find('a').effect('highlight');
    };

    return LinkPing;

  })();
  return window.linkPing = LinkPing;
})(window, window.jQuery);
