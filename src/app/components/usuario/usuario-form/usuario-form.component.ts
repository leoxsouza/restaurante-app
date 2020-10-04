import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MensagemUtil } from 'src/app/utils/mensagem.util';
import { finalize } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { AcaoEnum } from 'src/app/utils/acao.enum';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  acao: string;
  acoesEnum = AcaoEnum;

  usuario: Usuario = new Usuario();

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.verificarParametros();
  }

  verificarParametros() {
    this.route.params.subscribe((params) => {

      if (params['id']) {
        this.carregarUsuario(params['id']);
      }

      this.acao = params['acao'];
    });
  }

  carregarUsuario(id) {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.usuarioService.findOne(id).pipe(finalize(() => this.blockUI.stop()))
    .subscribe(usuario => this.usuario = usuario);
  }

  salvarUsuario() {
    this.blockUI.start( MensagemUtil.BLOCKUI_SALVANDO );
    this.usuarioService.salvar(this.usuario).pipe(finalize(() => this.blockUI.stop()))
    .subscribe( () => {
      this.router.navigate( [ '/usuario' ] );
      this.messageService.add({severity:'success', summary: MensagemUtil.SUCESSO, detail: `Usuário ${MensagemUtil.SALVO}`});
    });

  }

  disableBtnSalvar() {
    return !this.usuario.login || !this.usuario.nome || !this.usuario.senha;
  }

}
