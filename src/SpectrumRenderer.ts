/// <reference path="../typings/tsd.d.ts" />
import SpectrumResizeHandler from './SpectrumResizeHandler'

class SpectrumRenderer {

    private scene:THREE.Scene;
    private camera:THREE.PerspectiveCamera;
    private renderer:THREE.Renderer;
    private line:THREE.Line;

    private geometry:THREE.Geometry;
    private material:THREE.Material;
    private mesh:THREE.Mesh;
    private data:Array<number> = [];
    private resizeHandler:SpectrumResizeHandler;

    public constructor(private domElm:HTMLElement, private isResizeable:boolean = true) {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 1000;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        domElm.appendChild(this.renderer.domElement);

        if(this.isResizeable){
            this.resizeHandler = new SpectrumResizeHandler(this.renderer,this.camera);
        }
    }

    public onUpdate(data:Array<number>):void {
        this.data = data;
    }

    public animate():void {
        requestAnimationFrame(this.animate);
        this.redraw()
    }

    public redraw():void {

        this.clearLine(this.line);
        this.line = this.createLine();
        this.addLine(this.line);

        this.renderer.render(this.scene, this.camera);
    }

    public unmount():boolean {
        return true;
    }

    private clearLine(line:THREE.Line):void {
        this.scene.remove(line);
        this.line=null;
    }

    private createLine():THREE.Line {

        var material = new THREE.LineBasicMaterial({
            color: 0x1fdf1f,
            linewidth: 2
        });

        var geometry = new THREE.Geometry();

        var Ypoints = this.data;
        var xPoint = -2048;

        for(var i=0;i<Ypoints.length;i++) {
            geometry.vertices.push( new THREE.Vector3( xPoint, Ypoints[i], 0 ) );
            xPoint = xPoint + 4;
        }

        return new THREE.Line(geometry, material);
    }

    private addLine(line:THREE.Line):void {
        this.scene.add(line);
    }
}

export default SpectrumRenderer;