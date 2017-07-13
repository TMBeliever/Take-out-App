# 外卖App
<ul>
<li> 一个采用vue2.0+vue-router+vue-resource建立的简单外卖app</br></li>
 <li>数据是简单的mock数据 由node的express框架简单搭建的服务器提供</li>
 <li>采用了组件化的开发方式</li>
</ul>

## 使用技术

* 技术：html5、css\css3、javascript\es5
* 框架：vuejs
* 测试框架：jasmine、karma
* 打包工具：webpack
* 依赖管理构建工具：npm
* 必需环境：nodejs
* 版本管理工具：git
* 开发工具（强烈建议）：webstorm
* 浏览器：至少支持es5的浏览器，包括ie9及以上版本，edge，safari，opera，chrome，firefox等。

## 技术学习资料

1. Html5 javascript api：http://html5index.org/ 
2. Html5标准：https://www.w3.org/TR/html5/
3. Vue.js文档：https://cn.vuejs.org/ 
4. Vuex文档：https://vuex.vuejs.org/zh-cn/ 
5. 测试框架文档：https://jasmine.github.io/ https://karma-runner.github.io/1.0/index.html
6. Webpack 中英文文档：https://webpack.js.org/  https://doc.webpack-china.org/
7. Npm文档： https://www.npmjs.com/ （可选）
8. Nodejs 中英文文档：https://nodejs.org/en/  https://nodejs.org/zh-cn/ （可选）
9. Git学习手册： https://git-scm.com/book/zh/v2  

10. 浏览器支持es5情况：http://caniuse.com/#feat=es5 

## 一般规范

1. 文件命名必须全为小写字母。
2. 文件名存在多个字母时使用连字符(-)分隔。所有组件名以uh-开头。
3. 所有文件（html、css、js等）的每个缩进为4个空格。
4. 为代码添加注释时，无论是在js模块上添加注释，还是在js方法上，或者是在某段代码上，或者为css、html等添加注释，不仅要写代码做了什么，更重要的是背后的思考是什么，特别是对某些特殊情况的考虑。

## html编码规范

1. 使用 HTML5的文档类型申明：<!DOCTYPE html>。
2. 使用HTML5最新的语义化标签，比如nav、aside等。
3. 块级元素可以包含内联元素或某些块级元素，但内联元素不能包含块级元素，它只能包含其它内联元素。
4. 块级元素不能放在p里面。
5. 有几个特殊的块级元素只能包含内联元素，不能包含块级元素。如h1,h2,h3,h4,h5,h6,p,dt
6. 块级元素与块级元素并列、内联元素与内联元素并列。

## css编码规范

1. 所有的样式尽可能只通过class选择器设置，尽量不要使用id、子选择器等。
2. 使用BEM命名规范。BEM 把样式名分为 3 个级别，分别是：
* Block：对应模块名，如 Dialog
* Element：对应模块中的节点名 Confirm Button
* Modifier：对应节点相关的状态，如 disabled、highlight

综上，BEM 最终得到的 class 名为 dialog\__confirm-button--highlight。使用双符号 __ 和 -- 是为了和区块内单词间的分隔符区分开来。</br>
参考资料如下：</br>
http://www.w3cplus.com/css/bem-definitions.html </br>
http://www.w3cplus.com/preprocessor/getting-sass-y-with-bem.html </br>
http://www.w3cplus.com/css/mindbemding-getting-your-head-round-bem-syntax.html

## javascript编码规范

1. 语言级别的编码规范请参考如下资料，仔细阅读并遵守：
https://standardjs.com/rules-zhcn.html 
2. 每个js模块的开头必须添加注释说明该模块的作用。
3. 每个js方法前必须添加注释说明该方法的作。
4. js方法上的注释格式：</br>
 /**</br>
 \* 方法描述。</br>
\ *</br>
\* @param {参数的类型} 对应方法中各个参数的解释，每个参数对应一个@param，如果参数类型有多个，</br>
\* 使用逗号分隔，如{String,Function}，如果可以是任何类型，则使用Any作为类型标记。</br>
\* @shadowParam 用于描述未在函数的参数列表中定义的参数。</br>
\ * @returns {返回值的类型} 方法的返回值的描述</br>
\*/</br>
如果使用webstorm，可自动生成。</br>

