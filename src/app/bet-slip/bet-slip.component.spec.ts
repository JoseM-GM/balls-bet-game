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
    fixture.detectChanges();
    injector = getTestBed();
    translate = injector.get(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist button "Ok"', () => {
    translate.use('en');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#button-ok').textContent).toContain('Ok');
  })

  it('should exist button "Place bet"', () => {
    translate.use('en');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#button-place-bet').textContent).toContain('Place');
  })

  it('should exist "total" text', () => {
    translate.use('en');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#bet-total').textContent).toContain('Total');
  })

  it('should paint 8 balls', () => {
    const ballComponentCount = fixture.debugElement.queryAll(By.css('app-ball'));
    expect(ballComponentCount.length).toBe(8);
  })

});
