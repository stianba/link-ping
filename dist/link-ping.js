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
      this.addEventListeners();
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

    LinkPing.prototype.addEventListeners = function() {
      this.$el.on('click', (function(_this) {
        return function(event) {
          if (_this.sourceIsMisclick(event.target)) {
            return _this.ping();
          }
        };
      })(this));
      $(document).on('keydown', (function(_this) {
        return function(e) {
          if (e.keyCode === 16) {
            return _this.ping('hold');
          }
        };
      })(this));
      return $(document).on('keyup', (function(_this) {
        return function(e) {
          if (e.keyCode === 16) {
            return _this.flushPings();
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

    LinkPing.prototype.ping = function(duration) {
      duration = duration || 'short';
      this.$el.find(this.selector).each(function() {
        var $elem, $hl;
        $elem = $(this);
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
        return $hl.appendTo('body').fadeIn(200);
      });
      if (duration === 'short') {
        return this.flushPings(200);
      }
    };

    LinkPing.prototype.flushPings = function(delay, speed) {
      var ref, ref1;
            if ((ref = typeof delay === 'Number') != null) {
        ref;
      } else {
        delay = {
          delay: delay = 0
        };
      };
            if ((ref1 = typeof speed === 'Number') != null) {
        ref1;
      } else {
        speed = {
          speed: speed = 200
        };
      };
      return $('.link-ping--flash').delay(delay).fadeOut(speed, function() {
        return this.remove();
      });
    };

    return LinkPing;

  })();
  return window.linkPing = LinkPing;
})(window, window.jQuery);
