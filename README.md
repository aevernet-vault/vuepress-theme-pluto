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



## Todo

+ 定制侧边栏(`sidebar`)
+ 定制首页(`/`)