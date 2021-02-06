import React, { FC, useEffect } from 'react';
import {
  connect,
  ConnectProps,
  HeroModelDetail,
  HeroModelState,
  useParams,
} from 'umi';

interface detailProps extends ConnectProps {
  heroDetail: HeroModelDetail;
  getDetail: Function;
  hero: HeroModelState;
}

const HeroDetail: FC<detailProps> = (props) => {
  const { heroDetail, hero } = props;
  const params = useParams();
  console.log(heroDetail, hero);
  useEffect(() => {
    props.getDetail(Number(params));
  }, []);
  return <div>{params.detailid}</div>;
};

export default connect(
  ({ hero }: { hero: HeroModelState }) => ({
    heroDetail: hero.heroDetail,
    hero,
  }),
  (dispatch) => ({
    getDetail(id: number) {
      dispatch({
        type: 'hero/getHeroDetail',
        payload: id,
      });
    },
  }),
)(HeroDetail);
