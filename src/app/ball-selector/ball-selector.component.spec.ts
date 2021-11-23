import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DebugElement, Injector } from '@angular/core';
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
    const algo = fixture.debugElement.queryAll(By.css('app-ball'));
    expect(fixture.debugElement.queryAll(By.css('app-ball')).length).toBe(10);
  })

  it('should have registered 3 balls after selection', () => {
    component.selection(1);
    component.selection(2);
    component.selection(3);
    expect(component.ballsSelected.length).toBe(3);
  })

  it('should reset selection if clicked "Clear selection"', () => {
    component.selection(1);
    component.selection(2);
    component.selection(3);
    expect(component.ballsSelected.length).toBe(3);
    compiled.querySelector('#clear-div p').dispatchEvent(new Event('click'));
    expect(component.ballsSelected.length).toBe(0);
  })

  it('should show winner ball, text and money won',() => {
    component.winnerBall = 5;
    component.ballResult = true;
    fixture.detectChanges();
    expect(compiled.querySelector('#winner-ball')).toBeDefined();

    expect(compiled.querySelector('#text-won').textContent).toContain('BallSelector.Won');
    translate.setTranslation('en', { 'BallSelector.Won': 'YOU WON' });
    translate.use('en');
    fixture.detectChanges();
    expect(compiled.querySelector('#text-won').textContent).toContain('YOU WON');

    component.moneyWon = 300;
    fixture.detectChanges();
    expect(compiled.querySelector('#text-won').textContent).toContain('300');
  })

  it('should show loose ball and text',() => {
    component.winnerBall = 5;
    component.ballResult = false;
    fixture.detectChanges();
    expect(compiled.querySelector('#winner-ball')).toBeDefined();

    expect(compiled.querySelector('#text-loose').textContent).toContain('BallSelector.Loose');
    translate.setTranslation('en', { 'BallSelector.Loose': 'YOU LOOSE' });
    translate.use('en');
    fixture.detectChanges();
    expect(compiled.querySelector('#text-loose').textContent).toContain('YOU LOOSE');
  })


});
