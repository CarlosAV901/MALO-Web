import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';// Ajusta la ruta según tu estructura

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  userName: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userData = this.userService.getUserData();
    this.userName = userData ? userData.email : null; // Puedes acceder a otros datos también
  }
}
