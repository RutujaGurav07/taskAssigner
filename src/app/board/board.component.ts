import { Component, OnInit } from '@angular/core';
import { CdkDragDrop,CdkDropList, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  development = [
    'Get to work',
    'Pick up grocerise',
    'Ready for dinner ',
    'go home'
  ];
  inprocess = [
    'get up',
    'iron cloths',
    'Working on project ',
    'listening music'
  ];
  done =[
    'study mp',
    'making card',
    'fixing error',
  ]
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
