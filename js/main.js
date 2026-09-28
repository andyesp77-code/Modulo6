/*
En esta versión se incorpora el uso de objetos y clases.
La clase Usuario representa a cada usuario del sistema y tiene la responsabilidad
de guardar sus datos y definir acciones relacionadas con él, como validar la clave,
cambiarla, blanquearla.
Se deja establecido el tipo de cuenta para uso a futuro.

El array usuariosRegistrados guarda objetos literales de usuarios, 
que luego se pueden convertir en instancias de la clase Usuario si se desea.

El script principal se encarga del flujo del programa: toma los datos ingresados
por el usuario, valida algunos valores, controla el acceso al sistema, y organiza
las dos áreas principales de la aplicación: el menú de administrador y el menú
del cajero para usuarios comunes.

En el menú de administrador se pueden listar usuarios, registrar nuevos usuarios,
blanquear o cambiar claves y eliminar usuarios, salvo el administrador.
En el menú de cajero, el usuario puede consultar saldo, retirar dinero,
depositar dinero y cambiar su propia clave. Al final de la sesión, se muestra el saldo final 
y la variación respecto al saldo inicial.

****RESUMEN: Clase Usuario maneja el estado y las operaciones del usuario
el script principal maneja el flujo del programa y las validaciones de entrada ******
-----------------------------------------------------------------------------------
Se fuerza un saldo fijo en pesos argentinos a cada usuario para poder operar con la cuenta.
El saldo Actual se utiliza para las operaciones de cajero
Se puede ingresar al panel de administrador con el usuario ADMIN y la clave 2990
*/

class Usuario {
    //Constructor de la clase Usuario, se utilizara en proximas versiones
  constructor(nombre, clave, saldoInicio, saldoActual, tipoCta){
    this.nombre = nombre;
    this.clave = clave;
    this.saldoInicio = saldoInicio;
    this.saldoActual = saldoActual;
    this.tipoCta = tipoCta;
}

//Metodos generales de la clase que no requieren una instancia de usuario, sino que trabaja sobre la coleccion
static buscarUsuario(nombre, usuarios) {
    return usuarios.find((usuario) => usuario.nombre === nombre);
}

static validarUsuario(nombre, clave, usuarios) {
  const usuario = this.buscarUsuario(nombre, usuarios);

 if (!usuario) {
    return false;
    } else {
    return usuario.clave === clave;
    }
 }
}

// usuarios registrados en el sistema (Incluye el Administrador) - arrays de objetos literales
const usuariosRegistrados = [
  {
    nombre: "JUAN",
    clave: 1234,
    saldoInicio: 100000,
    saldoActual: 100000,
    tipoCta: "Sueldo"
  },
  {
    nombre: "PEDRO",
    clave: 2345,
    saldoInicio: 150000,
    saldoActual: 150000,
    tipoCta: "Sueldo"
  },
  {
    nombre: "MARIA",
    clave: 3456,
    saldoInicio: 180000,
    saldoActual: 180000,
    tipoCta: "Caja_Ahorro"
  },
  {
    nombre: "ANA",
    clave: 4567,
    saldoInicio: 200000,
    saldoActual: 200000,
    tipoCta: "Caja_Ahorro"
  },
  {
    nombre: "ANDREA",
    clave: 5678,
    saldoInicio: 300000,
    saldoActual: 300000,
    tipoCta: "Sueldo"
  },
  {
    nombre: "ADMIN",
    clave: 2990,
    saldoInicio: 1,
    saldoActual: 1,
    tipoCta: "Administrador"
  }
];

let intentos = 0;
let login = false;

//*****Funciones del panel de administrador*****

function listarUsuarios() {
    console.log("Usuarios registrados:");
    usuariosRegistrados.forEach((usuario) => {
    console.log("Nombre: " + usuario.nombre + " - Clave: " + usuario.clave + " - Tipo de Cuenta: " + usuario.tipoCta);
    });
}

function blanquearClave(nombreUsuario) {
    const usuario = Usuario.buscarUsuario(
        nombreUsuario.trim().toUpperCase(),
        usuariosRegistrados
    );

    if (!usuario) {
        console.log("Usuario no encontrado.");
        return;
    }

    usuario.clave = 1111;
    console.log("La clave de " + usuario.nombre + " fue blanqueada. Nueva clave: 1111");
}

function cambiarClaveDeUsuario(nombreUsuario, clave) {

    nombreUsuario = nombreUsuario.trim().toUpperCase();

    if (!validarClave(clave)) {
        return false;
    }

    clave = Number(clave);

    const usuario = Usuario.buscarUsuario(nombreUsuario, usuariosRegistrados);

    if (!usuario) {
        console.log("Usuario no encontrado.");
        return false;
    }

    usuario.clave = Number(clave);
    console.log("La clave de " + usuario.nombre + " fue cambiada con exito. Nueva clave: " + usuario.clave);
    return true;
}

