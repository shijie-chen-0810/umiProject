import { Effect, Reducer, Subscription, request } from 'umi';

export interface HeroModelState {
  heroName: string;
  heroDetail: HeroModelDetail;
  nowType: string;
  heroList: Array<HeroModelList>;
  freeHero: Array<HeroModelList>;
}

export interface HeroModelDetail {
  hero: HeroModelList;
  skins: Array<any>;
  spells: Array<any>;
}

export interface HeroModelList {
  heroId: number;
  alias: string;
  name: string;
  title: string;
  goldPrice: string;
  roles: Array<string>;
}
export interface HeroModelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    query: Effect;
    getHeroDetail: Effect;
    getFreeHero: Effect;
  };
  reducers: {
    save: Reducer;
    changeDetail: Reducer;
    changeFreeHero: Reducer;
    changeType: Reducer;
  };
  subscriptions: { setup: Subscription };
}

const HeroModel: HeroModelType = {
  namespace: 'hero',

  state: {
    heroName: '测试hero名称',
    nowType: '',
    heroDetail: {
      hero: {
        heroId: 0,
        alias: '',
        name: '',
        title: '',
        goldPrice: '',
        roles: [],
      },
      skins: [],
      spells: [],
    },
    heroList: [],
    freeHero: [],
  },

  effects: {
    *query(action, { call, put }) {
      const data = yield request('/web201605/js/herolist.json');
      yield put({
        type: 'save',
        payload: data.reverse(),
      });
    },
    *getHeroDetail({ payload }, { call, put }) {
      const data = yield request(
        `/lm/images/lol/act/img/js/hero/${payload}.js`,
      );
      console.log(data, payload);
      yield put({
        type: 'changeDetail',
        payload: data,
      });
    },
    *getFreeHero(action, { put }) {
      const freeHeroList = yield request('/freeheros.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          number: 10,
        }),
      });
      yield put({
        type: 'changeFreeHero',
        payload: freeHeroList,
      });
    },
  },
  reducers: {
    save(state, action) {
      console.log({
        ...state,
        heroList: action.payload,
      });
      return {
        ...state,
        heroList: action.payload,
      };
    },
    changeDetail(state, action) {
      state.heroDetail = { ...action.payload };
      return {
        ...state,
      };
    },
    changeFreeHero(state, action) {
      return {
        ...state,
        freeHero: action.payload,
      };
    },
    changeType(state, action) {
      return {
        ...state,
        nowType: action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hero') {
          dispatch({
            type: 'query',
          });
          dispatch({
            type: 'getFreeHero',
          });
        }
      });
    },
  },
};

export default HeroModel;
