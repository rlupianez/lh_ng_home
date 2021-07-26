import { Injectable } from '@angular/core';
import { ProductorDataService } from '@shared/productor-data/services/productor-data.service';
import { TakerDataService } from '@shared/taker-data/services/taker-data.service';
import { ClonerService } from '@shared/services/clone.service';
import { transport as TransportData } from '@shared//taker-data/services/taker-data.interfaces';
import { ConditionsBenefitsCommercialDataService } from '@shared/conditions-benefits-commercial-data/services/conditions-benefits-commercial-data.service';
import { RiskDataService } from '../components/risk-data/risk-data.service';
import { LocalTransitDataService } from '../components/local-transit-data/local-transit-data.service';
import { ImportDataService } from '../components/import-data/import-data.service';
import { ExportDataService } from '../components/export-data/export-data.service';
import { RiskFieldEnum } from '../components/risk-data/risk-data.interfaces';
import { TrafficTypeEnum } from '../transport-page/services/transport-interfaces';
import { ExportFieldEnum } from '../components/export-data/export-data.interfaces';
import { ImportFieldEnum } from '../components/import-data/import-data.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  transportData = TransportData;

  constructor(
    private clonerService: ClonerService,
    private productorDataService: ProductorDataService,
    private takerDataService: TakerDataService,
    private conditionsBenefitsCommercialDataService: ConditionsBenefitsCommercialDataService,
    private riskDataService: RiskDataService,
    private localTransitDataService: LocalTransitDataService,
    private importDataService: ImportDataService,
    private exportDataService: ExportDataService,
  ) {

    this.productorDataService.initPanel(true);
    this.takerDataService.initPanelWithType(true, this.transportData);
    this.conditionsBenefitsCommercialDataService.initPanel(true);
    this.riskDataService.initPanel(true);
    this.localTransitDataService.initPanel(true);
    this.importDataService.initPanel(true);
    this.exportDataService.initPanel(true);

    this.observables();
  }

  trafficTypeValue = 0;
  get trafficTypeValueEnum() {
    return this.trafficTypeValue;
  }

  observables() {

    const formGroupRiskData = this.riskDataService.formGroup;
    if (!formGroupRiskData) return;
    const childrenRiskData = this.riskDataService.formGroupConfig['children'];

    const trafficType = formGroupRiskData.controls[RiskFieldEnum.trafficType];
    trafficType.valueChanges.subscribe(value => {
      if (value) {
        {
          this.transportTypes[value]();
        }
      }
    });
  }

  transportTypes = {
    '1': () =>  this.setExportObservables(),
    '2': () => this.setImportObservables(),
    '3': () => this.setLocalTransitObservables(),
  }

  setExportObservables() {
    this.trafficTypeValue = TrafficTypeEnum.Export;

    //export

    const formGroupExportData = this.exportDataService.formGroup;
    if (!formGroupExportData) return;

    const creditLetter = formGroupExportData.controls[ExportFieldEnum.creditLetter];
    const valueInvoice = formGroupExportData.controls[ExportFieldEnum.valueInvoice];
    const assuredSum = formGroupExportData.controls[ExportFieldEnum.assuredSum];

    creditLetter.valueChanges.subscribe(value => {
      if (valueInvoice.value && creditLetter.value) {
        assuredSum.setValue((parseFloat(valueInvoice.value) * value) / 100 + parseFloat(valueInvoice.value));
      }
    });

    valueInvoice.valueChanges.subscribe(value => {
      if (valueInvoice.value && creditLetter.value) {
        assuredSum.setValue((parseFloat(valueInvoice.value) * value) / 100 + parseFloat(valueInvoice.value));
      }

    });
  }

  setImportObservables() {
    this.trafficTypeValue = TrafficTypeEnum.Import;

    //import
    const formGroupImportData = this.importDataService.formGroup;
    if (!formGroupImportData) return;

    const extraSum = formGroupImportData.controls[ImportFieldEnum.extraSum];
    const profitImaginary = formGroupImportData.controls[ImportFieldEnum.profitImaginary];
    const valueInvoice = formGroupImportData.controls[ImportFieldEnum.valueInvoice];
    const assuredSum = formGroupImportData.controls[ImportFieldEnum.assuredSum];

    extraSum.valueChanges.subscribe(value => {
      if (valueInvoice.value && extraSum.value) {
        assuredSum.setValue((parseFloat(valueInvoice.value) * value) / 100 + parseFloat(valueInvoice.value));
      }

    });
    profitImaginary.valueChanges.subscribe(value => {
      if (valueInvoice.value && profitImaginary.value) {
        assuredSum.setValue((parseFloat(valueInvoice.value) * value) / 100 + parseFloat(valueInvoice.value));
      }
    });

    valueInvoice.valueChanges.subscribe(value => {
      if (valueInvoice.value && profitImaginary.value) {
        assuredSum.setValue((parseFloat(valueInvoice.value) * profitImaginary.value) / 100 + parseFloat(valueInvoice.value));
      }
      if (valueInvoice.value && extraSum.value) {
        assuredSum.setValue((parseFloat(valueInvoice.value) * extraSum.value) / 100 + parseFloat(valueInvoice.value));
      }
    });

  }

  setLocalTransitObservables() {
    this.trafficTypeValue = TrafficTypeEnum.LocalTransit;
  }


  get productorService() {
    return this.productorDataService;
  }

  get takerService() {
    return this.takerDataService;
  }

  get conditionsBenefitsCommercialService() {
    return this.conditionsBenefitsCommercialDataService;
  }

  get riskService() {
    return this.riskDataService;
  }

  get localTransitService() {
    return this.localTransitDataService;
  }

  get importService() {
    return this.importDataService;
  }

  get exportService() {
    return this.exportDataService;
  }

}
