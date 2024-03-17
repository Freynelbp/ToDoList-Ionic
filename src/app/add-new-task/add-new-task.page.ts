import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories: any =[]
  categorySelectedCategory: any

  newTaskObj = {}
  itemName: any
  itemDueDate: any
  itemPriority: any
  itemCategory: any


  constructor(public modalCtlr: ModalController, public todoService:TodoService) {

   }

  ngOnInit() {
    this.categories.push('Trabajo')
    this.categories.push('Personal')
    this.categories.push('Diversion')
    this.categories.push('Fecha Importante')
  }
  
  async Anadir(){
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority,itemCategory:this.categorySelectedCategory})
    console.log(this.newTaskObj);
    let uid = this.itemName + this.itemDueDate
    
    if(uid){
      await this.todoService.addTask(uid,this.newTaskObj)
    }else{
      alert("No se pudo añadir la tarea")
    }


    this.dismis()
  }
  
  SeleccionarCategoria(index: any){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtlr.dismiss(this.newTaskObj)
  }

}
