import React, { Component } from 'react';

import Image from './Image';
import DataStoriesInfoBanner from './DataStories.InfoBanner';


export default class ContentSectionTop extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let sectionImage = `/static/dist/img/scoda/datastories/${this.props.img}`;
        let filterTag = {
            boxSizing: 'border-box',
            height: '34px',
            width: '34px',
            border: '2px solid #FFFFFF',
            backgroundColor: this.props.filterColor,
            color: '#FFFFFF',
            fontFamily: 'Montserrat',
            fontSize: '16px',
            letterSpacing: '0',
            lineHeight: '29px',
            textAlign: 'center',
            borderRadius:'50px',
            position:'relative',
            top:'45px',
            left:'10px',
            paddingTop:'2px',
            paddingRight:"1px"
        };

        return (
            <div>
                <a href={this.props.href_} className="card-trigger"></a>
               <div className="row m-0">
                   <div className="col-0 ds-content-top-image">
                       <div style={filterTag}>{this.props.imageTag}</div>
                       <Image alt='sectionImage' imgSrc={sectionImage} />
                   </div>
                </div>
                <div className="row m-0">
                   <div className="col-0 pl-3">
                       <div className="row m-0">
                           <div className="col-0 ds-content-title"><br/>{this.props.title}</div>
                       </div>
                       <div className="ds-right-content-hspacer"></div>
                       <div className="row m-0">
                           <div className="col-0 ds-content-subtitle">{this.props.subtitle}</div>
                       </div>
                       <div className="ds-right-content-hspacer"></div>
                       <div className="row m-0">
                            <div className="col-0 ds-top-content">{this.props.content}</div>
                       </div>
                       <div className="ds-right-content-hspacer"></div>
                       {/*<div className="row">
                            <div className="col-4">
                                <DataStoriesInfoBanner 
                                  title="South African Cities Network"
                                  subtitle="July 2018"
                                  minutes="8"
                                />
                            </div>
                        </div>*/}
                   </div>
               </div>
            </div>
        )
    }
}