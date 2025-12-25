let ordenAZ = true
const modal = document.getElementById("modal")
const modalTitulo = document.getElementById("modal-titulo")
const modalIngredientes = document.getElementById("modal-ingredientes")
const cerrar = document.querySelector(".cerrar")
document.querySelectorAll(".btn-ingredientes").forEach(boton => {
    boton.addEventListener("click", () => {
        const plato = boton.parentElement.querySelector("h3").textContent
        const ingredientes = boton.dataset.ingredientes
        modalTitulo.textContent = plato
        modalIngredientes.textContent = ingredientes
        modal.style.display = "flex"
    })
})
cerrar.addEventListener("click", () => {
    modal.style.display = "none"
})
window.addEventListener("click", (e) => {
    if(e.target === modal) {
        modal.style.display = "none"
    }
})
const buscador = document.getElementById("buscador")
const platos = document.querySelectorAll(".menu-item")
buscador.addEventListener("keyup", () => {
    const texto = buscador.value.toLowerCase()
    itemsMenu.forEach(item => {
        const nombre = item.querySelector("h3").textContent.toLowerCase()
        const coincide = nombre.includes(texto)
        if(coincide) {
            item.classList.remove("oculto")
            item.style.display = "flex"
        } else {
            item.classList.add("oculto")
            setTimeout(() => {
                item.style.display = "none"
            }, 300)
        }
    })
})
function ordenarPlatos() {
    const contenedor = document.getElementById("listaPlatos")
    if(!contenedor) return
    const platos = Array.from(contenedor.querySelectorAll(".plato"))
    platos.sort((a, b) => {
        const textoA = a.textContent.trim().toLowerCase()
        const textoB = b.textContent.trim().toLowerCase()
        return ordenAZ ? textoA.localeCompare(textoB, "es") : textoB.localeCompare(textoA, "es")
    })
    contenedor.innerHTML = ""
    platos.forEach(plato => contenedor.appendChild(plato))
    ordenAZ = !ordenAZ
}
const botonesCategorias = document.querySelectorAll(".btn-categoria")
const itemsMenu = document.querySelectorAll(".menu-item")
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesCategorias.forEach(btn => btn.classList.remove("active"))
        boton.classList.add("active")
        const categoria = boton.dataset.categoria
        itemsMenu.forEach(item => {
            const coincide = categoria === "todos" || item.dataset.categoria === categoria
            if(coincide) {
                item.classList.remove("oculto")
                item.style.display = "flex"
            } else {
                item.classList.add("oculto")
                setTimeout(() => {
                    item.style.display = "none"
                }, 300)
            }
        })
    })
})
const btnModoOscuro = document.getElementById("modoOscuro")
if(localStorage.getItem("modo") === "oscuro") {
    document.body.classList.add("dark")
    btnModoOscuro.textContent = "☀️ Modo claro"
}
btnModoOscuro.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    if(document.body.classList.contains("dark")) {
        btnModoOscuro.textContent = "☀️ Modo claro"
        localStorage.setItem("modo", "oscuro")
    } else {
        btnModoOscuro.textContent = "🌙 Modo oscuro"
        localStorage.setItem("modo", "claro")
    }
})
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener("click", function(e) {
        e.preventDefault()
        const destino = document.querySelector(this.getAttribute("href"))
        if(!destino) return
        destino.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
})
const btnVolverArriba = document.getElementById("volverArriba")
window.addEventListener("scroll", () => {
    if(window.scrollY > 300) {
        btnVolverArriba.style.display = "block"
    } else {
        btnVolverArriba.style.opacity = "none"
    }
})
btnVolverArriba.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
const diasSemana = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
]
const platosDisponibles = [
    "Lomo saltado",
    "Arroz con pollo",
    "Ají de pollo",
    "Tallarines rojos",
    "Pollo al horno",
    "Arroz chaufa",
    "Papa rellena",
    "Escabeche de pescado",
    "Tortilla de coliflor",
    "Lentejas con Pescado frito",
    "Pollo al sillao",
    "Salchipapa",
    "Tallarines verdes con milanesa",
    "Caihua rellena",
    "Guiso de quinua",
    "Guiso de trigo",
    "Pure con Asado de res",
    "Estofado de pollo",
    "Olluco",
    "Cau cau",
    "Arroz tapado",
    "Chicharron con camote frito",
    "Adobo de chancho",
    "Pollo a la olla",
    "Arberjas con Hamburguesa",
    "Pallares con Lomo saltado de pollo",
    "Tallarin Saltado",
    "Locro de zapallo",
    "Salpicon de pollo",
    "Papa rellena",
    "Chicharron de Pota",
    "Garbanzo con pescado frito"
]
function mezclar(array) {
    return array.sort(() => Math.random() - 0.5)
}
function generarMenuSemanal() {
    const platosMezclados = mezclar([...platosDisponibles])
    const [plato1, plato2, plato3, platoUnico] = platosMezclados.slice(0, 4)
    const menuSemana = [
        plato1, plato1,
        plato2, plato2,
        plato3, plato3,
        platoUnico
    ]
    const lista = document.getElementById("listaHorario")
    lista.innerHTML = ""
    diasSemana.forEach((dia, index) => {
        const li = document.createElement("li")
        li.textContent= `${dia}: ${menuSemana[index]}`
        lista.appendChild(li)
    })
}
document.getElementById("randomizarMenu").addEventListener("click", generarMenuSemanal)
generarMenuSemanal()
let patronSemanal = []
function generarPatronSemanal() {
    const platosMezclados = mezclar([...platosDisponibles])
    patronSemanal = [
        platosMezclados[0], platosMezclados[0],
        platosMezclados[1], platosMezclados[1],
        platosMezclados[2], platosMezclados[2],
        platosMezclados[3]
    ]
}
function generarMenuMensual() {
    const lista = document.getElementById("listaHorario")
    if (!lista) return
    lista.innerHTML = ""
    const mes = parseInt(document.getElementById("mes").value)
    const anio = parseInt(document.getElementById("anio").value)
    const hoy = new Date()
    const mesesTexto = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre","Diciembre"]
    const tituloPdf = document.getElementById("tituloMesPdf")
    const fechaPdf = document.getElementById("fechaGeneracion")
    if(tituloPdf && fechaPdf) {
        tituloPdf.textContent = `${mesesTexto[mes]} ${anio}`
        fechaPdf.textContent = `Generado el ${new Date().toLocaleDateString("es-PE")}`
    }
    let fechaActual = new Date(anio, mes, 1)
    let ultimoDomingo = null
    while (fechaActual.getMonth() === mes) {
        const semanaPlatos = obtenerPlatosSemana(ultimoDomingo)
        const patron = [
            semanaPlatos[0], semanaPlatos[0],
            semanaPlatos[1], semanaPlatos[1],
            semanaPlatos[2], semanaPlatos[2],
            semanaPlatos[3]
        ]
        const contSemana = document.createElement("div")
        contSemana.className = "semana"
        const numeroSemana = lista.querySelectorAll(".semana").length + 1
        contSemana.dataset.semana = numeroSemana
        const titulo = document.createElement("h3")
        contSemana.appendChild(titulo)
        const ul = document.createElement("ul")
        const fechaInicioSemana = new Date(fechaActual)
        for (let i = 0; i < 7 && fechaActual.getMonth() === mes; i++) {
            const li = document.createElement("li")
            const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
            const nombreDia = dias[fechaActual.getDay()]
            const numeroDia = fechaActual.getDate()
            li.textContent = `${nombreDia} ${numeroDia}: ${patron[i]}`
            if (
                fechaActual.getDate() === hoy.getDate() &&
                fechaActual.getMonth() === hoy.getMonth() &&
                fechaActual.getFullYear() === hoy.getFullYear()
            ) {
                li.classList.add("hoy")
            }
            ul.appendChild(li)
            if (fechaActual.getDay() === 0) {
                ultimoDomingo = patron[i]
            }
            fechaActual.setDate(fechaActual.getDate() + 1)
        }
        const fechaFinSemana = new Date(fechaActual)
        fechaFinSemana.setDate(fechaFinSemana.getDate() - 1)
        const mesesTexto = [
            "Enero","Febrero","Marzo","Abril","Mayo","Junio",
            "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
        ]
        let rango
        if (fechaInicioSemana.getMonth() === fechaFinSemana.getMonth()) {
            rango = `Del ${fechaInicioSemana.getDate()} al ${fechaFinSemana.getDate()} de ${mesesTexto[fechaInicioSemana.getMonth()]} ${fechaInicioSemana.getFullYear()}`
        } else {
            rango = `Del ${fechaInicioSemana.getDate()} de ${mesesTexto[fechaInicioSemana.getMonth()]} al ${fechaFinSemana.getDate()} de ${mesesTexto[fechaFinSemana.getMonth()]} ${fechaFinSemana.getFullYear()}`
        }
        titulo.textContent = `Semana ${numeroSemana} · ${rango}`
        titulo.addEventListener("click", () => {
            contSemana.classList.toggle("abierta")
        })
        if (hoy >= fechaInicioSemana && hoy <= fechaFinSemana) {
            contSemana.classList.add("abierta")
        }
        contSemana.appendChild(ul)
        lista.appendChild(contSemana)
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const hoy = new Date()
    document.getElementById("mes").value = hoy.getMonth()
    document.getElementById("anio").value = hoy.getFullYear()
    const btnNuevoMes = document.getElementById("nuevoMes")
    if(!btnNuevoMes) {
        console.error("❌ Botón 'nuevoMes' no encontrado")
        return
    }
    btnNuevoMes.addEventListener("click", () => {
    generarMenuMensual()
    })
})
generarMenuMensual()
function actualizarTituloPrint() {
    const mes = parseInt(document.getElementById("mes").value)
    const anio = document.getElementById("anio").value
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]
    document.getElementById("printTitulo").textContent = `Menu mensual - ${meses[mes]} ${anio}`
}
function obtenerPlatosSemana(platoAnterior) {
    let disponibles = [...platosDisponibles]
    if (platoAnterior) {
        disponibles = disponibles.filter(p => p !== platoAnterior)
    }
    disponibles.sort(() => Math.random() - 0.5)
    return disponibles.slice(0, 4)
}
document.querySelectorAll(".barra-movil .btn").forEach(btn => {
    let pressTimer
    const mostrar = () => {
        btn.classList.add("mostrar-tooltip")
        if(navigator.vibrate) {
            navigator.vibrate(20)
        }
    }
    const ocultar = () => btn.classList.remove("mostrar-tooltip")
    btn.addEventListener("touchstart", () => {
        pressTimer = setTimeout(mostrar, 500)
    })
    btn.addEventListener("touchend", () => {
        clearTimeout(pressTimer)
        ocultar()
    })
    btn.addEventListener("touchcancel", () => {
        clearTimeout(pressTimer)
        ocultar()
    })
    btn.addEventListener("mousedown", () => {
        pressTimer = setTimeout(mostrar, 500)
    })
    btn.addEventListener("mouseup", () => {
        clearTimeout(pressTimer)
        ocultar()
    })
    btn.addEventListener("mouseleave", () => {
        clearTimeout(pressTimer)
        ocultar()
    })
})
function imprimirMenu() {
    const semanaSeleccionada = document.getElementById("selectSemana")?.value || "todas"
    const semanas = document.querySelectorAll(".semana")
    semanas.forEach(s => s.classList.remove("solo-imprimir"))
    if(semanaSeleccionada !== "todas") {
        semanas.forEach(semana => {
            if(semana.dataset.semana === semanaSeleccionada) {
                semana.classList.add("solo-imprimir")
            }
        })
    }
    window.print()
    setTimeout(() => {
        semanas.forEach(s => s.classList.remove("solo-impirmir"))
    }, 500)
}
if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(() => console.log("PWA lista")).catch(err => console.error("Error SW", err))
}