$(document).ready(function(){

	$(".fichaRoja").hide();//Efecto ocultar de fichas
	$(".fichaNegra").hide();	
  	
  		

			$("#Mostrar").click(function(){	
				
			$(".fichaRoja").show("explode",1000);
	        $(".fichaNegra").show("explode",1000);
			
						
				
		
		for(var i = 1; i<= 9; i++) {// ciclo para generar los bloques cuando se da clic en comenzar
		if(i % 2 == 0){
			x=1;
		}else{
			x=0;
		}
		
		$("#container").append("<div id=row-" + i + " class='fila'></div>")//aumenta un div fila
		for( var y = 1; y <= 8; y++) {
			if(y % 2 == x) {
				col_id = 'row-' + i + '-col-' + y;
				$("#row-" + i).append("<div class='columna-blanca' data-row= "+i+" data-col="+y+" id=" + col_id + "></div>");//aumanta un div columna-blanca
				//ficha rojas
				if( i <= 3 ) {
					ficha_id = 'f1-' + 'row-' + i + '-col-' + y;
					$("#"+ col_id).append("<div class='fichaRoja' id="+ ficha_id +"></div>");
				}
				//fichas negras
				if( i >= 7) {
					ficha_id = 'f2-' + 'row-' + i + '-col-' + y;
					$("#"+ col_id).append("<div class='fichaNegra' id="+ ficha_id +"></div>");
				}
			} else {
				$("#row-" + i).append("<div class='columna-negra'></div>");//aumenta un div columna negra
			}
		}
		$("#container").append("<br>");

	}

	

$(".fichaRoja").draggable({ revert: 'invalid' });//funcion draggable para las fichas
$(".fichaNegra").draggable({ revert: 'invalid' });


for(var i =1; i<=9; i++){
	for(var y=1; y<=8; y++){
		col_id= "row-"+ i + "-col-" + y;
		$("#" + col_id).droppable({
			drop: function(event, ui){
				var row= parseInt($(this).attr("data-row"));
				var col= parseInt($(this).attr("data-col"));
				var fila_previa = parseInt(ui.draggable.parent().attr("id").substr(4,1));
				var col_previa = parseInt(ui.draggable.parent().attr("id").substr(10,1));
				$(ui.draggable).appendTo($(this));

				if(ui.draggable.hasClass("fichaRoja")){
					if((row-2) == fila_previa){
						if(col_previa > col){
							col_=col_previa - 1;
						}else{
							col_=col_previa +1;
						}
						div_id ="row-" + (row - 1) + "-col-" + col_;
						$("#" + div_id).empty();
					}
				}else{
					if((row + 2) ==fila_previa){
						if(col_previa> col){
							col_= col_previa - 1;
						}else{
							col_=col_previa + 1; 
						}
						div_id = "row-" + (row+1) + "-col-" + col_;
						$("#" + div_id).empty();
					}
				}
			},
		
	

	accept: function(d) {
					var parentDiv = d.parent().prop('id');//obtiene la propiedad "id" del div padre de la ficha que se droppable
					console.log('parentDiv: '+parentDiv);
					var row = parseInt(parentDiv.substr(4, 1));//determina el valor de la fila del div Padre, substrayendo de la cadena de su id
					var col = parseInt(parentDiv.substr(10, 1));//determina el valor de la columna del div Padre, substrayendo de la cadena de su id
					console.log("fila"+row);
					console.log("columna"+col);
					var fila_soltar = parseInt($(this).attr("data-row"));//la fila del div droppable
					var col_soltar = parseInt($(this).attr("data-col"));
					console.log("fila_drop"+ fila_soltar);
					console.log("columna_drop"+ col_soltar);

					if (d.hasClass( "fichaRoja" )) {
						if((fila_soltar - 2) == row) {//verifica si salto dos casillas
							if (col > col_soltar){
								col_previa= col_soltar + 1 ;
							}else{
								col_previa =col_soltar - 1;
							}
							
							div_id = 'row-' + (fila_soltar - 1) + "-col-" + col_previa;
							
							//retorna true si el hijo de es div(casillero), es la ficha2 y hay por lomenos un elemento hijo, o sino retorna False
							return ($("#"+div_id).children().hasClass("fichaNegra") && ! $(this).children().length > 0 );
						}
						//(si solo salta una casilla)retorna tru si cumple con las condiciones
						return ((fila_soltar - 1) == row && (col_soltar -1 == col || col_soltar + 1 == col) && (! $(this).children().length > 0 ));
					} else {
						if((fila_soltar + 2) == row) {
							if (col > col_soltar){
								col_previa =col_soltar + 1;
							}else{
								col_previa =col_soltar - 1;
							}
							
							div_id = 'row-' + (fila_soltar + 1) + "-col-" + col_previa;
							return ($("#"+div_id).children().hasClass("fichaRoja") && ! $(this).children().length > 0 );
						}
						return ((fila_soltar + 1) == row && (col_soltar -1 == col || col_soltar + 1 == col) && (! $(this).children().length > 0 ));
					}
		   		 }
			});
		}
	}

	

	
});//Fin de funcion comenzar

	



	var tiempo= {
	hora: 0,
	minuto: 0,
	segundo: 0
				}
var tiempo_corriendo= null;

	$("#timer").hide();

	$("#Iniciar").click(function(){
	

	$("#timer").show("explode",1000);



		if($(this).text() == "Inicia"){
			$(this).text("Detener");
			tiempo_corriendo= setInterval(function(){
			//segundos
			tiempo.segundo++;
			if(tiempo.segundo >= 60){
				tiempo.segundo = 0;
				tiempo.minuto++;				
			}

			//minutos
			if(tiempo.minuto >= 60){
				tiempo.minuto= 0;
				tiempo.hora++;
			}

			$("#hour").text(tiempo.hora < 10 ? "0" + tiempo.hora : tiempo.hora);
			$("#minute").text(tiempo.minuto < 10 ? "0" + tiempo.minuto : tiempo.minuto);
			$("#second").text(tiempo.segundo < 10 ? "0" + tiempo.segundo : tiempo.segundo);

		}, 1000);
	}else{
		$(this).text("Inicia");
		clearInterval(tiempo_corriendo);
	}




		



});


	



});// Final del jquery