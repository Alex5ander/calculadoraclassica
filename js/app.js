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
deletar.ondblclick = limpar;
function inserirNumero(e){
	display.value += this.value;
}
function inserirPonto(e){
	var numbers = display.value.split(/\+|\-|\*|\//gim);
	var el = numbers[numbers.length - 1];
	var temponto = /\./gim;
	if(!temponto.test(el)){
		display.value += this.value;
	}
}
function inserirSimbolo(e){
	var numbers = display.value.split(/\+|\-|\*|\//gim);
	var num = numbers[numbers.length - 1];
	
	var simbolos = display.value.split(/\d/gim);
	var simb = simbolos[simbolos.length -1]
	var temponto = /\./gim.test(simb);
	if(temponto){
		simb = simb.replace(/\./gim, "");
	}
	if(this.value == "="){
		calcular();
	}else if(this.value == "-" && display.value.length == 0){
		display.value = this.value;
	}else if(display.value.length <= 1 && num == ""){
		display.value = "";
	}else if((simb == "/" || simb == "*") && this.value == "-"){
		display.value += this.value;
	}else if(num == ""){
		display.value = display.value.slice(0, display.value.length - simb.length);
		display.value += this.value; 
	}else{
		display.value += this.value;
	}
}
function calcular(){
	try{
		display.value = eval(display.value);
	}catch(err){
		
	}
}
function excluir(e){
	if(display.value == Infinity){
		display.value = "";
	}else if(display.value.length >= 1){
		display.value = display.value.slice(0, display.value.length - 1);
	}
}
function limpar(){
	display.value = "";
}