var jquery_sliding_test_utils = {
    horizontal: {
        createItens: function(num){
            var $container = $('<div id="sliding"></div>');
            var item = '';
            $container.appendTo('#main');
            num = num || 12;
            for (var i = 0; i < num; i++) {
                item += '<div class="sliding-item">Teste sliding ' + i + '</div>';
            }
            $('#sliding').append(item);
        },
        
        createPaging: function(){
            $('#sliding').after('<a href="#" id="sliding-next">proximo</a>');
            $('#sliding').before('<a href="#" id="sliding-prev">anterior</a>');
        }
    },
    vertical: {
        createList: function(num){
            var $container = $('<div id="sliding"><ul></ul></div>');
            var item = '';
            $container.appendTo('#main');
            
            num = num || 12;
            for (var i = 0; i < num; i++) {
                item += '<li class="horizontal-item">Teste sliding ' + i + '</li>';
            }
            $('#sliding ul').append(item);
        },
        
        createItens: function(num){
            var $container = $('<div id="sliding"><div></div></div>');
            var item = '';
            $container.appendTo('#main');
            
            num = num || 12;
            for (var i = 0; i < num; i++) {
                item += '<p class="horizontal-item">Teste sliding ' + i + '</p>';
            }
            $('#sliding div').append(item);
        },
        
        createPaging: function(){
            $('#sliding').after('<a href="#" id="sliding-horizontal-next">proximo</a>');
            $('#sliding').before('<a href="#" id="sliding-horizontal-prev">anterior</a>');
        }
    }
}

module("jQuery sliding Plugin horizontal mode", {

    setup: function(){
        jQuery.fx.off = true;
        this.isReallyVisible = function(final_pos){
            $('#sliding').find('.sliding-item').each(function(i, el){
                var el_pos = $(this).position();
                if (el_pos.top < final_pos) {
                    ok(true, 'is in');
                }
            });
        }
    },
    
    teardown: function(){
        $('#sliding').remove();
    }
    
});

test("Basic tests", function(){

    jquery_sliding_test_utils.horizontal.createItens();
    
    $('#sliding').sliding();
    equals($('#sliding').length, true, 'criado container');
    equals($('#sliding').find('.sliding-item').length, 12, 'foram inseridos 12 itens');
});

test("the container change to overflow hidden", function(){

    expect(6); //the amount of elements that should be visible
    jquery_sliding_test_utils.horizontal.createItens();
    
    $('#sliding').sliding();
    
    var current_overflow = $('#sliding').css('overflow');
    var current_height = $('#sliding').height();
    var container_pos = $('#sliding').position();
    var final_pos = current_height + container_pos.top;
    
    equals(current_overflow, 'hidden', 'e preciso ter overflow hidden');
    
    this.isReallyVisible(final_pos);
    
    
});

test("the container show correctly with some height of the target element", function(){

    expect(5);
    
    jquery_sliding_test_utils.horizontal.createItens();
    $('#sliding').find('.sliding-item').css('height', 60);
    $('#sliding').sliding();
    
    var current_height = $('#sliding').height();
    var container_pos = $('#sliding').position();
    var final_pos = current_height + container_pos.top;
    
    this.isReallyVisible(final_pos);
    
    
});

test("the container shows correctly with margin and padding", function(){

    expect(5);
    
    jquery_sliding_test_utils.horizontal.createItens();
    $('#sliding').find('.noticia-plantao').css({
        'height': 10,
        'padding': '3px',
        'margin-top': '4px',
        'border': '2px solid red'
    });
    $('#sliding').sliding();
    var current_height = $('#sliding').height();
    var container_pos = $('#sliding').position();
    var final_pos = current_height + container_pos.top;
    
    this.isReallyVisible(final_pos);
});

test("The container is correctly with specific height", function(){

    expect(5);
    
    jquery_sliding_test_utils.horizontal.createItens();
    $('#sliding').css('height', 250);
    $('#sliding').sliding();
    
    var current_height = $('#sliding').height();
    var container_pos = $('#sliding').position();
    var final_pos = current_height + container_pos.top;
    
    this.isReallyVisible(final_pos);
    
    
});

