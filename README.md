# jFlow
> Version 1.1

# About the plugin ?

This plugin is alternative for slider / carousel plugins out there. The reason that I develop this one is that I was needed a carousel
that could support more complex markup structure inside the carousel container. Besides that, this is the first carousel plugin completely
tested.

This plugin accepts horizontal and vertical orientation

# Features

* Pagination
* Vertical and horizontal orientation
* You can choose the item will be slided inside any markup

# Where is been used?

G1 at Globo.com - http://g1.globo.com/

# Requirements

jquery.scrollTo - http://flesler.blogspot.com/2007/10/jqueryscrollto.html

# Tested

* Firefox 3+ Windows / MAC / Linux
* IE 6, 7 Windows

# Issues

* You must define width (horizontal mode) or height (vertical mode) to the slide calculate where will finish the container. If the itens are variable they still works,
but the itens not exactly will fit at container

* The slide works at itens already loaded, just hidding the subsequent ones. This plugin follow this UI pattern: http://developer.yahoo.com/ypatterns/selection/carousel.html
If you wish to use with ajax for a larg amount of itens, I'm working on that for next releases.

* For horizontal slider, you should use float instead display: inline and not use margin topo or padding top in itens, you could set theses properties on outermost container


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

## itens
* type: Number
* default: 5
* description: Itens amount that will be slided per time

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
* description: orientation mode, this parameter accepts orizontal and vertical

## speed
* type: Number
* default: 800
* description: The speed in miliseconds of the slide movement

## pager
* type: Boolean or String
* default: false
* description: False to not use pagination or the pagination container to generate paging to navigate throught slides		

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
		   $('#container').jflow({
		   	itens: 3,
		   	mode: 'horizontal'
		   });
	   });
   </script>
  