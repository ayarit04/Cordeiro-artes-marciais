document.addEventListener("DOMContentLoaded", () => {
    const visor = document.getElementById('visor-imagenes');
    const contenedorContenido = document.getElementById('contenedor-contenido-ampliado');
    const btnCerrar = document.querySelector('.cerrar-visor');
    const btnAnterior = document.querySelector('.nav-visor-prev');
    const btnSiguiente = document.querySelector('.nav-visor-next');
    const nav = document.querySelector(".nav");
    const abrirMenu = document.querySelector(".menu-open");
    const cerrarMenu = document.querySelector(".menu-close");
    const cards = document.querySelectorAll('.card-hover');
    const imagenesGaleria = Array.from(document.querySelectorAll('.galeria-img, .galeria-aulas img, .horario-img'));
    let indiceActual = 0;

    const abrirVisor = (nodoContenido, esImagen = false, indice = null) => {
        if (!visor || !contenedorContenido) return;

        contenedorContenido.innerHTML = '';

        if (esImagen && nodoContenido) {
            const nuevaImg = document.createElement('img');
            nuevaImg.src = nodoContenido.src;
            nuevaImg.alt = nodoContenido.alt || 'Foto ampliada';
            nuevaImg.classList.add('contenido-zoom-img');
            contenedorContenido.appendChild(nuevaImg);
        } else if (nodoContenido) {
            const clon = nodoContenido.cloneNode(true);
            clon.classList.add('contenido-zoom-tabla');
            contenedorContenido.appendChild(clon);
        }

        if (typeof indice === 'number') {
            indiceActual = indice;
        } else if (imagenesGaleria.includes(nodoContenido)) {
            indiceActual = imagenesGaleria.indexOf(nodoContenido);
        }

        visor.classList.add('activo');
        document.body.style.overflow = 'hidden';
    };

    const cerrarVisor = () => {
        visor?.classList.remove('activo');
        document.body.style.overflow = '';
    };

    const mostrarImagen = (direccion) => {
        if (!imagenesGaleria.length) return;
        indiceActual = (indiceActual + direccion + imagenesGaleria.length) % imagenesGaleria.length;
        abrirVisor(imagenesGaleria[indiceActual], true, indiceActual);
    };

    imagenesGaleria.forEach((img, index) => {
        img.addEventListener('click', () => abrirVisor(img, true, index));
    });

    btnCerrar?.addEventListener('click', cerrarVisor);
    btnAnterior?.addEventListener('click', () => mostrarImagen(-1));
    btnSiguiente?.addEventListener('click', () => mostrarImagen(1));

    visor?.addEventListener('click', (e) => {
        if (e.target === visor || e.target === contenedorContenido) {
            cerrarVisor();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!visor?.classList.contains('activo')) return;

        if (e.key === 'Escape') {
            cerrarVisor();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            mostrarImagen(1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            mostrarImagen(-1);
        }
    });

    if (abrirMenu && nav && cerrarMenu) {
        abrirMenu.addEventListener("click", () => nav.classList.add("visible"));
        cerrarMenu.addEventListener("click", () => nav.classList.remove("visible"));
    }

    cards.forEach(card => {
        card.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const isActive = this.classList.contains('active-mobile');
                cards.forEach(c => c.classList.remove('active-mobile'));
                if (!isActive) this.classList.add('active-mobile');
            }
        });
    });
});