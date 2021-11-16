## 扩展 frontmatter

### 评论

+ 若配置了评论，默认会加载评论组件
+ 全局关闭评论
```js
themeConfig: {
  hideComment: true
}
```

+ 局部关闭：在指定文档的 `frontmatter` 中设置
```yaml
---
hideComment: true
---
```


## 添加插槽

+ TODO：适当添加一些插槽，允许主题的进一步定制


## 修改样式

由于主题色的控制，主要依据修改 CSS 变量来实现，我将区分使用 CSS 变量和 Stylus 变量：
+ CSS 变量：主要用于换肤，以及一些与颜色变换相关的变量，可在 `themeConfig` 中指定选项覆盖
+ Stylus 变量：主要用于控制页面布局、与主题无关的样式，可在 `palette.styl` 中覆盖


### Stylus 变量

+ [Vuepress](https://vuepress.vuejs.org/zh/config/#palette-styl)预定义的 Stylus 变量
```styl
// 颜色
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
$arrowBgColor = #ccc
$badgeTipColor = #42b983
$badgeWarningColor = darken(#ffe564, 35%)
$badgeErrorColor = #DA5961

// 布局
$navbarHeight = 3.6rem
$sidebarWidth = 20rem
$contentWidth = 740px
$homePageWidth = 960px

// 响应式变化点
$MQNarrow = 959px
$MQMobile = 719px
$MQMobileNarrow = 419px
```

+ 本主题扩增的变量
```styl

```


### CSS 变量

+ 适配了深色模式，添加主题色定制
```js
themeConfig: {
  // ...
  modeOptions: {
    mode: "auto",  // 默认的主题模式
    light: {
      // light 模式下的 css 变量
      '--text-color': '#242424'
    },
    dark: {
      // dark 模式下的 css 变量
      '--text-color': '#f8f8f8'
    }
  }
}
```

+ 默认变量如下，你可以添加同名的选项来覆盖默认变量

|变量|light|dark|描述|
|-|-|-|-|
|--default-color-10|rgba(255, 255, 255, 1) |rgba(0, 0, 0, 1) |
|--default-color-9 |rgba(255, 255, 255, .9)|rgba(0, 0, 0, .9)|
|--default-color-8 |rgba(255, 255, 255, .8)|rgba(0, 0, 0, .8)|
|--default-color-7 |rgba(255, 255, 255, .7)|rgba(0, 0, 0, .7)|
|--default-color-6 |rgba(255, 255, 255, .6)|rgba(0, 0, 0, .6)|
|--default-color-5 |rgba(255, 255, 255, .5)|rgba(0, 0, 0, .5)|
|--default-color-4 |rgba(255, 255, 255, .4)|rgba(0, 0, 0, .4)|
|--default-color-3 |rgba(255, 255, 255, .3)|rgba(0, 0, 0, .3)|
|--default-color-2 |rgba(255, 255, 255, .2)|rgba(0, 0, 0, .2)|
|--default-color-1 |rgba(255, 255, 255, .1)|rgba(0, 0, 0, .1)|
|--background-color|     #fff              |#1e1f1c          |
|--background-color-block|#f3f4f4          |#272822          |
|--box-shadow|`0 1px 8px 0 rgba(0, 0, 0, 0.1)`|`0 1px 8px 0 rgba(0, 0, 0, .6)`|
|--box-shadow-hover|`0 2px 16px 0 rgba(0, 0, 0, 0.2)`|`0 2px 16px 0 rgba(0, 0, 0, .7)`|
|--text-color|#242424|#f8f8f8|
|--text-color-sub|#7F7F7F|#8B8B8B|
|--border-color|#eaecef|rgba(0, 0, 0, .3)|
|--code-color|#ffc0cb|#ffc0cb|
|--mask-color|#888|#000|



### 响应式

为了保证更好的阅读体验，调整了一些响应式变化的位置，以及定制了主题：
+ 将 Sidebar 和 Toc 分离，在大屏下的阅读体验更佳
+ 适当处理窄屏幕下的页面显示，保证内容块以及 Toc 能显示更多内容
+ 在小屏幕下的阅读体验也有提升

以下是本主题设计的响应式变化位置
|屏幕|宽度|内容块宽度|备注|
|-|-|-|-|
|大屏 desktop|1360 ~ ...|880 ~ 1120|显示 Sidebar, Toc|
|中屏 desktop，大屏 ipad 横屏|1200 ~ 1359|760 ~ 920|显示 Sidebar, Toc，但收窄宽度、缩小字体|
|小屏 desktop，小屏 ipad 横屏|1000 ~ 1199|760 ~ 960|显示 Toc，隐藏 Sidebar；同时添加辅助导航栏|
|ipad 竖屏，手机|0 ~ 999|0 ~ 999|隐藏 Sidebar, Toc；同时添加辅助导航栏|


你可以定制一些 Stylus 变量来修改响应式变化点以及各尺寸来调整内容的显示：
```stylus
$MQNarrow = 1359px            // 小屏幕客户端 / ipad 横屏
$MQMobile = 1199px            // 超宽屏幕手机 / ipad 竖屏
$MQMobileNarrow = 999px       // 小屏幕手机

$homePageWidth = 1126px       // 首页宽度
$sidebarWidth = 16rem         // 边栏宽度
$tocWidth = 16rem             // 目录宽度
$contentWidth = 1060px        // 最大内容宽度
$pageWidth ?= 1600px          // 最大页面宽度

$navbarHeight = 54px          // 导航栏高度
$navbarSubHeight = 50px       // 辅助导航栏高度
$navbarActiveHeight = 40px    // 辅助工具栏高度
```


## Todo

+ 定制首页(`/`)