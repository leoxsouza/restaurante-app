import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { MensagemUtil } from 'src/app/utils/mensagem.util';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
})
export class ProdutoComponent implements OnInit {

  produtos: Produto[] = [];

  cols = [
    {field: 'descricao', header: 'Produto'},
    {header: 'Ações', acao: 'edit'}
  ]

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listarDividas();
  }

  listarDividas() {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.produtoService.listarProdutos()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(data => this.produtos = data);
  }

  editarProduto(id) {
    this.router.navigate(['produto/editar', id]);
  }

}
