(this.webpackJsonpdemo_1=this.webpackJsonpdemo_1||[]).push([[0],{209:function(e,t,a){e.exports=a(314)},214:function(e,t,a){},215:function(e,t,a){},314:function(e,t,a){"use strict";a.r(t);var r=a(8),n=a.n(r),o=a(197),s=a.n(o),l=(a(214),a(118)),i=a(96);a(215);var c=function(){return n.a.createElement("footer",{style:{position:"fixed",bottom:"0",margin:"auto",width:"100%",backgroundColor:"white"}},n.a.createElement("a",{style:{color:"darkgrey"},href:"https://akashraj.tech"},"AkashRaj @",(new Date).getFullYear()))},d=a(198),u=a(91),m=a(92),h=a(94),v=a(95),p=a(54);var f=a(126),b=a.n(f);var g=function(e){var t=e.data;if(console.log(t),!t)return n.a.createElement("div",null,"No data!");var a=t.district_wise;if(!a)return n.a.createElement("div",null,"No data!");var r,o=Object.keys(a),s=[];for(var l in o){var i=parseInt(l)+1,c=l=o[l],d=parseInt(a[l].confirmed),u=parseInt(a[l].delta.confirmed);s.push({id:i,district:c,cases:d,new_cases:u})}return r=[{name:"#",selector:"id",sortable:!1,style:{fontWeight:"500"},width:"50px",format:function(e){return n.a.createElement("span",null," > ")}},{name:"District",selector:"district",sortable:!0,left:!0,style:{fontWeight:"500"},width:"200px"},{name:"Total",selector:"cases",sortable:!0,left:!0,style:{color:"black",fontWeight:"500"},format:function(e){return n.a.createElement("span",null,e.cases," ",n.a.createElement("small",{className:"blinking"},e.new_cases>0?"+"+e.new_cases:""))}}],n.a.createElement("div",null,n.a.createElement("div",{className:"table-responsive"},n.a.createElement(b.a,{title:"District wise ".concat(t.name),noHeader:!0,responsive:!0,striped:!0,keyField:"id",defaultSortField:"cases",defaultSortAsc:!1,dense:!0,columns:r,data:s})))};var w=function(e){console.log(e);var t=e.data,a=Object.keys(t.state_wise),r=1,o=[];for(var s in a)if(s=a[s],t.state_wise[s].confirmed){var l=parseInt(t.state_wise[s].confirmed),i=parseInt(t.state_wise[s].deaths),c=parseInt(t.state_wise[s].recovered),d=parseInt(t.state_wise[s].active),u=t.state_wise[s].delta.confirmed?parseInt(t.state_wise[s].delta.confirmed):0,m=t.state_wise[s].delta.deaths?parseInt(t.state_wise[s].delta.deaths):0,h=t.state_wise[s].delta.recovered?parseInt(t.state_wise[s].delta.recovered):0,v=t.state_wise[s].delta.active?parseInt(t.state_wise[s].delta.active):0,p=t.state_wise[s].district;o.push({id:r,state:s,total:l,active:d,deaths:i,recovered:c,new_total:u,new_active:v,new_deaths:m,new_recovered:h,district_wise:p}),r++}var f=[{name:"#",selector:"id",sortable:!0,style:{fontWeight:"500"},width:"50px"},{name:"State",selector:"state",sortable:!0,left:!0,style:{fontWeight:"500"}},{name:"Total",selector:"total",sortable:!0,left:!0,style:{color:"black",fontWeight:"500"},format:function(e){return n.a.createElement("span",null,e.total," ",n.a.createElement("small",{className:"blinking"},e.new_total>0?"+"+e.new_total:""))},width:"100px"},{name:"Active",selector:"active",sortable:!0,left:!0,style:{color:"orange",fontWeight:"500"},format:function(e){return n.a.createElement("span",null,e.active," ",n.a.createElement("small",{className:"blinking",style:{color:"red"}},e.new_active>0?"+"+e.new_active:""))},width:"100px"},{name:"Deaths",selector:"deaths",sortable:!0,left:!0,style:{color:"red",fontWeight:"500"},format:function(e){return n.a.createElement("span",null,e.deaths," ",n.a.createElement("small",{className:"blinking"},e.new_deaths>0?"+"+e.new_deaths:""))},width:"100px"},{name:"Recovered",selector:"recovered",sortable:!0,left:!0,style:{color:"green",fontWeight:"500"},format:function(e){return n.a.createElement("span",null,e.recovered," ",n.a.createElement("small",{className:"blinking"},e.new_recovered>0?"+"+e.new_recovered:""))},width:"100px"}];return n.a.createElement(b.a,{noHeader:!0,title:!1,responsive:!0,striped:!0,keyField:"id",dense:!0,columns:f,data:o,expandableRows:!0,expandableRowsComponent:n.a.createElement(g,null)})},_={title:{display:!0},tooltips:{mode:"index",intersect:!1,titleAlign:"left",bodyAlign:"left",footerAlign:"left"},responsive:!0,maintainAspectRatio:!0,scales:{xAxes:[{stacked:!0,ticks:{autoSkip:!0,reverse:!0}}],yAxes:[{stacked:!0,display:!0,beginAtZero:!1,type:"logarithmic",ticks:{autoSkip:!0,maxTicksLimit:5}}]}},E={title:{display:!0,text:"COVID-19 INDIA DAILY UPDATE"},tooltips:{mode:"index",intersect:!1,position:"nearest"},responsive:!0,maintainAspectRatio:!0,scales:{xAxes:[{stacked:!1,ticks:{autoSkip:!0,maxTicksLimit:20}}],yAxes:[{stacked:!1,type:"logarithmic"}]},fill:!0,lineTension:.2,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:1,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:10,pointHoverRadius:50,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:.2,pointHitRadius:10},y={title:{display:!0,text:"COVID-19 INDIA DAILY UPDATE"},tooltips:{mode:"index",intersect:!1,position:"nearest"},responsive:!0,fill:!0,lineTension:.1,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10},k=function(e){Object(v.a)(a,e);var t=Object(h.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={isLoaded:!1,data:{},timeline:{},dataLoaded:!1,timelineLoaded:!1},r}return Object(m.a)(a,[{key:"updateState",value:function(e){var t=Object.assign({},this.state),a=Object.keys(e);for(var r in a){var n=a[r];t[n]=e[n]}this.setState(t)}},{key:"fetchAndSet",value:function(e,t){var a=this;fetch(e).then((function(e){return e.json()})).then((function(e){var r=Object(d.a)({},t,e);if("data"===t&&(r.dataLoaded=!0),"timeline"===t&&(r.timelineLoaded=!0),a.updateState(r),a.state.dataLoaded&&a.state.timelineLoaded){a.updateState({isLoaded:!0})}return!0}),(function(e){var t={error:e,isLoaded:!0};a.updateState(t)}))}},{key:"componentDidMount",value:function(){var e=this.props.url,t=this.props.timeline_url;this.fetchAndSet(e,"data"),this.fetchAndSet(t,"timeline")}},{key:"render",value:function(){var e=this.state,t=e.error,a=e.isLoaded,r=e.data,o=e.timeline;if(t)return n.a.createElement("div",null,"Error: ",t.message);if(a){var s=[],l={},i=[],c=[],d=[],u=[],m=[],h={},v=[],f=[],b=[],g=[],k=[],C={},x="rgba(245,227,66,0.5)",I="rgba(255,99,132,0.5)",N="rgba(201, 179, 193, 1)",W="rgba(201, 179, 193, 1)",A=[];if(this.state.isLoaded){if(this.state.dataLoaded){var D=Object.keys(r.state_wise),j=1;for(var S in D)if(S=D[S],r.state_wise[S].confirmed){var O=parseInt(r.state_wise[S].confirmed),B=parseInt(r.state_wise[S].deaths),L=parseInt(r.state_wise[S].recovered),R=parseInt(r.state_wise[S].active),H=r.state_wise[S].delta.confirmed?parseInt(r.state_wise[S].delta.confirmed):0,T=r.state_wise[S].delta.deaths?parseInt(r.state_wise[S].delta.deaths):0,M=r.state_wise[S].delta.recovered?parseInt(r.state_wise[S].delta.recovered):0,F=r.state_wise[S].delta.active?parseInt(r.state_wise[S].delta.active):0,P=r.state_wise[S].district;O>20&&(c.push(O),m.push(B),d.push(L),u.push(R),i.push(S)),A.push({id:j,state:S,total:O,active:R,deaths:B,recovered:L,new_total:H,new_active:F,new_deaths:T,new_recovered:M,district_wise:P}),j++}[{name:"#",selector:"id",sortable:!0,style:{fontWeight:"500"},width:"50px"},{name:"State",selector:"state",sortable:!0,left:!0,style:{fontWeight:"500"}},{name:"Total",selector:"total",sortable:!0,left:!0,style:{color:"black",fontWeight:"500"},format:function(e){return n.a.createElement("span",null,e.total," ",n.a.createElement("small",{className:"blinking"},e.new_total>0?"+"+e.new_total:""))},width:"100px"},{name:"Active",selector:"active",sortable:!0,left:!0,style:{color:"orange",fontWeight:"500"},format:function(e){return n.a.createElement("span",null,e.active," ",n.a.createElement("small",{className:"blinking",style:{color:"red"}},e.new_active>0?"+"+e.new_active:""))},width:"100px"},{name:"Deaths",selector:"deaths",sortable:!0,left:!0,style:{color:"red",fontWeight:"500"},format:function(e){return n.a.createElement("span",null,e.deaths," ",n.a.createElement("small",{className:"blinking"},e.new_deaths>0?"+"+e.new_deaths:""))},width:"100px"},{name:"Recovered",selector:"recovered",sortable:!0,left:!0,style:{color:"green",fontWeight:"500"},format:function(e){return n.a.createElement("span",null,e.recovered," ",n.a.createElement("small",{className:"blinking"},e.new_recovered>0?"+"+e.new_recovered:""))},width:"100px"}],C={labels:["Active","Recovered","Deaths"],datasets:[{backgroundColor:[x,"rgba(81,245,66,0.5)",I],borderColor:N,borderWidth:1,hoverBackgroundColor:[x,"rgba(81,245,66,0.5)",I],hoverBorderColor:W,data:[(s=r.total_values).active,s.recovered,s.deaths]}]},l={labels:i,datasets:[{label:"Active",backgroundColor:x,borderColor:N,borderWidth:1,hoverBackgroundColor:"rgba(245,227,66,0.8)",hoverBorderColor:W,data:u},{label:"Recovered",backgroundColor:"rgba(81,245,66,0.5)",borderColor:N,borderWidth:1,hoverBackgroundColor:"rgba(81,245,66,0.8)",hoverBorderColor:W,data:d},{label:"Deaths",backgroundColor:I,borderColor:N,borderWidth:1,hoverBackgroundColor:"rgba(255,99,132,0.8)",hoverBorderColor:W,data:m}]}}if(this.state.timelineLoaded){for(var V in o){var z=o[V];v.push(z.date),b.push(z.dailyconfirmed),g.push(z.dailyrecovered),f.push(z.dailydeceased),k.push(z.totalconfirmed)}h={labels:v,datasets:[{type:"line",fill:!1,label:"Total Till Date",backgroundColor:I,borderColor:"red",borderWidth:.2,hoverBackgroundColor:"rgba(255,99,132,0.8)",hoverBorderColor:W,data:k},{label:"New Cases",backgroundColor:"rgba(245,227,66,0.5)",borderColor:N,borderWidth:.2,hoverBackgroundColor:"rgba(245,227,66,0.8)",hoverBorderColor:W,data:b},{label:"New Recovery",backgroundColor:"rgba(81,245,66,0.5)",borderColor:N,borderWidth:.2,hoverBackgroundColor:"rgba(81,245,66,0.8)",hoverBorderColor:W,data:g},{label:"New Deaths",backgroundColor:I,borderColor:N,borderWidth:.2,hoverBackgroundColor:"rgba(255,99,132,0.8)",hoverBorderColor:W,data:f}]}}}return _.title.text="COVID-19 INDIA STATE WISE (log scale) (where cases >".concat(20,")"),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12 col-lg-6 my-2"},n.a.createElement("h3",null,"Total"),n.a.createElement(p.d,{data:C,options:y}),n.a.createElement("span",{className:"m-auto font-weight-bold"}," Total: ",s.confirmed," "),n.a.createElement("span",{className:"m-auto font-weight-bold"},"/ Active: ",s.active),n.a.createElement("span",{className:"m-auto font-weight-bold"},"/ Deaths: ",s.deaths),n.a.createElement("span",{className:"m-auto font-weight-bold"},"/ Recovered: ",s.recovered)),n.a.createElement("div",{className:"col-12 col-lg-6 my-2 mt-4"},n.a.createElement("h3",null,"State Wise data"),n.a.createElement(p.a,{data:l,width:100,height:80,options:_})),n.a.createElement("div",{className:"col-12 my-2 mt-4"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12 my-2"},n.a.createElement("h3",null,"Timeline of India"),n.a.createElement(p.c,{data:h,width:100,height:60,options:E})),n.a.createElement("div",{className:"col-12 my-2"},n.a.createElement("h3",null,"State Wise Data")),n.a.createElement("div",{className:"table-responsive"},n.a.createElement(w,{data:r})),n.a.createElement("div",{className:"col-6"}))))}return n.a.createElement("div",{className:"loader"},n.a.createElement("div",{className:"corona-loading",style:{position:"fixed",width:"100%",height:"100%",left:"0",right:"0",top:"58px",background:"#fff",zIndex:"999999999",bottom:"0"}},n.a.createElement("img",{src:"./virus.png",alt:""}),n.a.createElement("p",{className:"text-center",style:{margin:"auto"}},"Loading result ...")))}}]),a}(r.Component);var C=function(e){return n.a.createElement("div",null,n.a.createElement(k,{url:e.data_url,timeline_url:e.data_timeline_url}))},x=a(83),I=a.n(x),N=a(116),W=a(163),A=a(53),D=a(85),j=a(132),S=a(131);var O=function(e){var t=e.data,a="Hover over any state",r=0,o=0,s=0,l=0;return t&&(a=t.name,r=t.value,o=t.active,s=t.deaths,l=t.recovered),n.a.createElement("div",null,n.a.createElement("h4",null,a),n.a.createElement("span",null,n.a.createElement("span",{style:{fontWeight:"bold",color:"black"}},"Cases:  ",r," /")," "),n.a.createElement("span",null,n.a.createElement("span",{style:{fontWeight:"bold",color:"orange"}},"Active:  ",o," /")," "),n.a.createElement("span",null,n.a.createElement("span",{style:{fontWeight:"bold",color:"red"}},"Deaths:  ",s," /")," "),n.a.createElement("span",null,n.a.createElement("span",{style:{fontWeight:"bold",color:"green"}},"Recovered:  ",l," ")," "))};A.e(S.a);var B=function(e){Object(v.a)(a,e);var t=Object(h.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={isLoaded:!1},r.setup_chart=r.setup_chart.bind(Object(W.a)(r)),r}return Object(m.a)(a,[{key:"getApiData",value:function(){var e=Object(N.a)(I.a.mark((function e(t,a){var r,n,o;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return r=e.sent,n=r.json(),e.next=6,n;case 6:return o=e.sent,e.abrupt("return",o);case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=this,t=this.props.url,a=this.getApiData(t,"data"),r=this.getApiData("./data/india_map.json","am4geodata_indiaHigh"),n=this.getApiData("./data/india_map_dict.json","india_dict");Promise.all([a,r,n]).then((function(t){return e.setState({isLoaded:!0,data:t[0],am4geodata_indiaHigh:t[1],india_dict:t[2],hovered:{name:"India",value:t[0].total_values.confirmed,active:t[0].total_values.active,deaths:t[0].total_values.deaths,recovered:t[0].total_values.recovered}})})).then((function(){return e.setup_chart()}))}},{key:"setup_chart",value:function(){var e=this.state.data,t=this.state.am4geodata_indiaHigh,a=this.state.india_dict,r={name:"India",value:e.total_values.confirmed,active:e.total_values.active,deaths:e.total_values.deaths,recovered:e.total_values.recovered};if(!this.state.error){for(var n=[],o=[],s=t.features.length,l=0;l<s;l++){var i=t.features[l].properties.name;if(i){parseInt(e.state_wise[i].confirmed)||(e.state_wise[i].confirmed=0);var c=parseInt(e.state_wise[i].confirmed),d=parseInt(e.state_wise[i].deaths),u=parseInt(e.state_wise[i].recovered),m=parseInt(e.state_wise[i].active);n.push(c);var h="rgba(".concat(c,",50,50,0.8)"),v="rgba(".concat(c,",100,100,0.8)");t.features[l].properties.value=c,t.features[l].properties.deaths=d,t.features[l].properties.recovered=u,t.features[l].properties.active=m,t.features[l].properties.color=v,o.push({id:a[i],name:i,value:c,deaths:d,recovered:u,active:m,color:h,tooltipColor:"red"})}}Math.min.apply(Math,n),Math.max.apply(Math,n);A.e(S.a);var p=A.c("map-chart-container",j.a);p.responsive.enabled=!0;0;e.total_values;p.titles.create().text="[bold font-size: 20]India COVID-19 Spread[/]",p.geodata=t,p.focusable=!0,p.projection=new j.d.Miller;var f=p.series.push(new j.c);f.useGeodata=!0,f.nonScalingStroke=!0,f.strokeWidth=.5,f.calculateVisualCenter=!0;var b=f.mapPolygons.template;b.nonScaling=!1,b.propertyFields.fill="color",b.fillOpacity=1;var g=this;b.events.on("over",(function(e){g.setState({hovered:e.target.dataItem._dataContext})})),b.events.on("out",(function(e){g.setState({hovered:r})}))}}},{key:"componentWillUnmount",value:function(){this.chart&&this.chart.dispose()}},{key:"render",value:function(){var e=this.state.error,t=this.state.isLoaded;if(e)return n.a.createElement("div",null," Error: ",e.message," ");if(t)return n.a.createElement("div",null," ",n.a.createElement("div",{id:"map-chart-container",style:{width:"100%",height:"100vh"}}),n.a.createElement("div",{id:"info-bar",style:{position:"fixed",bottom:"25px",width:"100%"}},n.a.createElement(O,{data:this.state.hovered})));return n.a.createElement("div",{className:"loader"},n.a.createElement("div",{className:"corona-loading",style:{position:"fixed",width:"100%",height:"100%",left:"0",right:"0",top:"58px",background:"#fff",zIndex:"999999999",bottom:"0"}},n.a.createElement("img",{className:"mt-5",src:"./virus.png",alt:""}),n.a.createElement("p",{className:"text-center",style:{margin:"auto"}}," Loading result... ")))}}]),a}(r.Component);A.e(S.a);r.Component;var L=function(e){return n.a.createElement("div",null,n.a.createElement(B,{url:e.data_url,timeline_url:e.data_timeline_url}))},R=function(e){Object(v.a)(a,e);var t=Object(h.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={isLoaded:!1},r}return Object(m.a)(a,[{key:"getApiData",value:function(){var e=Object(N.a)(I.a.mark((function e(t,a){var r,n,o;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return r=e.sent,n=r.json(),e.next=6,n;case 6:return o=e.sent,e.abrupt("return",o);case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=this,t=this.props.data_url,a=this.getApiData(t,"data");Promise.all([a]).then((function(t){return e.setState({isLoaded:!0,data:t[0]})}))}},{key:"render",value:function(){var e=this.state.error,t=this.state.isLoaded;if(e)return n.a.createElement("div",null," Error: ",e.message," ");if(t)return n.a.createElement("div",null,n.a.createElement(w,{data:this.state.data}));return n.a.createElement("div",{className:"loader"},n.a.createElement("div",{className:"corona-loading",style:{position:"fixed",width:"100%",height:"100%",left:"0",right:"0",top:"58px",background:"#fff",zIndex:"999999999",bottom:"0"}},n.a.createElement("img",{className:"mt-5",src:"./virus.png",alt:""}),n.a.createElement("p",{className:"text-center",style:{margin:"auto"}}," Loading result... ")))}}]),a}(r.Component);var H=function(){var e="https://akashraj.tech/corona/api_india",t="https://akashraj.tech/corona/api_india_timeline";return n.a.createElement("div",{className:"App"},n.a.createElement(l.a,{path:"/",basename:"/corona/react_mod"},"",n.a.createElement("div",{className:"m-2"},n.a.createElement(i.c,null,n.a.createElement(i.a,{path:"/",exact:!0,render:function(a){return n.a.createElement(L,Object.assign({},a,{data_url:e,data_timeline_url:t}))}}),n.a.createElement(i.a,{path:"/graph",exact:!0,render:function(a){return n.a.createElement(C,Object.assign({},a,{data_url:e,data_timeline_url:t}))}}),n.a.createElement(i.a,{path:"/table",exact:!0,render:function(a){return n.a.createElement(R,Object.assign({},a,{data_url:e,data_timeline_url:t}))}})))),n.a.createElement(c,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(313);s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(H,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[209,1,3]]]);
//# sourceMappingURL=main.6fb8392a.chunk.js.map