/*! For license information please see 21.754cdad0.chunk.js.LICENSE.txt */
(this["webpackJsonpaktiv-web"]=this["webpackJsonpaktiv-web"]||[]).push([[21],{635:function(e,t,a){!function(e){"use strict";e.defineLocale("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(e,t){return 12===e&&(e=0),"pagi"===t?e:"siang"===t?e>=11?e:e+12:"sore"===t||"malam"===t?e+12:void 0},meridiem:function(e,t,a){return e<11?"pagi":e<15?"siang":e<19?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",ss:"%d detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:0,doy:6}})}(a(632))},685:function(e,t,a){"use strict";a.r(t);var s=a(37),n=a(163),i=a(159),r=a(160),o=a(63),l=a(162),c=a(161),d=a(1),u=a(20),h=a(632),m=a.n(h),p=a(627),j=a(634),b=(a(633),a(8)),g=a(635),O=(m()(Date.now()).locale("id",g).format("LLLL"),function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).handleInputChange=function(t){var a=t.target.id;e.setState(Object(n.a)({},a,t.target.value))},e.getVolunteerList=function(){fetch("https://auth.aktiv.co.id/api/auth/v1/user/list?role=volunteer",{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"".concat(localStorage.getItem("token"))})}).then((function(e){return e.json()})).then((function(t){var a;console.log("===== GET VOLUNTEER RESPONSE ====="),console.log(t),a=t.data.items.map((function(e){return{volunteerID:e.id,volunteer:e.profile.first_name,volunteerLink:e.profile.volunteerLink,volunteerNoHp:e.profile.noHp,puskesmasID:e.profile.puskesmasID,puskesmas:e.profile.puskesmas}})),e.setState({volunteerList:a})})).catch((function(e){alert(e)}))},e.getDetailPatient=function(){fetch("https://api.aktiv.co.id/api/aktivengine/v1/patient/get?id=".concat(e.props.match.params.akunID),{method:"GET",headers:new Headers({"Content-Type":"application/json",Authorization:"".concat(localStorage.getItem("token"))})}).then((function(e){return e.json()})).then((function(t){var a;console.log("===== GET PATIENT DETAIL RESPONSE ====="),console.log(t),a=t.data,e.setState({patientDetail:a,leaderName:a.leaderName,email:a.email,username:a.username,akunNoHp:a.akunNoHp,isAktivUser:a.isAktivUser,alamatDomisili:a.address.alamatDomisili,alamatIsolasiMandiri:a.address.alamatIsolasiMandiri,selectedVolunteer:a.volunteerID,totalPage:t.data.total_page})})).catch((function(e){alert(e)}))},e.updateDataPatient=function(){var t;e.state.volunteerList.forEach((function(a){a.volunteerID===e.state.selectedVolunteer&&(t=a)}));var a={id:e.state.patientDetail.id,akunID:e.state.akunID,role:e.state.patientDetail.role,leaderName:e.state.leaderName,email:e.state.email,password:e.state.patientDetail.password,username:e.state.username,akunNoHp:e.state.akunNoHp,isAktivUser:e.state.isAktivUser,address:Object(s.a)(Object(s.a)({},e.state.patientDetail.address),{},{alamatDomisili:e.state.alamatDomisili,alamatIsolasiMandiri:e.state.alamatIsolasiMandiri}),members:e.state.patientDetail.members,volunteerID:t.volunteerID,volunteer:t.volunteer,volunteerLink:t.volunteerLink,volunteerNoHp:t.volunteerNoHp,puskesmasID:t.puskesmasID};console.log("Body Update Patient",a),fetch("https://api.aktiv.co.id/api/aktivengine/v1/patient/update",{method:"PUT",body:JSON.stringify(a),headers:new Headers({"Content-Type":"application/json",Authorization:localStorage.getItem("token")})}).then((function(e){return e.json()})).then((function(t){t.hasOwnProperty("status")&&("OK"===t.status?(j.b.success("Update Berhasil",{position:"top-right",autoClose:1e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),e.getDetailPatient()):j.b.error("Update Gagal "+t.statusmsg,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}))})).catch((function(e){return console.error(e)}))},e.deleteMember=function(){if(window.confirm("Apakah anda yakin ingin menghapus data ini")){var t={akunID:e.state.akunID,members:{memberID:e.state.memberID}};fetch("https://api.aktiv.co.id/api/aktivengine/v1/patient/member/delete",{method:"PUT",headers:new Headers({"Content-Type":"application/json",Authorization:"".concat(localStorage.getItem("token"))}),body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(t){console.log("====== Delete Member Response ======="),console.log(t),t.hasOwnProperty("status")&&("OK"===t.status?(j.b.success("Delete Berhasil",{position:"top-right",autoClose:1e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),e.props.history.goBack()):j.b.error("Delete Gagal "+t.statusmsg,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}))})).catch((function(e){alert(e)}))}},e.state={page:1,totalPage:1,akunID:"",leaderName:"",email:"",username:"",akunNoHp:"",isAktivUser:!1,alamatDomisili:"",alamatIsolasiMandiri:"",selectedVolunteer:"",volunteerList:[]},e.handleInputChange=e.handleInputChange.bind(Object(o.a)(e)),e}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.setState({akunID:this.props.match.params.akunID}),this.getDetailPatient(),this.getVolunteerList()}},{key:"render",value:function(){var e=this;return Object(b.jsxs)("div",{className:"container-fluid",children:[Object(b.jsx)(p.R,{children:Object(b.jsx)(p.k,{children:Object(b.jsxs)(p.f,{children:[Object(b.jsxs)(p.j,{children:[Object(b.jsx)("strong",{children:" Biodata"}),Object(b.jsx)(p.e,{className:"float-right btn-facebook btn-brand",onClick:function(){e.updateDataPatient()},children:"Simpan"})]}),Object(b.jsx)(p.g,{children:Object(b.jsxs)(p.u,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(b.jsxs)(p.v,{row:!0,children:[Object(b.jsx)(p.k,{md:"3",children:Object(b.jsx)(p.I,{children:Object(b.jsx)("strong",{children:"Username"})})}),Object(b.jsx)(p.k,{xs:"12",md:"9",children:Object(b.jsx)(p.I,{children:Object(b.jsxs)("strong",{children:[": ",this.state.username]})})})]}),Object(b.jsxs)(p.v,{row:!0,children:[Object(b.jsx)(p.k,{md:"3",children:Object(b.jsx)(p.I,{children:Object(b.jsx)("strong",{children:"Email"})})}),Object(b.jsx)(p.k,{xs:"12",md:"9",children:Object(b.jsx)("p",{className:"form-control-static",children:Object(b.jsx)(p.A,{id:"email",type:"text",onChange:this.handleInputChange,value:this.state.email})})})]}),Object(b.jsxs)(p.v,{row:!0,children:[Object(b.jsx)(p.k,{md:"3",children:Object(b.jsx)(p.I,{children:Object(b.jsx)("strong",{children:"Nama Kepala Keluarga"})})}),Object(b.jsx)(p.k,{xs:"12",md:"9",children:Object(b.jsx)("p",{className:"form-control-static",children:Object(b.jsx)(p.A,{id:"leaderName",type:"text",onChange:this.handleInputChange,value:this.state.leaderName})})})]}),Object(b.jsxs)(p.v,{row:!0,children:[Object(b.jsx)(p.k,{md:"3",children:Object(b.jsx)(p.I,{children:Object(b.jsx)("strong",{children:"No Hp"})})}),Object(b.jsx)(p.k,{xs:"12",md:"9",children:Object(b.jsx)("p",{className:"form-control-static",children:Object(b.jsx)(p.A,{id:"akunNoHp",type:"text",onChange:this.handleInputChange,value:this.state.akunNoHp})})})]}),Object(b.jsxs)(p.v,{row:!0,children:[Object(b.jsx)(p.k,{md:"3",children:Object(b.jsx)(p.I,{children:Object(b.jsx)("strong",{children:"Alamat Domisili"})})}),Object(b.jsx)(p.k,{xs:"12",md:"9",children:Object(b.jsx)("p",{className:"form-control-static",children:Object(b.jsx)(p.A,{id:"alamatDomisili",type:"text",onChange:this.handleInputChange,value:this.state.alamatDomisili})})})]}),Object(b.jsxs)(p.v,{row:!0,children:[Object(b.jsx)(p.k,{md:"3",children:Object(b.jsx)(p.I,{children:Object(b.jsx)("strong",{children:"Alamat Isolasi"})})}),Object(b.jsx)(p.k,{xs:"12",md:"9",children:Object(b.jsx)("p",{className:"form-control-static",children:Object(b.jsx)(p.A,{id:"alamatIsolasiMandiri",type:"text",onChange:this.handleInputChange,value:this.state.alamatIsolasiMandiri})})})]}),Object(b.jsxs)(p.v,{row:!0,children:[Object(b.jsx)(p.k,{md:"3",children:Object(b.jsx)(p.I,{children:Object(b.jsx)("strong",{children:"Pilih Volunteer"})})}),Object(b.jsx)(p.k,{xs:"12",md:"9",children:Object(b.jsx)("p",{className:"form-control-static",children:Object(b.jsxs)(p.S,{id:"selectedVolunteer",onChange:this.handleInputChange,value:this.state.selectedVolunteer,children:[Object(b.jsx)("option",{value:"",children:"-- Pilih Volunteer --"},""),this.state.volunteerList.map((function(e){return Object(b.jsxs)("option",{value:e.volunteerID,children:[e.volunteer," (",e.puskesmas,")"]},e.volunteerID)}))]})})})]})]})})]})})}),Object(b.jsx)(j.a,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0})]})}}]),a}(d.Component));t.default=Object(u.i)(O)}}]);
//# sourceMappingURL=21.754cdad0.chunk.js.map