function eliminarUsuario(nombreUsuario) {
    nombreUsuario = nombreUsuario.trim().toUpperCase();

    if (nombreUsuario === "ADMIN") {
        console.log("El usuario ADMIN no puede ser eliminado.");
        return false;
    }

    const usuario = Usuario.buscarUsuario(nombreUsuario,usuariosRegistrados);

    if (!usuario) {
        console.log("Usuario no encontrado.");
        return false;
    }

    const posicionUsuario = usuariosRegistrados.indexOf(usuario);
    usuariosRegistrados.splice(posicionUsuario, 1);

    console.log("El usuario " + nombreUsuario + " fue eliminado del sistema.");
    return true;
}

function registroUsuario(nombre, clave) {
    nombre = nombre.trim().toUpperCase();

    if (!validarClave(clave)) {
        return false;
    }

    clave = Number(clave);

    const usuarioYaRegistrado = usuariosRegistrados.some((usuario) => usuario.nombre === nombre
    );

    if (usuarioYaRegistrado) {
        console.log("El usuario ya está registrado.");
        return false;
    }

    const nuevoUsuario = {
        nombre: nombre,
        clave: clave,
        saldoInicio: 100000,
        saldoActual: 100000,
        tipoCta: "Sueldo"
    };

    usuariosRegistrados.push(nuevoUsuario);
    console.log("Nuevo usuario registrado: " + nombre);
    return true;
}

//**********Funciones de validacion de entrada de datos*****
function solicitarDato(mensaje, funcionValidar) {
    while (true) {
        let dato = prompt(mensaje);

        if (dato === null) {
            console.log("Operación cancelada.");
            return null;
        }

        dato = dato.trim();

        if (dato === "") {
            console.log("El dato es obligatorio.");
        } else if (funcionValidar && !funcionValidar(dato)) {
            console.log("Ingrese nuevamente el dato.");
        } else {
            return dato;
        }
    }
}

function validarClave(clave) {
    const claveNumero = Number(clave);

    if (isNaN(claveNumero) || !Number.isInteger(claveNumero) || claveNumero < 1000 || claveNumero > 9999) 
    {
        console.log("La clave debe ser un número entero entre 1000 y 9999.");
        return false;
    }

    return true;
}

//**********Funciones para simplificar el menu administrador*****
function solicitarRegistroUsuario() {
    const nombreUsuario = solicitarDato("Ingrese el usuario");

    if (nombreUsuario !== null) {
        const clave = solicitarDato("Ingrese la clave nueva de 4 dígitos", validarClave);
        if (clave !== null) {
            registroUsuario(nombreUsuario, Number(clave));
        }
    }
}

function solicitarBlanqueoClave() {
    const nombreUsuario = solicitarDato("Ingrese el nombre del usuario a blanquear");

    if (nombreUsuario !== null) {
        blanquearClave(nombreUsuario);
    }
}

function solicitarCambioClave() {
    const nombreUsuario = solicitarDato( "Ingrese el nombre del usuario");

    if (nombreUsuario !== null) {
        const clave = solicitarDato("Ingrese la nueva clave de 4 dígitos", validarClave);
        if (clave !== null) {
            cambiarClaveDeUsuario(nombreUsuario, Number(clave));
        }
    }
}

function solicitarEliminacionUsuario() {
    const nombreUsuario = solicitarDato("Ingrese el nombre del usuario a eliminar");

    if (nombreUsuario !== null) {
        eliminarUsuario(nombreUsuario);
    }
}

//*****Menu de opciones del panel de administrador*****/
function menuAdmin() {
    let opcion = 0;

    while (opcion !== 6) {
        const opcionIngresada = prompt("MENU ADMINISTRADOR\n1 - Listar usuarios\n2 - Nuevo usuario\n3 - Blanquear clave\n4 - Cambiar clave\n5 - Eliminar usuario\n6 - Salir");
            if (opcionIngresada === null) {
            opcion = 6;
            } else {
            opcion = Number(opcionIngresada);
            }

            switch (opcion) {
            case 1:
                listarUsuarios();
                break;

            case 2:
                solicitarRegistroUsuario();
                break;

            case 3:
                solicitarBlanqueoClave();
                break;

            case 4:
                solicitarCambioClave();
                break;

            case 5:
                solicitarEliminacionUsuario();
                break;

            case 6:
                console.log("Saliendo del panel de administrador");
                break;

            default:
                console.log("Opción inválida");
                break;
        }
    }
}

