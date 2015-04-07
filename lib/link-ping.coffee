((window, $) ->
  class LinkPing
    constructor: (el, options) ->
      @$el = $(el)

      try
        @options = @validateOptions(options || {})
      catch e
        console.log e

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
          
        false

    sourceIsMisclick: (source) ->
      return true unless $(source).parents().andSelf().is "a#{@options.links}"

      false

    ping: ->
      @$el
        .find("a#{@options.links}")
        .effect('highlight')

  window.linkPing = LinkPing
) window, window.jQuery
