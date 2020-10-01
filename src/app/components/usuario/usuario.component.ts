import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/login/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Observable<Usuario[]>;

  usuarioList: Usuario[] = [{login: 'leo', senha: '123', id: 1}, {id: 2, login: 'brenda', senha: '123'}];

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private confirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(data => console.log(data));
  }

  visualizarUsuario(idUsuario) {
    this.router.navigate(['usuario/visualizar', idUsuario]);
  }

  editarUsuario(idUsuario) {
    this.router.navigate(['usuario/editar', idUsuario]);
  }

  excluirUsuario(idUsuario) {
    this.confirmationService.confirm({
      message: 'Deseja excluir esse Usuário?',
      header: 'Confirmação',
      icon: 'fa ui-icon-warning',
      accept: () => {
        this.blockUI.start("Excluindo");
        
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 2000);
        //this.service.inativar(this.linhaSelecionada.id).pipe(finalize(() => this.blockUI.stop()))
          //.subscribe(() => {
           // this.pageNotificationService.addSuccessMsg('NCM desativada com sucesso.');
           // this.getAllNcm();
         // });
      }
    });
  }

}
