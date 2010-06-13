/**
  *
  * @name jQuery
  * @namespace
  * @author Alexandre Magno (http://blog.alexandremagno.net)
  * @version 1.0
  * @description Plugin de jQuery para Carousel que suporta orientacao vertical e horizontal
  * @requires jquery.scrollTo-min.js
  * @param {String} [item=".jflow-item"] O seletor usado como referencia para o carousel
  * @param {Number} [itens=5] A quantidade de itens que ira deslizar no carousel
  * @param {String} [inativeClass="inativo"] Classe inserida na paginacao quando chegar nos limites de paginacao
  * @param {String} [prev=".jflow-pag a"] Seletor usado como botao de voltar
  * @param {String} [next=".jflow-pag a"] Seletor usado como botao de avancar
  * @param {String} [mode="vertical"] Modo de orientacao dos slides, aceita os parametros horizontal e vertical
  * @param {Number} [speed=800] Velocidade em milisegundos do slide
  * @param {Boolean|String} [pager=false] O container onde sera gerada a paginacao
  * @example
  * <div id="container">
  * 	<ul>
  * 		<li>item 1</li>
  * 		<li>item 2</li>
  * 		<li>item 3</li>
  * 		<li>item 4</li>
  * 	</ul>
  * </div>
  * $('#container').jflow({
  * 	itens: 3,
  * 	mode: 'horizontal'
  * });
  * @returns {Object} jQuery
  *
  *
 */

(function($) {
     $.fn.jflow = function(params){

         var options = {
             item: '.jflow-item',
             itens: 5,
             inativeClass : 'inactive',
             prev: '.jflow-prev a',
             next: '.jflow-next a',
             mode: 'vertical',
             pager: false,
             speed: 800
         }

         var op = $.extend(options, params);
         var $self = this;
         var count = 0;
         var $flowbox = $(op.item);
         var li_count = $(op.item).length;

         if(li_count<=op.itens) {
             $(op.next).addClass(op.inativeClass);
         }
         var li_amount = 0;
         if(li_count<op.itens) {
             li_amount = li_count;
         } else {
             li_amount = op.itens;
         }

         var max_itens = li_count-op.itens;
         var flowbox_dimensions = op.mode == 'vertical' ? $flowbox.outerHeight(true) : $flowbox.outerWidth(true);
         var li_size = flowbox_dimensions;
         var overall_size = li_count*flowbox_dimensions;
         var overflow_size = li_size*li_amount;
         var pages = Math.ceil(li_count/op.itens);

         if(op.mode=='vertical') {
             $self.css({
	                   'height':overflow_size,
	                   'overflow' : 'hidden'
	               });
         } else {
             $self.css({
        		   'width': overflow_size,
        		   'overflow':'hidden'
        	       });
             $self.children(':first').css({
	                                      'width':overall_size
	                                  });
         }

         if(op.pager) {

             var pager = '';
             for(var i=0;i<pages;i++) {
        	 pager+='<li><a href="#" id="jflow-page-'+ i +'">pagina '+ i +'</a></li>';
             }
             $(op.pager).append('<ul>'+pager+'</ul>');
         }

         $(op.prev).addClass(op.inativeClass).bind('click',function(){
                                                       if(count>0) {
                                                           count-=op.itens;
                                                           $self.scrollTo( $(op.item).eq(count), op.speed, {onAfter: function (){
                                                                                                                if(count==0) {
                                                                                                                    $(op.prev).addClass(op.inativeClass);
                                                                                                                }
                                                                                                            }});
                                                           $(op.next).removeClass(op.inativeClass);
                                                       }
                                                       //IE 7 Bug
                                                       $(this).blur();
                                                       return false;
                                                   });

         $(op.next).bind('click',function(){
        	 	     if(count<max_itens) {
                                 count+=op.itens;
                                 $self.scrollTo( $(op.item).eq(count), op.speed, {onAfter: function (){
                    	                                                              if(count>=max_itens) {
                                                                                          $(op.next).addClass(op.inativeClass);
                                                                                      }
                                                                                  }});
                                 $(op.prev).removeClass(op.inativeClass);
                             }
                             //IE7 Bug
                             $(this).blur();
                             return false;
                         });

         $(op.pager).bind('click',function(e){
        	              var $target = $(e.target);
        	              if($target.is('a')) {
        		          var index = $target.attr('id').split('-')[2];
        		          count = index * op.itens;
        		          $self.scrollTo( $(op.item).eq(count), op.speed, {
					              onAfter: function(){
						          if(count>=max_itens) {
                                                              $(op.next).addClass(op.inativeClass);
						              $(op.prev).removeClass(op.inativeClass);
                                                          }
						          if(count==0) {
                        	                              $(op.prev).addClass(op.inativeClass);
							      $(op.next).removeClass(op.inativeClass);
                    	                                  }
					              }
				                  });
        	              }
        	              return false;
                          });

     };

 })(jQuery);