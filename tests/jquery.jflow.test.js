var jquery_jflow_test_utils = {
    horizontal: {
	createItens : function(num) {
	    var $container = $('<div id="jflow"></div>');
	    var item = '';
	    $container.appendTo('#main');
	    num = num || 12;
	    for ( var i = 0; i < num; i++) {
		item += '<div class="jflow-item">Teste jflow ' + i + '</div>';
	    }
	    $('#jflow').append(item);
	},

	createPaging : function() {
	    $('#jflow').after('<a href="#" id="jflow-next">proximo</a>');
	    $('#jflow').before('<a href="#" id="jflow-prev">anterior</a>');
	}
    },
    vertical : {
	createList : function(num) {
	    var $container = $('<div id="jflow"><ul></ul></div>');
	    var item = '';
	    $container.appendTo('#main');

	    num = num || 12;
	    for ( var i = 0; i < num; i++) {
    		item += '<li class="horizontal-item">Teste jflow ' + i + '</li>';
    	    }
    	    $('#jflow ul').append(item);
	},

	createItens : function(num) {
	    var $container = $('<div id="jflow"><div></div></div>');
	    var item = '';
	    $container.appendTo('#main');

	    num = num || 12;
	    for ( var i = 0; i < num; i++) {
    		item += '<p class="horizontal-item">Teste jflow ' + i + '</p>';
    	    }
    	    $('#jflow div').append(item);
	},

	createPaging : function() {
	    $('#jflow').after('<a href="#" id="jflow-horizontal-next">proximo</a>');
	    $('#jflow').before('<a href="#" id="jflow-horizontal-prev">anterior</a>');
	}
    }
}

module("jQuery Flow Plugin modo horizontal",{

	teardown: function() {
		$('#jflow').remove();
	}

});

test("Testes basicos de inicializacao", function(){

	jquery_jflow_test_utils.horizontal.createItens();

	$('#jflow').jflow();
	equals($('#jflow').length,true,'criado container');
    equals($('#jflow').find('.jflow-item').length, 12 ,'foram inseridos 12 itens');
});

test("O container muda a propriedade para overflow hidden e esconde os outros itens", function(){

	expect(6); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.horizontal.createItens();

	$('#jflow').jflow();

	var current_overflow = $('#jflow').css('overflow');
	var current_height = $('#jflow').height();
	var container_pos = $('#jflow').position();
	var final_pos = current_height + container_pos.top;

	equals(current_overflow,'hidden','e preciso ter overflow hidden');

	$('#jflow').find('.jflow-item').each(function(i,el){

		var el_pos = $(this).position();
		if(el_pos.top < final_pos) {
			ok(true,'A posicao do elemento ' + i + ' esta menor que a posicao do container + sua distancia ate o topo ' + el_pos.top );
		}

	});


});

test("O container exibe os itens corretos com altura explicita do elemento deslizante", function(){

	expect(5); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.horizontal.createItens();
	$('#jflow').find('.jflow-item').css('height',60);
	$('#jflow').jflow();

	var current_height = $('#jflow').height();
	var container_pos = $('#jflow').position();
	var final_pos = current_height + container_pos.top;

	$('#jflow').find('.jflow-item').each(function(i,el){

		var el_pos = $(this).position();
		if(el_pos.top < final_pos) {
			ok(true,'A posicao do elemento ' + i + ' esta menor que a posicao do container + sua distancia ate o topo ' + el_pos.top );
		}

	});


});

test("O container exibe os itens corretos com padding, margin e borda", function(){

	expect(5); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.horizontal.createItens();
	$('#jflow').find('.noticia-plantao').css({
		'height' : 10,
		'padding': '3px',
		'margin-top' : '4px',
		'border' : '2px solid red'
	});
	$('#jflow').jflow();
	var current_height = $('#jflow').height();
	var container_pos = $('#jflow').position();
	var final_pos = current_height + container_pos.top;

	$('#jflow').find('.jflow-item').each(function(i,el){

		var el_pos = $(this).position();
		if(el_pos.top < final_pos) {
			ok(true,'A posicao do elemento ' + i + ' esta menor que a posicao do container + sua distancia ate o topo ' + el_pos.top + ' - posicao final: ' + final_pos );
		}

	});
});

test("O container exibe os itens corretos com altura explicita do container", function(){

	expect(5); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.horizontal.createItens();
	$('#jflow').css('height',250);
	$('#jflow').jflow();

	var current_height = $('#jflow').height();
	var container_pos = $('#jflow').position();
	var final_pos = current_height + container_pos.top;

	$('#jflow').find('.jflow-item').each(function(i,el){

		var el_pos = $(this).position();
		if(el_pos.top < final_pos) {
			ok(true,'A posicao do elemento ' + i + ' esta menor que a posicao do container + sua distancia ate o topo ' + el_pos.top );
		}

	});


});

