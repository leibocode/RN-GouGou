# RN-GouGou
一款配音短视频app，目前只开发了ios版本,
## 技术栈:RN+Node+es6+mongodb

#项目启动
##客户端
* 安装RN开发环境
* npm install 
* npm install rnpm -g  rnpm 
* react-native run-ios

## 服务端
* yarn
* yarn run dev

# 功能介绍
### 列表首页
* 下拉更新
* 上拉加载更多
* 点赞
* 点击视频进入详情

![](https://github.com/leibocode/RN-GouGou/blob/master/images/1.png)

### 详情页
* 播放视频
* 点击评论框进入评论
* 评论列表

![](https://github.com/leibocode/RN-GouGou/blob/master/images/2.png)


### 评论
![](https://github.com/leibocode/RN-GouGou/blob/master/images/6.png)

### 发布配音视频页面 
* 视频上传到七牛,生成静音视频,同步上传到cloudinary
* 音频上传到cloudinary,合并配音音频和静音视频生成新的视频

![](https://github.com/leibocode/RN-GouGou/blob/master/images/3.png)

### 个人中心

![](https://github.com/leibocode/RN-GouGou/blob/master/images/4.png)

### 个人资料

![](https://github.com/leibocode/RN-GouGou/blob/master/images/5.png)

## 注册
![](https://github.com/leibocode/RN-GouGou/blob/master/images/7.png)


### 待完成
* 由于上手react-native不足一个月 ,写的出来的东西比较粗浅
* 后期 打算完善个人中心,其他页面的优化和安卓版本

### 最后
作者比较懒，不要期待快速更新
