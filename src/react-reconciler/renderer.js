import { act } from "react";
import ReactReconciler from "react-reconciler";

import {
  // DiscreteEventPriority,
  // ContinuousEventPriority,
  DefaultEventPriority,
} from "react-reconciler/constants";

let reconciler = ReactReconciler({
  // host config options
  supportsMutation: true,
  createInstance(
    type,
    props,
    // rootContainerInstance,
    // hostContext,
    // internalInstanceHandle
  ) {
    // console.log("createInstance", { type, props });
    const { children, ...propsCleaned } = props;
    return {
      type,
      props: propsCleaned,
      children: [],
    };
  },
  createTextInstance(
    text,
    // rootContainerInstance,
    // hostContext,
    // internalInstanceHandle
  ) {
    // console.log("createTextInstance", { text });
    return { text };
  },
  appendChildToContainer(container, child) {
    // console.log("appendChildToContainer", { container, child });
    container.children.push(child);
  },
  appendChild(parent, child) {
    // console.log("appendChild", { parent, child });
    parent.children.push(child);
  },
  appendInitialChild(parent, child) {
    // console.log("appendInitialChild", { parent, child });
    parent.children.push(child);
  },
  prepareUpdate(
    // instance,
    // type,
    // oldProps,
    // newProps,
    // rootContainerInstance,
    // currentHostContext
  ) {
    // console.log("TODO: prepareUpdate", { type, oldProps, newProps });
  },
  commitUpdate(
    // instance,
    // updatePayload,
    // type,
    // oldProps,
    // newProps,
    // finishedWork
  ) {
    // console.log("TODO: commitUpdate", { type, oldProps, newProps });
  },
  commitTextUpdate(textInstance, oldText, newText) {
    // console.log("commitTextUpdate:", { textInstance, oldText, newText });
    textInstance.text = newText;
  },
  finalizeInitialChildren() {
    // Logic for finalizing initial children
  },
  getChildHostContext() {
    // Logic for getting child host context
  },
  getPublicInstance() {
    // Logic for getting public instance
  },
  getRootHostContext() {
    // Logic for getting root host context
  },
  prepareForCommit() {
    // Logic before committing changes
  },
  resetAfterCommit() {
    // Logic after committing changes
  },
  shouldSetTextContent() {
    return false;
  },
  getCurrentUpdatePriority() {
    return DefaultEventPriority;
  },
  resolveUpdatePriority() {
    return DefaultEventPriority;
  },
  setCurrentUpdatePriority() {},
  clearContainer() {
    // Logic for clearing container
  },
  maySuspendCommit() {
    return false;
  },
  detachDeletedInstance() {
    // Logic for detaching deleted instance
  },
});

export class Renderer {
  constructor() {
    this.root = { children: [] };
  }

  static async create(element) {
    let renderer = new Renderer();
    const container = reconciler.createContainer(renderer.root, false, false);
    container.onUncaughtError = (error) => {
      console.error(error);
    };
    await act(async () => {
      reconciler.updateContainer(element, container, null, null);
    });
    return renderer;
  }

  find(predicate) {
    return find(this.root, predicate);
  }

  findByType(type) {
    return findByType(this.root, type);
  }

  findByProps(props) {
    return findByProps(this.root, props);
  }

  findByText(text) {
    return findByText(this.root, text);
  }
}

function find(node, predicate) {
  if (predicate(node)) {
    return node;
  }
  if (node.children) {
    for (let child of node.children) {
      let found = find(child, predicate);
      if (found) {
        return found;
      }
    }
  }
}

function findByType(node, type) {
  return find(node, (el) => el.type === type);
}

function findByText(node, text) {
  return find(node, (el) => el.text === text);
}

function findByProps(node, props) {
  return find(node, (el) => {
    if (el.props) {
      for (let key in props) {
        if (typeof el.props[key] === "object" && typeof props[key] === "object") {
          return Object.entries(props[key]).every(([subKey, subValue]) => el.props[key][subKey] === subValue);
        } else
        if (el.props[key] !== props[key]) {
          return false;
        }
      }
      return true;
    }
  });
}