test("Existir menos itens dentro do container que as opcoes desativa os botoes", function(){

	expect(7); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.horizontal.createItens(4);
	jquery_jflow_test_utils.horizontal.createPaging();

	$('#jflow').jflow({
		 prev: '#jflow-prev',
         next: '#jflow-next'
	});

	var post_overflow = $('#jflow').css('overflow');

	ok($('#jflow-next').hasClass('inativo'),'inserida classe que desativa o botao de proximo');
	ok($('#jflow-prev').hasClass('inativo'),'inserida classe que desativa o botao de anterior');
	equals(post_overflow,'hidden','Overflow em itens menor que o passado');

	var current_height = $('#jflow').height();
	var container_pos = $('#jflow').position();
	var final_pos = current_height + container_pos.top;

	$('#jflow').find('.jflow-item').each(function(i,el){

		var el_pos = $(this).position();
		if(el_pos.top < final_pos) {
			ok(true,'A posicao do elemento ' + i + ' esta menor que a posicao do container + sua distancia ate o topo ' + el_pos.top );
		}
	});
});

test("A paginacao inicial exibe corretamente", function(){

	expect(2); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.horizontal.createItens(12);
	jquery_jflow_test_utils.horizontal.createPaging();

	$('#jflow').jflow({
		 prev: '#jflow-prev',
        next: '#jflow-next'
	});

	ok(!$('#jflow-next').hasClass('inativo'),'nao insere a classe que desativa o botao de proximo');
	ok($('#jflow-prev').hasClass('inativo'),'insere a classe que desativa o botao de anterior');

});

test("Quando clica em proximo desloca a quantidade de itens certa e habilita o botao anterior", function(){

	jquery_jflow_test_utils.horizontal.createItens(12);
	jquery_jflow_test_utils.horizontal.createPaging();

	$('#jflow').jflow({
		 prev: '#jflow-prev',
        next: '#jflow-next'
	});

	var current_height = $('#jflow').height();
	var container_pos = $('#jflow').position();
	var final_pos = current_height + container_pos.top;
	function verificaContainer() {
		$('#jflow').find('.noticia-plantao').slice(5,10).each(function(i,el){
			var el_pos = $(this).position();
			if(el_pos.top < final_pos && el_pos.top >= container_pos.top ) {
				ok(true,'O elemento esta no container' );
			} else {
				ok(false,'O elemento esta fora - top do elemento: ' + el_pos.top + ' / inicial do container: ' + container_pos.top + ' - posicao final do container: ' + final_pos );
			}
		});
		start();

	}
	$('#jflow-next').trigger('click');
	stop();
	window.setTimeout(verificaContainer,800);
});

test("Cria o pager corretamente", function(){

	jquery_jflow_test_utils.horizontal.createItens(12);
	jquery_jflow_test_utils.horizontal.createPaging();
	$('#main').append('<div id="jflow-pager"></div>');

	$('#jflow').jflow({
		 prev: '#jflow-prev',
        next: '#jflow-next',
        pager: '#jflow-pager'
	});

	var pages = $('#jflow-pager').find('li').length;

	equals(pages,3,'Quantidade correta de itens da paginacao');
});

test("Clica na paginacao", function(){

	jquery_jflow_test_utils.horizontal.createItens(12);
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
	function verificaContainer() {
		$('#jflow').find('.noticia-plantao').slice(5,10).each(function(i,el){
			var el_pos = $(this).position();
			if(el_pos.top < final_pos && el_pos.top >= container_pos.top ) {
				ok(true,'O elemento esta no container' );
			} else {
				ok(false,'O elemento esta fora - top do elemento: ' + el_pos.top + ' / inicial do container: ' + container_pos.top + ' - posicao final do container: ' + final_pos );
			}
		});
		start();

	}
	$('#jflow-page-1').trigger('click');
	stop();
	window.setTimeout(verificaContainer,800);
});

test("adiciona uma classe active no item atual da paginacao", function(){

	jquery_jflow_test_utils.horizontal.createItens(12);
	jquery_jflow_test_utils.horizontal.createPaging();
	$('#main').append('<div id="jflow-pager"></div>');

	$('#jflow').jflow({
		 prev: '#jflow-prev',
        next: '#jflow-next',
        pager: '#jflow-pager'
	});

	function verificaItemAtivo() {
		ok($('#jflow-page-1').hasClass('active'), "O item precisa ter a classe active no item atual");
		ok(!$('.jflow-page-item').not('#jflow-page-1').hasClass('active'), "Os itens da paginacao alem do atual nao podem ter a classe active");
		start();
	}
	$('#jflow-page-1').trigger('click');
	stop();
	window.setTimeout(verificaItemAtivo,800);
	
});


