import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent implements OnInit {

  /**
   * Number to show in the ball.
    */
  @Input() number: number | undefined;

  /**
   * Radius of the ball in pixels.
   * @default 30
   */
  @Input() radius = 30;

  /**
   * Font Weight.
   * @default 'normal'
   */
  @Input() fontWeight = 'normal';

  /**
   * Font size in pixels.
   * @default 20
   */
  @Input() fontSize = 20;

  /**
   * Font family, separated by coma if multiple.
   * @default 'verdana, Times new roman'
   */
  @Input() fontFamily = 'verdana, Times new roman';

  /**
   * Emits the selected ball number.
   */
  @Output() ballSelected = new EventEmitter<Number>();
  
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;

  private ctx: CanvasRenderingContext2D | undefined;
  private color = '#E3E3ED' ;
  private bgColor = '#E3E3ED' ;

  private canvasWidth = 160;
  private canvasHeight = 160;

  constructor() { }

  ngOnInit(): void {
    if(this.canvas) {
      const element = this.canvas.nativeElement.getContext('2d');
      if(element !== null) {
        this.ctx = element;
        this.resizeCanvas();
        this.setColor();
        this.drawCircle();
        this.drawNumber();
      }
    }
  }

  /**
   * Generate and set the size of the canvas.
   */
  private resizeCanvas() {
    if (this.ctx) {
      this.canvasWidth = this.radius * 2;
      this.canvasHeight = this.radius * 2;
      this.ctx.canvas.width = this.canvasWidth;
      this.ctx.canvas.height = this.canvasHeight;
    }
  }

  /**
   * Detect the number setted in the ball and preset the color line and background color.
   */
  private setColor() {
    if (this.number) {
      switch(this.number%6) {
        case 1: {
          this.color = '#D55353';
          this.bgColor = '#B1605D';
          break;
        }
        case 2: {
          this.color = '#FEF9E3';
          this.bgColor = '#FBF0EC';
          break;
        }
        case 3: {
          this.color = '#49A866';
          this.bgColor = '#4E9664';
          break;
        }
        case 4: {
          this.color = '#F8EDEF';
          this.bgColor = '#EADFDE';
          break;
        }
        case 5: {
          this.color = '#FFC935';
          this.bgColor = '#FDCF63';
          break;
        }
        case 0: {
          this.color = '#ECF6EE';
          this.bgColor = '#DDE7DF';
  
        }
      }
    }
  }

  /**
   * Draw the circle.
   */
  private drawCircle() {
    if (this.ctx) {
      this.ctx.strokeStyle = this.color;
      this.ctx.fillStyle = this.bgColor;
      this.ctx.beginPath();
      this.ctx.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI);
      this.ctx.fill(); 
    }
  }

  /**
   * Draw the number.
   */
  private drawNumber() {
    if (this.ctx && this.number) {
      this.ctx.fillStyle = 'black';
      this.ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle'; 
	    this.ctx.fillText(`${this.number}`, this.radius, this.radius);
    }
  }

  /**
   * Emits the selected ball number by the user.
   */
  emitSelection() {
    if (this.number !== undefined) {
      this.ballSelected.emit(this.number);
    }
  }

}
