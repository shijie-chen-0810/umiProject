import { Effect, Reducer } from 'umi';

export interface ItemModalState {
  itemName: string;
}

export interface ItemModalType {
  namespace: 'item';
  state: ItemModalState;
  effects: {
    asyncChange: Effect;
  };
  reducers: {
    syncChange: Reducer;
  };
}

const ItemModal: ItemModalType = {
  namespace: 'item',
  state: {
    itemName: 'arrow',
  },
  effects: {
    *asyncChange(action, temp) {
      console.log(action, temp);
      yield temp.put({
        type: 'syncChange',
        payload: action.payload,
      });
    },
  },
  reducers: {
    syncChange(state, action) {
      console.log(state, action);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default ItemModal;
