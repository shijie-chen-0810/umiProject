import { Effect, Reducer } from 'umi';

export interface HeroModelState {
  heroName: string;
}

export interface HeroModelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const HeroModel: HeroModelType = {
  namespace: 'hero',

  state: {
    heroName: 'hero',
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: payload,
      });
    },
  },
  reducers: {
    save(state, action) {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default HeroModel;
