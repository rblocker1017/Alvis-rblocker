import React, {Component} from 'react';
import { Chart } from "react-google-charts";

// Define width and height of the of the webapp canvas
const WIDTH = 1370;
const HEIGHT = 450;

class CPUSchedulingDisplay extends Component{
    render(){
        return(
            this.props.displayBoolean ?
                <div style={{height: "450px", width: "500px"}}>
                    <Chart
                        width={'90%'}
                        height={'400px'}
                        chartType="Gantt"
                        loader={<div>Loading Chart</div>}
                        data={this.props.data}
                        options={{
                            height: 400,
                            gantt: {
                                trackHeight: 30,
                                criticalPathEnabled: false,
                                defaultStartDate: new Date(0, 0, 0, 0, 0, 0),
                                animation:
                                {
                                    startup: true,
                                    easing: 'linear',
                                    duration: 1500,
                                },
                                enableInteractivity: false,
                            },
                        }}
                        chartEvents={[
                            {
                                eventName: 'animationfinish',
                                callback: () => {
                                    console.log('Animation Finished')
                                },
                            },
                        ]}

                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
                : <div  style={{height: "450px", width: "500px"}}/>
        );
    }
}

export default CPUSchedulingDisplay;