var jquery_jflow_test_utils = {
    horizontal: {
        createitems: function(num){
            var $container = $('<div id="jflow"></div>');
            var item = '';
            $container.appendTo('#main');
            num = num || 12;
            for (var i = 0; i < num; i++) {
                item += '<div class="jflow-item">Teste jflow ' + i + '</div>';
            }
            $('#jflow').append(item);
        },

        createPaging: function(){
            $('#jflow').after('<a href="#" id="jflow-next">proximo</a>');
            $('#jflow').before('<a href="#" id="jflow-prev">anterior</a>');
        }
    },
    vertical: {
        createList: function(num){
            var $container = $('<div id="jflow"><ul></ul></div>');
            var item = '';
            $container.appendTo('#main');

            num = num || 12;
            for (var i = 0; i < num; i++) {
                item += '<li class="horizontal-item">Teste jflow ' + i + '</li>';
            }
            $('#jflow ul').append(item);
        },

        createitems: function(num){
            var $container = $('<div id="jflow"><div></div></div>');
            var item = '';
            $container.appendTo('#main');

            num = num || 12;
            for (var i = 0; i < num; i++) {
                item += '<p class="horizontal-item">Teste jflow ' + i + '</p>';
            }
            $('#jflow div').append(item);
        },

        createPaging: function(){
            $('#jflow').after('<a href="#" id="jflow-horizontal-next">proximo</a>');
            $('#jflow').before('<a href="#" id="jflow-horizontal-prev">anterior</a>');
        }
    }
}

module("jQuery jflow Plugin horizontal mode", {

    setup: function(){
        jQuery.fx.off = true;
        this.isReallyVisible = function(final_pos){
            $('#jflow').find('.jflow-item').each(function(i, el){
                var el_pos = $(this).position();
                if (el_pos.top < final_pos) {
                    ok(true, 'is in');
                }
            });
        }
    },

    teardown: function(){
        $('#jflow').remove();
    }

});

test("Basic tests", function(){

    jquery_jflow_test_utils.horizontal.createitems();

    $('#jflow').jflow();
    equals($('#jflow').length, true, 'criado container');
    equals($('#jflow').find('.jflow-item').length, 12, 'foram inseridos 12 items');
});

test("the container change to overflow hidden", function(){

    expect(6); //the amount of elements that should be visible
    jquery_jflow_test_utils.horizontal.createitems();

    $('#jflow').jflow();

    var current_overflow = $('#jflow').css('overflow');
    var current_height = $('#jflow').height();
    var container_pos = $('#jflow').position();
    var final_pos = current_height + container_pos.top;

    equals(current_overflow, 'hidden', 'e preciso ter overflow hidden');

    this.isReallyVisible(final_pos);


});

test("the container show correctly with some height of the target element", function(){

    expect(5);

    jquery_jflow_test_utils.horizontal.createitems();
    $('#jflow').find('.jflow-item').css('height', 60);
    $('#jflow').jflow();

    var current_height = $('#jflow').height();
    var container_pos = $('#jflow').position();
    var final_pos = current_height + container_pos.top;

    this.isReallyVisible(final_pos);


});

test("the container shows correctly with margin and padding", function(){

    expect(5);

    jquery_jflow_test_utils.horizontal.createitems();
    $('#jflow').find('.noticia-plantao').css({
        'height': 10,
        'padding': '3px',
        'margin-top': '4px',
        'border': '2px solid red'
    });
    $('#jflow').jflow();
    var current_height = $('#jflow').height();
    var container_pos = $('#jflow').position();
    var final_pos = current_height + container_pos.top;

    this.isReallyVisible(final_pos);
});

test("The container is correctly with specific height", function(){

    expect(5);

    jquery_jflow_test_utils.horizontal.createitems();
    $('#jflow').css('height', 250);
    $('#jflow').jflow();

    var current_height = $('#jflow').height();
    var container_pos = $('#jflow').position();
    var final_pos = current_height + container_pos.top;

    this.isReallyVisible(final_pos);


});

