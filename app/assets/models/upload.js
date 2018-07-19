import {addVideo, showVideo, delVideo} from '../services/api';

export default {
  namespace: 'upload',

  state: {
    fileList: [],
    visible: false,
    step: {},
  },

  effects: {
    *create({payload, callback}, {call, put}) {
      const response = yield call(addVideo, payload);
      yield put({
        type: 'saveStepFormData',
        payload: payload,
      });
      if (callback) callback();
    },
    *show({payload, callback}, {call, put}) {
      const response = yield call(showVideo, payload);
      yield put({
        type: 'saveVideoList',
        payload: response,
      });
      if (callback) callback();
    },
    *del({payload, callback}, {call, put}) {
      const response = yield call(delVideo, payload.id);
      if (response) {
        yield put({
          type: 'saveVideoList',
          payload: payload.newData,
        });
        if (callback) callback();
      }
    },
  },

  reducers: {
    saveVideoList(state, {payload}) {
      return {
        ...state,
        fileList: [
          ...payload,
        ],
      };
    },
    saveStepFormData(state, {payload}) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    saveState(state, {payload}) {
      return {
        ...state,
        [payload.key]: payload.val,
      };
    }
  },
};
