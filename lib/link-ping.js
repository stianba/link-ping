import $ from 'jquery'

class LinkPing {
  constructor(container, options = {include: []}) {
    this.$container = $(container)

    try {
      this.options = this.validateOptions(options || {})
    } catch(e) {
      return console.error(e)
    }

    this.selector = 'a[href][href!="#"]' + this.options.include
    this.addEventListeners()
  }

  validateOptions(options) {
    if (!(options.include instanceof Array)) {
      throw new Error('Includes has to be an array')
    }

    if (options.include.length) {
      options.include = ', ' + options.include.join(', ')
    }

    return options
  }

  addEventListeners() {
    this.$container.on('click', e => {
      if (this.sourceIsMisclick(e.target)) this.ping()
    })

    $(document).on('keydown', e => {
      if (e.keyCode === 16) this.ping('hold') // Shift key
    })

    $(document).on('keyup', e => {
      if (e.keyCode === 16) this.flushPings() // Shift key
    })
  }

  sourceIsMisclick(source) {
    return !$(source).parents().andSelf().is(this.selector)
  }

  ping(duration) {
    duration = duration || 'short'

    this.$container
      .find(this.selector)
        .each(function() {
          const $elem = $(this)
          const $hl = $('<div/>')

          $hl.addClass('link-ping--flash')
          $hl.css({
            background: 'rgba(0, 123, 255, .4)',
            border: '1px solid rgba(0, 123, 255, .6)',
            display: 'none',
            height: $elem.outerHeight() + 'px',
            left: $elem.offset().left + 'px',
            position: 'absolute',
            top: $elem.offset().top + 'px',
            width: $elem.outerWidth() + 'px',
            zIndex: -1,
          })

          $hl.appendTo('body').fadeIn(200)
        })

    if (duration === 'short') this.flushPings(200)
  }

  flushPings(delay, speed) {
    delay = typeof delay === 'number' ? delay : 0
    speed = typeof speed === 'number' ? speed : 200

    $('.link-ping--flash').delay(delay).fadeOut(speed, function() {
      this.remove()
    })
  }
}

module.exports = LinkPing
