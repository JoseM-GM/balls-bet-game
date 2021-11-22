import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange, SimpleChanges } from '@angular/core';

import { BallComponent } from './ball.component';

describe('BallComponent', () => {
  let component: BallComponent;
  let fixture: ComponentFixture<BallComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create canvas', () => {
    expect(compiled.querySelector('canvas').textContent).toBeDefined();
  });

  it('should have twice width and height if default radius is 30', () => {
    expect(component.canvasWidth).toEqual(60);
    expect(component.canvasHeight).toEqual(60);
  })

  it('should have twice width and height if specified radius is 60', () => {
    component.radius = 60;
    component.ngOnInit();
    expect(component.canvasWidth).toEqual(120);
    expect(component.canvasHeight).toEqual(120);
  })

  it('should emit 1 on click ball 1', () => {
    spyOn(component.ballSelected, 'emit');
    component.number = 1;
    compiled.querySelector('canvas').dispatchEvent(new Event('click'));
    expect(component.ballSelected.emit).toHaveBeenCalledWith(1);
  });

  it('should redraw if number changed', () => {
    spyOn(component, 'redraw');
    component.ngOnChanges({ number : new SimpleChange(1, 2, false)});
    fixture.detectChanges();
    expect(component.redraw).toHaveBeenCalled();
  });

  it('should have ball 1 border color #D55353 and background color #D45352', () => {
    component.number = 1;
    component.setColor();
    expect(component.color).toEqual('#D55353');
    expect(component.bgColor).toEqual('#D45352');
  });

  it('should have ball 2 border color #FEF9E3 and background color #FBF0EC', () => {
    component.number = 2;
    component.setColor();
    expect(component.color).toEqual('#FEF9E3');
    expect(component.bgColor).toEqual('#FBF0EC');
  });

  it('should have ball 3 border color #49A866 and background color #4E9664', () => {
    component.number = 3;
    component.setColor();
    expect(component.color).toEqual('#49A866');
    expect(component.bgColor).toEqual('#4E9664');
  });

  it('should have ball 4 border color #F8EDEF and background color #EADFDE', () => {
    component.number = 4;
    component.setColor();
    expect(component.color).toEqual('#F8EDEF');
    expect(component.bgColor).toEqual('#EADFDE');
  });

  it('should have ball 5 border color #FFC935 and background color #FDCF63', () => {
    component.number = 5;
    component.setColor();
    expect(component.color).toEqual('#FFC935');
    expect(component.bgColor).toEqual('#FDCF63');
  });

  it('should have ball 6 border color #ECF6EE and background color #DDE7DF', () => {
    component.number = 6;
    component.setColor();
    expect(component.color).toEqual('#ECF6EE');
    expect(component.bgColor).toEqual('#DDE7DF');
  });

  it('should have ball 7 border color #D55353 and background color #D45352', () => {
    component.number = 7;
    component.setColor();
    expect(component.color).toEqual('#D55353');
    expect(component.bgColor).toEqual('#D45352');
  });

  it('should have ball 8 border color #FEF9E3 and background color #FBF0EC', () => {
    component.number = 8;
    component.setColor();
    expect(component.color).toEqual('#FEF9E3');
    expect(component.bgColor).toEqual('#FBF0EC');
  });

  it('should have ball 9 border color #49A866 and background color #4E9664', () => {
    component.number = 9;
    component.setColor();
    expect(component.color).toEqual('#49A866');
    expect(component.bgColor).toEqual('#4E9664');
  });

  it('should have ball 10 border color #F8EDEF and background color #EADFDE', () => {
    component.number = 10;
    component.setColor();
    expect(component.color).toEqual('#F8EDEF');
    expect(component.bgColor).toEqual('#EADFDE');
  });
});
