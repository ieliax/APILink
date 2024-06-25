<script>
    // import Calendar from "../../lib/CalendarComponent/Calendar.svelte";
    import dayjs from 'dayjs';
    import { Datepicker } from 'svelte-calendar';


    let date = null;



    
    async function notifyLinkOpened() {
        try {
            const response = await fetch("/api/check-registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uid: "1234",email:"elias.liriano@gmail.com",age:37})
            });
           
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getCount() {
        try {
            const response = await fetch("/api", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function contactViaWhatsApp() {
        await notifyLinkOpened();
        // window.location.href = 'https://wa.me/1234567890'; // Reemplaza con tu enlace de WhatsApp
    }

    let tareas = [
        { id: 0, titulo: "Lunes" },
        { id: 1, titulo: "Martes" },
    ];

    let nuevaTareaTitulo = "";
    let selectedTask = null;

    function agregarTarea(titulo) {
        const nuevatarea = {
            id: tareas.length,
            titulo: titulo,
        };
        if (titulo) {
            tareas = [...tareas, nuevatarea];
            nuevaTareaTitulo = "";
        }
    }

    function removerTarea(tareaId) {
        tareas = tareas.filter(tarea => tarea.id !== tareaId);
        console.log(tareas)
    }

    function tareaCompleta(){
        tareas = tareas.map(tarea => tarea.id === tareaId ? { ...tarea, completada: !tarea.completada } : tarea);
    }

    function didselectedCell(tareaId){
        console.log(tareas[tareaId].titulo);
        selectedTask = tareas[tareaId];
    }
    
  
</script>
<button on:click={notifyLinkOpened}>POST</button>