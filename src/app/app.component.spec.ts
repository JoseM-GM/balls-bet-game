import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { httpTranslateLoader } from './app.module';
import { BallSelectorComponent } from './ball-selector/ball-selector.component';
import { BallComponent } from './ball/ball.component';
import { BetSlipComponent } from './bet-slip/bet-slip.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
      declarations: [
        AppComponent, BallSelectorComponent, BetSlipComponent, BallComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have set default language`, () => {
    expect(component.translate.getDefaultLang()).toEqual(environment.defaultLanguage);
  });

  it('should exist app-ball-selector', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-ball-selector').textContent).toBeDefined()
  });

  it('should exist app-bet-slip', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-bet-slip').textContent).toBeDefined()
  });
});
