"use strict";(self.webpackChunkocl_bb_library=self.webpackChunkocl_bb_library||[]).push([[2408,7644],{87644:(e,r,n)=>{n.d(r,{L6:()=>s,pl:()=>f,pu:()=>m,zH:()=>u});var t=n(67294);function o(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var t,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(t=n.next()).done)&&(a.push(t.value),!r||a.length!==r);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(e,r)||function(e,r){if(e){if("string"==typeof e)return a(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}var c=(0,t.createContext)(null),i=(0,t.createContext)(null),l=(0,t.createContext)(null),u=function(){return(0,t.useContext)(c)},s=function(){return(0,t.useContext)(i)},m=function(){return(0,t.useContext)(l)},f=function(e){var r=e.children,n=o((0,t.useState)(!1),2),a=n[0],u=n[1],s=o((0,t.useState)([{errorThrown:!1},{errorThrown:!1},{errorThrown:!1},{errorThrown:!1},{errorThrown:!1},{errorThrown:!1}]),2),m=s[0],f=s[1];return t.createElement(c.Provider,{value:{selectOpen:a,setSelect:u}},t.createElement(i.Provider,{value:function(){a&&u(!1)}},t.createElement(l.Provider,{value:{error:m,setError:f}},r)))}},32408:(e,r,n)=>{n.r(r),n.d(r,{default:()=>u});var t=n(67294),o=n(26623),a=n(87644),c=(0,t.lazy)((function(){return Promise.all([n.e(6103),n.e(6436),n.e(4909),n.e(6239)]).then(n.bind(n,95671))})),i=(0,t.lazy)((function(){return n.e(8637).then(n.bind(n,98292))})),l=(0,t.lazy)((function(){return Promise.all([n.e(6103),n.e(1762),n.e(8615),n.e(1609),n.e(6436),n.e(6651),n.e(9596),n.e(5539),n.e(2111)]).then(n.bind(n,84045))}));const u=function(){var e={dropdownMenu:[{name:"Service Delivery",href:"socr#/service_delivery",active:!1},{name:"Citizen Engagement",href:"socr#/citizen_engagement",active:!1},{name:"Municipal Human Resources",href:"socr#/human_resources",active:!1},{name:"People and Households",href:"socr#/people_household",active:!1},{name:"Employment",href:"socr#/employment",active:!1},{name:"Dwellings",href:"socr#/dwellings",active:!1},{name:"Household Income",href:"socr#/household_income",active:!1},{name:"Food Security, Literacy and Inequality",href:"socr#/food_security",active:!0},{name:"Life Expectancy and Health",href:"socr#/life_expectancy",active:!1},{name:"Education",href:"socr#/education",active:!1},{name:"Sustainability",href:"socr#/sustainability",active:!1},{name:"ICT Infrastructure",href:"socr#/infrastructure",active:!1},{name:"Transport Mode",href:"socr#/transport_mode",active:!1},{name:"Public Transport Spend",href:"socr#/public_transport_spend",active:!1},{name:"Travel Time",href:"socr#/travel_time",active:!1}]};return t.createElement(a.pl,null,t.createElement("div",{className:"socr--home",style:{backgroundColor:"white",overflowX:"hidden"}},t.createElement(i,{logoHide:!1,box_shadow:!0}),t.createElement(l,{indicator_ids:[1069,1072,1075,"n2","n3",959],minYear:2015,maxYear:2018,subNavContent:e,gridItems:6,dropdownName:e.dropdownMenu[7].name,colors:o.Rv}),t.createElement(c,null)))}}}]);