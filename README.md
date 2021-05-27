# 水波进度球
## 安装
```bash
npm i @tntx/wave --save
```

## 使用
```jsx
import React from 'react';
import Wave from '@tntx/wave';

export default () => {
	return (
		<Wave
			color='#E86452'
			range={67}
			width={400}
		/>
	);
};
```

### API

| 参数            		 | 说明            | 类型   			| 是否必须 | 默认值 |
| ---------------  	   	| --------------- | ------ 				| -------- | ------ |
| width 				| 水波球宽度 			| string 			| 否 | 200px |
| color 				| 水波球颜色(十六进制) 	  | string			| 否 | #07C790 |
| fontSize 				| 字体大小 			    | small \| default \| large | 否 | default |
| range 				| 水波球百分比0～100 	 | Number 			| 否 | 0 |
| fontFamily 			| 字体 				   | string 			| 否 | "宋体" |
