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
    console.log("createInstance", { type, props });
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
    console.log("createTextInstance", { text });
    return text;
  },
  appendChildToContainer(container, child) {
    console.log("appendChildToContainer", { container, child });
    container.children.push(child);
  },
  appendChild(parent, child) {
    console.log("appendChild", { parent, child });
    parent.children.push(child);
  },
  appendInitialChild(parent, child) {
    console.log("appendInitialChild", { parent, child });
    parent.children.push(child);
  },
  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    // rootContainerInstance,
    // currentHostContext
  ) {
    console.log("TODO: prepareUpdate", { type, oldProps, newProps });
  },
  commitUpdate(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    // finishedWork
  ) {
    console.log("TODO: commitUpdate", { type, oldProps, newProps });
  },
  commitTextUpdate(textInstance, oldText, newText) {
    console.log("commitTextUpdate:", { textInstance, oldText, newText });
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

export async function render(element) {
  let root = { children: [] };
  let container = reconciler.createContainer(root, false, false);
  container.onUncaughtError = (error) => {
    console.error(error);
  };
  await act(async () => {
    reconciler.updateContainer(element, container, null, null);
  });
  console.log(JSON.stringify(root, null, 2));
  return { root };
}
