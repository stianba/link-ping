((window, $) ->
  class LinkPin
    constructor: (el, options) ->
      @$el = $(el)
      @addEventListener()

    addEventListener: ->
      @$el.on 'click', (event) =>
        @ping() if @sourceIsMisclick event.target

    sourceIsMisclick: (source) ->
      source = $(source)
      return false if source.is 'a'
      true

    ping: ->
      @$el
        .find('a')
        .effect('highlight')

  window.linkPin = LinkPin
) window, window.jQuery
