var btns = document.getElementsByClassName("btn");
var hamburguericon = document.getElementById("hamburguericon");
var closeConfig = document.getElementById("close");
var saveConfig = document.getElementById("save");

var background = document.getElementById("background");//cor de fundo;
var bg_action = document.getElementById("bg_action");//cor de fundo dos botões de ação
var btn_number_bg = document.getElementById("btn_number_bg");//cor de fundo dos botões n
var color_number = document.getElementById("color_number");//cor dos números

var divisao = document.getElementById("btn_/");
var multiplicacao = document.getElementById("btn_*");
var subtracao = document.getElementById("btn_-");
var adicao = document.getElementById("btn_+");
var igual = document.getElementById("btn_=");
var ponto = document.getElementById("btn_.");
var display = document.getElementById("display");
var deletar = document.getElementById("delete");

saveConfig.onclick = function(e){
	var config = {
		background:background.value,
		bg_action:bg_action.value,
		btn_number_bg:btn_number_bg.value,
		color_number:color_number.value,
	}
	localStorage.setItem("config", JSON.stringify(config));
	addStyle();
}
function addStyle(){
	var config = JSON.parse(localStorage.getItem("config"));
	if(config){
		background.value = config.background;
		bg_action.value = config.bg_action;
		btn_number_bg.value = config.btn_number_bg;
		color_number.value = config.color_number;
		document.getElementById("container").style.backgroundColor = config.background;
		document.getElementById("table").style.backgroundColor = config.background;
		document.getElementById("display_bg").style.backgroundColor = config.background;
		document.getElementById("display").style.color = config.color_number;
		document.getElementById("mobilemenu").style.backgroundColor = config.bg_action;
		document.getElementById("mobilemenu").style.borderColor = config.color_number;
		document.getElementById("config").style.backgroundColor = config.bg_action;
		hamburguericon.style.backgroundColor = config.bg_action;
		hamburguericon.style.color = config.color_number;
		deletar.style.backgroundColor = config.bg_action;
		deletar.style.color = config.color_number;
		for(var i = 0; i < btns.length; i++){
			if(btns[i].value){
				if(isNaN(btns[i].value) == false){
					btns[i].style.backgroundColor = config.btn_number_bg;
					btns[i].style.color = config.color_number;
				}else if(btns[i].value == "."){
					btns[i].style.backgroundColor = config.btn_number_bg;
					btns[i].style.color = config.color_number;
				}else{
					btns[i].style.backgroundColor = config.bg_action;
					btns[i].style.color = config.color_number;
				}
			} 
		}
	}
}
addStyle();
closeConfig.onclick = function(e){
	document.getElementById("config").style.display = "none";
}
hamburguericon.onclick = function(e){
	var d = document.getElementById("config");
	if(d.style.display == "none" || d.style.display == ""){
		d.style.display = "block";
	}
}

for(var i = 0; i < btns.length; i++){
	if(btns[i].value){
		if(isNaN(btns[i].value) == false){
			btns[i].onclick = inserirNumero;
		}else if(btns[i].value == "."){
			btns[i].onclick = inserirPonto;
		}else{
			btns[i].onclick = inserirSimbolo;
		}
	}
	btns[i].addEventListener("touchstart", function(e){
		this.style.opacity = ".3";
	}); 
	btns[i].addEventListener("touchend", function(e){
		this.style.opacity = "1";
	}); 
}
deletar.onclick = excluir;
var visor = false;
var v1 = null;
var v2 = null;
var result = false;
var operador ="";
function inserirNumero(e){
	if(result && operador == "="){
		result = false;
		v1 = null;
	}
	if(visor == false){
		display.value = "0";
	}
	if(parseFloat(display.value) == 0 && display.value.match(/[.]{1}/) == null){
		display.value = this.value;
	}else{
		display.value += this.value;
	}
	visor = true;
}

function inserirPonto(e){
	if(visor == false){
		display.value = "0";
	}
	if(display.value.match(/[.]{1}/) == null){
		if(display.value == ""){
			display.value = "0"+this.value;
		}else{
			display.value += this.value;
		}
	}
	visor = true;
}
function inserirSimbolo(e){
	//salva operador usado;
	display.dataset.operador = this.value;
	if(this.value != "="){
		v2 = null;
		if(v1 == null){
			v1 = parseFloat(display.value);
			visor = false;
		}else if(visor){
			v2 = parseFloat(display.value);
			result = calcular(operador, v1, v2);
			display.value = result;
			v1 = result;
			visor = false;
			result = false;
		}
		operador = this.value;
	}else if(v1 != null){
		if(visor){
			v2 = parseFloat(display.value);
		}
		if(v2 == null){
			if(operador == "-" || operador == "+"){
				v2 = parseFloat(display.value);
				v1 = 0;
			}else if(operador == "*" || operador == "/"){
				v1 = parseFloat(display.value);
				v2 = parseFloat(display.value);
			}
		}
		result = calcular(operador, v1, v2);
		display.value = result;
		v1 = result;
		visor = false;
	}else{
		v1 = parseFloat(display.value);
		result = calcular(operador, v1, v2);
		display.value = result;
		v1 = result;
		visor = false;
	}
}
function calcular(operador, n1, n2){
	if(operador == "+"){
		return n1 + n2;
	}else if(operador == "-"){
		return n1 - n2; 
	}else if(operador == "*"){
		return n1 * n2;
	}else if(operador == "/"){
		if(n2 == 0){
			return "Erro não é possivel dividir por zero";
		}else{
			return n1 / n2; 
		}
	}else{
		return parseFloat(display.value);
	}
}
function excluir(e){
	if(display.value == "Erro não é possivel dividir por zero"){
		display.value = "0";
		v1 = null;
		v2 = null;
		result = false;
		display.dataset.operador = "";
		operador = null;
	}else if(operador != "="){
		if(operador){
			display.dataset.operador = "";
			operador = null;	
		}else{
			if(display.value.length -1 != 0){
				display.value = display.value.slice(0, display.value.length - 1);
			}else if(display.value.length -1 == 0){
				if(v1 != null && display.value != v1){
					display.value = v1;
				}else{
					display.value = "0";
				}
			}
			v1 = null;
			result = false;
		}
	}
}