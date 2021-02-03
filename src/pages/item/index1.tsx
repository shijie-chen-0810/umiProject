import { FC, useCallback } from 'react';
import { connect, ConnectProps, HeroModelState, ItemModalState } from 'umi';

interface PropsType extends ConnectProps {
  item: ItemModalState;
  hero: HeroModelState;
  test: Function;
}
const ItemConp: FC<PropsType> = (props) => {
  const changeItemName = useCallback(() => {
    props.test(props.hero.heroName);
  }, []);
  return (
    <>
      <div>Item Page</div>
      <div>this is {props.hero.heroName}</div>
      <button onClick={changeItemName}>click</button>
    </>
  );
};

export default connect(
  ({ item, hero }: { item: ItemModalState; hero: HeroModelState }) => ({
    item,
    hero,
  }),
  (dispatch) => ({
    test(name: string) {
      dispatch({
        type: 'item/asyncChange',
        payload: { itemName: name },
      });
    },
  }),
)(ItemConp);
