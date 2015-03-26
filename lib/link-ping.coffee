((window, $) ->
  class LinkPin
    constructor: (el, options) ->
      @$el = $(el)
      @addEventListener()

    addEventListener: ->
      @$el.on 'click', (event) =>
        @ping event
                  
    ping: (event) ->
      @pingLinks() if @checkThatSourceIsNotLink event.target

    checkThatSourceIsNotLink: (source) ->
      source = $(source)
      return false if source.is 'a'
      true

    pingLinks: ->
      $(@$el)
        .find('a')
        .effect('highlight')

  window.linkPin = LinkPin
) window, window.jQuery
