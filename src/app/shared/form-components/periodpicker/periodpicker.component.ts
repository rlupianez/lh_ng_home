import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, Host, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { MatDatepicker, MatCalendar, MatDatepickerIntl } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment, Moment} from 'moment';
import { Moment } from 'moment';

// const moment = _rollupMoment || _moment;
const moment = _moment;
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-periodpicker',
  templateUrl: './periodpicker.component.html',
  styleUrls: ['./periodpicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class PeriodPickerComponent implements OnInit {

  @Input() iFormControl: FormControl;
  @Input() controlOptions: object;
  moment = moment;
  customHeader = CustomPeriodpickerHeader;

  defaultAppearance: string = 'outline';

  constructor() { }

  ngOnInit() {
    // console.log('datepicker', this.formControl, this.controlOptions)
  }

  get isRequired(){
    return this.controlOptions['required'];
  }

  get controlAppearance(){
    return this.controlOptions['control'].appearance || this.defaultAppearance;
  }


  chosenYearHandler(normalizedYear: Moment) {
    let ctrlValue = moment();

    if (moment.isMoment(this.iFormControl.value)){
      ctrlValue = moment(this.iFormControl.value);
    }
    
    ctrlValue.year(moment(normalizedYear).year());
    this.iFormControl.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    let ctrlValue = moment();

    if (moment.isMoment(this.iFormControl.value)){
      ctrlValue = moment(this.iFormControl.value);
    }
    
    ctrlValue.month(moment(normalizedMonth).month());
    this.iFormControl.setValue(ctrlValue);
    datepicker.close();
  }
}

/****************
 * 
 *  Custom header datepicker
 * 
 */

export const yearsPerPage = 24;
export const yearsPerRow = 4;

/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  styles: [`
    .example-header {
      display: flex;
      align-items: center;
      padding: 0.5em;
    }

    .example-header-label {
      flex: 1;
      height: 1em;
      font-weight: 500;
      text-align: center;
    }

    .example-double-arrow .mat-icon {
      margin: -22%;
    }
  `],
  template: `
    <div class="mat-calendar-header">
    <div class="mat-calendar-controls">
      <button mat-button type="button" class="mat-calendar-period-button"
              (click)="currentPeriodClicked()"
              cdkAriaLive="polite">
        {{periodLabel}}
        <div class="mat-calendar-arrow"
            [class.mat-calendar-invert]="_calendar.currentView != 'multi-year'"></div>
      </button>

      <div class="mat-calendar-spacer"></div>
     
      <button mat-icon-button (click)="previousClicked()" [disabled]="!previousEnabled">
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
     
      <button mat-icon-button (click)="nextClicked()" [disabled]="!nextEnabled">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
    </div>
    
     
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CustomPeriodpickerHeader<Moment> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
      public _calendar: MatCalendar<Moment>, 
      private _dateAdapter: DateAdapter<Moment>,
      @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats, 
      cdr: ChangeDetectorRef) {
    _calendar.stateChanges
        .pipe(takeUntil(this._destroyed))
        .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

   /** The label for the current calendar view. */
   get periodLabel(): string {
    if (this._calendar.currentView == 'year') {
      return this._dateAdapter
          .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
              .toLocaleUpperCase();
    }

    if(this._calendar.currentView == 'multi-year'){
      //return '1900-2015';

    // The offset from the active year to the "slot" for the starting year is the
    // *actual* first rendered year in the multi-year view, and the last year is
    // just yearsPerPage - 1 away.
    
      const activeYear = this._dateAdapter.getYear(this._calendar.activeDate);
      const maxYear = this._dateAdapter.getYear(this._calendar.maxDate);
      const minYear = this._dateAdapter.getYear(this._calendar.minDate);

      let currentMax = maxYear;
      let currentMin = maxYear - yearsPerPage + 1;
      do {
        if(activeYear === maxYear || currentMin === activeYear){
          return `${currentMin} - ${currentMax}`;
        }

        if(currentMin < activeYear && activeYear < currentMax && currentMax-activeYear < yearsPerPage){
          return `${currentMin} - ${currentMax}`;
        }

        currentMax = currentMin - 1;
        currentMin = currentMax - ( yearsPerPage - 1 );


      }while(currentMin > minYear);

      return `${minYear} - ${currentMax}`;

    }

    }



    
  currentPeriodClicked(): void {
    if(this._calendar.currentView === 'multi-year'){
      this._calendar.currentView = 'year';
    }else{
      this._calendar.currentView = 'multi-year';
    }
  }

  get previousEnabled(){
    if (!this._calendar.minDate) {
      return true;
    }
    return this._calendar.activeDate !== this._calendar.minDate;
  }

  get nextEnabled(){
    if (!this._calendar.maxDate) {
      return true;
    }
    return this._calendar.activeDate !== this._calendar.maxDate;
  }

  previousClicked() {
    const mode = this._calendar.currentView;
    this._calendar.activeDate = mode === 'year' ?
        this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1) :
        this._dateAdapter.addCalendarYears(this._calendar.activeDate, - (yearsPerPage + 1));
  }

  nextClicked() {
    const mode = this._calendar.currentView;
    this._calendar.activeDate = mode === 'year' ?
        this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1) :
        this._dateAdapter.addCalendarYears(this._calendar.activeDate, yearsPerPage + 1);
  }
}
