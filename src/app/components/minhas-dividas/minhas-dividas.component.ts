import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { MinhasDividas } from 'src/app/model/minhas-dividas';
import { CompraClienteList } from 'src/app/model/compra-cliente-list';
import { DividaClienteService } from 'src/app/service/divida-cliente.service';
import { MensagemUtil } from 'src/app/utils/mensagem.util';
import { CompraClienteService } from 'src/app/service/compra-cliente.service';

@Component({
  selector: 'app-minhas-dividas',
  templateUrl: './minhas-dividas.component.html',
  styleUrls: ['./minhas-dividas.component.css']
})
export class MinhasDividasComponent implements OnInit {

  dividas: MinhasDividas[] = [];
  displayModal: boolean;

  dividaSelecionada: MinhasDividas = new MinhasDividas();

  compras: CompraClienteList[] = [];

  @BlockUI() blockUI: NgBlockUI;

  constructor(private dividaService: DividaClienteService,
              private comprasService: CompraClienteService) { }

  ngOnInit(): void {
    this.listarDividas();
  }

  listarDividas() {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.dividaService.listarMinhasDividas()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(data => this.dividas = data);
  }

  visualizarCompra(divida) {
    this.displayModal = true;
    this.dividaSelecionada = divida;

    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.comprasService.getComprasPorEmpresa(divida.idEmpresa)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(data => {
        console.log(data)
        this.compras = data
      });
  }

}
