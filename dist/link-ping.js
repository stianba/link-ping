(function(window, $) {
  var LinkPing;
  LinkPing = (function() {
    function LinkPing(el, options) {
      this.$el = $(el);
      this.options = options || {};
      this.addEventListener();
    }

    LinkPing.prototype.addEventListener = function() {
      return this.$el.on('click', (function(_this) {
        return function(event) {
          if (_this.sourceIsMisclick(event.target)) {
            _this.ping();
          }
          return false;
        };
      })(this));
    };

    LinkPing.prototype.sourceIsMisclick = function(source) {
      var misclick;
      misclick = true;
      $(source).parents().andSelf().each(function() {
        var $el;
        $el = $(this);
        if ($el.is('a') && $el.attr('href')) {
          return misclick = false;
        }
      });
      return misclick;
    };

    LinkPing.prototype.ping = function() {
      return this.$el.find('a').effect('highlight');
    };

    return LinkPing;

  })();
  return window.linkPing = LinkPing;
})(window, window.jQuery);
