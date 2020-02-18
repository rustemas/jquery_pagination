;(function($) {
	$.fn.paginate = function(options) {
		const settings = $.extend({
            perPage: 10,
			scrollTo: 'self',
			scroll: true,
			buttonClass: 'btn btn-secondary',
			selButtonClass: 'btn-primary',
			last: '>>',
			first: '<<',
			next: '>',
			prev: '<'
        },options);
		let $father = this;
		let curPage = 1;
		let $children = this.children();
		if($children.length <= settings.perPage) return;
		$('.pagination',this).remove(); 
		
		let pagesNum = Math.ceil($children.length / settings.perPage);
		let $pages = $('<div class="pagination"></div>');
		$.each(['first','prev'],function(index,value){
			$('<button type="button" class="'+settings.buttonClass+' less" disabled>'+settings[value]+'</button>').click(function(){switchPage(value=='first'?1:curPage-1);}).appendTo($pages);
		});
		for(i=1;i<=pagesNum;i++){
			$pages.append('<button type="button" class="'+settings.cssPrefix+'btn '+(i==1?settings.selButtonClass:'')+'" data-num="'+i+'">'+i+'</button> ');
		}
		$.each(['next','last'],function(index,value){
			$('<button type="button" class="'+settings.buttonClass+' more">'+settings[value]+'</button>').click(function(){switchPage(value=='last'?pagesNum:curPage+1);}).appendTo($pages);
		});
		$('button.btn-page',$pages).click(function(e) {switchPage($(this).data('num'));});
		
		let switchPage = function(page){
			if(page < 1 || page > pagesNum) return;
			$('button.less',$pages).attr('disabled',page<=1);
			$('button.more',$pages).attr('disabled',page>=pagesNum);
			curPage = page;
			$('button',$pages).removeClass(settings.selButtonClass);
			$('button[data-num='+page+']',$pages).addClass(settings.selButtonClass);
			$children.each(function(i){
				$(this).toggle(i >= (page-1)*settings.perPage && i < page*settings.perPage);
			});
			if(settings.scroll){
				let scrollTo = settings.scrollTo == 'self' ? $father : $(settings.scrollTo);
				$('html, body').animate({scrollTop: scrollTo.offset().top-30},'fast');
			}
		};
		this.append($pages);
		switchPage(1);
		return this;
	};
}(jQuery));
