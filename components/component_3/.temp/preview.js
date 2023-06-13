
const previewEl = document.createElement("div");
previewEl.id = "preview";
document.body.append(previewEl);

const componentName = "my-component_3";

new Vue({
    el: "#preview",
    render: (h) => 
        h(this[componentName].default, {
            props: {}
        })
    
})