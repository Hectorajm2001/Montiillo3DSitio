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

// Asegúrate de que al cargar la página, solo la primera imagen esté visible
document.addEventListener("DOMContentLoaded", function () {
    const carouselItems = document.querySelectorAll(".carousel-item");
    carouselItems.forEach((item, index) => {
        item.style.display = index === 0 ? "block" : "none";
    });
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

// Mostrar un mapa de Google Maps
function initMap() {
    var location = { lat: 23.713283, lng: -99.136499 }; // Coordenadas de Ciudad Victoria, Tamaulipas
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
    });

    new google.maps.Marker({
        position: location,
        map: map,
        title: "Montiillo 3D",
    });
}

// Testimonios dinámicos
var testimonials = [
    "¡Los productos de Montiillo 3D son increíbles! El servicio es excelente y rápido.",
    "El equipo de Montiillo 3D me ayudó a diseñar un proyecto complejo. ¡Muy recomendados!",
    "Me encanta la calidad de sus impresiones 3D. Definitivamente volveré.",
    "El corte láser de Montiillo 3D es preciso y de alta calidad. ¡Increíble servicio!"
];

var currentTestimonialIndex = 0;
function showNextTestimonial() {
    var testimonialElement = document.getElementById("testimonial-text");
    testimonialElement.textContent = testimonials[currentTestimonialIndex];
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length; // Siguiente testimonial
}

// Cambiar el testimonial cada 5 segundos
setInterval(showNextTestimonial, 5000); // Cambia el testimonial automáticamente cada 5 segundos

// Asegúrate de iniciar el cambio de testimonios al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    showNextTestimonial(); // Muestra el primer testimonial
});


// Cambia la imagen cada 3 segundos
setInterval(showNextImage, 3000); // Cambiar imagen cada 3 segundos
