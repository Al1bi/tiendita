import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { QuatityService } from './servicios/quatity.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  quantity: number | null = null;
  title = 'tiendita';
  
  constructor(private quatityService: QuatityService) {}

  ngOnInit(): void {
    this.quatityService.quantity$.subscribe(quantity => {
      this.quantity = quantity;
    });
  }

}