test("less itens than mininum disable the buttons", function(){

    expect(7); //referentes a quantidade de elementos que estao no container
    jquery_sliding_test_utils.horizontal.createItens(4);
    jquery_sliding_test_utils.horizontal.createPaging();
    
    $('#sliding').sliding({
        prev: '#sliding-prev',
        next: '#sliding-next'
    });
    
    var post_overflow = $('#sliding').css('overflow');
    
    ok($('#sliding-next').hasClass('inativo'), 'added class that disable previous button');
    ok($('#sliding-prev').hasClass('inativo'), 'added class that disable next button');
    equals(post_overflow, 'hidden', 'Overflow less than expected');
    
    var current_height = $('#sliding').height();
    var container_pos = $('#sliding').position();
    var final_pos = current_height + container_pos.top;
    
    this.isReallyVisible(final_pos);
});

test("the started pagination shows correctly", function(){

    expect(2); //referentes a quantidade de elementos que estao no container
    jquery_sliding_test_utils.horizontal.createItens(12);
    jquery_sliding_test_utils.horizontal.createPaging();
    
    $('#sliding').sliding({
        prev: '#sliding-prev',
        next: '#sliding-next'
    });
    
    ok(!$('#sliding-next').hasClass('inativo'), 'dont insert class that disable next button');
    ok($('#sliding-prev').hasClass('inativo'), 'insert the classe that disable previous button');
    
});

test("When click in next, the previous button become active", function(){
    var self = this;
    jquery_sliding_test_utils.horizontal.createItens(12);
    jquery_sliding_test_utils.horizontal.createPaging();
    
    $('#sliding').sliding({
        prev: '#sliding-prev',
        next: '#sliding-next'
    });
    
    var current_height = $('#sliding').height();
    var container_pos = $('#sliding').position();
    var final_pos = current_height + container_pos.top;
    $('#sliding-next').trigger('click');
    self.isReallyVisible(final_pos);
});

test("It creates the pager correctly", function(){

    jquery_sliding_test_utils.horizontal.createItens(12);
    jquery_sliding_test_utils.horizontal.createPaging();
    $('#main').append('<div id="sliding-pager"></div>');
    
    $('#sliding').sliding({
        prev: '#sliding-prev',
        next: '#sliding-next',
        pager: '#sliding-pager'
    });
    
    var pages = $('#sliding-pager').find('li').length;
    
    equals(pages, 3, 'Correct amount of pages');
});

test("When clicks in pagination, they go to target page", function(){
    var self = this;
    jquery_sliding_test_utils.horizontal.createItens(12);
    jquery_sliding_test_utils.horizontal.createPaging();
    $('#main').append('<div id="sliding-pager"></div>');
    
    $('#sliding').sliding({
        prev: '#sliding-prev',
        next: '#sliding-next',
        pager: '#sliding-pager'
    });
    
    var current_height = $('#sliding').height();
    var container_pos = $('#sliding').position();
    var final_pos = current_height + container_pos.top;
    $('#sliding-page-1').trigger('click');
    self.isReallyVisible(final_pos);
});

test("Add class in current item that is paging", function(){

    jquery_sliding_test_utils.horizontal.createItens(12);
    jquery_sliding_test_utils.horizontal.createPaging();
    $('#main').append('<div id="sliding-pager"></div>');
    
    $('#sliding').sliding({
        prev: '#sliding-prev',
        next: '#sliding-next',
        pager: '#sliding-pager'
    });
    
    $('.sliding-page-1').trigger('click');
    ok($('.sliding-page-1').hasClass('active'), "The item has to be the current class");
    ok(!$('.sliding-page-item').not('.sliding-page-1').hasClass('active'), "The other class cant have active class");
    
});

