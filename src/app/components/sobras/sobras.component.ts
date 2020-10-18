import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { Sobras } from 'src/app/model/sobras';
import { SobrasService } from 'src/app/service/sobras.service';
import { MensagemUtil } from 'src/app/utils/mensagem.util';

@Component({
  selector: 'app-sobras',
  templateUrl: './sobras.component.html',
  styleUrls: ['./sobras.component.scss']
})
export class SobrasComponent implements OnInit {

  sobras: Sobras[] = [];

  cols = [
    {field: 'nomeProduto', header: 'Produto'},
    {field: 'qtdPeso', header: 'Kg'},
    {field: 'qtdUnidade', header: 'Unidade'},
    {field: 'dataSobra', header: 'Data'},
  ]

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private sobraService: SobrasService
  ) { }

  ngOnInit(): void {
    this.listarDividas();
  }

  listarDividas() {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.sobraService.listarSobras()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(data => this.sobras = data);
  }

}
