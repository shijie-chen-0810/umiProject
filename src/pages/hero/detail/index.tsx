import React, { FC, useEffect, useState, useCallback } from 'react';
import { Carousel } from 'antd';
import { connect, ConnectProps, HeroModelDetail, HeroModelState } from 'umi';
import styles from './index.less';

interface detailProps extends ConnectProps {
  heroDetail: HeroModelDetail;
  getDetail: Function;
  hero: HeroModelState;
}

const HeroDetail: FC<detailProps> = (props) => {
  const {
    heroDetail,
    location: { query },
  } = props;
  const [nowSkin, setNowSkin] = useState(0);
  const showSkinArr = heroDetail.skins.filter((item) => {
    return item.chromas === '0';
  });
  const changeSkin = useCallback((current) => {
    setNowSkin(current);
  }, []);
  useEffect(() => {
    props.getDetail(Number(query.id));
  }, []);
  return (
    <div className={styles.banner}>
      <Carousel afterChange={changeSkin} autoplay>
        {showSkinArr.map((item) => {
          return (
            <p key={item.skinId} className={styles.bannerItem}>
              <img
                src={`https://game.gtimg.cn/images/lol/act/img/skin/big${item.skinId}.jpg`}
                alt=""
              />
            </p>
          );
        })}
      </Carousel>
      <p>
        <span>皮肤名称：</span>
        {showSkinArr[nowSkin] && showSkinArr[nowSkin].name}
      </p>
      <p>
        <span>英雄：</span>
        {heroDetail.hero.name}
      </p>
      <p>
        <span>价格：</span>
        {heroDetail.hero.goldPrice}
      </p>
      <p>
        <span>title:</span>
        {heroDetail.hero.title}
      </p>
    </div>
  );
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
