import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'train-app';

  trains: any[] = [];

  constructor(public httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get("https://web.socem.plymouth.ac.uk/COMP3006/trains/trains/")
      .subscribe((res: any) => {
        this.trains = res.trains;
      });
  }
}
