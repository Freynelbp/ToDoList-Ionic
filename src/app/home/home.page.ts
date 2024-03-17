/*import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  
  todoList = [{
    itemName: 'Practicar Programacion',
    itemDueDate: '10-3-2024',
    itemPriority: 'Medio',
    itemCategory: 'Work'
  },
  {
    itemName: 'Tareas de la Universidad',
    itemDueDate: '10-3-2024',
    itemPriority: 'Alto',
    itemCategory: 'Personal'
  },
  {
    itemName: 'Ir de compras',
    itemDueDate: '10-3-2024',
    itemPriority: 'Bajo',
    itemCategory: 'Personal'
  },
  {
    itemName: 'Trabajo',
    itemDueDate: '10-3-2024',
    itemPriority: 'Alto',
    itemCategory: 'Work'
  },
  {
    itemName: 'Ir al GYM',
    itemDueDate: '10-3-2024',
    itemPriority: 'Medio',
    itemCategory: 'Personal'
  }]

  today: number =
   Date.now()
  constructor() {}

}
*/

import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList:any = []
  
  today: number = Date.now();

  constructor(public modalCtlr: ModalController, public todoService:TodoService) { 
    this.ListarTareas()
  }

  async AnadirItem() {
    const modal = await this.modalCtlr.create({
      component: AddNewTaskPage,
    })
    modal.onDidDismiss().then(newTask =>{
      this.ListarTareas()
    })
    return await modal.present()
  }

  ListarTareas(){
    this.todoList = this.todoService.getAllTasks()
    console.log(this.todoService.getAllTasks());
  }

  Eliminar(key: any) { 
    this.todoService.deleteTask(key)
    this.ListarTareas()
  }

  async Actualizar(selectedTask: any){
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    })

    modal.onDidDismiss().then(()=>{
      this.ListarTareas()
    })
    
    return await modal.present()
  }
}