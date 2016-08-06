$(document).ready(function(){
	$(window).scroll(function(){
		var top=$(window).scrollTop();
		var menu=$('#menu');
		var floors=$(".floor");
		var currentid="";
		floors.each(function(){
			var m=$(this);
			var floorTop=m.offset().top;
			if(top>=floorTop){
				currentid='#'+m.attr('id');
			}else{
				return;
			}
			//console.log(floorTop);
		});
		menu.find('#current').removeAttr('id');
		//alert(menu.find(currentid).text());
		menu.find("[href="+currentid+"]").attr("id","current");
		console.log(currentid);
	});
});
