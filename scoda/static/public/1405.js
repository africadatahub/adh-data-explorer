"use strict";(self.webpackChunkocl_bb_library=self.webpackChunkocl_bb_library||[]).push([[1405],{21405:(e,t,n)=>{n.r(t),n.d(t,{default:()=>k});var o=n(67294),r=n(5026),a=n(17757),i=n.n(a),c=n(6214),l=n(9820),s=n(19720),u=n(62979),f=n(47701);function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function m(e,t){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},m(e,t)}function b(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&m(e,t)}(h,e);var t,n,r,a,d=(r=h,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=y(r);if(a){var n=y(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function h(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,h),d.call(this,e)}return t=h,(n=[{key:"componentDidMount",value:function(){i().platform.disableCSSInjection=!0,this.renderCapitalGrants()}},{key:"renderCapitalGrants",value:function(){var e=document.getElementById("mainChart").getContext("2d");new(i())(e,{type:"bar",data:{labels:["JHB","CPT","ETH","TSH","EKU","NMB","MAN","BCM"],datasets:[{label:"Capital Grants",backgroundColor:"rgb(255,201,105)",stack:"Stack 0",data:[40,32.8,40,40.3,41.4,14.3,15.7,15]},{label:"Existing Development Charges",backgroundColor:"rgb(113,199,120)",stack:"Stack 0",data:[5.9,1.4,0,1.9,0,1.8,2.5,0]},{label:"Internal Funds",backgroundColor:"rgb(140,171,228)",stack:"Stack 0",data:[7.3,0,0,0,0,0,0,0]},{label:"New Loans",backgroundColor:"rgb(245,149,0)",stack:"Stack 0",data:[8.4,11.7,30.7,47.6,7.1,3.1,4.8,10.1]},{label:"Funding Gap",backgroundColor:"rgb(220,123,135)",stack:"Stack 0",data:[170.5,107.9,71.3,72.5,117.3,16.2,9.7,3.6]}]},options:{title:{display:!1,text:"Title"},tooltips:{mode:"index",intercept:!1,callbacks:{label:function(e,t){var n=t.datasets[e.datasetIndex].label||"";return n&&(n+=": "),n+=Math.round(100*e.yLabel)/100}}},responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{stacked:!0,ticks:{fontStyle:"bold"},gridLines:{borderDash:[2],lineWidth:2,color:[0,0,0],drawTicks:!0}}],yAxes:[{stacked:!0,ticks:{callback:function(e,t,n){return Math.round(100*e)/100+"  "}},gridLines:{drawTicks:!1},scaleLabel:{display:!0,labelString:"Nominal Rands, Nearest R billion",fontStyle:"bold"},borderSkipped:"bottom"}]}}})}},{key:"downloadChart",value:function(){var e=document.getElementById("mainChart").toDataURL("image/jpg");document.getElementById("download").href=e}},{key:"render",value:function(){return o.createElement("div",{className:"mt-4 ml-2 pr-2"},o.createElement("div",{className:"row"},o.createElement("div",{className:"col-12"},o.createElement("div",{className:"ds-content-card"},o.createElement("div",{className:"ds-content-card-header"},o.createElement(l.Z,{storyTitle:this.props.storyTitle,storySubtitle:this.props.storySubtitle,filter:this.props.filter,filterColor:this.props.filterColor,author:this.props.author,publishedDate:this.props.publishedDate})),o.createElement("div",{className:"card-body pt-4 pb-5 mt-5"},o.createElement("div",{className:"row"},o.createElement(s.Z,{infoBlockText:this.props.infoBlockText})),o.createElement("div",{className:"row"},o.createElement("div",{className:"col p-3"})),o.createElement("div",{className:"row"},o.createElement(c.Z,{alt:"finance2018",imgSrc:"/static/dist/img/scoda/datastories/ds-finance2018.svg"})),o.createElement("div",{className:"row"},o.createElement("div",{className:"col p-3"})),o.createElement("div",{className:"row"},o.createElement(u.Z,{content:"While revenues are sufficient to cover operating expenditures in the metros, they do not generate enough internal finance to fully fund capital expenditure. \n        <br/><br/>\n        The funding gap is the difference between the metros’ available revenue and capital finance, and the operating and capital expenditure required to adequately deliver on their mandates, and poses a risk to the ability of metros to provide and maintain adequate infrastructure in the medium to long term. The sources of capital finance and the funding gap for the metros is shown in figure 1.\n        <br/><br/>\n        The funding gap is shown in purple while the percentages on top of the bars indicate the funding gap as a percentage of capital expenditure in each city. It ranges from 12% in Buffalo City to 73% in Johannesburg."})),o.createElement("div",{className:"row"},o.createElement(f.Z,{dataHeading:"Figure 1",dataDescription:"Availability of capital finance and resulting funding gap"})),o.createElement("div",{className:"row mt-3"}),o.createElement("div",{className:"row mt-3"},o.createElement("div",{className:"col-10"}),o.createElement("div",{className:"col-0 float-right ds-download-button",onClick:this.downloadChart},o.createElement("a",{id:"download",download:"chart.jpg",style:{color:"#fff",textDecoration:"none"}},"Download")),o.createElement("br",null),o.createElement("br",null),o.createElement("canvas",{id:"mainChart",className:"w-100"})),o.createElement("div",{className:"row"},o.createElement(f.Z,{dataHeading:"Source",dataDescription:"State of City Finances Chapter 4, p. 91"})),o.createElement("div",{className:"row mt-3"},o.createElement(u.Z,{contentHeading:"Resolution to the Problem",content:"Cities can and should take steps to close the gap but need policy support at national level to develop and implement alternative revenue models."})),o.createElement("div",{className:"row mt-3"},o.createElement(u.Z,{contentHeading:"Resources",content:"<o onClick=\"javascript:window.open('https://www.sacities.net/municipal-finance/','_new');\">Read</o> more SACN publications and research on municipal finance matters on the SACN website\n        <o onClick=\"javascript:window.open('https://www.sacities.net/state-of-cities-reporting','_new')\">Engage</o> with SACN’s State of Cities Reporting for broader cities development context since 2004 Explore municipal finance’s interactively on National Treasury’s <o onClick=\"javascript:window.open('https://municipalmoney.gov.za/','_new')\">Municipal Money</o> Datatool\n        Explore the <o onClick=\"javascript:window.open('https://ckan.scoda.co.za/dataset/city-revenue-performance','_new')\">full collection of State of Cities Finances 2018 datasets</o> on SCODA’s data portal\n        <br/><br/>\n        If you have any queries and further comment on this datastory, please email <o onClick=\"javascript:window.location='mailto:danga@sacities.net'\">Danga Mughogho</o> at SACN."})))))))}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),h}(o.Component);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function w(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function g(e,t){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},g(e,t)}function E(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function C(e){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},C(e)}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(l,e);var t,n,a,i,c=(a=l,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=C(a);if(i){var n=C(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function l(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),c.call(this,e)}return t=l,(n=[{key:"render",value:function(){return o.createElement("div",{className:"container px-3 data-story-page"},o.createElement("div",{className:"row"},o.createElement("div",{className:"col w-50 d-flex justify-content-center"},o.createElement(r.Z,null))),o.createElement("div",{className:"row"},o.createElement("div",{className:"col"},o.createElement(h,{storyTitle:"State of Cities Finance 2018",storySubtitle:"Financing Infrastructure",filter:"Sustainable Cities",filterColor:"#31C198",author:"The South African Cities Network",publishedDate:"31 January 2020",infoBlockText:"Cities are facing systemic problems that affect two urban policy goals: spatial transformation and building infrastructure"}))),o.createElement("div",{className:"row p-5"}))}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),l}(o.Component)}}]);