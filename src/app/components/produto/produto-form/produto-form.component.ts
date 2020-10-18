import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { AcaoEnum } from 'src/app/utils/acao.enum';
import { MensagemUtil } from 'src/app/utils/mensagem.util';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
})
export class ProdutoFormComponent implements OnInit {

  acao: string;
  acoesEnum = AcaoEnum;
  produto: Produto = new Produto();

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.verificarParametros();
  }

  verificarParametros() {
    this.route.params.subscribe((params) => {

      if (params['id']) {
        this.carregarProduto(params['id']);
      }

      this.acao = params['acao'];
    });
  }

  carregarProduto(id) {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.produtoService.findOne(id).pipe(finalize(() => this.blockUI.stop()))
    .subscribe(produto => this.produto = produto);
  }


  salvarProduto() {
    this.blockUI.start( MensagemUtil.BLOCKUI_SALVANDO );
    this.produtoService.salvar(this.produto).pipe(finalize(() => this.blockUI.stop()))
    .subscribe( () => {
      this.router.navigate( [ '/produto' ] );
      this.messageService.add({severity:'success', summary: MensagemUtil.SUCESSO, detail: `Produto ${MensagemUtil.SALVO}`});
    });
  }

  disableBtnSalvar() {
    return !this.produto.descricao;
  }

}
