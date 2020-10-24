import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MensagemUtil } from 'src/app/utils/mensagem.util';
import { finalize } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService, SelectItem } from 'primeng/api';
import { AcaoEnum } from 'src/app/utils/acao.enum';
import { EmpresaService } from 'src/app/service/empresa.service';
import { TipoPessoaEnum } from 'src/app/model/tipo-pessoa.enum';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  acao: string;
  acoesEnum = AcaoEnum;
  tipoPessoaEnum = TipoPessoaEnum;

  usuario: Usuario = new Usuario();

  roles = [{id: null, descricaoRole: "Selecione uma Role"}, {id:1, descricaoRole: "ADMIN"}, {id: 2, descricaoRole: "CLIENTE"}]

  empresas: SelectItem[] = [];

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService,
    private empresaService: EmpresaService,
  ) { }

  ngOnInit(): void {
    this.verificarParametros();
    this.getDropdown();
  }

  verificarParametros() {
    this.route.params.subscribe((params) => {

      if (params['id']) {
        this.carregarUsuario(params['id']);
      }

      this.acao = params['acao'];
    });
  }

  getDropdown() {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.empresaService.getEmpresasDropdown().pipe(finalize(() => this.blockUI.stop()))
      .subscribe(empresasDropdown => this.empresas = empresasDropdown);
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
    }, error => this.messageService.add({severity:'error', summary: MensagemUtil.ERRO, detail: error}));

  }

  disableBtnSalvar() {
    if (this.isPj()) {
      return !this.usuario.login || !this.usuario.pessoa.nome || !this.usuario.senha || !this.usuario.pessoa.tipoPessoa || !this.usuario.pessoa.empresa;
    }
    return !this.usuario.login || !this.usuario.pessoa.nome || !this.usuario.senha || !this.usuario.pessoa.tipoPessoa;
  }

  isPj() {
    return this.usuario.pessoa.tipoPessoa == this.tipoPessoaEnum.PJ;
  }

  verificarPessoa() {
    if (!this.isPj()) {
      this.usuario.pessoa.empresa = undefined;
    }
  }

}
