(function(window, $) {
  var LinkPing;
  LinkPing = (function() {
    function LinkPing(el, options) {
      var e;
      this.$el = $(el);
      try {
        this.options = this.validateOptions(options || {});
      } catch (_error) {
        e = _error;
        console.log(e);
      }
      this.addEventListener();
    }

    LinkPing.prototype.validateOptions = function(options) {
      options.links = options.links || [];
      if (!(options.links instanceof Array)) {
        throw new Error('Optional links has to be an array');
      }
      if (options.links.length) {
        options.links = ', ' + options.links.join(', ');
      }
      return options;
    };

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
      if (!$(source).parents().andSelf().is("a" + this.options.links)) {
        return true;
      }
      return false;
    };

    LinkPing.prototype.ping = function() {
      return this.$el.find("a" + this.options.links).effect('highlight');
    };

    return LinkPing;

  })();
  return window.linkPing = LinkPing;
})(window, window.jQuery);
