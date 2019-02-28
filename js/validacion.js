'use strict'

// En el navegador Chrome existe el problema de que no se pueden crear las cookies desde local,
// debido a que este navegador requiere que sea llamado desde http:
//--------------------------------------------------------------------------------------------------

//Ésta es la primera instrucción que se ejecutará cuando el documento esté cargado
window.onload=iniciar;
function iniciar()
{
	//Comprobamos si existe cookie de sesión llamando a la función checkCookie()
	checkCookie();

	//Crear evento click en el botón 'Registrar' que llama a una función para mostrar el formulario de registro
	document.getElementById("registro").addEventListener('click', mostrarFormularioRegistro, false);

	//Crear evento click en el botón 'Iniciar Sesión' que llama a una función para mostrar el formulario de inicio de sesión
	document.getElementById("iniciarSesion").addEventListener('click', mostrarFormularioSesion, false);

	//Crear evento click en el botón 'Enviar' que llama a una función
	//para validar todos los datos del formulario de registro
	document.getElementById("registrar").addEventListener('click', validarFormulario, false);

	//Crear evento click en el botón 'Iniciar Sesión' que llama a una función
	//para comprobar si hay cookie de sesión
	document.getElementById("iniciar").addEventListener('click', iniciarSesion, false);

	//Crear evento click en el botón 'Cerrar Sesión' que llama a una función
	//para borrar la cookie de sesión
	document.getElementById("cerrarSesion").addEventListener('click', cerrarSesion, false);
}

//Mostrar Formulario de registro cuando se pulsa el botón 'Registrar'
function mostrarFormularioRegistro()
{
	var contenedor = document.getElementById("contenedor");
	contenedor.style.display = "block";
	var contenedor1 = document.getElementById("contenedor1");
	contenedor1.style.display = "none";
}

//Mostrar Formulario de inicio de sesión cuando se pulsa el botón 'Iniciar Sesión'
function mostrarFormularioSesion()
{
	var contenedor1 = document.getElementById("contenedor1");
	contenedor1.style.display = "block";
	var contenedor = document.getElementById("contenedor");
	contenedor.style.display = "none";
}

//Validar los datos del formulario de registro
function validarFormulario(eventopordefecto)
{	
	//Validar cada uno de los campos llamando sus funciones correspondientes
	if (validarcampostexto(this) && validarEmail() && validarContraseña() && validarConfContraseña() && validarCondiciones()){
		//Seleccionamos los campos nombre y contraseña
		var nombre = document.getElementById('nombre');
		var password = document.querySelector('.password');
		//Creamos cookies nuevas con nombre y con password
		setCookie('username', nombre.value);
		setCookie('password', password.value);
		//Mostramos mensaje
		alert("Se ha registrado correctamente, puede iniciar sesión.");
		return true;
	}
	else
	{
		//Cancelar el evento por defecto evitando que se pueda enviar el formulario
		eventopordefecto.preventDefault();		
		return false;
	}
}

//Validar Nombre y Apellidos (pasamos objeto que hace referencia al botón 'Enviar')
function validarcampostexto(objeto)
{	
	//Seleccionamos el campo nombre
	var nombre = document.getElementById("nombre");
	//Si el campo está vacío, aparece un span
	if (nombre.value == ""){
		document.querySelector("#error_nombre").innerHTML = "Campo obligatorio";
		//Ponemos el foco en el campo nombre
		nombre.focus();
		return false;
	}
	else{
		//Ocultamos span
		document.querySelector("#error_nombre").style.display = "none";			
	}
	return true;	
}
	
//Validar email
function validarEmail(){
	//Creamos patrón del email: comienza con al menos una letra, numero, _, . o -
	//le sigue el símbolo @, continua con al menos una letra, numero o -, le sigue un . y finaliza con 2 a 4 caracteres alafanuméricos.
	//por ejemplo: hola@hola.com 
	var patron = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	//Seleccionamos campo email
	var email = document.getElementById("email");
	//Comprobamos si no se cumple el patrón o si el campo está vacío, aparece un span
	if (!patron.test(email.value) || email.value == ""){
		document.querySelector("#error_email").innerHTML = "Email incorrecto";
		//Ponemos foco en el campo email
		email.focus();
		return false;
	}
	else{
		//Ocultamos span
		document.querySelector("#error_email").style.display = "none";
	}
	return true;
}

//Validar constraseña
function validarContraseña(){
	//Creamos patrón de la contraseña:  debe tener al menos ocho caracteres 
	//y contener al menos una letra minúscula, una mayúscula, un número y un símbolo
	var patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\w).{8,}$/;
	//Seleccionamos campo contraseña
	var contraseña = document.getElementById("password");
	//Comprobamos si no se cumple el patrón o si el campo está vacío, aparece un span
	if (!patron.test(contraseña.value) || contraseña.value == ""){
		document.querySelector("#error_contraseña").innerHTML = "Contraseña incorrecta, debe tener al menos 8 caracteres y contener al menos una letra minúscula, una mayúscula, un número y un símbolo";
		//Ponemos foco en el campo contraseña
		contraseña.focus();
		return false;
	}
	else{
		//Ocultamos span
		document.querySelector("#error_contraseña").style.display = "none";
	}
	return true;
}

