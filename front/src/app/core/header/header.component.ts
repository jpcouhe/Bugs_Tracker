import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() public isAdmin!: boolean;

  constructor(private authService: AuthService, private route:Router) {}

  ngOnInit(): void {}

  public logout():void{
    this.authService.logout().subscribe()
    this.route.navigateByUrl('/auth/login')
  }

}
