import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { httpTranslateLoader } from '../app.module';
import { BallComponent } from '../ball/ball.component';

import { BetSlipComponent } from './bet-slip.component';

describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;
  let translate: TranslateService;
  let injector:  Injector;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [ BetSlipComponent, BallComponent,  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    translate = injector.get(TranslateService);
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist button "Ok"', () => {
    expect(compiled.querySelector('#button-ok').textContent.trim()).toEqual('BetSlip.Ok');
    translate.setTranslation('en', { 'BetSlip.Ok': 'Ok' });
    translate.use('en');
    fixture.detectChanges();
    expect(compiled.querySelector('#button-ok').textContent.trim()).toEqual('Ok');
  })

  it('should exist button "Place bet"', () => {
    expect(compiled.querySelector('#button-place-bet').textContent.trim()).toEqual('BetSlip.PlaceBet');
    translate.setTranslation('en', { 'BetSlip.PlaceBet': 'Place bet' });
    translate.use('en');
    fixture.detectChanges();
    expect(compiled.querySelector('#button-place-bet').textContent.trim()).toEqual('Place bet');
  })

  it('should exist "total" text', () => {
    expect(compiled.querySelector('#bet-total').textContent).toContain('BetSlip.Total');
    translate.setTranslation('en', { 'BetSlip.Total': 'Total' });
    translate.use('en');
    fixture.detectChanges();
    expect(compiled.querySelector('#bet-total').textContent).toContain('Total');
  })

  it('should paint 8 balls', () => {
    const ballComponentCount = fixture.debugElement.queryAll(By.css('app-ball'));
    expect(ballComponentCount.length).toBe(8);
  })

  it('should paint quantity bet correctly', () => {
    component.communicatorService.announceRefreshList([5, 8, 10]);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('#bet-wrapper span')).nativeElement;
    expect(input.innerHTML).toBe('3x');
   })

  it('should paint total bet correctly after click "Ok" button', () => {
    component.communicatorService.announceRefreshList([5, 8, 10]);
    const input: HTMLInputElement = fixture.debugElement.query(By.css('#bet-wrapper input')).nativeElement;
    input.value = '100';
    compiled.querySelector('#button-ok').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(compiled.querySelector('#bet-total').textContent).toContain('15');
  })

  it('should warn if no ball selected and click "Ok"', () => {
    compiled.querySelector('#button-ok').dispatchEvent(new Event('click'));
    expect(component.showWarningSelectBalls).toBe(true);
  })

  it('should warn bet value if it\'s below of "5"', () => {
    component.communicatorService.announceRefreshList([5, 8, 10]);
    component.formulary.get('betQuantity')?.setValue('2');
    compiled.querySelector('#button-ok').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.showWarningMinBet).toBe(true);
  })

  it('should warn if bet not applied', () => {
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(component.showWarningPlaceBet).toBe(true);
  })

});
