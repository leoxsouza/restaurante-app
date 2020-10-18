import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/service/usuario.service';
import { finalize } from 'rxjs/operators';
import { MensagemUtil } from 'src/app/utils/mensagem.util';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/login/auth.service';
import { RolesEnum } from 'src/app/utils/roles.enum';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioList: Usuario[] = [];

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authServie: AuthService
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
         }, error => this.messageService.add({severity:'error', summary: MensagemUtil.ERRO, detail: 'Exclusão não permitida'}));
      }
    });
  }

  hasRoleAdm() {
    return this.authServie.hasHole([RolesEnum.ADMIN])
  }

}
