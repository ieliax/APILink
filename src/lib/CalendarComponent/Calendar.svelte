<script>
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.min.css';
    import { onMount } from 'svelte';
    
  
    let calendarInput;
  
    onMount(() => {
      flatpickr(calendarInput, {
        onChange: function(selectedDates, dateStr, instance) {
          alert('Selected date: ' + dateStr);
        },
        enableTime: true, // Si también quieres seleccionar la hora
        dateFormat: "Y-m-d H:i",
      });
    });
  </script>
  
  <input type="text" bind:this={calendarInput} />
  