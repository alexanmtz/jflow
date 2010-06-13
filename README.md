# jFlow
> Version 0.1

# What is this ?

A simple jQuery for caroussels

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
