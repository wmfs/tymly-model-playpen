(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["c016c7e6"],{8401:function(t,e,r){"use strict";var i=r("e274"),o=r.n(i);o.a},"965c":function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{staticClass:"q-pa-md"},[r("q-modal",{attrs:{"no-backdrop-dismiss":""},on:{"escape-key":t.cancelEdit},model:{value:t.propertyModalShowing,callback:function(e){t.propertyModalShowing=e},expression:"propertyModalShowing"}},[r("div",{staticClass:"q-ma-md"},[r("div",[r("img",{staticClass:"headerIcon",attrs:{src:"statics/"+t.editableProperty.image}})]),r("q-field",[r("q-input",{attrs:{"stack-label":"Key"},model:{value:t.editableProperty.key,callback:function(e){t.$set(t.editableProperty,"key",e)},expression:"editableProperty.key"}})],1),r("q-field",[r("q-input",{attrs:{"stack-label":"Title"},model:{value:t.editableProperty.title,callback:function(e){t.$set(t.editableProperty,"title",e)},expression:"editableProperty.title"}})],1),r("q-field",[r("q-checkbox",{attrs:{label:"Required?"},model:{value:t.editableProperty.required,callback:function(e){t.$set(t.editableProperty,"required",e)},expression:"editableProperty.required"}})],1),r("q-field",[r("q-checkbox",{attrs:{label:"Multiple?"},model:{value:t.editableProperty.multiple,callback:function(e){t.$set(t.editableProperty,"multiple",e)},expression:"editableProperty.multiple"}})],1),r("hr"),r("div",[r("q-btn",{staticClass:"q-ma-sm",attrs:{icon:"delete",color:"red"},on:{click:t.deleteEdit}}),r("q-btn",{staticClass:"q-ma-sm float-right",attrs:{color:"primary",label:"OK"},on:{click:t.saveEdit}}),t.editableProperty.firstEdit?t._e():r("q-btn",{staticClass:"q-ma-sm float-right",attrs:{color:"primary",outline:"",label:"Cancel"},on:{click:t.cancelEdit}})],1)],1)]),r("draggable",{staticClass:"dragArea",attrs:{options:t.modelOptions},on:{choose:t.choose},model:{value:t.modelItems,callback:function(e){t.modelItems=e},expression:"modelItems"}},t._l(t.modelItems,function(e,i){return r("div",{key:i,class:e.key===t.currentItemKey?"selectedModelItem":"model-item"},[r("q-icon",{staticClass:"q-mx-sm grab",attrs:{name:"drag_handle",size:"2rem"}}),r("span",[t._v(t._s(e.key))]),r("q-btn",{staticClass:"float-right q-ma-sm",attrs:{color:"grey",size:"large",icon:"settings",flat:""},nativeOn:{click:function(e){t.edit(i)}}})],1)}))],1)},o=[];i._withStripped=!0;r("ac6a");var s=r("1516"),a=r.n(s),n={name:"DragAndDropPage",components:{draggable:a.a},computed:{paletteDrawerOpen:function(){return this.$store.state.paletteDrawerOpen},editableProperty:{get:function(){return this.$store.state.editableProperty},set:function(){this.$store.commit("editableProperty",v)}},currentItemKey:function(){return this.$store.state.currentItemKey},modelItems:{get:function(){return this.$store.state.currentItems},set:function(t){this.$store.commit("currentItems",t)}},propertyModalShowing:{get:function(){return this.$store.state.propertyModalShowing},set:function(t){this.$store.commit("propertyModalShowing",t)}}},mounted:function(){this.$nextTick(function(){this.$store.commit("paletteDrawerOpen",!0)})},methods:{cancelEdit:function(){this.propertyModalShowing=!1},deleteEdit:function(){var t=this.$store.state.currentItemKey,e=0,r=null;this.$store.state.currentItems.forEach(function(i){i.key===t&&(r=e),e++}),this.$store.commit("removeItem",r),this.propertyModalShowing=!1,this.$store.commit("setCurrentItem",null)},saveEdit:function(){var t=this,e=this.$store.state.currentItemKey,r=this.$store.state.editableProperty,i=0;this.$store.state.currentItems.forEach(function(o){o.key===e&&(o.example=r.example,o.key=r.key,o.multiple=r.multiple,o.required=r.required,o.title=r.title,o.firstEdit=!1,t.$store.commit("setCurrentItem",i)),i++}),this.propertyModalShowing=!1},edit:function(t){this.$store.commit("setCurrentItem",t),this.$store.commit("editableProperty",JSON.parse(JSON.stringify(this.$store.state.currentItem))),this.$store.commit("propertyModalShowing",!0)},choose:function(t){var e=t.newIndex||t.oldIndex;this.$store.commit("setCurrentItem",e)}},data:function(){return{modelOptions:{sort:!0,handle:".grab",animation:150,ghostClass:"ghost",group:"palette"}}}},l=n,c=(r("8401"),r("2877")),d=Object(c["a"])(l,i,o,!1,null,null,null);d.options.__file="Drag-and-drop.vue";e["default"]=d.exports},e274:function(t,e,r){}}]);