//*****Funciones de operacion de cajero automatico*****/

function extraccionDinero(usuario, valor) {
    if (valor <= usuario.saldoActual) {
        usuario.saldoActual = usuario.saldoActual - valor;
        console.log("Operacion Confirmada. Su nuevo saldo es: $" + usuario.saldoActual);
    } else {
        console.log("Saldo Insuficiente");
    }
}

function depositoDinero(usuario, valor) {
    usuario.saldoActual = usuario.saldoActual + valor;
    console.log("Operacion Confirmada. Su nuevo saldo es: $" + usuario.saldoActual);
}

function consultarSaldo(usuario) {
    console.log("Su saldo es: $" + usuario.saldoActual);
}

function solicitarExtraccion(usuario) {
    const datoValor = solicitarDato("¿Cuánto dinero desea retirar?");

    if (datoValor !== null) {
        const valor = parseFloat(datoValor);
        if (isNaN(valor) || valor <= 0) {
            console.log("Debe ingresar un importe válido mayor que cero.");
        } else {
            extraccionDinero(usuario, valor);
        }
    }
}

function solicitarDeposito(usuario) {
    const datoValor = solicitarDato("¿Cuánto dinero desea depositar?");

    if (datoValor !== null) {
        const valor = parseFloat(datoValor);
        if (isNaN(valor) || valor <= 0) {
            console.log("Debe ingresar un importe válido mayor que cero.");
        } else {
            depositoDinero(usuario, valor);
        }
    }
}

function solicitarCambioClaveUsuario(nombreUsuario) {
    const claveNueva = solicitarDato("Ingrese su nueva clave de 4 dígitos", validarClave);

    if (claveNueva !== null) {
        cambiarClaveDeUsuario(nombreUsuario, Number(claveNueva));
    }
}

function menuCajero(usuario) {
    let continuarOperando = true;
    while  (continuarOperando) {
        const opcion = Number(prompt("MENU CAJERO\n" + "Ingrese una opción para operar:\n" + "Ingrese 1 - Consulta Saldo\n" + "Ingrese 2 - Extracción\n" + "Ingrese 3 - Depósito\n" + "Ingrese 4 - Cambiar Clave\n" + "Otro valor para Salir") );

         switch (opcion) {
            case 1:
                consultarSaldo(usuario);
                break;

            case 2:
                solicitarExtraccion(usuario);
                break;

            case 3:
                solicitarDeposito(usuario);
                break;

            case 4:
                solicitarCambioClaveUsuario(usuario.nombre);
                break;

            default:
                continuarOperando = false;
                break;
        }

        if (continuarOperando) {
            continuarOperando = confirm(
                "¿Desea realizar otra operación?"
            );
        }
    }
}


//****ENTRADA DE DATOS PARA USUARIOS REGISTRADOS EN EL SISTEMA  *****
 // si el usuario no logra loguearse en 3 intentos, no puede acceder al sistema
let nombre = "";
//intentos de login de un usuario maximo 3
while (intentos < 3 && !login) {

    const nombreIngresado = solicitarDato("Ingrese el nombre del usuario");
    if (nombreIngresado === null) {
        break;
    }
   
    nombre = nombreIngresado.trim().toUpperCase();

    const claveIngresada = solicitarDato("Ingrese su clave de 4 dígitos", validarClave);

    if (claveIngresada === null) {
        break;
    }

    const clave = Number(claveIngresada);

    if (Usuario.validarUsuario(nombre,clave,usuariosRegistrados)) {
        login = true;
        console.log("Acceso concedido. Puede operar con su cuenta.");
    } else {
        intentos++;
        alert("Usuario o clave incorrecta. Intento " + intentos + " de 3.");
    }
}

// valido si se logueo antes de buscar al usuario y mostrar el menu correspondiente
if (login) {
    const usuarioActual = Usuario.buscarUsuario(nombre,usuariosRegistrados);

    if (usuarioActual && usuarioActual.nombre === "ADMIN") {
        console.log("Hola, ADMIN. Bienvenido al panel administrativo");
        menuAdmin();
    } else {
        console.log("Hola, " + nombre + ". Bienvenido al Simulador de Cajero Automático");
        menuCajero(usuarioActual);
        console.log("Su saldo final es: $" + usuarioActual.saldoActual + " La variación desde el saldo inicial es: $" + (usuarioActual.saldoActual - usuarioActual.saldoInicio));
        console.log("Gracias, " + nombre + " por utilizar el Simulador de Cajero Automático");
    }
}




