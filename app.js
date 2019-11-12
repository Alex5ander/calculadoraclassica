var btns = document.getElementsByClassName("btn");
for(var i = 0; i < btns.length; i++){
	var n = btns[i];
	if(n.value){
		if(isNaN(n.value) == false){
			n.onclick = inserirNumero;
		}else if(n.value == "."){
			n.onclick = inserirPonto;
		}else{
			n.onclick = inserirSimbolo;
		}
	}
	n.addEventListener("touchstart", function(e){
		this.style.opacity = ".3";
	}); 
	n.addEventListener("touchend", function(e){
		this.style.opacity = "1";
	}); 
}
delete btns;
delete i;
delete n;
window.addEventListener("resize", resize);
function resize(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	
	var size = Math.min(width, height) * .1;
	
	var botoes = document.getElementsByClassName("btn");
	for(var i = 0; i < botoes.length; i++){
		botoes[i].style.fontSize = size+"px";
	}
	display.style.fontSize = size + "px";
}

var divisao = document.getElementById("btn_/");
var multiplicacao = document.getElementById("btn_*");
var subtracao = document.getElementById("btn_-");
var adicao = document.getElementById("btn_+");
var igual = document.getElementById("btn_=");
var ponto = document.getElementById("btn_.");
var display = document.getElementById("display");
var deletar = document.getElementById("delete");
deletar.onclick = excluir;
var visor = false;
var v1 = null;
var v2 = null;
var result = false;
var operador ="";
var ope = "";
function inserirNumero(e){
	e.preventDefault();
	if(result && ope == "="){
		result = false;
		v1 = null;
		//v2 = null;
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
	e.preventDefault();
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
	e.preventDefault();
	//salva operador usado;
	ope = this.value;
	display.dataset.operador = ope;
	if(ope != "="){
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
		deletar.textContent = "Limpar";
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
	e.preventDefault();
	if(deletar.textContent == "Limpar"){
		display.value = "0";
		ope = null;
		display.dataset.operador = "";
		visor = false;
		v1 = null;
		v2 = null;
		operador = false;
		result = false;
	}else if(result == false){
		if(display.value.length -1 != 0){
			display.value = display.value.slice(0, display.value.length - 1);
		}else{
			display.value = "0";
		}
	}
	deletar.textContent = "Excluir";
}

window.onload = resize;