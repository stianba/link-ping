((window, $) ->
  class LinkPing
    constructor: (el, options) ->
      @$el = $(el)
      @options = options || {}
      @addEventListener()

    addEventListener: ->
      @$el.on 'click', (event) =>
        @ping() if @sourceIsMisclick event.target
        false

    sourceIsMisclick: (source) ->
      misclick = true

      $(source)
        .parents()
        .andSelf()
        .each ->
          $el = $(@)
          # Ordinary links
          return misclick = false if $el.is('a') and $el.attr('href')
      
      misclick

    ping: ->
      @$el
        .find('a')
        .effect('highlight')

  window.linkPing = LinkPing
) window, window.jQuery
