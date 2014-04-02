# array of event listeners used for detecting when an animation has ended
eventListeners = ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend']

# a few defaults
itemClass = 'list__item'
addClass = ' isAdding'
removeClass = ' isRemoving'

# querySelector, jQuery style
$ = (selector) ->
  document.querySelectorAll selector

# animate the element on click
animateElement = ->
  @className += removeClass
  for listener in eventListeners
    @addEventListener listener, ((event) ->
      removeElement(@)
    ), false

# remove the element from the DOM
removeElement = (el) ->
  el.parentNode.removeChild el

replaceClass = (el, className) ->
  for listener in eventListeners
    @addEventListener listener, ((event) ->
      el.className = className
    ), false

# find all the list containers
lists = $('.listContainer')

for list in lists
  links = list.getElementsByTagName('li')
  for link in links
    link.onclick = animateElement

  form = list.querySelector('.generate')
  form.onsubmit = ->
    dynamicEvent(@, @.parentNode)

dynamicEvent = (el, parent) ->
  # Grab the input value
  dynamicValue = el.querySelector('.generate-input').value
  dynamicElement = '<a class="list__link">' + dynamicValue + '</a>'

  # If empty value
  unless dynamicValue
    alert 'Please enter something.'
  else

    # Create the links with the input value as innerHTML
    li = document.createElement('li')
    li.className += itemClass + addClass
    li.innerHTML = dynamicElement

    # Prepend it and attach the event (via onclick)
    links = parent.querySelector('.list')
    links.insertBefore li, links.firstChild
    replaceClass li, itemClass
    li.onclick = animateElement

  # Prevent the form submitting
  false

window.addEventListener "load", (->
  FastClick.attach document.body
), false