
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent {
removeWhite(arg0: any) {
throw new Error('Method not implemented.');
}


  title = 'angular-editor-fabric-js';

  @ViewChild('htmlCanvas') htmlCanvas!: ElementRef;

  public canvas!: fabric.Canvas;
  public url: any="";
  constructor() { }

  ngAfterViewInit(): void {

    // setup front side canvas
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      isDrawingMode: false,
      height: 500,
      width: 300,
      
    });
  }
  addImageOnCanvas() {
   // console.log("this.url",this.url);
   if (this.url) {
      fabric.Image.fromURL(this.url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornerSize: 10,
          hasRotatingPoint: true
        });
        image.scaleToWidth(200);
        image.scaleToHeight(200);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.url = readerEvent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  rasterize() {
    const image = new Image();
    image.src = this.canvas.toDataURL({format: 'png'});
    const w = window.open('');
    w!.document.write(image.outerHTML);
    this.downLoadImage();
  }
  downLoadImage(){
    const c = this.canvas.toDataURL({format: 'png'});
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = c;
    downloadLink.target = '_self';
    downloadLink.download = Date.now()+'.png';
    downloadLink.click();   
  }
  extend(obj, id) {
    obj.toObject = ((toObject) => {
      return function() {
        return fabric.util.object.extend(toObject.call(this), {
          id
        });
      };
    })(obj.toObject);
  }
  selectItemAfterAdded(obj) {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }
  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }


  

}
