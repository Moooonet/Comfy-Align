<div align="center">
<img src="https://moooonet.github.io/assets/Comfy-Align/images/Comfy-Align.png" width="100%">
<br><br>

[![English](https://img.shields.io/badge/Languages-English-blue)](README.md)
[![简体中文](https://img.shields.io/badge/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-blue)](README_zh.md)
[![License](https://img.shields.io/badge/License-GPL3.0-red)](https://www.gnu.org/licenses/gpl-3.0.en.html)
[![submit issue](https://img.shields.io/badge/Submit-issue-cyan)](https://github.com/Moooonet/Comfy-Align/issues)
</div>

---
<div align="center">
  <p>ComfyUI 的强大节点对齐与节点配色插件，旨在提升您的工作流效率</p>
</div>

> *作为强迫症俱乐部的认证成员，我意识到ComfyUI需要一位专业级的对齐治疗师（可选配色疗法）。于是我决定客串UX设计师开发这个插件。
> 我的名字中包含"月"，所以我厚颜无耻地释放了内心的月亮神力，把自定义取色器图标做成了新月形状。*


在使用ComfyUI原生的颜色功能时，我注意到它会同时染色节点的标题栏和面板。这会在工作流的相应节点中添加"color"和"bgcolor"参数，但节点内的各项参数的背景保持不变（默认为深灰色）。这可能导致两个问题：
- 可读性问题，使节点标题或面板参数难以阅读（尤其是高亮度或过饱和的颜色）
- 参数背景和面板颜色之间的丑陋视觉不协调，创造出美学上难以忍受的节点

这就是为什么本插件的颜色管理只改变标题栏背景 - 使不同节点立即可区分，同时保持工作流的整洁。这一设计灵感来自Blender的节点。

已在ComfyUI Desktop版完成测试——运行比强迫症对齐的网格还要丝滑。祝各位像素对齐愉快！

### 若本插件成功守护了您的理智：
  ⭐ 请来颗星星（用于维持咖啡因依赖）


## 功能

- **节点对齐** - 将节点对齐到左侧、右侧、顶部、底部，水平等距分布、垂直等距分布
- **节点拉伸** - 拉伸节点以匹配尺寸或对齐到边缘
- **颜色管理** - 对节点和组应用预定义颜色或使用自定义颜色
- **直观的UI** - 通过Alt+A激活的十字径向面板

## 安装

1. 克隆此仓库：
   ```bash
   cd ComfyUI/custom_nodes

   git clone https://github.com/Moooonet/ComfyUI-Align.git
   ```
2. 重启ComfyUI

## 使用方法

1. 在ComfyUI工作区中选择两个或更多节点
2. 按`Alt+A`呼出十字面板
3. 点击所需的操作图标

## 详细介绍

### 基础对齐

- **左对齐** - 将所有选定节点对齐到最左边缘
- **右对齐** - 将所有选定节点对齐到最右边缘
- **顶部对齐** - 将所有选定节点对齐到顶部边缘
- **底部对齐** - 将所有选定节点对齐到底部边缘
- **水平等距左对齐** - 沿水平轴等间距分布节点，并以最左侧节点为基准左对齐
- **垂直等距顶对齐** - 沿垂直轴等间距分布节点，并以最顶部节点为基准顶对齐

### 节点拉伸

- **左拉伸** - 将节点拉伸到左边缘。如果已经左对齐，则调整右侧使宽度相等
- **右拉伸** - 将节点拉伸到右边缘。如果已经右对齐，则调整左侧使宽度相等
- **顶部拉伸** - 将节点拉伸到顶部边缘。如果已经顶部对齐，则调整底部使高度相等
- **底部拉伸** - 将节点拉伸到底部边缘。如果已经底部对齐，则调整顶部使高度相等
- **水平拉伸** - 使所有节点与最宽节点的宽度相同
- **垂直拉伸** - 使所有节点与最高节点的高度相同

### 颜色管理

颜色修改支持节点和节点组。插件包含预定义颜色: 

| 颜色 | Hex代码 | 描述 |
|-------|----------|-------------|
| 🔴 | #a93232 | 红色 |
| 🟠 | #79461d | 橙色 | 
| 🟡 | #6e6e1d | 黄色 |
| 🟢 | #2b652b | 绿色 |
| 🔵 | #248382 | 青色 |
| 🔵 | #246283 | 蓝色 |
| 🟣 | #3c3c83 | 紫色 |
| ♟️ | - | 棋盘格（移除颜色） |
| 🌙 | - | 月亮（用于自定义颜色） |



## 配置

如果您想修改快捷键以及垂直最小间距(Vertical Min Spacing)和水平最小间距配置(Horizontal Min Spacing)，可以在设置面板的Align中进行修改。
<div align="center">
  <img src="https://moooonet.github.io/assets/Comfy-Align/images/settings.png" width="100%">
</div>


如果您想修改预设颜色，可在`web\js\align.js`中找到如下部分进行修改：

```javascript
const CONFIG = {
...
  colors: {
    circle1: '#83314a',  // 红色
    circle2: '#79461d',  // 橙色
    circle3: '#6e6e1d',  // 黄色
    circle4: '#2b652b',  // 绿色
    circle5: '#248382',  // 青色
    circle6: '#246283',  // 蓝色
    circle7: '#3c3c83',  // 紫色
    ...
  },
};
```

## 赞赏

<div align="center">
  <br>
  <p><strong><i>赠人玫瑰，手留余香</i></strong></p>
  <p>每一份支持都将直接转化为开源世界的进步，这些来自社区的温暖，既是对技术价值的认可，更构成了开源生态持续运转的底层燃料。</p>
  <a href='https://ko-fi.com/M4M21CRQOT' target='_blank'><img height='32' style='border:0px;height:32px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
  <a href='https://https://afdian.com/a/moooonet' target='_blank'><img height='32' style='border:0px;height:32px;' src='https://moooonet.github.io/assets/Comfy-Align/images/afdian.png' border='0' alt='AFDIAN' /></a>
</div>