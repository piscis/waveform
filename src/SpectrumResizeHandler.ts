/// <reference path="../typings/tsd.d.ts" />

class SpectrumResizeHandler {

    private isSubscribed:Boolean = false

    public constructor(private renderer:THREE.Renderer, private camera:THREE.PerspectiveCamera) {}

    private onResize():void {

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    private start():void {

        if(this.isSubscribed) {
            window.addEventListener('resize',this.onResize,false);
            this.isSubscribed=true;
        }
    }

    private stop():void {

        window.removeEventListener('resize',this.onResize,false);
        this.isSubscribed = false;
    }

    public init():Object {

        this.start();

        return {
            stop: ()=>{
                this.stop()
            }
        }
    }
}

export default SpectrumResizeHandler;