test("Insert active class when click in next", function(){

    jquery_sliding_test_utils.horizontal.createItens(12);
    jquery_sliding_test_utils.horizontal.createPaging();
    $('#main').append('<div id="sliding-pager"></div>');
    
    $('#sliding').sliding({
        prev: '#sliding-prev',
        next: '#sliding-next',
        pager: '#sliding-pager'
    });
    
    $('#sliding-next').trigger('click');
    ok($('.sliding-page-2').hasClass('active'), "The item has to be the active class");
    ok(!$('.sliding-page-item').not('.sliding-page-2').hasClass('active'), "the other itens cant have the active class");
    
});

test("Start with the first pagination item active", function(){

    jquery_sliding_test_utils.horizontal.createItens(12);
    jquery_sliding_test_utils.horizontal.createPaging();
    $('#main').append('<div id="sliding-pager"></div>');
    
    $('#sliding').sliding({
        prev: '#sliding-prev',
        next: '#sliding-next',
        pager: '#sliding-pager'
    });
    
    ok($('.sliding-page-1').hasClass('active'), "The item has to be the active class");
    ok(!$('.sliding-page-item').not('.sliding-page-1').hasClass('active'), "the other itens cant have the active class");
    
});


module("Callbacks", {
    setup: function(){
        jQuery.fx.off = true;
    },
    teardown: function(){
        $('#sliding').remove();
    }
    
    
    
});

test("Callback for next event", function(){

    expect(1);
    
    jquery_sliding_test_utils.horizontal.createItens(12);
    jquery_sliding_test_utils.horizontal.createPaging();
    
    var control = false;
    
    $('#sliding').sliding({
        prev: '#sliding-prev',
        next: '#sliding-next',
        onNext: function(){
            ok(true, 'Enter in callback');
            start();
        }
    });
    
    $('#sliding-next').trigger('click');
    stop();
});

module("jQuery sliding vertical", {
    setup: function(){
        jQuery.fx.off = true;
        this.fitsInContainer = function(final_pos) {
            $('#sliding').find('.horizontal-item').each(function(i, el){
            
                var el_pos = $(this).position();
                if (el_pos.left < final_pos) {
                    ok(true, 'is out');
                }
                
            });
        };
        this.isReallyVisible = function(final_pos, container_pos) {
            $('#sliding').find('.horizontal-item').slice(5, 10).each(function(i, el){
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
        $('#sliding').remove();
    }
    
});

test("The container change to overflow hidden and hiddes the other itens", function(){

    expect(6);
    
    jquery_sliding_test_utils.vertical.createList();
    
    $('#sliding').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });
    
    $('#sliding').sliding({
        mode: 'horizontal',
        item: '.horizontal-item'
    });
    
    var current_overflow = $('#sliding').css('overflow');
    var current_width = $('#sliding').width();
    var container_pos = $('#sliding').position();
    var final_pos = current_width + container_pos.left;
    
    equals(current_overflow, 'hidden', 'e preciso ter overflow hidden');
    
    this.fitsInContainer(final_pos);
});

test("The container give the right dimensions when add margin and padding", function(){

    expect(6);
    
    jquery_sliding_test_utils.vertical.createList();
    
    $('#sliding').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px',
        'padding': '6px',
        'margin': '2px',
        'border': '1px solid red',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });
    
    $('#sliding').sliding({
        mode: 'horizontal',
        item: '.horizontal-item'
    });
    
    var current_overflow = $('#sliding').css('overflow');
    var current_width = $('#sliding').width();
    var container_pos = $('#sliding').position();
    var final_pos = current_width + container_pos.left;
    
    equals(current_overflow, 'hidden', 'has to be overflow hidden');
    
    this.fitsInContainer(final_pos);
});

test("It has to be the right dimensions if the height not specified", function(){

    expect(7);
    
    jquery_sliding_test_utils.vertical.createList();
    
    $('#sliding').find('.horizontal-item').css({
        'float': 'left',
        'padding': '6px',
        'margin': '2px',
        'border': '1px solid red',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });
    
    $('#sliding').sliding({
        mode: 'horizontal',
        item: '.horizontal-item'
    });
    
    var current_overflow = $('#sliding').css('overflow');
    var current_width = $('#sliding').width();
    var container_pos = $('#sliding').position();
    var final_pos = current_width + container_pos.left;
    
    equals(current_overflow, 'hidden', 'it have to be overflow hidden');
    
    this.fitsInContainer(final_pos);
});

