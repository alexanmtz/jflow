/**
 *
 * @name sliding
 * @namespace jQuery
 * @author Alexandre Magno (http://blog.alexandremagno.net)
 * @version 1.3
 * @description A complete sliding carousel
 * @requires jquery.scrollTo
 * @param {Object} params Plugin options
 * @param {String} [params.item=".jflow-item"] the selector used by the plugin
 * @param {Number} [params.itens=5] the itens that will be visible at first glance
 * @param {String} [params.inativeClass="inativo"] the inactive class used to disable the butons
 * @param {String} [params.prev=".jflow-prev a"] the selector used to back button
 * @param {String} [params.next=".jflow-next a"] the selector used to next button
 * @param {String} [params.mode="vertical"] orientation mode, can be horizontal or vertical
 * @param {Number} [params.speed=800] the speed of the animation
 * @param {Boolean|String} [params.pager=false] there will be some pagination? If true, it will be this selector
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
 *  item: '#container ul li',
 * 	mode: 'horizontal'
 * });
 * @returns {Object} jQuery
 *
 *
 */
(function($){

    $.fn.jflow = function(params){
      return this.each(function(){
        var options = {
            item: '.sliding-item',
            itens: 5,
            inativeClass: 'inativo',
            prev: '.sliding-prev a',
            next: '.sliding-next a',
            mode: 'vertical',
            pager: false,
            speed: 800,
            onNext: function(){
            }
        }

        var op = $.extend(options, params);
        var self = this;
        var $self = $(this);
        var count = 0;
        var $flowbox = $(op.item);
        var li_count = $(op.item).length;
        var page = 1;

        if (li_count <= op.itens) {
            $(op.next).addClass(op.inativeClass);
        }
        var li_amount = 0;
        if (li_count < op.itens) {
            li_amount = li_count;
        }
        else {
            li_amount = op.itens;
        }

        var max_itens = li_count - op.itens;
        var flowbox_dimensions = op.mode == 'vertical' ? $flowbox.outerHeight(true) : $flowbox.outerWidth(true);
        var li_size = flowbox_dimensions;
        var overall_size = li_count * flowbox_dimensions;
        var overflow_size = li_size * li_amount;
        var pages = Math.ceil(li_count / op.itens);

        if (op.mode == 'vertical') {
            $self.css({
                'height': overflow_size,
                'overflow': 'hidden'
            });
        }
        else {
            $self.css({
                'width': overflow_size,
                'overflow': 'hidden'
            });
            $self.children(':first').css({
                'width': overall_size
            });
        }

        if (op.pager) {

            var pager = '';
            for (var i = 1; i < pages + 1; i++) {
                if (i == 1) {
                    var currentClass = 'sliding-page-item active';
                }
                else {
                    var currentClass = 'sliding-page-item';
                }

                pager += '<li><a href="#" class="' + currentClass + ' sliding-page-' + i + '">page ' + i + '</a></li>';
            }
            $(op.pager).append('<ul>' + pager + '</ul>');
        }

        $(op.prev).addClass(op.inativeClass).unbind('click.sliding').bind('click.sliding', function(){
            if (count > 0) {
                count -= op.itens;
                $self.clearQueue('fx').scrollTo($(op.item).eq(count), op.speed, {
                    onAfter: function(){
                        page--;
                        $(op.pager).find('.sliding-page-item').removeClass('active');
                        $(op.pager).find(".sliding-page-" + page).addClass('active');
                        if (count == 0) {
                            $(op.prev).addClass(op.inativeClass);
                        }
                    }
                });
                $(op.next).removeClass(op.inativeClass);
            }
            //IE 7 Bug
            $(this).blur();
            return false;
        });

        $(op.next).unbind('click.sliding').bind('click.sliding', function(){
            if (count < max_itens) {
                count += op.itens;
                $self.clearQueue('fx').scrollTo($(op.item).eq(count), op.speed, {
                    onAfter: function(){
                        page++;
                        $(op.pager).find('.sliding-page-item').removeClass('active');
                        $(op.pager).find(".sliding-page-" + page).addClass('active');
                        if (count >= max_itens) {
                            $(op.next).addClass(op.inativeClass);
                        }
                        op.onNext.call(this);
                    }
                });
                $(op.prev).removeClass(op.inativeClass);
            }
            //IE7 Bug
            $(this).blur();
            return false;
        });

        $(op.pager).unbind('click.sliding').bind('click.sliding', function(e){
            var $target = $(e.target);
            $('.sliding-page-item').removeClass('active');
            $target.addClass('active');
            if ($target.is('a')) {
                var index = $target.parent().index();
                count = index * op.itens;
                $self.clearQueue('fx').scrollTo($(op.item).eq(count), op.speed, {
                    onAfter: function(){
                        if (count >= max_itens) {
                            $(op.next).addClass(op.inativeClass);
                            $(op.prev).removeClass(op.inativeClass);
                        }
                        if (count == 0) {
                            $(op.prev).addClass(op.inativeClass);
                            $(op.next).removeClass(op.inativeClass);
                        }
                    }
                });
            }
            return false;
        });

    });
  };
})(jQuery);
