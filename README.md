# jQuery jflow

# Notice 

I'm not maintain this plugin anymore, even if still usefull, I'm developing a new [jQuery sliding plugin](https://github.com/alexanmtz/sliding) instead

# About the plugin 

This plugin is alternative for slider / carousel plugins out there. The reason that I develop this one is that I was needed a carousel
that could support more complex markup structure inside the carousel container. Besides that, this is the first carousel plugin developed with TDD.

This plugin accepts horizontal and vertical orientation

# Features

* Pagination
* Vertical and horizontal orientation
* You can choose the item will be slided into complex markups

# Changelog
* Version 1.4
  * easing support
* Version 1.3.1
  * All the descriptions in English
  * Refactor in tests to keep more easy to maintain
  * Changed the plugin name to sliding because jFlow already exist

* Version 1.3
	* Add active class in current active item of pagination
	* Fix bug that don't activate it the current item when use previous and next

# Where is been used?

G1 at Globo.com - http://g1.globo.com/

# Requirements

jquery.scrollTo - http://flesler.blogspot.com/2007/10/jqueryscrollto.html
jquery.easing (optional) - http://gsgd.co.uk/sandbox/jquery/easing/

# Tested

* Firefox 3+ Windows / MAC / Linux
* IE 6, 7 Windows

# Issues

* You must define width (horizontal mode) or height (vertical mode) to the slide calculate where will finish the container. If the items are variable they still works,
but the items not exactly will fit at container

* The slide works at itens already loaded, just hidding the subsequent ones. This plugin follow this UI pattern: http://developer.yahoo.com/ypatterns/selection/carousel.html
If you wish to use with ajax for a large amount of itens, use [jQuery sliding plugin](https://github.com/alexanmtz/sliding) instead

* For horizontal slider, you should use float instead display: inline and not use margin top or padding top at items, you could set theses properties on outermost container


# In a nutshell:
    <script type="text/javascript" src="jquery-jflow.js"></script>
    <script type="text/javascript">
     $(function(){
        $("#vertical").jflow({
           mode : "vertical",
            item: "#vertical li",
            prev: "#pager button.previous",
            next: "#pager button.next,
            pager: "#pager"
        });
     });
    </script>

# Documentation
	
> This is the plugin options that can be used

## item
* type: String
* default: .jflow-item
* description: The selector used as reference. This will be the item slided

## items
* type: Number
* default: 5
* description: Items amount that will be slided per time

## inativeClass
* type: String
* default: .inativo
* description: The class name applied when the item is inative 

## prev
* type: String
* default: .jflow-prev a
* description: Seletor used to be the handler for the prev page

## next
* type: String
* default: .jflow-next a
* description: Seletor used to be the handler for the prev page  

## mode
* type: String
* default: vertical
* description: orientation mode, this parameter accepts horizontal and vertical

## speed
* type: Number
* default: 800
* description: The speed in miliseconds of the slide movement

## pager
* type: Boolean or String
* default: false
* description: False to not use pagination or the pagination container to generate paging to navigate through slides		

#Examples

## Markup  
  
    <div id="container">
   	    <ul>
   		      <li>item 1</li>
   		      <li>item 2</li>
   		      <li>item 3</li>
   		      <li>item 4</li>
   	      </ul>
    </div>
   
## Javascript
    <script type="text/javascript">
	   $(function(){
		   $('#container').sliding({
		   	itens: 3,
		   	mode: 'horizontal'
		   });
	   });
    </script>