test("The markup is not a list", function(){

    expect(6);
    
    jquery_sliding_test_utils.vertical.createItens();
    
    $('#sliding').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px'
    }).end().css({
        'height': 36
    });
    
    $('#sliding').sliding({
        mode: 'horizontal',
        item: '.horizontal-item'
    });
    
    var current_overflow = $('#sliding').css('overflow');
    var current_width = $('#sliding').width();
    var container_pos = $('#sliding').position();
    var final_pos = current_width + container_pos.left;
    
    equals(current_overflow, 'hidden', 'it has to be overflow hidden');
    
    this.fitsInContainer(final_pos);
});

test("Less itens than the minimum disable the buttons", function(){

    expect(7);
    
    jquery_sliding_test_utils.vertical.createItens(4);
    jquery_sliding_test_utils.vertical.createPaging();
    
    $('#sliding').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });
    
    $('#sliding').sliding({
        prev: '#sliding-horizontal-prev',
        next: '#sliding-horizontal-next',
        item: '.horizontal-item',
        mode: 'horizontal'
    });
    
    var post_overflow = $('#sliding').css('overflow');
    
    ok($('#sliding-horizontal-next').hasClass('inativo'), 'Disable next button');
    ok($('#sliding-horizontal-prev').hasClass('inativo'), 'Disable previous button');
    equals(post_overflow, 'hidden', 'it has to overflow');
    
    var current_width = $('#sliding').width();
    var container_pos = $('#sliding').position();
    var final_pos = current_width + container_pos.left;
    
    this.fitsInContainer(final_pos);
});

test("The start pagination show the itens correctly", function(){

    expect(2);
    
    jquery_sliding_test_utils.vertical.createList(12);
    jquery_sliding_test_utils.vertical.createPaging();
    
    $('#sliding').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });
    
    $('#sliding').sliding({
        prev: '#sliding-horizontal-prev',
        next: '#sliding-horizontal-next',
        item: '.horizontal-item',
        mode: 'horizontal'
    });
    
    ok(!$('#sliding-horizontal-next').hasClass('inativo'), 'disable next button');
    ok($('#sliding-horizontal-prev').hasClass('inativo'), 'disable previous button');
    
});

test("When clicked go to next page and disable the previous button", function(){

    jquery_sliding_test_utils.vertical.createList(12);
    jquery_sliding_test_utils.vertical.createPaging();
    
    $('#sliding').find('.horizontal-item').css({
        'float': 'left',
        'width': '120px',
        'list-style-type': 'none'
    }).end().css({
        'height': 36
    });
    
    $('#sliding').sliding({
        prev: '#sliding-horizontal-prev',
        next: '#sliding-horizontal-next',
        item: '.horizontal-item',
        mode: 'horizontal'
    });
    
    var current_width = $('#sliding').width();
    var container_pos = $('#sliding').position();
    var final_pos = current_width + container_pos.left;
    $('#sliding-horizontal-next').trigger('click');
    this.isReallyVisible(final_pos, container_pos);
    
});

test("Pagination in horizontal mode", function(){

    jquery_sliding_test_utils.vertical.createItens(12);
    jquery_sliding_test_utils.vertical.createPaging();
    $('#main').append('<div id="sliding-pager"></div>');
    
    $('#sliding').sliding({
        prev: '#sliding-prev',
        next: '#sliding-next',
        pager: '#sliding-pager',
        mode: 'horizontal'
    });
    
    var current_width = $('#sliding').width();
    var container_pos = $('#sliding').position();
    var final_pos = current_width + container_pos.top;
    
    $('#sliding-page-1').trigger('click');
    this.isReallyVisible(final_pos, container_pos);
});
