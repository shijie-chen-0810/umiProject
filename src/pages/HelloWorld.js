import { Card, Tooltip, Button } from "antd"
import { SearchOutlined } from '@ant-design/icons'
import { useState, useCallback } from "react"
import Myinput from "./../components/Myinput"

export default () => {
  const style = {
    width: "400px",
    margin: "30px",
    border: "1px solid #e8e8e8",
  }
  const [value, setValue] = useState(0);
  const onChange = useCallback((e) => {
    setValue(e.target.value)
  });
  const resetValue = useCallback(() => {
    setValue("")
  });
  return (
    <>
      <Card style={style} actions={[<a>操作一</a>, <a>操作二</a>]}>
        <Card.Meta
          avatar={
            <img
              alt=""
              style={{ width: "64px", height: "64px", borderRadius: "32px" }}
              src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
            />
          }
          title="Alipay"
          description={
            <div className="hello">
              "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。"
            </div>
          }
        />
      </Card>
      <Myinput value={value} onChange={onChange}></Myinput>
      <Tooltip title="search">
        <Button
          type="primary"
          shape="circle"
          icon={<SearchOutlined />}
          onClick={resetValue}
        ></Button>
      </Tooltip>
    </>
  );
};