module("Callbacks",{

	teardown: function() {
		$('#jflow').remove();
	}
	
	

});

test("callback de paginacao de proximo", function(){

    expect(1);
    
	jquery_jflow_test_utils.horizontal.createItens(12);
	jquery_jflow_test_utils.horizontal.createPaging();
	
	var control = false;

	$('#jflow').jflow({
		 prev: '#jflow-prev',
        next: '#jflow-next',
        onNext: function() {
            ok(true,'entrou no callback');
            start();
        }    
	});

	$('#jflow-next').trigger('click');
	stop();
});

module("jQuery Flow Plugin modo vertical",{

	teardown: function() {
		$('#jflow').remove();
	}

});

test("O container muda a propriedade para overflow hidden e esconde os outros itens", function(){

	expect(6); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.vertical.createList();

	$('#jflow').find('.horizontal-item').css({
		'float' : 'left',
		'width' : '120px',
		'list-style-type' : 'none'
	}).end().css({
		'height' : 36
	});

	$('#jflow').jflow({
		mode: 'horizontal',
		item: '.horizontal-item'
	});

	var current_overflow = $('#jflow').css('overflow');
	var current_width = $('#jflow').width();
	var container_pos = $('#jflow').position();
	var final_pos = current_width + container_pos.left;

	equals(current_overflow,'hidden','e preciso ter overflow hidden');

	$('#jflow').find('.horizontal-item').each(function(i,el){

		var el_pos = $(this).position();
		if(el_pos.left < final_pos) {
			ok(true,'A posicao do elemento ' + i + ' esta menor que a posicao do container + sua distancia ate a esquerda ' + el_pos.left );
		}

	});
});

test("O container dimensiona o tamanho corretamente quando exist margem, padding e borda", function(){

	expect(6); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.vertical.createList();

	$('#jflow').find('.horizontal-item').css({
		'float' : 'left',
		'width' : '120px',
		'padding' : '6px',
		'margin' : '2px',
		'border' : '1px solid red',
		'list-style-type' : 'none'
	}).end().css({
		'height' : 36
	});

	$('#jflow').jflow({
		mode: 'horizontal',
		item: '.horizontal-item'
	});

	var current_overflow = $('#jflow').css('overflow');
	var current_width = $('#jflow').width();
	var container_pos = $('#jflow').position();
	var final_pos = current_width + container_pos.left;

	equals(current_overflow,'hidden','e preciso ter overflow hidden');

	$('#jflow').find('.horizontal-item').each(function(i,el){

		var el_pos = $(this).position();
		if(el_pos.left < final_pos) {
			ok(true,'A posicao do elemento ' + i + ' esta menor que a posicao do container + sua distancia ate a esquerda ' + el_pos.left );
		}

	});
});

test("O container dimensiona o tamanho corretamente quando o item deslizante nao tem dimensoes explicitas por css", function(){

	expect(7); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.vertical.createList();

	$('#jflow').find('.horizontal-item').css({
		'float' : 'left',
		'padding' : '6px',
		'margin' : '2px',
		'border' : '1px solid red',
		'list-style-type' : 'none'
	}).end().css({
		'height' : 36
	});

	$('#jflow').jflow({
		mode: 'horizontal',
		item: '.horizontal-item'
	});

	var current_overflow = $('#jflow').css('overflow');
	var current_width = $('#jflow').width();
	var container_pos = $('#jflow').position();
	var final_pos = current_width + container_pos.left;

	equals(current_overflow,'hidden','e preciso ter overflow hidden');

	$('#jflow').find('.horizontal-item').each(function(i,el){

		var el_pos = $(this).position();
		if(el_pos.left < final_pos) {
			ok(true,'A posicao do elemento ' + i + ' esta menor que a posicao do container + sua distancia ate a esquerda ' + el_pos.left );
		}

	});
});

test("O markup e diferente de ul e lis", function(){

	expect(6); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.vertical.createItens();

	$('#jflow').find('.horizontal-item').css({
		'float' : 'left',
		'width' : '120px'
	}).end().css({
		'height' : 36
	});

	$('#jflow').jflow({
		mode: 'horizontal',
		item: '.horizontal-item'
	});

	var current_overflow = $('#jflow').css('overflow');
	var current_width = $('#jflow').width();
	var container_pos = $('#jflow').position();
	var final_pos = current_width + container_pos.left;

	equals(current_overflow,'hidden','e preciso ter overflow hidden');

	$('#jflow').find('.horizontal-item').each(function(i,el){

		var el_pos = $(this).position();
		if(el_pos.left < final_pos) {
			ok(true,'A posicao do elemento ' + i + ' esta menor que a posicao do container + sua distancia ate a esquerda ' + el_pos.left );
		}

	});
});

