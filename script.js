// Alerta de bienvenida cuando se carga la página
window.onload = function () {
    alert("Bienvenido a Montiillo 3D, ¡explora nuestras soluciones de impresión 3D!");
};

// Validación del formulario de contacto
document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        var name = document.getElementById("name").value.trim();
        var email = document.getElementById("email").value.trim();
        var message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            event.preventDefault(); // Evita que se envíe el formulario si hay campos vacíos
            alert("Por favor, complete todos los campos antes de enviar.");
        }
    });
});

// Muestra una ventana emergente con detalles de contacto
function showContactInfo() {
    alert(
        "Contacto:\nTeléfono: 8341131147\nEmail: 3dmontiillo@gmail.com\nInstagram: @Montiillo3D"
    );
}

// Asignar el evento click para mostrar la información de contacto
document.addEventListener("DOMContentLoaded", function () {
    var contactLink = document.querySelector("#contact-link"); // El enlace de contacto
    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // Evita la acción por defecto del enlace
            showContactInfo(); // Muestra la ventana emergente
        });
    }
});

// Carrusel de imágenes para la galería
var currentImageIndex = 0;
function showNextImage() {
    var images = document.querySelectorAll(".gallery-container img");
    if (images.length > 0) {
        images[currentImageIndex].style.display = "none"; // Ocultar la imagen actual
        currentImageIndex = (currentImageIndex + 1) % images.length; // Pasar a la siguiente
        images[currentImageIndex].style.display = "block"; // Mostrar la siguiente imagen
    }
}

// Cambia la imagen cada 3 segundos
setInterval(showNextImage, 3000); // Cambiar imagen cada 3 segundos
