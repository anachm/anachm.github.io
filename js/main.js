document.addEventListener('DOMContentLoaded', function () {


// ******************* NAVBAR **********************

    // Escuchar el evento 'hidden.bs.collapse' para cerrar el menú al seleccionar un elemento
      document.getElementById('navbarNav').addEventListener('hidden.bs.collapse', function () {
        // Verificar si el botón de hamburguesa está visible para evitar cierre en pantallas grandes
        if (window.getComputedStyle(document.getElementById('menuButton')).display !== 'none') {
          // Cerrar el menú cuando se oculta la barra de navegación
          document.getElementById('menuButton').classList.add('collapsed');
        }
      });
    
    // Agregar evento a cada elemento del menú para cerrar la barra de navegación
      var menuItems = document.querySelectorAll('.navbar-nav .nav-link');
      menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function () {
          // Ocultar la barra de navegación al hacer clic en un elemento del menú
          document.getElementById('navbarNav').classList.remove('show');
        });
      });


// ******************* DESCARGAR CV **********************

let btnDownloadCV = document.getElementById("btnDownloadCV");

btnDownloadCV.addEventListener("click", function (event) {
    event.preventDefault();
    downloadCV();
});

function downloadCV() {
    //Set the File URL.
    var url = "../files/CV_AnaCristinaHernández.pdf";

    //Create XMLHTTP Request.
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "blob";
    req.onload = function () {
        //Convert the Byte Data to BLOB object.
        var blob = new Blob([req.response], { type: "application/octetstream" });

        //Check the Browser type and download the File.
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            var url = window.URL || window.webkitURL;
            link = url.createObjectURL(blob);
            var a = document.createElement("a");
            a.setAttribute("download", "CV_AnaCristinaHernández.pdf");
            a.setAttribute("href", link);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    req.send();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Se ha descargado el archivo!',
        showConfirmButton: false,
        timer: 1500
    });
};
    

