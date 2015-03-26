((window, $) ->
  class LinkPing
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

  window.linkPing = LinkPing
) window, window.jQuery
