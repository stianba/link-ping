((window, $) ->
  class LinkPing
    constructor: (el, options) ->
      @$el = $(el)

      try
        @options = @validateOptions(options || {})
      catch e
        console.log e

      @selector = 'a[href][href!="#"]' + @options.links
      @addEventListener()

    validateOptions: (options) ->
      options.links = options.links || []

      if !(options.links instanceof Array)
        throw new Error 'Optional links has to be an array'

      if options.links.length
        options.links = ', ' + options.links.join ', '

      options

    addEventListener: ->
      @$el.on 'click', (event) =>
        @ping() if @sourceIsMisclick event.target

    sourceIsMisclick: (source) ->
      return true unless $(source).parents().andSelf().is @selector

      false

    ping: ->
      $('.link-ping--flash').remove()
      @flash @$el.find(@selector)

    flash: (elements) ->
      for elem in elements
        $elem = $(elem)

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
          .delay(200)
          .fadeOut(200)

  window.linkPing = LinkPing
) window, window.jQuery