// ******************* ANIMACIONES **********************
    const typed = new Typed('.typed', {
        strings: ['DESARROLLADORA WEB', 'DESARROLLADORA JAVA FULLSTACK JR.'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        loop: true
    });


// ******************* VALIDACIONES **********************
    const txtNombre = document.getElementById("txtNombre");
    const txtEmail = document.getElementById("txtEmail");
    const txtPhone = document.getElementById("txtPhone");
    const txtMensaje = document.getElementById("txtMensaje");
    const btnEnviar = document.getElementById("btnEnviar");
    
    let index = [];
    
    // Validación para que el campo nombre solo permita nombres de longitud (3 - 99) caracteres.
    function validarNombre(nombre) {
      console.log("Nombre:", nombre.trim());
        if (nombre.length >= 3 && nombre.length < 100) {
            return true;
        } else {
            return false;
        }
    }
    
    //Función para validar que lo que se escribe en el campo email cumpla con la regex definida.
    let regexEmail =
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    function validarEmail(email) {
      console.log("Email:", email.trim());
        if (email != "") {
            if (regexEmail.test(email)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    function validarMensaje(mensaje) {
      console.log("Mensaje:", mensaje.trim());
        if (mensaje.length >= 3 && mensaje.length <= 200) {
            return true;
        } else {
            return false;
        }
    }
    
    
    let regextel = /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;
    function validarPhone(phone) {
      console.log("Teléfono:", phone.trim());
        if (phone != "") {
            if (regextel.test(phone)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    btnEnviar.addEventListener("click", function (event) {
        event.preventDefault();
        if (!validarNombre(txtNombre.value.trim())) {
            if (!index.includes("nombre")) {
                alertValidaNombre.style.color = "red";
                txtNombre.style.border = "solid red";
                index.push("nombre");
            }
        }
    
        if (!validarEmail(txtEmail.value.trim())) {
            if (!index.includes("email")) {
                alertValidaEmail.style.color = "red";
                txtEmail.style.border = "solid red";
                index.push("email");
            }
        }
        if (!validarPhone(txtPhone.value.trim())) {
            if (!index.includes("phone")) {
                alertValidaPhone.style.color = "red";
                txtPhone.style.border = "solid red";
                index.push("phone");
            }
        }
    
        if (!validarMensaje(txtMensaje.value.trim())) {
            if (!index.includes("mensaje")) {
                alertValidaMensaje.style.color = "red";
                txtMensaje.style.border = "solid red";
                index.push("mensaje");
            }
        }
    
        if (!index.includes("nombre") && !index.includes("email") && !index.includes("phone") && !index.includes("mensaje")) {
            enviarEmail();
            limpiarTodo();
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Por favor, verifica que los campos esten correctos.',
                showConfirmButton: false,
                timer: 3000
            });
        }
    });
    

    function enviarEmail() {
        // Valores del formulario
        var form = document.getElementById('formContacto');
        var nombre = form.elements['txtNombre'].value;
        var email = form.elements['txtEmail'].value;
        var phone = form.elements['txtPhone'].value;
        var mensaje = form.elements['txtMensaje'].value;
    
        // Objeto con los valores
        var formData = {
            name: nombre,
            email: email,
            mensaje: mensaje,
            telefono: phone
        };
    
        // Enviar el formulario
        emailjs.sendForm('service_148bft5', 'template_6b5ksjv', form)
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '¡Gracias por comunicarte conmigo!',
                    showConfirmButton: false,
                    timer: 3000
                });
            }, (err) => {
                // Log para verificar el error
                console.error("Error al enviar el formulario:", err);
                alert(JSON.stringify(err));
            });
    }
    

    //Listener para validar el nombre cada vez que el usuario teclee algo en el campo nombre
    txtNombre.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (!validarNombre(txtNombre.value.trim())) {
            if (!index.includes("nombre")) {
                alertValidaNombre.style.color = "red";
                txtNombre.style.border = "solid red";
                index.push("nombre");
            }
        }//if nombre no cumple las validaciones
        else {
            //quitar alertas
            alertNombre.style.display = "none";
            txtNombre.style.border = "";
            removeAllInstances(index, "nombre");
        }
    
    });
    
    
    txtEmail.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (!validarEmail(txtEmail.value.trim())) {
            if (!index.includes("email")) {
                alertValidaEmail.style.color = "red";
                txtEmail.style.border = "solid red";
                index.push("email");
            }
        }//if description no cumple las validaciones
        else {
            //quitar alertas
            alertEmail.style.display = "none";
            txtEmail.style.border = "";
            removeAllInstances(index, "email");
        }
    
    });
    
    txtPhone.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (!validarPhone(txtPhone.value.trim())) {
            if (!index.includes("phone")) {
                alertValidaPhone.style.color = "red";
                txtPhone.style.border = "solid red";
                index.push("phone");
            }
        }//if precio producto no cumple las validaciones 
        else {
            //quitar alertas
            alertPhone.style.display = "none";
            txtPhone.style.border = "";
            removeAllInstances(index, "phone");
        }
    
    });
    
    txtMensaje.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (!validarMensaje(txtMensaje.value.trim())) {
            if (!index.includes("mensaje")) {
                alertValidaMensaje.style.color = "red";
                txtMensaje.style.border = "solid red";
                index.push("mensaje");
            }
        }//if mensaje no cumple las validaciones 
        else {
            //quitar alertas
            alertMensaje.style.display = "none";
            txtMensaje.style.border = "";
            removeAllInstances(index, "mensaje");
        }
    
    });
    
    
    //Remueve todas las instancias de un objeto dado (item) que se encuentre en el arreglo index
    function removeAllInstances(arr, item) {
        for (var i = arr.length; i--;) {
            if (arr[i] === item) arr.splice(i, 1);
        }
    }
    
    function limpiarTodo() {
        index = [];
        txtNombre.value = "";
        txtEmail.value = "";
        txtPhone.value = "";
        txtMensaje.value = "";
        removeAllInstances(index, "nombre");
        removeAllInstances(index, "email");
        removeAllInstances(index, "phone");
        removeAllInstances(index, "mensaje");
    }

    });