"use strict";(self.webpackChunkocl_bb_library=self.webpackChunkocl_bb_library||[]).push([[1946],{51946:(e,t,a)=>{a.r(t),a.d(t,{default:()=>R});var r=a(67294),n=a(9669),l=a.n(n),o=(a(13174),a(92202)),c=a(17730),s=a(60622);function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var r,n,l=[],o=!0,c=!1;try{for(a=a.call(e);!(o=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);o=!0);}catch(e){c=!0,n=e}finally{try{o||null==a.return||a.return()}finally{if(c)throw n}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?d(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}const m=function(e){var t=e.last_municipal_posts,a=e.last_total_posts,n=e.last_senior_management_posts,l=i((0,r.useState)("Buffalo City"),2),o=l[0],d=l[1],m=i((0,r.useState)(),2),u=m[0],p=m[1],f=i((0,r.useState)(),2),h=f[0],b=f[1],v=i((0,r.useState)(),2),E=v[0],g=v[1],y=i((0,r.useState)(s.Z[0]),2),k=y[0],_=(y[1],i((0,r.useState)(),2)),N=_[0],S=_[1],w=i((0,r.useState)(),2),C=w[0],x=w[1],O=i((0,r.useState)(),2),M=O[0],G=O[1],A=function(e){return e&&0===Object.keys(e).length&&Object.getPrototypeOf(e)===Object.prototype};return(0,r.useEffect)((function(){if(!A(a)){p(a[0][2]);for(var e=0,t=0;t<a.length;t++)e+=a[t][2];S((e/a.length).toFixed(0))}}),[a]),(0,r.useEffect)((function(){if(!A(t)){b(t[0][2]);for(var e=0,a=0;a<t.length;a++)e+=t[a][2];x((e/t.length).toFixed(0))}}),[t]),(0,r.useEffect)((function(){if(!A(n)){g(n[0][2]);for(var e=0,t=0;t<n.length;t++)e+=n[t][2];G((e/n.length).toFixed(0))}}),[n]),r.createElement("div",{className:"stat_display_panel"},r.createElement("div",{className:"row stat_display_panel--numbers w-100"},r.createElement("div",{className:"col-md-6 first_panel"},r.createElement("div",{className:"stat_display_panel--averages"},r.createElement("p",{className:"catagory-name "},"Averages ",A(t)?"":t[0][1],"  ",r.createElement("span",null,"(Municipal Posts and Vacancies)"))),r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-4 p-0"},r.createElement("h1",null,N||""),r.createElement("p",null," Total Municipal",r.createElement("br",null),"Posts")),r.createElement("div",{className:"col-md-4 p-0"},r.createElement("h1",null,C||""),r.createElement("p",null,"Municipal Management",r.createElement("br",null),"Vacancies")),r.createElement("div",{className:"col-md-4 p-0"},r.createElement("h1",null,M||""),r.createElement("p",null,"Senior Management",r.createElement("br",null),"Vacancies")))),r.createElement("div",{className:"col-md-6"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-8"}," ",r.createElement("p",{className:"catagory-name catagory-name--focusName"}," ",A(t)?"Municipality Focus : ":"Municipality Focus "+t[0][1]+":"," ",o)),r.createElement("div",{className:"col-md-3 select-container"},r.createElement(c.Z,{value:o,placeholder:"Select a City",id:k.places.id,multiple:k.places.multiple,data:k.places.data,name:"gender",onChange:function(e){d(e.target.value),console.log("selected city :",e.target.value),"Buffalo City"===e.target.value&&(p(a[0][2]),b(t[0][2]),g(n[0][2])),"City of Cape Town"===e.target.value&&(p(a[1][2]),b(t[1][2]),g(n[1][2])),"City of Joburg"===e.target.value&&(p(a[2][2]),b(t[2][2]),g(n[2][2])),"Ekurhuleni"===e.target.value&&(p(a[3][2]),b(t[3][2]),g(n[3][2])),"eThekwini"===e.target.value&&(p(a[8][2]),b(t[8][2]),g(n[8][2])),"Mangaung"===e.target.value&&(p(a[4][2]),b(t[4][2]),g(n[4][2])),"Nelson Mandela Bay"===e.target.value&&(p(a[6][2]),b(t[6][2]),g(n[6][2])),"Tshwane"===e.target.value&&(p(a[7][2]),b(t[7][2]),g(n[7][2])),"Msunduzi"===e.target.value&&(p(a[5][2]),b(t[5][2]),g(n[5][2]))}}))),r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-4"},r.createElement("h1",{className:"none"},u||0),r.createElement("p",null,"Total Municipal",r.createElement("br",null),"Posts")),r.createElement("div",{className:"col-md-4"},r.createElement("h1",{className:"none"},h||0),r.createElement("p",null,"Municipal Management",r.createElement("br",null),"Vacancies")),r.createElement("div",{className:"col-md-4"},r.createElement("h1",{className:"none"},E||0),r.createElement("p",null,"Senior Management",r.createElement("br",null),"Vacancies"))))))};var u=a(9713),p=a(11741),f=a(85677),h=a(10684),b=a(36955),v=(a(46799),a(32985)),E=a(96486),g=a.n(E),y=a(83722),k=a(19755),_=a.n(k);const N=function(){var e,t=_()("table.scroll"),a=t.find("tbody tr:first").children();return _()(window).resize((function(){e=a.map((function(){return _()(this).width()})).get(),t.find("thead tr").children().each((function(t,a){_()(a).width(e[t])}))})).resize(),r.createElement("div",{className:"post_breakdown-container"},r.createElement("h1",null,"Municipal Post Breakdown: Indicators"),r.createElement("div",null,r.createElement("table",{className:"scroll"},r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",{className:"table-width"},"Code"),r.createElement("th",{className:""},"Name"))),r.createElement("tbody",{className:"table-scoll"},y.Z.map((function(e,t){return r.createElement("tr",{key:t},r.createElement("td",{className:"table-width"},r.createElement("p",{className:"code"},e.codebook_id)),r.createElement("td",null,r.createElement("p",null,"Total number of municipal posts",e.department),r.createElement("a",{href:e.link,target:"_blank"},"View Indicator in the  Data Explorer"),r.createElement("div",{className:""})))}))))))};function S(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function w(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?S(Object(a),!0).forEach((function(t){C(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):S(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function C(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var x={control:function(e){return w(w({},e),{},{border:"1px solid #4A4A4A",borderRadius:"28px",boxShadow:"none","&:hover":{border:"1px solid #4A4A4A",borderRadius:"28px"}})}};const O=function(e){var t=e.select_values,a=e.total_posts,n=e.municipal_posts,l=e.cities,o=e.onChange,c=e.senior_management;return r.createElement("div",null,a.length<1&&n.length<1&&c.length<1?r.createElement(f.Z,{id:"loader",isOpen:a.length<1&&n.length<1&&c.length<1,className:"modal-dialog-centered loader"},r.createElement(h.Z,null,r.createElement("div",{className:"row"},r.createElement("div",{className:"col-2"}),r.createElement("div",{className:"col-0 ml-3 pt-4"},r.createElement(b.Z,{type:"grow",color:"secondary",size:"sm"}),r.createElement(b.Z,{type:"grow",color:"success",size:"sm"}),r.createElement(b.Z,{type:"grow",color:"danger",size:"sm"}),r.createElement(b.Z,{type:"grow",color:"warning",size:"sm"})),r.createElement("div",{className:"col-0 pt-4 pl-4 float-left"},"Loading Content...")),r.createElement("br",null))):"",r.createElement("div",{className:"container-fluid charts_dashboards"},r.createElement("div",{className:"charts_dashboards--left_container p-0"},r.createElement("div",{className:"charts_dashboards--select"},r.createElement("div",{className:"charts_dashboards--select-container"},r.createElement(u.ZP,{id:"multiple",name:"filters",placeholder:"Filter City",value:t,options:l,onChange:o,isMulti:!0,styles:x}))),r.createElement("div",{className:"charts_dashboards--barcharts"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-12 left-container"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-12 col-md-6"},r.createElement("div",{className:"charts"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-9"},r.createElement("h1",{className:"charts_dashboards--households"},"Total number of municipal posts")),r.createElement("div",{className:"col-md-3"},r.createElement(p.Z,{className:"charts_dashboards--button",text:"Raw Data",href:"/scoda/toolkit#/codebook-explorer/970",target:"_blank"}))),a?r.createElement(v.Z,{stepSize:5e3,hundred:!0,divide:1e3,x_label:"Number of Posts",data:{labels:g().map(t,"label"),datasets:a.map((function(e){return{backgroundColor:e.color,borderColor:e.color,data:e.values,label:e.year,stack:e.year}}))}}):"")),r.createElement("div",{className:"col-md-6"},r.createElement("div",{className:"charts "},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-9"},r.createElement("h1",{className:"charts_dashboards--households"},"Municipal Management Vacancies")),r.createElement("div",{className:"col-md-3"},r.createElement(p.Z,{className:"charts_dashboards--button",text:"Raw Data",href:"/scoda/toolkit#/codebook-explorer/968",target:"_blank"}))),r.createElement(v.Z,{data:{labels:g().map(t,"label"),datasets:n.map((function(e){return{backgroundColor:e.color,borderColor:e.color,data:e.values,label:e.year,stack:e.year}}))},stepSize:2,hundred:!1,divide:1,x_label:"Number of Vacancies"}))))),r.createElement("div",{className:"col-md-12"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-12 col-md-6"},r.createElement(N,null)),r.createElement("div",{className:"col-12 col-md-6"},r.createElement("div",{className:"charts"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-9"},r.createElement("h1",{className:"charts_dashboards--households"},"Number of Senior Management Vacancies")),r.createElement("div",{className:"col-md-3"},r.createElement(p.Z,{className:"charts_dashboards--button",text:"Raw Data",href:"/scoda/toolkit#/codebook-explorer/969",target:"_blank"}))),r.createElement(v.Z,{data:{labels:g().map(t,"label"),datasets:c.map((function(e){return{backgroundColor:e.color,borderColor:e.color,data:e.values,label:e.year,stack:e.year}}))},stepSize:2,hundred:!1,divide:1,x_label:"Number of Vacancies"}))))))))),r.createElement("div",{className:"spacer"}))};function M(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var r,n,l=[],o=!0,c=!1;try{for(a=a.call(e);!(o=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);o=!0);}catch(e){c=!0,n=e}finally{try{o||null==a.return||a.return()}finally{if(c)throw n}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return G(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?G(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function G(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var A={dropdownMenu:[{name:"Service Delivery",href:"socr#/service_delivery",active:!1},{name:"Citizen Engagement",href:"socr#/citizen_engagement",active:!1},{name:"Municipal Human Resources",href:"socr#/human_resources",active:!0},{name:"People and Households",href:"socr#/people_household",active:!1},{name:"Employment",href:"socr#/employment",active:!1},{name:"Dwellings",href:"socr#/dwellings",active:!1},{name:"Household Income",href:"socr#/household_income",active:!1},{name:"Food Security, Literacy and Inequality",href:"socr#/food_security",active:!1},{name:"Life Expectancy and Health",href:"socr#/life_expectancy",active:!1},{name:"Education",href:"socr#/education",active:!1},{name:"Sustainability",href:"socr#/sustainability",active:!1}]};const R=function(){var e=M((0,r.useState)([]),2),t=e[0],a=e[1],n=M((0,r.useState)(),2),c=(n[0],n[1]),s=M((0,r.useState)([]),2),i=s[0],d=s[1],u=M((0,r.useState)(0),2),p=(u[0],u[1]),f=M((0,r.useState)([]),2),h=f[0],b=f[1],v=M((0,r.useState)(),2),E=(v[0],v[1]),y=M((0,r.useState)([]),2),k=y[0],_=y[1],N=M((0,r.useState)([]),2),S=N[0],w=N[1],C=M((0,r.useState)({}),2),x=C[0],G=C[1],R=M((0,r.useState)({}),2),j=R[0],P=R[1],T=M((0,r.useState)({}),2),Z=T[0],D=T[1],z=function(e){switch(e){case 2014:return"#E0E0E0";case 2015:return"#D0D1E6";case 2016:return"#74A9CF";case 2017:return"#0570B0";default:return"#d6d6d6"}},I=function(e){switch(e){case"Buffalo City":return"BUF";case"City of Cape Town":return"CPT";case"City of Joburg":return"JHB";case"Ekurhuleni":return"EKU";case"Mangaung":return"MAN";case"Msunduzi":return"MSU";case"Nelson Mandela Bay":return"NMA";case"Tshwane":return"TSH";case"eThekwini":return"ETH"}},F=function(e){for(var t=[],a=2014,r=0;e.filter((function(e){return e[1]===a.toString()})).length>0;){for(var n=e.filter((function(e){return e[1]===a.toString()})),l=[],o=[],c=0;c<n.length;c++)n[c][0]=I(n[c][0]),l.push({label:n[c][0],value:n[c][0]}),o.push(n[c][2]),r+=n[c][2]?n[c][2]:0;t.push({year:a,data:n,labels:l,values:o,color:z(a)}),_(l),w(l),a+=1}p(r),d(t),G(t[t.length-1].data),console.log("total_posts",t[t.length-1])};(0,r.useEffect)((function(){var e;e=F,l().get("/api/explore/codebook?indicator_id=970").then((function(t){e(t.data.table)}))}),[]);var V=function(e){for(var t=[],a=2014,r=0;e.filter((function(e){return e[1]===a.toString()})).length>0;){for(var n=e.filter((function(e){return e[1]===a.toString()})),l=[],o=[],c=0;c<n.length;c++)n[c][0]=I(n[c][0]),l.push(n[c][0]),o.push(n[c][2]),r+=n[c][2]?n[c][2]:0;t.push({year:a,data:n,labels:l,values:o,color:z(a)}),a+=1}b(t),E(r),P(t[t.length-1].data),console.log("last_municipal_posts",t[t.length-1])};(0,r.useEffect)((function(){var e;e=V,l().get("/api/explore/codebook?indicator_id=968").then((function(t){e(t.data.table)}))}),[]);var B=function(e){for(var t=[],r=2014,n=0;e.filter((function(e){return e[1]===r.toString()})).length>0;){for(var l=e.filter((function(e){return e[1]===r.toString()})),o=[],s=[],i=0;i<l.length;i++)l[i][0]=I(l[i][0]),o.push(l[i][0]),s.push(l[i][2]),n+=l[i][2]?l[i][2]:0;t.push({year:r,data:l,labels:o,values:s,color:z(r)}),r+=1}a(t),c(n),D(t[t.length-1].data),console.log("last_senior_management_posts",t[t.length-1])},H=function(e,t,a,r){console.log(e,"table value");for(var n=g().map(a,"value"),l=[],o=2014,c=0;e.filter((function(e){return e[1]===o.toString()})).length>0;){for(var s=e.filter((function(e){return e[1]===o.toString()})),i=[],d=0;d<s.length;d++){var m=I(s[d][0]);n.includes(m)&&(s[d][0]=m,i.push(s[d][2]),c+=s[d][2]?s[d][2]:0)}l.push({year:o,data:s,labels:[],values:i,color:z(o)}),o+=1}t(l),r(c)};return(0,r.useEffect)((function(){var e;e=B,l().get("/api/explore/codebook?indicator_id=969").then((function(t){console.log("codebook_senior_management_api",t),e(t.data.table)}))}),[]),r.createElement("div",{className:"sorc_dashboards"},r.createElement("div",{className:"spacer--top"}),r.createElement(o.default,{name:"State of Cities Reports",dropdownName:"Municipal Human Resources",dropDownItem:A,buttonText:"Download as PNG"}),r.createElement("div",{id:"content"},r.createElement(m,{last_municipal_posts:j,last_total_posts:x,last_senior_management_posts:Z}),r.createElement(O,{select_values:S,total_posts:i,municipal_posts:h,cities:k,onChange:function(e){w(e),d([]),b([]),a([]),l().get("/api/explore/codebook?indicator_id=970").then((function(t){H(t.data.table,d,e,p)})),l().get("/api/explore/codebook?indicator_id=968").then((function(t){H(t.data.table,b,e,E)})),l().get("/api/explore/codebook?indicator_id=969").then((function(t){H(t.data.table,a,e,c)}))},senior_management:t})))}},83722:(e,t,a)=>{a.d(t,{Z:()=>r});const r=[{department:"",codebook_id:"GG.SOCR.28.0",link:"toolkit#/codebook-explorer/970"},{department:": Community & Social Services",codebook_id:"GG.SOCR.28.1",link:"toolkit#/codebook-explorer/971"},{department:": Financial & Administration",codebook_id:"GG.SOCR.28.2",link:"toolkit#/codebook-explorer/972"},{department:": Electricity",codebook_id:"GG.SOCR.28.3",link:"toolkit#/codebook-explorer/973"},{department:": Environmental Protection",codebook_id:"GG.SOCR.28.4",link:"toolkit#/codebook-explorer/974"},{department:": Health",codebook_id:"GG.SOCR.28.5",link:"toolkit#/codebook-explorer/975"},{department:": Public Safety",codebook_id:"GG.SOCR.28.6",link:"toolkit#/codebook-explorer/976"},{department:": Road Transport",codebook_id:"GG.SOCR.28.7",link:"toolkit#/codebook-explorer/977"},{department:": Sport & Recreation",codebook_id:"GG.SOCR.28.8",link:"toolkit#/codebook-explorer/978"},{department:": Waste Management",codebook_id:"GG.SOCR.28.9",link:"toolkit#/codebook-explorer/979"},{department:": Waste Water Management",codebook_id:"GG.SOCR.28.10",link:"toolkit#/codebook-explorer/980"},{department:": Water",codebook_id:"GG.SOCR.28.11",link:"toolkit#/codebook-explorer/981"},{department:": Other",codebook_id:"GG.SOCR.28.12",link:"toolkit#/codebook-explorer/982"}]}}]);