# own-bookmark-plugin

实现与众不同的Chrome收藏夹插件

## 缘由

Chrome / Firefox 内嵌的收藏功能比较鸡肋，只能够将书签收藏至某一文件夹中。仅支持标题修改，标记效果差，收藏多个书签后很难通过记忆找到某一书签。

另外，大部分页面内容往往涉及到多个主题、领域，单个文件夹很难对某一页面内容进行完整概括，需要多个标签来标记该页面。

部分页面可能会由于各种各样原因失效，因此需要一个快照功能定期抓取页面保存以供预览。

最后，移动端大量浏览器信息不互通（尤其是 Android），导致在移动端收藏的页面往往同桌面端相隔离，往往需要中介转发一下才能够在另一端打开，体验相当不好。

## 目标

- 书签的多标签收藏
    - 高效收藏交互
    - 标签和标题的模糊查找
    - 类锤子"大爆炸"生成标签并自动选中
- 服务端存储同步 & 跨平台使用
    - 服务端标签数据存储
    - 响应式的标签管理页
    - 回收站功能
    - 跨平台使用 - 移动端浏览器添加到桌面功能
- 网页快照抓取和存储
    - SPA 抓取挂载后页面，并移除 JavaScript
    - 适当滚动懒加载部分内容
    - Diff 更新

## 方案

### 技术栈

- Vue
- [Vuetify](https://vuetifyjs.com/)
- Koa

### 书签的多标签收藏

#### 页面组成情况

- Popup 页：集成至 Chrome 地址栏右侧，点击插件图标后弹出，主要提供收藏和搜索书签功能
  - 收藏时同步收藏至 Chrome 收藏夹中（创建一个 OwnBookmark 收藏夹）
  - 收藏时同步下载 Favicon
- 管理页
    - 设置：提供服务端 token 设置、主题等设置
    - 书签管理：这里插件和服务端各内置一份，如果设置了服务端则使用 iframe 套服务端
    - 反馈 & Github：直接跳 GitHub Issues

#### 组件方案

- [书签添加和修改组件、搜索组件](https://vuetifyjs.com/en/components/combobox/#misc)
- [管理页标签修改效果](https://codepen.io/tjramage/pen/yOEbyw?editors=0110)

### 服务端存储同步 & 跨平台使用

- 校验：单用户，只使用密码，登陆后发放 token 并设置到插件中，插件使用 token 同步
- 书签管理：与插件中管理页书签管理页面相同，但需要提供 token 鉴权
    - 支持响应式，交互兼容移动端
    - 移动端通过浏览器-添加到桌面实现快捷使用（类似快应用）
    - 导入导出

### 网页快照抓取和存储

初定 puppeteer headless + docker 抓

#### 调研技术栈

- [puppeteer](https://github.com/puppeteer/puppeteer) 效果和可自定义情况好，也容易应付复杂情况，但占用大，效率不够高。
- [website-scraper](https://github.com/website-scraper/node-website-scraper) 轻量，但暂时不知道会不会被反爬虫屏蔽，另外 SPA 页面和懒加载内容保存效果可能不好。
- JSDOM 以及其他模拟 DOM 的库：从这里出发可能工作量会很大，而且对于一些比较复杂的情况（如视频、Canvas），JSDOM 可能会缺少对应 API 导致脚本异常终止使得页面渲染异常。

#### ISSUES

- SPA 应用很难界定网页加载情况
- 部分网站会检查 domain 情况，非白名单域名会自动卸载页面根结点`#app`（网页自杀白屏），在挂载好 DOM 节点保存后，需要屏蔽 JavaScript 防止自杀
- 页面中部分懒加载内容需要模拟滚动后才会加载产生。
- 站点分 mobile / desktop 布局时，可能需要模拟移动设备再访问和存储一次。

## ISSUES

- 移动端浏览器不支持插件，所以移动端 -> 桌面端的书签同步不能只使用 Web 技术打通，需要 Chromium 包装一个 App ，使用浏览器的`分享至`功能来打通。

## Resources

- [Drag & Drop Sample](https://codepen.io/tjramage/pen/yOEbyw?editors=0110)
- [website-scraper](https://github.com/website-scraper/node-website-scraper)
- [puppeteer](https://github.com/puppeteer/puppeteer)
- [node-segment 中文分词](https://github.com/leizongmin/node-segment)
- [Fuse.js](https://github.com/krisk/fuse)
