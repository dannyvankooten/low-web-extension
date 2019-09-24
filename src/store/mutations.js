import * as types from './mutation-types';

export default {
  // [types.UPDATE_FOO](state, payload) {
  //   state.foo = payload;
  // },
  [types.SAVE_DATA](state, payload) {
    state.save_data = payload;
  },
  [types.CSS_ANIMATION](state, payload) {
    state.css_animation = payload;
  },
  [types.BLOCK_IMAGES](state, payload) {
    state.block_images = payload;
  },
  [types.BLOCK_VIDEOS](state, payload) {
    state.block_videos = payload;
  },
  [types.BLOCK_FONTS](state, payload) {
    state.block_fonts = payload;
  },
  [types.BLOCK_SCRIPTS](state, payload) {
    state.block_scripts = payload;
  },
  [types.IMAGE_SRCSET](state, payload) {
    state.image_srcset = payload;
  },
  [types.IMAGE_LAZYLOAD](state, payload) {
    state.image_lazyload = payload;
  },
  [types.IFRAME_LAZYLOAD](state, payload) {
    state.iframe_lazyload = payload;
  },
};
