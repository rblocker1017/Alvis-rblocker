import React, {Component} from 'react';
import DiskGraph from './DiskGraph';

class DiskSchedulingDisplay extends Component {
    render(){
        return(
            <div style={{height: "450px", width: "1370px"}}>
                <DiskGraph data={this.props.data} size={this.props.diskSize} > </DiskGraph>
            </div>
        );
    }
}

export default DiskSchedulingDisplay;