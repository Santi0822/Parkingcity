class Entry {
    constructor(owner, car, licensePlate, entryDate, exitDate) {
        this.owner = owner;
        this.car = car;
        this.licensePlate = licensePlate;
        this.entryDate = entryDate;
        this.exitDate = exitDate;
    }
}

class UI {
    // Muestra las entradas almacenadas en la tabla
    static displayEntries() {
        const entries = Store.getEntries();
        console.log("Entries from localStorage:", entries); // Debug: Verifica si obtiene las entradas

        // Limpia la tabla antes de añadir nuevas filas
        const tableBody = document.querySelector('#tableBody');
        tableBody.innerHTML = '';

        entries.forEach((entry) => UI.addEntryToTable(entry));
    }

    // Agrega una entrada a la tabla
    static addEntryToTable(entry) {
        const tableBody = document.querySelector('#tableBody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.owner}</td>
            <td>${entry.car}</td>
            <td>${entry.licensePlate}</td>
            <td>${entry.entryDate}</td>
            <td>${entry.exitDate}</td>
            <td><button class="btn btn-info delete">X</button></td>
        `;
        tableBody.appendChild(row);
    }

    // Limpia los campos del formulario después de agregar una entrada
    static clearInput() {
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach((input) => input.value = "");
    }

    // Elimina una entrada de la tabla
    static deleteEntry(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
        }
    }

    // Muestra un mensaje de alerta con una clase específica
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className} w-50 mx-auto`;
        div.appendChild(document.createTextNode(message));
        const formContainer = document.querySelector('.form-container');
        const form = document.querySelector('#entryForm');
        formContainer.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    // Valida los campos de entrada
    static validateInputs() {
        const owner = document.querySelector('#owner').value;
        const car = document.querySelector('#car').value;
        const licensePlate = document.querySelector('#licensePlate').value;
        const entryDate = document.querySelector('#entryDate').value;
        const exitDate = document.querySelector('#exitDate').value;

        if (owner === '' || car === '' || licensePlate === '' || entryDate === '' || exitDate === '') {
            UI.showAlert('Todos los campos deben ser completados!', 'danger');
            return false;
        }

        if (exitDate < entryDate) {
            UI.showAlert('La fecha de salida no puede ser inferior a la fecha de entrada', 'danger');
            return false;
        }
        return true;
    }
}

class Store {
    // Recupera todas las entradas desde el localStorage
    static getEntries() {
        return localStorage.getItem('entries') ? JSON.parse(localStorage.getItem('entries')) : [];
    }

    // Agrega una nueva entrada al localStorage
    static addEntries(entry) {
        const entries = Store.getEntries();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    // Elimina una entrada del localStorage
    static removeEntries(licensePlate) {
        const entries = Store.getEntries();
        const updatedEntries = entries.filter(entry => entry.licensePlate !== licensePlate);
        localStorage.setItem('entries', JSON.stringify(updatedEntries));
    }
}

// Eventos
// Mostrar las entradas almacenadas cuando se carga la página
document.addEventListener('DOMContentLoaded', UI.displayEntries);

// Añadir nueva entrada cuando se envía el formulario
document.querySelector('#entryForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Declaración de variables
    const owner = document.querySelector('#owner').value;
    const car = document.querySelector('#car').value;
    const licensePlate = document.querySelector('#licensePlate').value;
    const entryDate = document.querySelector('#entryDate').value;
    const exitDate = document.querySelector('#exitDate').value;

    // Validar entradas antes de procesar
    if (!UI.validateInputs()) return;

    // Crear una nueva entrada
    const entry = new Entry(owner, car, licensePlate, entryDate, exitDate);

    // Añadir la entrada a la tabla y almacenarla en el localStorage
    UI.addEntryToTable(entry);
    Store.addEntries(entry);
    UI.clearInput();
    UI.showAlert('Coche agregado con éxito al estacionamiento', 'success');
});

// Eliminar una entrada cuando se hace clic en el botón de eliminación
document.querySelector('#tableBody').addEventListener('click', (e) => {
    // Llama a la función de UI para eliminar la entrada de la tabla
    UI.deleteEntry(e.target);

    // Obtener la matrícula como identificador único de la entrada
    const licensePlate = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

    // Llama a la función de Store para eliminar la entrada del localStorage
    Store.removeEntries(licensePlate);

    // Mostrar mensaje de confirmación
    UI.showAlert('Coche eliminado con éxito de la lista de estacionamiento', 'success');
});

// Búsqueda en la tabla en tiempo real
document.querySelector('#searchInput').addEventListener('keyup', function () {
    const searchValue = document.querySelector('#searchInput').value.toUpperCase();
    const tableLine = document.querySelector('#tableBody').querySelectorAll('tr');

    for (let i = 0; i < tableLine.length; i++) {
        let count = 0;
        const lineValues = tableLine[i].querySelectorAll('td');

        for (let j = 0; j < lineValues.length - 1; j++) {
            if (lineValues[j].innerHTML.toUpperCase().includes(searchValue)) {
                count++;
            }
        }
        tableLine[i].style.display = count > 0 ? '' : 'none';
    }
    // Verificar sesión activa y rol
window.addEventListener('load', () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const role = sessionStorage.getItem('role');

    if (!isLoggedIn) {
        window.location.href = "login.html"; // Redirige al login si no hay sesión
    }

    if (role === "admin") {
        document.getElementById('adminFeatures').style.display = "block"; // Muestra funciones de admin
    } else {
        document.getElementById('adminFeatures').style.display = "none"; // Oculta funciones de admin
    }
});

});
