import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { httpTranslateLoader } from '../app.module';
import { BallComponent } from '../ball/ball.component';

import { BallSelectorComponent } from './ball-selector.component';

describe('BallSelectorComponent', () => {
  let component: BallSelectorComponent;
  let fixture: ComponentFixture<BallSelectorComponent>;
  let translate: TranslateService;
  let injector:  Injector;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [ BallSelectorComponent, BallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallSelectorComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    translate = injector.get(TranslateService);
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist text "Numbers"', () => {
    expect(compiled.querySelector('.header').textContent.trim()).toEqual('BallSelector.Numbers');
    translate.setTranslation('en', { 'BallSelector.Numbers': 'Numbers' });
    translate.use('en');
    fixture.detectChanges();
    expect(compiled.querySelector('.header').textContent.trim()).toEqual('Numbers');
  })

  it('should exist text "Clear selection"', () => {
    expect(compiled.querySelector('#clear-div').textContent.trim()).toEqual('BallSelector.ClearSelection');
    translate.setTranslation('en', { 'BallSelector.ClearSelection': 'Clear selection' });
    translate.use('en');
    fixture.detectChanges();
    expect(compiled.querySelector('#clear-div').textContent.trim()).toEqual('Clear selection');
  })

  it('should exist 10 balls', () => {
    translate.use('en');
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('app-ball')).length).toBe(10);
  })

});
