/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react';
import SpectrumRenderer from './SpectrumRenderer';

var indexHTML = require("copy!./index.html");

declare var mountNode: any;

interface DemoProps extends React.Props<any> {
    name : string;
}

class WaveformWidget extends React.Component<DemoProps, any> {

    private spectrum:SpectrumRenderer = null;

    public displayName:string = 'WaveformWidget';
    private foo:number;

    constructor(props : DemoProps) {
        super(props);
        this.foo = 44;
    }

    componentDidMount(){
        var dNode:any = React.findDOMNode();
        this.spectrum = new SpectrumRenderer(dNode,true);
    }

    componentWillUnmount(){
        //this.spectrum.unmount();
    }

    render() {
        return <div>Hello world! {this.props.name} </div>;
    }

}

export default WaveformWidget;