test("less items than mininum disable the buttons", function(){

    expect(7); //referentes a quantidade de elementos que estao no container
    jquery_jflow_test_utils.horizontal.createitems(4);
    jquery_jflow_test_utils.horizontal.createPaging();

    $('#jflow').jflow({
        prev: '#jflow-prev',
        next: '#jflow-next'
    });

    var post_overflow = $('#jflow').css('overflow');

    ok($('#jflow-next').hasClass('inativo'), 'added class that disable previous button');
    ok($('#jflow-prev').hasClass('inativo'), 'added class that disable next button');
    equals(post_overflow, 'hidden', 'Overflow less than expected');

    var current_height = $('#jflow').height();
    var container_pos = $('#jflow').position();
    var final_pos = current_height + container_pos.top;

    this.isReallyVisible(final_pos);
});

test("the started pagination shows correctly", function(){

    expect(2); //referentes a quantidade de elementos que estao no container
    jquery_jflow_test_utils.horizontal.createitems(12);
    jquery_jflow_test_utils.horizontal.createPaging();

    $('#jflow').jflow({
        prev: '#jflow-prev',
        next: '#jflow-next'
    });

    ok(!$('#jflow-next').hasClass('inativo'), 'dont insert class that disable next button');
    ok($('#jflow-prev').hasClass('inativo'), 'insert the classe that disable previous button');

});

test("When click in next, the previous button become active", function(){
    var self = this;
    jquery_jflow_test_utils.horizontal.createitems(12);
    jquery_jflow_test_utils.horizontal.createPaging();

    $('#jflow').jflow({
        prev: '#jflow-prev',
        next: '#jflow-next'
    });

    var current_height = $('#jflow').height();
    var container_pos = $('#jflow').position();
    var final_pos = current_height + container_pos.top;
    $('#jflow-next').trigger('click');
    self.isReallyVisible(final_pos);
});

test("It creates the pager correctly", function(){

    jquery_jflow_test_utils.horizontal.createitems(12);
    jquery_jflow_test_utils.horizontal.createPaging();
    $('#main').append('<div id="jflow-pager"></div>');

    $('#jflow').jflow({
        prev: '#jflow-prev',
        next: '#jflow-next',
        pager: '#jflow-pager'
    });

    var pages = $('#jflow-pager').find('li').length;

    equals(pages, 3, 'Correct amount of pages');
});

test("When clicks in pagination, they go to target page", function(){
    var self = this;
    jquery_jflow_test_utils.horizontal.createitems(12);
    jquery_jflow_test_utils.horizontal.createPaging();
    $('#main').append('<div id="jflow-pager"></div>');

    $('#jflow').jflow({
        prev: '#jflow-prev',
        next: '#jflow-next',
        pager: '#jflow-pager'
    });

    var current_height = $('#jflow').height();
    var container_pos = $('#jflow').position();
    var final_pos = current_height + container_pos.top;
    $('#jflow-page-1').trigger('click');
    self.isReallyVisible(final_pos);
});

test("Add class in current item that is paging", function(){

    jquery_jflow_test_utils.horizontal.createitems(12);
    jquery_jflow_test_utils.horizontal.createPaging();
    $('#main').append('<div id="jflow-pager"></div>');

    $('#jflow').jflow({
        prev: '#jflow-prev',
        next: '#jflow-next',
        pager: '#jflow-pager'
    });

    $('.jflow-page-1').trigger('click');
    ok($('.jflow-page-1').hasClass('active'), "The item has to be the current class");
    ok(!$('.jflow-page-item').not('.jflow-page-1').hasClass('active'), "The other class cant have active class");

});

