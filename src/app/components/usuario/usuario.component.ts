import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/login/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';
import { finalize } from 'rxjs/operators';
import { MensagemUtil } from 'src/app/utils/mensagem.util';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Observable<Usuario[]>;

  usuarioList: Usuario[] = [{id: 1, login: 'leo', nome: 'Leonardo', senha: '123'}];

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.usuarioService.getUsuarios()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(data => this.usuarioList = data);
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
        this.blockUI.start(MensagemUtil.BLOCKUI_EXCLUINDO);

        this.usuarioService.excluirUsuario(idUsuario).pipe(finalize(() => this.blockUI.stop()))
          .subscribe(() => {
            this.messageService.add({severity:'success', summary: MensagemUtil.SUCESSO, detail: `Usuário ${MensagemUtil.EXCLUIDO}`});
           this.listarUsuarios();
         });
      }
    });
  }

}
