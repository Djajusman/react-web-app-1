(this["webpackJsonpaktiv-web"]=this["webpackJsonpaktiv-web"]||[]).push([[35],{707:function(e,t,i){"use strict";i.r(t),i.d(t,"default",(function(){return j}));var n=i(163),a=i(159),s=i(160),r=i(162),o=i(161),c=i(1),d=i(627),h=i(634),l=(i(633),i(8)),j=function(e){Object(r.a)(i,e);var t=Object(o.a)(i);function i(){var e;return Object(a.a)(this,i),(e=t.call(this)).indikatorlist=function(){fetch("https://api.aktiv.co.id/api/aktivengine/v1/setting/indikator/list",{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:localStorage.getItem("token")})}).then((function(e){return e.json()})).then((function(t){t.data.items.length>0&&(e.setState({boolindikator:!0}),t.data.items.indikator.forEach((function(t){e.setState({id:t.id}),"Hijau"==t.judul&&e.setState({description_hijau:t.description}),"Kuning"==t.judul&&e.setState({description_kuning:t.description}),"Merah"==t.judul&&e.setState({description_merah:t.description})})))})).catch((function(e){return console.log(e)}))},e.handleInputChange=function(t){var i=t.target.id;e.setState(Object(n.a)({},i,t.target.value))},e.state={id:"",boolindikator:!1,error_login:!1,error_message:"",is_logged_in:!1,alert_login:!1},e}return Object(s.a)(i,[{key:"componentDidMount",value:function(){this.indikatorlist()}},{key:"handleUpdateIndikator",value:function(e){var t,i,n=this;this.props.history;e.preventDefault();var a,s={judul:"Hijau",description:this.state.description_hijau,logo:""},r={judul:"Kuning",description:this.state.description_kuning,logo:""},o={judul:"Merah",description:this.state.description_merah,logo:""},c=[];c.push(s,r,o),this.state.boolindikator?(a={id:this.state.id,indikator:c},t="update",i="PUT"):(a={indikator:c},t="add",i="POST"),fetch("https://api.aktiv.co.id/api/aktivengine/v1/setting/indikator/".concat(t),{method:i,body:JSON.stringify(a),headers:new Headers({"Content-Type":"application/json",Authorization:localStorage.getItem("token")})}).then((function(e){return e.json()})).then((function(e){"OK"==e.status&&(h.b.success("Tambah Indikator Berhasil",{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),n.indikatorlist())})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){return Object(l.jsxs)("div",{className:"container-fluid",children:[Object(l.jsxs)(d.f,{className:"px-3 py-3",children:[Object(l.jsxs)(d.R,{children:[Object(l.jsx)(d.k,{children:Object(l.jsxs)(d.f,{children:[Object(l.jsxs)(d.j,{children:[Object(l.jsx)(d.z,{src:"logo/hijau.svg",height:25,className:"mr-2"}),Object(l.jsx)("strong",{children:"Hijau"})]}),Object(l.jsx)(d.g,{children:Object(l.jsx)(d.A,{type:"text",value:this.state.description_hijau,id:"description_hijau",placeholder:"Kondisi anda saat ini tidak memiliki gejala yang berbahaya atau Anda mengalami perbaikan gejala",onChange:this.handleInputChange.bind(this)})})]})}),Object(l.jsx)(d.k,{})]}),Object(l.jsxs)(d.R,{children:[Object(l.jsx)(d.k,{children:Object(l.jsxs)(d.f,{children:[Object(l.jsxs)(d.j,{children:[Object(l.jsx)(d.z,{src:"logo/kuning.svg",height:25,className:"mr-2"}),Object(l.jsx)("strong",{children:"Kuning"})]}),Object(l.jsx)(d.g,{children:Object(l.jsx)(d.A,{type:"text",value:this.state.description_kuning,id:"description_kuning",placeholder:"Kondisi anda saat ini memiliki gejala baru atau gejala yang Anda rasakan tidak membaik",onChange:this.handleInputChange.bind(this)})})]})}),Object(l.jsx)(d.k,{})]}),Object(l.jsxs)(d.R,{children:[Object(l.jsx)(d.k,{children:Object(l.jsxs)(d.f,{children:[Object(l.jsxs)(d.j,{children:[Object(l.jsx)(d.z,{src:"logo/merah.svg",height:25,className:"mr-2"}),Object(l.jsx)("strong",{children:" Merah"})]}),Object(l.jsx)(d.g,{children:Object(l.jsx)(d.A,{type:"text",value:this.state.description_merah,id:"description_merah",placeholder:"Kondisi anda saat ini harus segera mendapatkan penanganan khusus, silakan segera hubungi kami.",onChange:this.handleInputChange.bind(this)})})]})}),Object(l.jsx)(d.k,{})]}),Object(l.jsx)(d.R,{children:Object(l.jsx)(d.k,{className:"d-flex flex-row-reverse",children:Object(l.jsx)(d.e,{className:"btn-facebook btn-brand mr-3 mb-3",onClick:this.handleUpdateIndikator.bind(this),children:Object(l.jsx)("span",{className:"mfs-2",children:"Simpan"})})})})]}),Object(l.jsx)(h.a,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0})]})}}]),i}(c.Component)}}]);
//# sourceMappingURL=35.d2cbcbc7.chunk.js.map