test("Insert active class when click in next", function(){

    jquery_jflow_test_utils.horizontal.createitems(12);
    jquery_jflow_test_utils.horizontal.createPaging();
    $('#main').append('<div id="jflow-pager"></div>');

    $('#jflow').jflow({
        prev: '#jflow-prev',
        next: '#jflow-next',
        pager: '#jflow-pager'
    });

    $('#jflow-next').trigger('click');
    ok($('.jflow-page-2').hasClass('active'), "The item has to be the active class");
    ok(!$('.jflow-page-item').not('.jflow-page-2').hasClass('active'), "the other items cant have the active class");

});

test("Start with the first pagination item active", function(){

    jquery_jflow_test_utils.horizontal.createitems(12);
    jquery_jflow_test_utils.horizontal.createPaging();
    $('#main').append('<div id="jflow-pager"></div>');

    $('#jflow').jflow({
        prev: '#jflow-prev',
        next: '#jflow-next',
        pager: '#jflow-pager'
    });

    ok($('.jflow-page-1').hasClass('active'), "The item has to be the active class");
    ok(!$('.jflow-page-item').not('.jflow-page-1').hasClass('active'), "the other items cant have the active class");

});


module("Callbacks", {
    setup: function(){
        jQuery.fx.off = true;
    },
    teardown: function(){
        $('#jflow').remove();
    }



});

test("Callback for next event", function(){

    expect(1);

    jquery_jflow_test_utils.horizontal.createitems(12);
    jquery_jflow_test_utils.horizontal.createPaging();

    var control = false;

    $('#jflow').jflow({
        prev: '#jflow-prev',
        next: '#jflow-next',
        onNext: function(){
            ok(true, 'Enter in callback');
            start();
        }
    });

    $('#jflow-next').trigger('click');
    stop();
});

module("jQuery jflow vertical", {
    setup: function(){
        jQuery.fx.off = true;
        this.fitsInContainer = function(final_pos) {
            $('#jflow').find('.horizontal-item').each(function(i, el){

                var el_pos = $(this).position();
                if (el_pos.left < final_pos) {
                    ok(true, 'is out');
                }

            });
        };
        this.isReallyVisible = function(final_pos, container_pos) {
            $('#jflow').find('.horizontal-item').slice(5, 10).each(function(i, el){
                var el_pos = $(this).position();
                if (el_pos.left < final_pos && el_pos.left >= container_pos.left) {
                    ok(true, 'The element is in');
                }
                else {
                    ok(false, 'The element is out');
                }
            });
        };
    },
    teardown: function(){
        $('#jflow').remove();
    }

});

test("The container change to overflow hidden and hiddes the other items", function(){

    expect(6);

    jquery_jflow_test_utils.vertical.createList();

    $('#jflow').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });

    $('#jflow').jflow({
        mode: 'horizontal',
        item: '.horizontal-item'
    });

    var current_overflow = $('#jflow').css('overflow');
    var current_width = $('#jflow').width();
    var container_pos = $('#jflow').position();
    var final_pos = current_width + container_pos.left;

    equals(current_overflow, 'hidden', 'e preciso ter overflow hidden');

    this.fitsInContainer(final_pos);
});

test("The container give the right dimensions when add margin and padding", function(){

    expect(6);

    jquery_jflow_test_utils.vertical.createList();

    $('#jflow').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px',
        'padding': '6px',
        'margin': '2px',
        'border': '1px solid red',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });

    $('#jflow').jflow({
        mode: 'horizontal',
        item: '.horizontal-item'
    });

    var current_overflow = $('#jflow').css('overflow');
    var current_width = $('#jflow').width();
    var container_pos = $('#jflow').position();
    var final_pos = current_width + container_pos.left;

    equals(current_overflow, 'hidden', 'has to be overflow hidden');

    this.fitsInContainer(final_pos);
});

