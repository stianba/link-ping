((window, $) ->
  class LinkPing
    constructor: (el, options) ->
      @$el = $(el)

      try
        @options = @validateOptions(options || {})
      catch e
        console.log e

      @selector = 'a[href][href!="#"]' + @options.links
      @addEventListeners()

    validateOptions: (options) ->
      options.links = options.links || []

      if !(options.links instanceof Array)
        throw new Error 'Optional links has to be an array'

      if options.links.length
        options.links = ', ' + options.links.join ', '

      options

    addEventListeners: ->
      @$el.on 'click', (event) =>
        @ping() if @sourceIsMisclick event.target

      $(document).on 'keydown', (e) =>
        @ping('hold') if e.keyCode is 16 # Shift key

      $(document).on 'keyup', (e) =>
        @flushPings() if e.keyCode is 16 # Shift key

    sourceIsMisclick: (source) ->
      return true unless $(source).parents().andSelf().is @selector
      false

    ping: (duration) ->
      duration = duration || 'short'

      @$el
        .find(@selector)
        .each ->
          $elem = $(this)

          $hl = $('<div/>')
          $hl.addClass 'link-ping--flash'
          $hl.css
            background: 'rgba(0, 123, 255, .4)'
            border: '1px solid rgba(0, 123, 255, .6)'
            display: 'none'
            height: $elem.outerHeight() + 'px'
            left: $elem.offset().left + 'px'
            position: 'absolute'
            top: $elem.offset().top + 'px'
            width: $elem.outerWidth() + 'px'
            zIndex: 99999

          $hl
            .appendTo('body')
            .fadeIn(200)

      @flushPings(200) if duration is 'short'
            
    flushPings: (delay, speed) ->
      typeof delay is 'Number' ? delay = delay : delay = 0
      typeof speed is 'Number' ? speed = speed : speed = 200

      $('.link-ping--flash').delay(delay).fadeOut speed, ->
        @.remove()

  window.linkPing = LinkPing
) window, window.jQuery
