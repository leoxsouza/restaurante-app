import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { Sobras } from 'src/app/model/sobras';
import { MensagemUtil } from 'src/app/utils/mensagem.util';

@Component({
  selector: 'app-sobras-form',
  templateUrl: './sobras-form.component.html',
})
export class SobrasFormComponent implements OnInit {

  sobra: Sobras = new Sobras();

  produtos: SelectItem[] = [];

  @BlockUI() blockUI: NgBlockUI;

  constructor(

  ) { }

  ngOnInit(): void {
    this.getDropdown();
  }

  getDropdown() {
    
    // this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    // this.produtoService.getProdutosDropdown().pipe(finalize(() => this.blockUI.stop()))
    //   .subscribe(produtosDropdown => this.produtos = produtosDropdown);
  }

  salvarSobra() {

  }

  disableBtnSalvar() {

  }

}
