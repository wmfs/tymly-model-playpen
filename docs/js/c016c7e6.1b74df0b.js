(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["c016c7e6"],{8401:function(t,e,r){"use strict";var n=r("e274"),o=r.n(n);o.a},"965c":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{staticClass:"q-pa-md"},[r("q-modal",{model:{value:t.propertyModalShowing,callback:function(e){t.propertyModalShowing=e},expression:"propertyModalShowing"}},[r("div",{staticClass:"q-ma-md"},[r("div",[r("img",{staticClass:"headerIcon",attrs:{src:"statics/"+t.currentItem.image}})]),r("q-field",[r("q-input",{attrs:{"stack-label":"Key"},model:{value:t.currentItem.key,callback:function(e){t.$set(t.currentItem,"key",e)},expression:"currentItem.key"}})],1),r("q-field",[r("q-input",{attrs:{"stack-label":"Title"},model:{value:t.currentItem.title,callback:function(e){t.$set(t.currentItem,"title",e)},expression:"currentItem.title"}})],1),r("q-field",[r("q-checkbox",{attrs:{label:"Required?"},model:{value:t.currentItem.required,callback:function(e){t.$set(t.currentItem,"required",e)},expression:"currentItem.required"}})],1),r("q-field",[r("q-checkbox",{attrs:{label:"Multiple?"},model:{value:t.currentItem.multiple,callback:function(e){t.$set(t.currentItem,"multiple",e)},expression:"currentItem.multiple"}})],1),r("hr"),r("div",[r("q-btn",{staticClass:"q-ma-sm",attrs:{icon:"delete",color:"red"},on:{click:function(e){t.propertyModalShowing=!1}}}),r("q-btn",{staticClass:"q-ma-sm float-right",attrs:{color:"primary",label:"OK"},on:{click:function(e){t.propertyModalShowing=!1}}}),r("q-btn",{staticClass:"q-ma-sm float-right",attrs:{color:"primary",outline:"",label:"Cancel"},on:{click:function(e){t.propertyModalShowing=!1}}})],1)],1)]),r("draggable",{staticClass:"dragArea",attrs:{options:t.modelOptions},on:{choose:t.choose},model:{value:t.modelItems,callback:function(e){t.modelItems=e},expression:"modelItems"}},t._l(t.modelItems,function(e,n){return r("div",{key:n,class:e.key===t.currentItem.key?"selectedModelItem":"model-item"},[r("q-icon",{staticClass:"q-mx-sm grab",attrs:{name:"drag_handle",size:"2rem"}}),r("span",[t._v(t._s(e.key))]),r("q-btn",{staticClass:"float-right q-ma-sm",attrs:{color:"grey",size:"large",icon:"settings",flat:""},nativeOn:{click:function(e){t.edit(n)}}})],1)}))],1)},o=[];n._withStripped=!0;var s=r("1516"),a=r.n(s),i={name:"DragAndDropPage",components:{draggable:a.a},computed:{paletteDrawerOpen:function(){return this.$store.state.paletteDrawerOpen},currentItem:function(){return this.$store.state.currentItem},modelItems:{get:function(){return this.$store.state.currentItems},set:function(t){this.$store.commit("currentItems",t)}},propertyModalShowing:{get:function(){return this.$store.state.propertyModalShowing},set:function(t){this.$store.commit("propertyModalShowing",t)}}},mounted:function(){this.$nextTick(function(){this.$store.commit("paletteDrawerOpen",!0)})},methods:{edit:function(t){this.$store.commit("setCurrentItem",t),this.$store.commit("propertyModalShowing",!0)},choose:function(t){var e=t.newIndex||t.oldIndex;this.$store.commit("setCurrentItem",e)}},data:function(){return{modelOptions:{sort:!0,handle:".grab",animation:150,ghostClass:"ghost",group:"palette"}}}},l=i,c=(r("8401"),r("2877")),m=Object(c["a"])(l,n,o,!1,null,null,null);m.options.__file="Drag-and-drop.vue";e["default"]=m.exports},e274:function(t,e,r){}}]);