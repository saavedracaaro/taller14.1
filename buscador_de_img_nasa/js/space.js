const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

btnBuscar.addEventListener('click', () => {
    const query = inputBuscar.value.trim();

    if (query === '') {
        alert('Por favor, ingrese un término de búsqueda.');
        return;
    }

    // Solicitud fetch a la API de la NASA
    const apiUrl = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            mostrarResultados(data.collection.items);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
});

// Función para mostrar los resultados de la búsqueda
function mostrarResultados(items) {
    contenedor.innerHTML = ''; // Limpiamos los resultados anteriores

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron imágenes.</p>';
        return;
    }

    const row = document.createElement('div');
    row.classList.add('row', 'g-3');

    items.forEach(item => {
        const { title, description, date_created } = item.data[0];
        const imageUrl = item.links ? item.links[0].href : 'placeholder.jpg';

        const col = document.createElement('div');
        col.classList.add('col-md-4');

        col.innerHTML = `
            <div class="card h-100">
                <img src="${imageUrl}" class="card-img-top" alt="${title}" style="max-height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${title || 'Sin título'}</h5>
                    <div class="card-text overflow-auto" style="max-height: 100px;">
                        ${description || 'Sin descripción disponible'}
                    </div>
                    <p class="mt-auto text-muted"><small>Fecha: ${date_created?.split('T')[0] || 'No disponible'}</small></p>
                </div>
            </div>
        `;

        row.appendChild(col);
    });

    contenedor.appendChild(row);
}