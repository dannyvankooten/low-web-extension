import Vue from 'vue';
import Vuex from 'vuex';
import options from '../datas/options.js';
import getters from './getters';
import mutations from './mutations';
// import * as actions from './actions';
import VuexWebExtensions from 'vuex-webextensions';
// Import the `getField` getter and the `updateField`
// mutation function from the `vuex-map-fields` module.
// import { getField, updateField } from 'vuex-map-fields';
// import watchtest from './watchtest';

let state = {
  pausedWebsites: [],
  pausedPages: [],
};
const nonPersistentState = {
  active: true,
  url: undefined,
  hostname: undefined,
  level: 0,
};

for (let i = 0, lg = options.length; i < lg; i++) {
  const o = options[i];
  state[o.id] = o.value;
}

const persistentVars = Object.keys(state);
state = Object.assign(nonPersistentState, state);

Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [
    VuexWebExtensions({
      // loggerLevel: 'debug',
      persistentStates: persistentVars,
    }),
  ],
  state: state,
  getters: getters,
  mutations,
  // actions,
});