//estoy levantado elementos que tengo en el html
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear'); 

const setDate = () => {
// Crea un nuevo objeto Date, que representa la fecha y hora actuales
    const date = new Date(); //estoy asignando una nueva instancia
//el método toLocaleDateString() convierte una fecha a una cadena de texto
    dateNumber.textContent = date.toLocaleDateString ('es', { day: 'numeric'});
    dateText.textContent = date.toLocaleDateString('es', {weekday: 'long'});
    dateMonth.textContent = date.toLocaleDateString('es', { month: 'long'});
    dateYear.textContent = date.toLocaleDateString('es' , { year: 'numeric'});
};
setDate();

class Tarea {
    constructor(idTarea, nombre, completada) {
        this.id = idTarea; //this se refiere al nuevo objeto que se está creando.
        this.nombre = nombre;
        this.completada = completada;
    }
}

//La clase AdministrarTarea tiene un constructor que inicializa una propiedad llamada tareas con un array vacío
class AdministrarTarea{
    constructor(){
        this.tareas = []; 
    }
    
    agregarTarea(nombre) {
        //encontrar el mayor id disponible math.max
        const ultimoId = this.tareas.length > 0 ? Math.max(...this.tareas.map(tarea => tarea.id)) : 0;
        //crea una nueva tarea con un id único
        const tarea = new Tarea(ultimoId + 1, nombre);
        //anadir la nueva tarea al array de tareas
        this.tareas.push(tarea);
        //actualizo la lista de tareas para reflejar los cambios
        this.listarTareas(this.tareas);
    }
    
    //parametro idTarea
    eliminarTarea(idTarea) {
        const buscarTarea = this.tareas.reduce((acumulador, tarea) => { // Uso de reduce para buscar la tarea
            if (idTarea === idTarea) {
                return tarea; 
            } else {
                return acumulador; // va a delvolver el acumulador sin cambios si no ha encontrado el id
            }
        });
        
        this.tareas = this.tareas.filter(tarea => tarea !== buscarTarea); 
        this.listarTareas(this.tareas); //actualiza la lista de tarea
    }

    listarTareas(Tareas) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; //lo estoy limpiando
        Tareas.forEach(tarea => {
          const newTask = document.createElement('li');
          // Asigna el contenido de texto del nuevo elemento al nombre de la tarea
          newTask.textContent = tarea.nombre;
          
          const eliminarBtn = document.createElement('span');
          eliminarBtn.className = "bi bi-trash3";
          eliminarBtn.onclick = () => {
          this.eliminarTarea(tarea.idTarea);
          };
          
          newTask.appendChild(eliminarBtn); 
          taskList.appendChild(newTask);

          //aregue el checkbox
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = Tareas.completada; // Marcar la casilla si la tarea está completada
          
          newTask.appendChild(checkbox);
          newTask.appendChild(document.createTextNode(' ')); // separador entre checkbox y nombre
        });
    }

    ordenarTareas() {
        this.tareas.sort((tareaA, tareaB) => {
            if (tareaA.nombre < tareaB.nombre) return -1;
            if (tareaA.nombre > tareaB.nombre) return 1;
            return 0; // Si a es igual a b
        });
        this.listarTareas(this.tareas); //llama a la función listarTareas para actualizar la visualización de las tareas ordenadas
    }
}
    
const administrarTarea = new AdministrarTarea();

document.getElementById('addTaskButton').addEventListener('click', () => {
    const taskText = taskInput.value; //javascript nuevo se puede hacer referencia a un elemento del html solo con el identificador
        if (taskText !== '') {
            administrarTarea.agregarTarea(taskText);
            taskInput.value = '';
        } else {
            alert('Por favor, ingrese una tarea');
        }
});

document.getElementById('orderTaskButton').addEventListener('click', () => {
    administrarTarea.ordenarTareas();
});