class Element {
  tagName = "";
  attributes = {};
  children = [];
  constructor(tagName, attributes, children) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = children;
  }
  render() {
    const element = document.createElement(this.tagName);
    Object.keys(this.attributes).forEach((key) => {
      setAttribute(element, key, this.attributes[key]);
    });
    let children = this.children;
    children.forEach((child) => {
      let childElement =
        child instanceof Element
          ? child.render()
          : document.createTextNode(child);

      element.appendChild(childElement);
    });
    return element;
  }
}
function createElement(tagName, attributes, children) {
  return new Element(tagName, attributes, children);
}

const virtualDomList = createElement("ul", { id: "list" }, [
  createElement("li", { class: "chapter" }, ["chapter1"]),
  createElement("li", { class: "chapter" }, ["chapter2"]),
  createElement("li", { class: "chapter" }, ["chapter3"]),
]);

function setAttribute(node, key, value) {
  switch (key) {
    case "style":
      node.style.cssText = value;
      break;
    case "value":
      let tagName = node.tagName || "";
      tagName = tagName.toLowerCase();
      if (tagName === "input" || tagName === "textarea") {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}
function renderDom(element, target) {
  target.appendChild(element);
}
console.log(virtualDomList );
renderDom(virtualDomList.render(), document.body);

function walkToDiff() {}

const diff = (oldVirtualDom, newVirtualDom) => {
  let patches = {};
  walkToDiff(oldVirtualDom, newVirtualDom, 0, patches);
  return patches;
};
