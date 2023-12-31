export function validarLetras(event: KeyboardEvent) {
    // Obtener el carácter ingresado
    const char = event.key;

    // Patrón de la expresión regular
    const pattern = /^[A-Za-z\s]*$/;

    // Verificar si el carácter coincide con el patrón
    if (!pattern.test(char)) {
        // Si el carácter no coincide, prevenir la entrada
        event.preventDefault();
    }
}

export function validarNumeros(event: KeyboardEvent) {
    // Obtener el carácter ingresado
    const char = event.key;

    // Permitir las siguientes teclas sin restricciones
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab'];

    // Si la tecla presionada no es una de las permitidas y no coincide con el patrón, prevenir la entrada
    if (!allowedKeys.includes(char) && !/^[0-9]*$/.test(char)) {
        event.preventDefault();
    }
}

export function validarLetrasNum(event: KeyboardEvent) {
    // Obtener el carácter ingresado
    const char = event.key;

    // Patrón de la expresión regular
    const pattern = /^[A-Za-z0-9\s]*$/;

    // Verificar si el carácter coincide con el patrón
    if (!pattern.test(char)) {
        // Si el carácter no coincide, prevenir la entrada
        event.preventDefault();
    }
}

export function validarCorreo(correo: string): boolean {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexCorreo.test(correo);
}


export function validarCedula(cedula: string): boolean {
    // Verificar si la cédula tiene 10 dígitos numéricos
    // if (!/^\d{10}$/.test(cedula)) {
    //     return false;
    // }

    // // Obtener los dígitos de la cédula como números
    // const digitos = cedula.split('').map(Number);

    // // Extraer los dígitos en posiciones pares e impares
    // const pares = [digitos[1], digitos[3], digitos[5], digitos[7]];
    // const impares = [digitos[0], digitos[2], digitos[4], digitos[6], digitos[8]];

    // // Multiplicar los dígitos en posiciones impares por 2 y restar nueve si el resultado es mayor a nueve
    // for (let i = 0; i < impares.length; i++) {
    //     impares[i] *= 2;
    //     if (impares[i] > 9) {
    //         impares[i] -= 9;
    //     }
    // }

    // // Sumar los dígitos en posiciones pares y los resultados de las operaciones en posiciones impares
    // const sumaImpares = impares.reduce((sum, digit) => sum + digit, 0);
    // const sumaPares = pares.reduce((sum, digit) => sum + digit, 0);

    // // Calcular el total de la suma
    // const totalSuma = sumaImpares + sumaPares;

    // // Obtener el módulo 10 de la suma total
    // const modulo = totalSuma % 10;

    // // Calcular el dígito verificador
    // const digitoVerificador = modulo === 0 ? 0 : 10 - modulo;

    // // Comparar el dígito verificador calculado con el último dígito de la cédula
    // return digitoVerificador === digitos[9];
    return true
}


export function calcularEdad(edadUsuario: Date): number {
    const fechaActual: Date = new Date();

    const anioActual: number = fechaActual.getFullYear();
    const mesActual: number = fechaActual.getMonth() + 1;
    const diaActual: number = fechaActual.getDate();

    const nacimiento: Date = new Date(edadUsuario);
    const anioNacimiento: number = nacimiento.getFullYear();
    const mesNacimiento: number = nacimiento.getMonth() + 1;
    const diaNacimiento: number = nacimiento.getDate() + 1;
    // console.log("nacimiento" + nacimiento)

    let edad: number = anioActual - anioNacimiento;

    // Verificar si aún no ha cumplido años en el presente año
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        edad--;
    }
    // console.log("EDAD" + edad)

    return edad;
}