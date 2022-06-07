import Emitter from "component-emitter";
export default ({}, inject) => {
  inject('eventBus', new Emitter());
}
