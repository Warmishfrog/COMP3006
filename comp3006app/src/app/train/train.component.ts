import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-train',
  standalone: true,
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {
  @Input() departs: string = '';
  @Input() destination: string = '';
  @Input() platform = '';
  constructor() { }
  ngOnInit(): void {
    // TODO: Implement initialization logic here
  }
}
  
