import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService, SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { Sobras } from 'src/app/model/sobras';
import { ProdutoService } from 'src/app/service/produto.service';
import { SobrasService } from 'src/app/service/sobras.service';
import { MensagemUtil } from 'src/app/utils/mensagem.util';

@Component({
  selector: 'app-sobras-form',
  templateUrl: './sobras-form.component.html',
})
export class SobrasFormComponent implements OnInit {

  sobra: Sobras = new Sobras();
  produtos: SelectItem[] = [];
  tipoSobra: string = 'peso';

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private produtoService: ProdutoService,
    private sobraService: SobrasService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getDropdown();
  }

  getDropdown() {
    
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.produtoService.getProdutosDropdown().pipe(finalize(() => this.blockUI.stop()))
      .subscribe(produtosDropdown => this.produtos = produtosDropdown);
  }

  salvarSobra() {
    this.blockUI.start( MensagemUtil.BLOCKUI_SALVANDO );
    this.sobraService.salvar(this.sobra).pipe(finalize(() => this.blockUI.stop()))
    .subscribe( () => {
      this.router.navigate( [ '/sobras' ] );
      this.messageService.add({severity:'success', summary: MensagemUtil.SUCESSO, detail: `Sobra ${MensagemUtil.SALVO}`});
    });
  }

  disableBtnSalvar() {
    if (this.tipoSobra == 'peso') {
      return !this.sobra.idProduto || !this.sobra.qtdPeso;
    }
    return !this.sobra.idProduto || !this.sobra.qtdUnidade;
  }

  changeTipo() {
    this.sobra.qtdPeso = undefined;
    this.sobra.qtdUnidade = undefined;
  }

}