test("It has to be the right dimensions if the height not specified", function(){

    expect(7);

    jquery_jflow_test_utils.vertical.createList();

    $('#jflow').find('.horizontal-item').css({
        'float': 'left',
        'padding': '6px',
        'margin': '2px',
        'border': '1px solid red',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });

    $('#jflow').jflow({
        mode: 'horizontal',
        item: '.horizontal-item'
    });

    var current_overflow = $('#jflow').css('overflow');
    var current_width = $('#jflow').width();
    var container_pos = $('#jflow').position();
    var final_pos = current_width + container_pos.left;

    equals(current_overflow, 'hidden', 'it have to be overflow hidden');

    this.fitsInContainer(final_pos);
});

test("The markup is not a list", function(){

    expect(6);

    jquery_jflow_test_utils.vertical.createitems();

    $('#jflow').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px'
    }).end().css({
        'height': 36
    });

    $('#jflow').jflow({
        mode: 'horizontal',
        item: '.horizontal-item'
    });

    var current_overflow = $('#jflow').css('overflow');
    var current_width = $('#jflow').width();
    var container_pos = $('#jflow').position();
    var final_pos = current_width + container_pos.left;

    equals(current_overflow, 'hidden', 'it has to be overflow hidden');

    this.fitsInContainer(final_pos);
});

test("Less items than the minimum disable the buttons", function(){

    expect(7);

    jquery_jflow_test_utils.vertical.createitems(4);
    jquery_jflow_test_utils.vertical.createPaging();

    $('#jflow').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });

    $('#jflow').jflow({
        prev: '#jflow-horizontal-prev',
        next: '#jflow-horizontal-next',
        item: '.horizontal-item',
        mode: 'horizontal'
    });

    var post_overflow = $('#jflow').css('overflow');

    ok($('#jflow-horizontal-next').hasClass('inativo'), 'Disable next button');
    ok($('#jflow-horizontal-prev').hasClass('inativo'), 'Disable previous button');
    equals(post_overflow, 'hidden', 'it has to overflow');

    var current_width = $('#jflow').width();
    var container_pos = $('#jflow').position();
    var final_pos = current_width + container_pos.left;

    this.fitsInContainer(final_pos);
});

test("The start pagination show the items correctly", function(){

    expect(2);

    jquery_jflow_test_utils.vertical.createList(12);
    jquery_jflow_test_utils.vertical.createPaging();

    $('#jflow').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });

    $('#jflow').jflow({
        prev: '#jflow-horizontal-prev',
        next: '#jflow-horizontal-next',
        item: '.horizontal-item',
        mode: 'horizontal'
    });

    ok(!$('#jflow-horizontal-next').hasClass('inativo'), 'disable next button');
    ok($('#jflow-horizontal-prev').hasClass('inativo'), 'disable previous button');

});

test("When clicked go to next page and disable the previous button", function(){

    jquery_jflow_test_utils.vertical.createList(12);
    jquery_jflow_test_utils.vertical.createPaging();

    $('#jflow').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });

    $('#jflow').jflow({
        prev: '#jflow-horizontal-prev',
        next: '#jflow-horizontal-next',
        item: '.horizontal-item',
        mode: 'horizontal'
    });

    var current_width = $('#jflow').width();
    var container_pos = $('#jflow').position();
    var final_pos = current_width + container_pos.left;
    $('#jflow-horizontal-next').trigger('click');
    this.isReallyVisible(final_pos, container_pos);

});

test("Pagination in horizontal mode", function(){

    jquery_jflow_test_utils.vertical.createitems(12);
    jquery_jflow_test_utils.vertical.createPaging();
    $('#main').append('<div id="jflow-pager"></div>');

    $('#jflow').jflow({
        prev: '#jflow-prev',
        next: '#jflow-next',
        pager: '#jflow-pager',
        mode: 'horizontal'
    });

    var current_width = $('#jflow').width();
    var container_pos = $('#jflow').position();
    var final_pos = current_width + container_pos.top;

    $('#jflow-page-1').trigger('click');
    this.isReallyVisible(final_pos, container_pos);
});