test("Existir menos itens dentro do container que as opcoes desativa os botoes", function(){

	expect(7); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.vertical.createItens(4);
	jquery_jflow_test_utils.vertical.createPaging();

	$('#jflow').find('.horizontal-item').css({
		'float' : 'left',
		'width' : '120px',
		'list-style-type' : 'none'
	}).end().css({
		'height' : 36
	});

	$('#jflow').jflow({
		 prev: '#jflow-horizontal-prev',
         next: '#jflow-horizontal-next',
         item: '.horizontal-item',
         mode : 'horizontal'
	});

	var post_overflow = $('#jflow').css('overflow');

	ok($('#jflow-horizontal-next').hasClass('inativo'),'inserida classe que desativa o botao de proximo');
	ok($('#jflow-horizontal-prev').hasClass('inativo'),'inserida classe que desativa o botao de anterior');
	equals(post_overflow,'hidden','Overflow em itens menor que o passado');

	var current_width = $('#jflow').width();
	var container_pos = $('#jflow').position();
	var final_pos = current_width + container_pos.left;

	$('#jflow').find('.horizontal-item').each(function(i,el){

		var el_pos = $(this).position();
		if(el_pos.left < final_pos) {
			ok(true,'A posicao do elemento ' + i + ' esta menor que a posicao do container + sua distancia ate o topo ' + el_pos.left );
		}
	});
});

test("A paginacao inicial exibe corretamente", function(){

	expect(2); //referentes a quantidade de elementos que estao no container

	jquery_jflow_test_utils.vertical.createList(12);
	jquery_jflow_test_utils.vertical.createPaging();

	$('#jflow').find('.horizontal-item').css({
		'float' : 'left',
		'width' : '120px',
		'list-style-type' : 'none'
	}).end().css({
		'height' : 36
	});

	$('#jflow').jflow({
		prev: '#jflow-horizontal-prev',
        next: '#jflow-horizontal-next',
        item: '.horizontal-item',
        mode : 'horizontal'
	});

	ok(!$('#jflow-horizontal-next').hasClass('inativo'),'nao insere a classe que desativa o botao de proximo');
	ok($('#jflow-horizontal-prev').hasClass('inativo'),'insere a classe que desativa o botao de anterior');

});

test("Quando clica em proximo desloca a quantidade de itens certa e habilita o botao anterior", function(){

	jquery_jflow_test_utils.vertical.createList(12);
	jquery_jflow_test_utils.vertical.createPaging();

	$('#jflow').find('.horizontal-item').css({
		'float' : 'left',
		'width' : '120px',
		'list-style-type' : 'none'
	}).end().css({
		'height' : 36
	});

	$('#jflow').jflow({
		prev: '#jflow-horizontal-prev',
        next: '#jflow-horizontal-next',
        item: '.horizontal-item',
        mode : 'horizontal'
	});

	var current_width = $('#jflow').width();
	var container_pos = $('#jflow').position();
	var final_pos = current_width + container_pos.left;
	function verificaContainer() {
		$('#jflow').find('.horizontal-item').slice(5,10).each(function(i,el){
			var el_pos = $(this).position();
			if(el_pos.left < final_pos && el_pos.left >= container_pos.left ) {
				ok(true,'O elemento esta no container' );
			} else {
				ok(false,'O elemento esta fora - top do elemento: ' + el_pos.left + ' / inicial do container: ' + container_pos.left + ' - posicao final do container: ' + final_pos );
			}
		});
		start();

	}
	$('#jflow-horizontal-next').trigger('click');
	stop();
	window.setTimeout(verificaContainer,800);

});

test("Clica na paginacao no modo horizontal", function(){

	jquery_jflow_test_utils.vertical.createItens(12);
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
	function verificaContainer() {
		$('#jflow').find('.noticia-plantao').slice(5,10).each(function(i,el){
			var el_pos = $(this).position();
			if(el_pos.left < final_pos && el_pos.top >= container_pos.left ) {
				ok(true,'O elemento esta no container' );
			} else {
				ok(false,'O elemento esta fora - top do elemento: ' + el_pos.left + ' / inicial do container: ' + container_pos.left + ' - posicao final do container: ' + final_pos );
			}
		});
		start();

	}
	$('#jflow-page-1').trigger('click');
	stop();
	window.setTimeout(verificaContainer,800);
});