//Confirmar constraseña
function validarConfContraseña(){
	//Seleccionamos campo confContraseña y contraseña
	var confContraseña = document.getElementById("confPassword");
	var contraseña = document.getElementById("password");
	//Comprobamos que los valores introducidos en ambos campos coinciden
	if(confContraseña.value != contraseña.value && confContraseña.value == ""){
		//Mostramos span
		document.querySelector("#error_confContraseña").innerHTML = "Las contraseñas introducidas no son iguales";
		//Ponemos foco en el campo contraseña
		contraseña.focus();
		return false;
	}else{
		//Ocultamos span
		document.querySelector("#error_confContraseña").style.display = "none";
	}
	return true;
}

//Validar que el check 'Condiciones de uso' esté marcado
function validarCondiciones(){
	//Seleccionamos input del checkbox Condiciones
	var condiciones = document.getElementById("condiciones");
	//Comprobamos si el checkbox está seleccionado
	if(!condiciones.checked){
		//Mostramos mensaje
		alert("Debe aceptar las Condiciones de Uso, Aviso de privacidad y Condiciones de Cookies y publicidad en Internet.");
		return false;
	}
	return true;
}

//Iniciar sesión y comprobar si existe cookie de sesión
function iniciarSesion(){
	//Seleccionamos campos nombre y contraseña
	var usuario = document.getElementById('usuario');
	var password1 = document.getElementById('password1');
	
	//Comprobar que los valores del nombre y la contraseña coinciden con los del usuario registrado anteriormente
	if(usuario.value == getCookie('username') && password1.value == getCookie('password')){
		//Se crea una nueva cookie 'conectado'
		setCookie('conectado', true);
		alert("Conectado");
	} else 
	{
		alert("Usuario incorrecto");
	}
}

//Cerrar sesión y borrar cookie 'conectado'
function cerrarSesion (){
	//Borrar cookie 'conectado'
	dropCookie('conectado');
	//Mostrar de nuevo los botones de 'Registro' e 'Iniciar Sesión'
	var botonRegistro = document.getElementById("registro");
	botonRegistro.style.display = "block";
	var botonSesion = document.getElementById("iniciarSesion");
	botonSesion.style.display = "block";
	//Ocultar 'Bienvenido'
	var bienvenido = document.getElementById("contenedor2");
	bienvenido.style.display = "none";
}

//Crear cookie
function setCookie(nombre, valor){
	//Al no pasar fecha de expiración la cookie se borrará al cerrar el navegador
	document.cookie = nombre + "=" + valor + ";path=/";
}

//Borrar cookie
function dropCookie(nombre) {
	setCookie(nombre, "");
}

//Leer cookie (devulve valor)
function getCookie(nombre){
	//Guardamos nombre de la cookie en una varible seguida de un "="
	var galleta = nombre + "=";
	//Guardamos las propiedades de la cookie en un array separas por ';' en otra variable
    var ca = document.cookie.split(';');
    //Recorremos el array de las propiedades de la cookie
    for(var i=0; i < ca.length; i++) {
    	//Guardamos el elemento de índice 'i' en una variable
        var c = ca[i];
        //Eliminamos los espacios en blanco
        while (c.charAt(0) == ' '){
        	c = c.substring(1);
        } 
        //Si encontramos el contenido de 'galleta' devolvemos el contenido después del '=' (el valor)
        if (c.indexOf(galleta) == 0) {
        	return c.substring(galleta.length, c.length);
    	}
    }
    //Devuelve vacío si no existe cookie
    return "";
}

//Comprobar si existe cookie de sesión
function checkCookie() {
	//Guardamos el valor de las cookies creadas en variables
	var usuario = getCookie("username");
	var password = getCookie("password");
	var conectado = getCookie("conectado");
	//var contraseña = document.getElementById("contraseña");
	//Si existe la cookie de sesión mostrará por pantalla "bienvenido " y el nombre del usuario.
    if (usuario != "" && password != "") {
		console.log("Hay cookie de sesión");
    	//Si existe la cookie de sesión mostrar también el botón de 'Iniciar Sesión'
    	var botonRegistro = document.getElementById("registro");
		botonRegistro.style.display = "block";
		var botonSesion = document.getElementById("iniciarSesion");
		botonSesion.style.display = "block";
		
		//Si además existe la cookie conectado
		if(conectado != ""){
			//Mostramos el mensaje Bienvenido + el nombre del usuario y el botón 'Cerrar Sesión'
			var usuario = getCookie("username");
	    	var bienvenido = document.getElementById("contenedor2");
	    	bienvenido.style.display = "block";
			document.getElementById("username").innerHTML = usuario; 
			//Ocultar botones de 'Registro' e 'Iniciar sesión'	
			var botonRegistro = document.getElementById("registro");
			botonRegistro.style.display = "none";
			var botonSesion = document.getElementById("iniciarSesion");
			botonSesion.style.display = "none";
		}
	}
	else {
		console.log("No hay cookie de sesión");
		alert("No existe cookie de sesión, por favor, regístrese.");
		//Si NO existe la cookie de sesión mostrará solo el botón 'Registrar'
		var botonRegistro = document.getElementById("registro");
		botonRegistro.style.display = "block";		
	}
}