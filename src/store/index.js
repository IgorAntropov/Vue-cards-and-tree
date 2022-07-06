import { createStore } from 'vuex';

//не плохо было бы если бы вы айди добавили в json, он как бы обязательный и уникальный, что значительно упрощает задачу)

export default createStore({
  state: {
    data: []
  },
  getters: {
  },
  mutations: {
    CHANGE_STATE_VISIBLE: (state, payload) => {
      state.data.reduce((accumulator, currentValue) => {
        if (currentValue.timestamp === payload.item.timestamp && currentValue.category === payload.item.category && currentValue.filesize === payload.item.filesize) {
          if (!currentValue.visible) {
            currentValue.visible = true;
          }

          currentValue.visible = payload.visible;
        }

        return accumulator;
      }, []);

      localStorage.setItem('state', JSON.stringify(state.data));
    },
    SHOW_ALL_CARDS: (state, payload) => {
      state.data.reduce((accumulator, currentValue) => {
        currentValue.visible = payload.visible;

        return accumulator;
      }, []);

      localStorage.removeItem('state');
    },
    UPLOAD_DATA: (state, payload) => {
      state.data = payload.data;
    }
  },
  actions: {
    CHANGE_STATE_VISIBLE({commit}, payload) {
      commit('CHANGE_STATE_VISIBLE', payload);
    },
    SHOW_ALL_CARDS({commit}, payload) {
      commit('SHOW_ALL_CARDS', payload);
    },
    UPLOAD_DATA({commit}, payload) {
      commit('UPLOAD_DATA', payload);
    },
  },
  modules: {
  }
})
