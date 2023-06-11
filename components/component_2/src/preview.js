
const previewEl = document.createElement("div");
previewEl.id = "preview";
document.body.append(previewEl);

const componentName = "component-2";

new Vue({
    el: "#preview",
    render: (h) => {
        h(this[componentName].default, {
            props: {}
        })
    }
})