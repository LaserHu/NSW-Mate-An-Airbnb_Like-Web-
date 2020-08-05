import React, { Component } from 'react'
import './style.css'

class PropertyImages extends Component {
    render() {
        return (
            <div className="Property-Images-Box">
                <div style={{width: '50%'}}>
                    <img src={this.props.mainImage}
                         className="Property-Image" alt="img"/>
                </div>
                <div style={{width: '25%'}}>
                    <div style={{width: '100%', height: '100%'}}>
                        <div style={{height: '50%', overflow: 'hidden'}}>
                            <img src={this.props.viceImage1}
                                 className="Property-Image" alt="img"/>
                        </div>
                        <div style={{height: '50%', overflow: 'hidden'}}>
                            <img src={this.props.viceImage2}
                                 className="Property-Image" alt="img"/>
                        </div>
                    </div>
                </div>
                <div style={{width: '25%'}}>
                    <div style={{width: '100%', height: '100%'}}>
                        <div style={{height: '50%', overflow: 'hidden'}}>
                            <img src={this.props.viceImage3}
                                 className="Property-Image" alt="img"/>
                        </div>
                        <div style={{height: '50%', overflow: 'hidden'}}>
                            <img src={this.props.viceImage4}
                                 className="Property-Image" alt="img"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyImages