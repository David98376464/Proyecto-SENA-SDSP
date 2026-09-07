
document.addEventListener("DOMContentLoaded", function () {


    // =========================================================
    // DATOS DE PRUEBA
    // Estos datos simulan las incidencias almacenadas
    // en el sistema.
    // =========================================================

    let incidencias = [

        {
            id: 1,
            nombre: "Retraso en entrega de materiales",
            proyecto: "Proyecto Alfa",
            responsable: "Carlos Pérez",
            fecha: "2026-08-22",
            prioridad: "Alta",
            estado: "Pendiente",
            categoria: "Materiales",
            ubicacion: "Almacén principal",
            descripcion:
                "Se presentó retraso en la entrega de materiales necesarios para continuar la actividad programada."
        },

        {
            id: 2,
            nombre: "Fuga en instalación hidráulica",
            proyecto: "Proyecto Beta",
            responsable: "María Gómez",
            fecha: "2026-08-23",
            prioridad: "Alta",
            estado: "En revisión",
            categoria: "Instalación",
            ubicacion: "Bloque B - Primer piso",
            descripcion:
                "Se detectó una fuga durante la revisión de la instalación hidráulica. Se requiere inspección técnica."
        },

        {
            id: 3,
            nombre: "Falta de señalización",
            proyecto: "Proyecto Gamma",
            responsable: "Juan Rodríguez",
            fecha: "2026-08-24",
            prioridad: "Media",
            estado: "Pendiente",
            categoria: "Seguridad",
            ubicacion: "Zona de acceso",
            descripcion:
                "La zona de acceso no cuenta con la señalización preventiva requerida."
        },

        {
            id: 4,
            nombre: "Observación en planos",
            proyecto: "Proyecto Delta",
            responsable: "Laura Martínez",
            fecha: "2026-08-24",
            prioridad: "Media",
            estado: "En revisión",
            categoria: "Calidad",
            ubicacion: "Oficina técnica",
            descripcion:
                "Se encontró una diferencia entre el plano disponible y la condición observada en obra."
        },

        {
            id: 5,
            nombre: "Equipo fuera de servicio",
            proyecto: "Proyecto Alfa",
            responsable: "Carlos Pérez",
            fecha: "2026-08-25",
            prioridad: "Baja",
            estado: "Resuelta",
            categoria: "Equipos",
            ubicacion: "Zona de trabajo",
            descripcion:
                "Un equipo presentó una falla menor y fue reemplazado por otro disponible en obra."
        },

        {
            id: 6,
            nombre: "Retraso en actividad de instalación",
            proyecto: "Proyecto Beta",
            responsable: "María Gómez",
            fecha: "2026-08-26",
            prioridad: "Baja",
            estado: "Resuelta",
            categoria: "Avance",
            ubicacion: "Bloque C",
            descripcion:
                "La actividad presentó un retraso de una jornada, pero fue reprogramada y finalizada."
        }

    ];


    // =========================================================
    // REFERENCIAS A ELEMENTOS HTML
    // =========================================================

    const body =
        document.getElementById("incidentsBody");

    const search =
        document.getElementById("searchIncident");

    const status =
        document.getElementById("filterStatus");

    const priority =
        document.getElementById("filterPriority");

    const count =
        document.getElementById("incidentCount");

    const empty =
        document.getElementById("emptyState");

    const modal =
        document.getElementById("incidentModal");

    const form =
        document.getElementById("incidentForm");


    // =========================================================
    // FORMATEAR FECHA
    // Convierte:
    // 2026-08-24
    //
    // En:
    // 24/08/2026
    // =========================================================

    function formatearFecha(fecha) {

        const partes = fecha.split("-");

        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }


    // =========================================================
    // CLASE PARA PRIORIDAD
    // =========================================================

    function clasePrioridad(valor) {

        if (valor === "Alta") {

            return "priority-high";

        }

        if (valor === "Media") {

            return "priority-medium";

        }

        return "priority-low";
    }


    // =========================================================
    // CLASE PARA ESTADO
    // =========================================================

    function claseEstado(valor) {

        if (valor === "Pendiente") {

            return "status-pending";

        }

        if (valor === "En revisión") {

            return "status-review";

        }

        return "status-resolved";
    }


    // =========================================================
    // ACTUALIZAR RESUMEN
    // =========================================================

    function actualizarResumen() {

        // Incidencias que todavía no están resueltas

        const abiertas =
            incidencias.filter(
                incidencia =>
                    incidencia.estado !== "Resuelta"
            ).length;


        // Incidencias abiertas con prioridad alta

        const altas =
            incidencias.filter(
                incidencia =>
                    incidencia.prioridad === "Alta" &&
                    incidencia.estado !== "Resuelta"
            ).length;


        // Incidencias resueltas

        const resueltas =
            incidencias.filter(
                incidencia =>
                    incidencia.estado === "Resuelta"
            ).length;


        // Mostrar valores

        document.getElementById("openCount")
            .textContent = abiertas;

        document.getElementById("highCount")
            .textContent = altas;

        document.getElementById("resolvedCount")
            .textContent = resueltas;
    }


    // =========================================================
    // MOSTRAR INCIDENCIAS EN LA TABLA
    // =========================================================

    function renderizar() {

        const texto =
            search.value
                .toLowerCase()
                .trim();


        const filtroEstado =
            status.value;


        const filtroPrioridad =
            priority.value;


        // Filtrar información

        const filtradas =
            incidencias.filter(
                function (incidencia) {


                    const coincideTexto = [

                        incidencia.nombre,

                        incidencia.proyecto,

                        incidencia.responsable,

                        incidencia.categoria

                    ]
                    .join(" ")
                    .toLowerCase()
                    .includes(texto);


                    const coincideEstado =
                        filtroEstado === "all" ||
                        incidencia.estado === filtroEstado;


                    const coincidePrioridad =
                        filtroPrioridad === "all" ||
                        incidencia.prioridad === filtroPrioridad;


                    return (
                        coincideTexto &&
                        coincideEstado &&
                        coincidePrioridad
                    );

                }
            );


        // Limpiar tabla

        body.innerHTML = "";


        // Actualizar contador

        count.textContent =
            `${filtradas.length} ${
                filtradas.length === 1
                    ? "incidencia"
                    : "incidencias"
            }`;


        // Mostrar mensaje cuando no hay resultados

        empty.hidden =
            filtradas.length !== 0;


        // Crear cada fila

        filtradas.forEach(
            function (incidencia) {


                const fila =
                    document.createElement("tr");


                fila.innerHTML = `

                    <td>

                        <div class="incident-name">

                            <div class="incident-icon">
                                ⚠
                            </div>

                            <div>

                                <strong>
                                    ${incidencia.nombre}
                                </strong>

                                <span>
                                    ${incidencia.categoria}
                                </span>

                            </div>

                        </div>

                    </td>


                    <td>
                        ${incidencia.proyecto}
                    </td>


                    <td>
                        ${incidencia.responsable}
                    </td>


                    <td>
                        ${formatearFecha(
                            incidencia.fecha
                        )}
                    </td>


                    <td>

                        <span
                            class="priority ${clasePrioridad(
                                incidencia.prioridad
                            )}">

                            ${incidencia.prioridad}

                        </span>

                    </td>


                    <td>

                        <span
                            class="status ${claseEstado(
                                incidencia.estado
                            )}">

                            ${incidencia.estado}

                        </span>

                    </td>


                    <td>

                        <div class="action-buttons">


                            <!-- VER -->

                            <button
                                class="action-button"
                                title="Ver incidencia"
                                data-action="view"
                                data-id="${incidencia.id}">

                                👁

                            </button>


                            <!-- EDITAR -->

                            <button
                                class="action-button"
                                title="Editar incidencia"
                                data-action="edit"
                                data-id="${incidencia.id}">

                                ✎

                            </button>


                        </div>

                    </td>

                `;


                body.appendChild(fila);

            }
        );


        // Actualizar tarjetas

        actualizarResumen();

    }


    // =========================================================
    // ABRIR MODAL
    // =========================================================

    function abrirModal(incidencia = null) {


        // Limpiar formulario

        form.reset();

        // Habilitar nuevamente todos los campos
     const campos = document.querySelectorAll(
        "#incidentForm input:not([type='hidden']), " +
        "#incidentForm select, " +
        "#incidentForm textarea"
    );

    campos.forEach(function (campo) {
        campo.disabled = false;
    });

    // Mostrar nuevamente el botón guardar
    const botonGuardar =
        document.querySelector(
            "#incidentForm button[type='submit']"
    );

    botonGuardar.style.display = "inline-flex";

    // Restaurar botón cancelar
    document.getElementById("cancelIncident").textContent =
        "Cancelar";


        // Limpiar ID

        document.getElementById(
            "incidentId"
        ).value = "";


        // Cambiar título

        document.getElementById(
            "modalTitle"
        ).textContent =

            incidencia
                ? "Editar incidencia"
                : "Registrar incidencia";


        // Colocar fecha actual

        document.getElementById(
            "incidentDate"
        ).value =
            new Date()
                .toISOString()
                .split("T")[0];


        // Si estamos editando

        if (incidencia) {


            document.getElementById(
                "incidentId"
            ).value =
                incidencia.id;


            document.getElementById(
                "incidentName"
            ).value =
                incidencia.nombre;


            document.getElementById(
                "incidentProject"
            ).value =
                incidencia.proyecto;


            document.getElementById(
                "incidentCategory"
            ).value =
                incidencia.categoria;


            document.getElementById(
                "incidentPriority"
            ).value =
                incidencia.prioridad;


            document.getElementById(
                "incidentDate"
            ).value =
                incidencia.fecha;


            document.getElementById(
                "incidentLocation"
            ).value =
                incidencia.ubicacion;


            document.getElementById(
                "incidentDescription"
            ).value =
                incidencia.descripcion;

        }


        // Mostrar modal

        modal.hidden = false;
    }


    // =========================================================
    // CERRAR MODAL
    // =========================================================

    function cerrarModal() {

        modal.hidden = true;

    }


    // =========================================================
    // MOSTRAR MENSAJE
    // =========================================================

    function mostrarToast(mensaje) {

        const toast =
            document.getElementById("toast");


        toast.textContent =
            mensaje;


        toast.classList.add("show");


        setTimeout(
            () => {

                toast.classList.remove("show");

            },
            2800
        );
    }


    // =========================================================
    // VER DETALLE DE INCIDENCIA
    // =========================================================

    function verIncidencia(incidencia) {

    // Abrimos el mismo modal utilizado para editar
    abrirModal(incidencia);

    // Cambiamos el título del modal
    document.getElementById("modalTitle").textContent =
        "Detalle de incidencia";

    // Obtenemos todos los campos
    const campos = document.querySelectorAll(
        "#incidentForm input:not([type='hidden']), " +
        "#incidentForm select, " +
        "#incidentForm textarea"
    );

    // Bloqueamos los campos para que solamente se puedan consultar
    campos.forEach(function (campo) {
        campo.disabled = true;
    });

    // Ocultamos el botón de guardar
    const botonGuardar =
        document.querySelector(
            "#incidentForm button[type='submit']"
        );

    botonGuardar.style.display = "none";

    // Cambiamos el texto del botón cancelar
    document.getElementById("cancelIncident").textContent =
        "Cerrar";
    }


    // =========================================================
    // BUSCADOR
    // =========================================================

    search.addEventListener(
        "input",
        renderizar
    );


    // =========================================================
    // FILTRO DE ESTADO
    // =========================================================

    status.addEventListener(
        "change",
        renderizar
    );


    // =========================================================
    // FILTRO DE PRIORIDAD
    // =========================================================

    priority.addEventListener(
        "change",
        renderizar
    );


    // =========================================================
    // ABRIR MODAL PARA NUEVA INCIDENCIA
    // =========================================================

    document
        .getElementById("openIncidentModal")
        .addEventListener(
            "click",
            () => abrirModal()
        );


    // =========================================================
    // CERRAR MODAL
    // =========================================================

    document
        .getElementById("closeIncidentModal")
        .addEventListener(
            "click",
            cerrarModal
        );


    document
        .getElementById("cancelIncident")
        .addEventListener(
            "click",
            cerrarModal
        );


    // Cerrar haciendo clic fuera del modal

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                cerrarModal();

            }

        }
    );


    // =========================================================
    // BOTONES VER / EDITAR
    // =========================================================

    body.addEventListener(
        "click",
        function (event) {


            const button =
                event.target.closest(
                    "button[data-action]"
                );


            if (!button) return;


            const incidencia =
                incidencias.find(
                    i =>
                        i.id ===
                        Number(button.dataset.id)
                );


            if (!incidencia) return;


            // VER

            if (
                button.dataset.action === "view"
            ) {

                verIncidencia(incidencia);

            }


            // EDITAR

            if (
                button.dataset.action === "edit"
            ) {

                abrirModal(incidencia);

            }

        }
    );


    // =========================================================
    // GUARDAR INCIDENCIA
    // =========================================================

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Obtener ID

            const id =
                Number(
                    document.getElementById(
                        "incidentId"
                    ).value
                );


            // Obtener información del formulario

            const datos = {

                nombre:
                    document.getElementById(
                        "incidentName"
                    ).value.trim(),


                proyecto:
                    document.getElementById(
                        "incidentProject"
                    ).value,


                categoria:
                    document.getElementById(
                        "incidentCategory"
                    ).value,


                prioridad:
                    document.getElementById(
                        "incidentPriority"
                    ).value,


                fecha:
                    document.getElementById(
                        "incidentDate"
                    ).value,


                ubicacion:
                    document.getElementById(
                        "incidentLocation"
                    ).value.trim()
                    || "No especificada",


                descripcion:
                    document.getElementById(
                        "incidentDescription"
                    ).value.trim(),


                responsable:
                    "Supervisor de Obra",


                estado:
                    "Pendiente"

            };


            // =================================================
            // EDITAR
            // =================================================

            if (id) {


                const indice =
                    incidencias.findIndex(
                        i => i.id === id
                    );


                incidencias[indice] = {

                    ...incidencias[indice],

                    ...datos

                };


                mostrarToast(
                    "Incidencia actualizada correctamente."
                );

            }


            // =================================================
            // REGISTRAR NUEVA
            // =================================================

            else {


                datos.id =
                    incidencias.length

                        ? Math.max(
                            ...incidencias.map(
                                i => i.id
                            )
                        ) + 1

                        : 1;


                incidencias.unshift(
                    datos
                );


                mostrarToast(
                    "Incidencia registrada correctamente."
                );

            }


            // Cerrar modal

            cerrarModal();


            // Actualizar tabla

            renderizar();

        }
    );


    // =========================================================
    // NOTIFICACIONES
    // =========================================================

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );


    notificationButton.addEventListener(
        "click",
        function () {

            mostrarToast(
                "Tienes 2 incidencias pendientes de revisión."
            );

        }
    );


    // =========================================================
    // CARGAR TABLA AL INICIAR
    // =========================================================

    renderizar();


    console.log(
        "SGSP - Módulo de incidencias del supervisor cargado correctamente."
    );

});

