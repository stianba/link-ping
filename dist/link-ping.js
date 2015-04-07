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
      this.selector = 'a[href][href!="#"]' + this.options.links;
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
            return _this.ping();
          }
        };
      })(this));
    };

    LinkPing.prototype.sourceIsMisclick = function(source) {
      if (!$(source).parents().andSelf().is(this.selector)) {
        return true;
      }
      return false;
    };

    LinkPing.prototype.ping = function() {
      $('.link-ping--flash').remove();
      return this.flash(this.$el.find(this.selector));
    };

    LinkPing.prototype.flash = function(elements) {
      var $elem, $hl, elem, i, len, results;
      results = [];
      for (i = 0, len = elements.length; i < len; i++) {
        elem = elements[i];
        $elem = $(elem);
        $hl = $('<div/>');
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
        results.push($hl.appendTo('body').fadeIn(200).delay(200).fadeOut(200));
      }
      return results;
    };

    return LinkPing;

  })();
  return window.linkPing = LinkPing;
})(window, window.jQuery);
