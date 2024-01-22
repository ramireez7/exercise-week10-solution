import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'menu-top',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu-top.component.html',
  styleUrl: './menu-top.component.css'
})
export class MenuTopComponent {
  title = 'AssBook';

}
