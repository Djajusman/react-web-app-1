(this["webpackJsonpaktiv-web"]=this["webpackJsonpaktiv-web"]||[]).push([[24],{702:function(e,t,s){"use strict";s.r(t),s.d(t,"default",(function(){return O}));var n=s(163),a=s(37),i=s(159),o=s(160),c=s(63),r=s(162),l=s(161),h=s(1),d=s(627),j=s(628),u=s(634),p=(s(633),s(62)),m=s(8),b=["nama","puskesmasMitra","action"],O=function(e){Object(r.a)(s,e);var t=Object(l.a)(s);function s(){var e;return Object(i.a)(this,s),(e=t.call(this)).downloadExcel=function(){fetch("https://report.aktiv.co.id/api/report-tenaga-kesehatan",{method:"GET",headers:new Headers({"Content-Type":"application/vnd.ms-excel;charset=UTF-8",responseType:"blob",Authorization:"".concat(localStorage.getItem("token"))})}).then((function(e){return e.json()})).then((function(e){console.log("====== Get Download Response ======="),console.log(e);var t=document.createElement("a");t.download="Reportnya",t.href=e.fileUrl,document.body.appendChild(t),t.click(),document.body.removeChild(t)})).catch((function(e){alert(e)}))},e.deleteUser=function(t){if(window.confirm("Apakah Anda Yakin Ingin Menghapus Data Ini?")){var s={id:t};fetch("https://auth.aktiv.co.id/api/auth/v1/user/delete",{method:"DELETE",body:JSON.stringify(s),headers:new Headers({"Content-Type":"application/json",Authorization:localStorage.getItem("token")})}).then((function(e){return e.json()})).then((function(t){t.hasOwnProperty("status")&&("OK"===t.status?(u.b.success("Hapus Berhasil",{position:"top-right",autoClose:1e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),e.getListVolunteer()):u.b.error("Hapus Gagal: "+t.statusmsg,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}))})).catch((function(e){return console.error(e)}))}},e.getPuskesmasList=function(){fetch("https://api.aktiv.co.id/api/aktivengine/v1/puskesmas/list",{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"".concat(localStorage.getItem("token"))})}).then((function(e){return e.json()})).then((function(t){var s=t.data.items.map((function(e){return Object(a.a)(Object(a.a)({},e),{},{key:e.id,label:e.puskesmas})}));e.setState({listPuskesmas:s})})).catch((function(e){alert(e)}))},e.addUser=function(){var t={username:e.state.username,password:e.state.password,role:"volunteer",email:e.state.email,first_name:e.state.first_name,puskesmasID:e.state.puskesmasID,birth_date:"".concat(e.state.birth_date," 00:00:00"),noHp:e.state.noHp,alamatDom:e.state.alamatDom,profesi:e.state.profesi,institusi:e.state.institusi,gender:e.state.gender,volunteerLink:e.state.volunteerLink,org_token:"uWOZxPN6io8G4uoK6ZFsPzfJoOlgLpmI"};console.log(t),fetch("https://auth.aktiv.co.id/api/auth/v1/user/add",{method:"POST",body:JSON.stringify(t),headers:new Headers({"Content-Type":"application/json",Authorization:localStorage.getItem("token")})}).then((function(e){return e.json()})).then((function(t){t.hasOwnProperty("status")&&("OK"===t.status?(u.b.success("Tambah Berhasil",{position:"top-right",autoClose:1e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),e.toggleStateAddVolunteer(),e.getListVolunteer()):u.b.error("Tambah Gagal: "+t.statusmsg,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}))})).catch((function(e){return console.error(e)}))},e.handleInputChange=function(t){var s=t.target.id;e.setState(Object(n.a)({},s,t.target.value))},e.toggleStateAddVolunteer=function(){e.setStateAddVolunteer(!e.state.stateAddVolunteer)},e.getListVolunteer=function(){fetch("https://auth.aktiv.co.id/api/auth/v1/user/list?page=".concat(e.state.page,"&role=volunteer"),{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"".concat(localStorage.getItem("token"))})}).then((function(e){return e.json()})).then((function(t){console.log("List Volunteer =>",t.data.items);var s=[];t.data.items.forEach((function(e){s.push({id:e.id,nama:e.profile.first_name,puskesmasMitra:e.profile.puskesmas})})),e.setState({listVolunteer:s})})).catch((function(e){console.log(e)}))},e.state={listVolunteer:[],listPuskesmas:[],page:1},e.handleInputChange=e.handleInputChange.bind(Object(c.a)(e)),e}return Object(o.a)(s,[{key:"componentDidMount",value:function(){this.getListVolunteer(),this.getPuskesmasList()}},{key:"setStateAddVolunteer",value:function(e){this.setState({stateAddVolunteer:e})}},{key:"render",value:function(){var e=this;return Object(m.jsxs)("div",{className:"container-fluid",children:[Object(m.jsxs)(d.R,{children:[Object(m.jsx)(d.k,{sm:"3"}),Object(m.jsx)(d.k,{className:"d-flex flex-row-reverse",children:Object(m.jsxs)(d.v,{children:[Object(m.jsxs)(d.e,{className:"btn-outline-info mt-4  mr-2",style:{backgroundColor:"white"},onClick:function(){e.downloadExcel()},children:[Object(m.jsx)(j.a,{name:"cilDataTransferDown"}),Object(m.jsx)("span",{className:"mfs-2",children:"Unduh Excel"})]}),Object(m.jsx)(d.e,{className:"btn-facebook btn-brand mt-4 mr-2",onClick:function(){e.toggleStateAddVolunteer()},children:Object(m.jsx)("span",{children:"Tambah Tenaga Kesehatan"})})]})})]}),Object(m.jsx)(d.f,{children:Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{children:Object(m.jsx)(d.f,{children:Object(m.jsx)(d.g,{children:Object(m.jsx)(d.n,{items:this.state.listVolunteer,fields:b,itemsPerPage:10,activePage:this.state.page,tableFilter:!0,sorter:!0,pagination:!0,scopedSlots:{nama:function(e,t){return Object(m.jsx)("td",{children:Object(m.jsx)(p.b,{to:"/data_volunteer/detail_volunteer/".concat(e.id),children:e.nama})})},action:function(t,s){return"admin"===localStorage.getItem("role")||"operator"===localStorage.getItem("role")?Object(m.jsx)("td",{children:Object(m.jsx)(d.e,{color:"danger",size:"sm",onClick:function(){e.deleteUser(t.id)},children:Object(m.jsx)(j.a,{name:"cilTrash"})})}):Object(m.jsx)("td",{})}}})})})})})}),Object(m.jsxs)(d.L,{show:this.state.stateAddVolunteer,onClose:this.toggleStateAddVolunteer,size:"sm",children:[Object(m.jsx)(d.O,{closeButton:!0,children:Object(m.jsx)(d.P,{children:"Tambah Tenaga Kesehatan"})}),Object(m.jsxs)(d.M,{children:[Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"username",children:"Username"}),Object(m.jsx)(d.A,{id:"username",type:"text",placeholder:"Masukkan Username",onChange:this.handleInputChange})]})})}),Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"email",children:"Email"}),Object(m.jsx)(d.A,{type:"email",id:"email",placeholder:"Masukkan Email",onChange:this.handleInputChange})]})})}),Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"password",children:"Password"}),Object(m.jsx)("input",{type:"text",autoComplete:"username",style:{display:"none"}}),Object(m.jsx)("input",{type:"password",style:{display:"none"}}),Object(m.jsx)(d.A,{type:"password",id:"password",placeholder:"Masukkan password",onChange:this.handleInputChange})]})})}),Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"first_name",children:"Nama"}),Object(m.jsx)(d.A,{type:"text",id:"first_name",placeholder:"Masukkan Nama",onChange:this.handleInputChange})]})})}),Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"birth_date",children:"Tanggal Lahir"}),Object(m.jsx)(d.A,{type:"date",id:"birth_date",placeholder:"Masukkan Tanggal Lahir",onChange:this.handleInputChange})]})})}),Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"noHp",children:"No Hp"}),Object(m.jsx)(d.A,{type:"text",id:"noHp",placeholder:"Masukkan No Hp",onChange:this.handleInputChange})]})})}),Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"alamatDom",children:"Alamat Domisili"}),Object(m.jsx)(d.A,{type:"text",id:"alamatDom",placeholder:"Masukkan Alamat Domisili",onChange:this.handleInputChange})]})})}),Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"profesi",children:"Profesi"}),Object(m.jsx)(d.A,{type:"text",id:"profesi",placeholder:"Masukkan Profesi",onChange:this.handleInputChange})]})})}),Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"puskesmasID",children:"Puskesmas"}),Object(m.jsxs)(d.S,{id:"puskesmasID",onChange:this.handleInputChange,children:[Object(m.jsx)("option",{value:"",children:"-- Pilih Puskesmas --"},""),this.state.listPuskesmas.map((function(e){return Object(m.jsx)("option",{value:e.key,children:e.label},e.key)}))]})]})})}),Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"volunteerLink",children:"Direct Chat Link Tawkto"}),Object(m.jsx)(d.A,{type:"text",id:"volunteerLink",placeholder:"Masukkan Direct Chat Link Tawkto",onChange:this.handleInputChange})]})})}),Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"institusi",children:"Institusi"}),Object(m.jsx)(d.A,{type:"text",id:"institusi",placeholder:"Masukkan Institusi",onChange:this.handleInputChange})]})})}),Object(m.jsx)(d.R,{children:Object(m.jsx)(d.k,{className:"my-1",children:Object(m.jsxs)(d.v,{children:[Object(m.jsx)(d.I,{htmlFor:"gender",children:"Jenis Kelamin"}),Object(m.jsxs)(d.S,{id:"gender",onChange:this.handleInputChange,value:this.state.gender,children:[Object(m.jsx)("option",{value:"",children:"-- Pilih Jenis Kelamin --"},""),Object(m.jsx)("option",{value:"L",children:"Laki-Laki"},"L"),Object(m.jsx)("option",{value:"P",children:"Perempuan"},"P")]})]})})})]}),Object(m.jsx)(d.N,{children:Object(m.jsx)(d.e,{className:"btn-facebook btn-brand mt-4 mr-2",onClick:function(){e.addUser()},children:Object(m.jsx)("span",{className:"mfs-2",children:"Tambah"})})})]}),Object(m.jsx)(u.a,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0})]})}}]),s}(h.Component)}}]);
//# sourceMappingURL=24.b8e7bfe0.chunk.js.map