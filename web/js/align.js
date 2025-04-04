import { app } from "../../../scripts/app.js";

const DEFAULT_CONFIG = {
  iconSize: 36,
  spacing: 112,
  horizontalMinSpacing: 30,
  verticalMinSpacing: 25,
  colors: {
    circle1: '#a93232',
    circle2: '#79461d',
    circle3: '#6e6e1d',
    circle4: '#2b652b',
    circle5: '#248382',
    circle6: '#246283',
    circle7: '#3c3c83',
    circle8: '#000000',      
    moon: 'linear-gradient(135deg, #ffd700, #ffb700, #ffd700, #fff6a9)',
    icon: 'rgba(198, 198, 198, 0.8)',
    bg: 'rgba(12, 12, 12, 0.95)',
    hover: 'rgba(255,255,255,0.2)'
  },
  colorMap: {
    'red': 'circle1',
    'orange': 'circle2',
    'yellow': 'circle3',
    'green': 'circle4',
    'cyan': 'circle5',
    'blue': 'circle6',
    'purple': 'circle7',
    'black': 'circle8',
    'moon': 'moon'
  },
  transition: 'all 0.2s ease',
  shortcut: 'alt+a'
};

const AlignerPlugin = (() => {
  const CONFIG = {...DEFAULT_CONFIG};

  const state = {
    container: null,
    visible: false,
    lastX: 0,
    lastY: 0,
    icons: {},
    styleElement: null
  };

  const ICONS = [
    { id: 'left', type: 'align' },
    { id: 'horizontalCenter', type: 'align' },
    { id: 'leftStretch', type: 'stretch' },
    { id: 'top', type: 'align' },
    { id: 'verticalCenter', type: 'align' },
    { id: 'topStretch', type: 'stretch' },
    { id: 'right', type: 'align' },
    { id: 'horizontalStretch', type: 'stretch' },
    { id: 'rightStretch', type: 'stretch' },
    { id: 'bottom', type: 'align' },
    { id: 'verticalStretch', type: 'stretch' },
    { id: 'bottomStretch', type: 'stretch' },
    { id: 'redCircle', type: 'color' },
    { id: 'orangeCircle', type: 'color' },
    { id: 'yellowCircle', type: 'color' },
    { id: 'greenCircle', type: 'color' },
    { id: 'cyanCircle', type: 'color' },
    { id: 'blueCircle', type: 'color' },
    { id: 'purpleCircle', type: 'color' },
    { id: 'blackCircle', type: 'color' },
    { id: 'moonCircle', type: 'color' }
  ];

  const SVG_PATHS = {
    left: 'M96 0a32 32 0 0 1 32 32v960a32 32 0 0 1-64 0V32A32 32 0 0 1 96 0z m128 192h448a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32h-448a32 32 0 0 1-32-32v-192a32 32 0 0 1 32-32z m0 384h704a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32h-704a32 32 0 0 1-32-32v-192a32 32 0 0 1 32-32z',
    leftStretch: 'M800 224a128 128 0 0 1 128 128v320a128 128 0 0 1-128 128h-320a128 128 0 0 1-128-128v-320a128 128 0 0 1 128-128h320z m0 64h-320a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64v-320a64 64 0 0 0-64-64z M128 128m32 0l0 0q32 0 32 32l0 704q0 32-32 32l0 0q-32 0-32-32l0-704q0-32 32-32Z" p-id="21492',
    top: 'M1170.285714 36.571429a36.571429 36.571429 0 0 1-36.571428 36.571428H36.571429a36.571429 36.571429 0 0 1 0-73.142857h1097.142857a36.571429 36.571429 0 0 1 36.571428 36.571429z m-219.428571 146.285714v512a36.571429 36.571429 0 0 1-36.571429 36.571428h-219.428571a36.571429 36.571429 0 0 1-36.571429-36.571428v-512a36.571429 36.571429 0 0 1 36.571429-36.571429h219.428571a36.571429 36.571429 0 0 1 36.571429 36.571429z m-438.857143 0v804.571428a36.571429 36.571429 0 0 1-36.571429 36.571429h-219.428571a36.571429 36.571429 0 0 1-36.571429-36.571429v-804.571428a36.571429 36.571429 0 0 1 36.571429-36.571429h219.428571a36.571429 36.571429 0 0 1 36.571429 36.571429z',
    topStretch: 'M672 352a128 128 0 0 1 128 128v320a128 128 0 0 1-128 128h-320a128 128 0 0 1-128-128v-320a128 128 0 0 1 128-128h320z m0 64h-320a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64v-320a64 64 0 0 0-64-64zM128 160h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z',
    right: 'M928 0a32 32 0 0 1 32 32v960a32 32 0 0 1-64 0V32a32 32 0 0 1 32-32z m-576 192h448a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32h-448a32 32 0 0 1-32-32v-192a32 32 0 0 1 32-32z m-256 384h704a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32v-192A32 32 0 0 1 96 576z',
    rightStretch: 'M544 224a128 128 0 0 1 128 128v320a128 128 0 0 1-128 128h-320a128 128 0 0 1-128-128v-320a128 128 0 0 1 128-128h320z m0 64h-320a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64v-320a64 64 0 0 0-64-64z M896 128m32 0l0 0q32 0 32 32l0 704q0 32-32 32l0 0q-32 0-32-32l0-704q0-32 32-32Z',
    bottom: 'M1170.285714 987.428571a36.571429 36.571429 0 0 0-36.571428-36.571428H36.571429a36.571429 36.571429 0 0 0 0 73.142857h1097.142857a36.571429 36.571429 0 0 0 36.571428-36.571429z m-219.428571-146.285714v-512a36.571429 36.571429 0 0 0-36.571429-36.571428h-219.428571a36.571429 36.571429 0 0 0-36.571429 36.571428v512a36.571429 36.571429 0 0 0 36.571429 36.571429h219.428571a36.571429 36.571429 0 0 0 36.571429-36.571429z m-438.857143 0V36.571429a36.571429 36.571429 0 0 0-36.571429-36.571429h-219.428571a36.571429 36.571429 0 0 0-36.571429 36.571429v804.571428a36.571429 36.571429 0 0 0 36.571429 36.571429h219.428571a36.571429 36.571429 0 0 0 36.571429-36.571429z',
    bottomStretch: 'M672 96a128 128 0 0 1 128 128v320a128 128 0 0 1-128 128h-320a128 128 0 0 1-128-128v-320a128 128 0 0 1 128-128h320z m0 64h-320a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64v-320a64 64 0 0 0-64-64zM128 928h768a32 32 0 1 0 0-64H128a32 32 0 1 0 0 64z',
    verticalCenter: 'M960 128l0 64-832 0L128 128zM960 896l0 64-832 0 0-64z M832 384m0 64l0 192q0 64-64 64l-448 0q-64 0-64-64l0-192q0-64 64-64l448 0q64 0 64 64Z',
    verticalStretch: 'M670.421333 353.578667v316.842666H353.578667V353.578667h316.842666z m40.021334-71.978667H313.6a32 32 0 0 0-32 32v396.842667a32 32 0 0 0 32 32h396.842667a32 32 0 0 0 32-32V313.6a32 32 0 0 0-32-32zM904.021333 840.021333H120.021333a7.978667 7.978667 0 0 0-8.021333 7.978667v56.021333c0 4.394667 3.584 7.978667 8.021333 7.978667h784a7.978667 7.978667 0 0 0 7.978667-8.021333v-55.978667a7.978667 7.978667 0 0 0-8.021333-8.021333zM904.021333 112H120.021333a8.021333 8.021333 0 0 0-8.021333 8.021333v55.978667c0 4.437333 3.584 8.021333 8.021333 8.021333h784a7.978667 7.978667 0 0 0 7.978667-8.021333V119.978667a7.978667 7.978667 0 0 0-8.021333-7.978667z',
    horizontalCenter: 'M128 128h64v832H128zM896 128h64v832h-64z M384 256m64 0l192 0q64 0 64 64l0 448q0 64-64 64l-192 0q-64 0-64-64l0-448q0-64 64-64Z',
    horizontalStretch: 'M697.088 670.421333H380.16V353.578667h316.885333v316.842666z m71.978667 40.021334V313.6a32 32 0 0 0-32-32H340.224a32 32 0 0 0-32 32v396.842667a32 32 0 0 0 32 32h396.842667a32 32 0 0 0 32-32zM210.688 904.021333V120.021333a8.021333 8.021333 0 0 0-8.021333-8.021333H146.645333a8.021333 8.021333 0 0 0-7.978666 8.021333v784c0 4.394667 3.584 7.978667 8.021333 7.978667H202.666667a7.978667 7.978667 0 0 0 8.021333-8.021333zM938.666667 904.021333V120.021333a7.978667 7.978667 0 0 0-8.021334-8.021333H874.666667a7.978667 7.978667 0 0 0-8.021334 8.021333v784c0 4.394667 3.584 7.978667 8.021334 7.978667h56.021333a7.978667 7.978667 0 0 0 7.978667-8.021333z',
  };

  const utils = {
    debounce(fn, delay) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
      };
    },

    getDeeperColor(hexColor) {
      if (!hexColor || hexColor.startsWith('linear-gradient') || !hexColor.startsWith('#')) {
        return '#444444';
      }
      
      const hex = hexColor.replace('#', '');
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);

      r = Math.floor(r * 0.7);
      g = Math.floor(g * 0.7);
      b = Math.floor(b * 0.7);

      const deeperHex = '#' + 
        r.toString(16).padStart(2, '0') + 
        g.toString(16).padStart(2, '0') + 
        b.toString(16).padStart(2, '0');
      
      return deeperHex;
    },

    createSVG(id, size = 20) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('viewBox', '0 0 1024 1024');
      svg.style.position = 'relative';
      svg.style.zIndex = '1';
      
      if (SVG_PATHS[id]) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', SVG_PATHS[id]);
        path.style.fill = CONFIG.colors.icon;
        svg.appendChild(path);
      }
      
      return svg;
    },

    calculatePosition(index, x, y) {
      const { iconSize, spacing } = CONFIG;
      const halfSize = iconSize / 2;
      const effectiveSpacing = spacing + halfSize;

      if (index >= 12) {
        return null;
      }
      
      const positions = [
        [-effectiveSpacing, -halfSize - iconSize - 5],
        [-effectiveSpacing, -halfSize],
        [-effectiveSpacing, halfSize + 5],
        [-halfSize - iconSize - 5, -effectiveSpacing],
        [-halfSize, -effectiveSpacing],
        [halfSize + 5, -effectiveSpacing],
        [effectiveSpacing - iconSize, -halfSize - iconSize - 5],
        [effectiveSpacing - iconSize, -halfSize],
        [effectiveSpacing - iconSize, halfSize + 5],
        [-halfSize - iconSize - 5, effectiveSpacing - iconSize],
        [-halfSize, effectiveSpacing - iconSize],
        [halfSize + 5, effectiveSpacing - iconSize],
      ];

      return positions[index] || [0, 0];
    },

    keepInViewport(x, y, entireWidth, entireHeight) {
      const margin = 20;
      return [
        Math.max(margin, Math.min(x, window.innerWidth - entireWidth - margin)),
        Math.max(margin, Math.min(y, window.innerHeight - entireHeight - margin))
      ];
    },
    
    calculateUIBoundingBox(centerX, centerY) {
      const { iconSize, spacing } = CONFIG;
      const effectiveSpacing = spacing + iconSize / 2;

      const width = effectiveSpacing * 2;
      const height = effectiveSpacing * 2;

      const colorPickerHeight = 50;
      const totalHeight = height + colorPickerHeight + 15;

      const left = centerX - effectiveSpacing;
      const top = centerY - effectiveSpacing;
      
      return {
        width,
        height: totalHeight,
        left,
        top
      };
    }
  };

  const dom = {
    injectStyles() {
      if (state.styleElement) return;

      state.styleElement = document.createElement('style');
      state.styleElement.textContent = `
        .aligner-container {
          position: fixed;
          z-index: 99999;
          pointer-events: none;
          display: none;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
        }
        
        .aligner-icon {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: ${CONFIG.transition};
          cursor: pointer;
          border-radius: 6px;
          pointer-events: auto;
        }
        
        .aligner-icon-circle {
          position: relative !important;
          transform: none !important;
          margin: 0 !important;
          border-radius: 50%;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        
        .aligner-icon-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          background-color: ${CONFIG.colors.bg};
          transition: background-color 0.2s ease;
        }
        
        .aligner-icon-circle .aligner-icon-bg {
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .color-circles-container {
          position: absolute;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 4px;
          padding: 4px;
          pointer-events: auto;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        
        .aligner-notification {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 14px;
          z-index: 10000;
          transition: opacity 0.3s ease;
          background-color: rgba(255, 0, 0, 0.8);
          color: white;
        }
      `;
      document.head.appendChild(state.styleElement);
    },

    createContainer() {
      if (state.container) {
        document.body.removeChild(state.container);
      }
      
      state.container = document.createElement('div');
      state.container.className = 'aligner-container';

      const colorCirclesContainer = document.createElement('div');
      colorCirclesContainer.className = 'color-circles-container';
      state.container.appendChild(colorCirclesContainer);
      
      document.body.appendChild(state.container);
    },

    createIcon(iconInfo, index) {
      const { id, type } = iconInfo;
      const isCircle = id.includes('Circle');
      const size = isCircle ? CONFIG.iconSize / 2 : CONFIG.iconSize;

      const iconWrapper = document.createElement('div');
      iconWrapper.className = `aligner-icon ${isCircle ? 'aligner-icon-circle' : ''}`;
      iconWrapper.dataset.id = id;
      iconWrapper.dataset.type = type;
      iconWrapper.style.width = `${size}px`;
      iconWrapper.style.height = `${size}px`;
      iconWrapper.style.pointerEvents = 'auto';

      const bg = document.createElement('div');
      bg.className = 'aligner-icon-bg';

      if (isCircle) {
        if (id === 'moonCircle') {
            bg.style.background = 'transparent';

            const moonSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            moonSvg.setAttribute('width', '100%');
            moonSvg.setAttribute('height', '100%');
            moonSvg.setAttribute('viewBox', '0 0 24 24');
            
            const moonPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            moonPath.setAttribute('d', 'M11.8,21c4.8,0,8.7-3.9,8.7-8.7c0-4.8-3.9-8.7-8.7-8.7c-0.2,0-0.4,0-0.6,0c1.2,1.5,1.9,3.4,1.9,5.4c0,4.8-3.9,8.7-8.7,8.7c-0.2,0-0.4,0-0.6,0C5.5,19.5,8.5,21,11.8,21z');
            moonPath.setAttribute('fill', 'url(#goldGradient)');

            const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
            gradient.setAttribute('id', 'goldGradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', '#ffd700');
            
            const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop2.setAttribute('offset', '50%');
            stop2.setAttribute('stop-color', '#ffb700');
            
            const stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop3.setAttribute('offset', '100%');
            stop3.setAttribute('stop-color', '#fff6a9');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            gradient.appendChild(stop3);
            defs.appendChild(gradient);
            
            moonSvg.appendChild(defs);
            moonSvg.appendChild(moonPath);
            bg.appendChild(moonSvg);
        } else if (id === 'blackCircle') {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';

            const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
            pattern.setAttribute('id', 'checkerboard');
            pattern.setAttribute('width', '4');
            pattern.setAttribute('height', '4');
            pattern.setAttribute('patternUnits', 'userSpaceOnUse');

            const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            bgRect.setAttribute('width', '4');
            bgRect.setAttribute('height', '4');
            bgRect.setAttribute('fill', '#ffffff');

            const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            square.setAttribute('width', '2');
            square.setAttribute('height', '2');
            square.setAttribute('fill', '#000000');
            
            const square2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            square2.setAttribute('width', '2');
            square2.setAttribute('height', '2');
            square2.setAttribute('x', '2');
            square2.setAttribute('y', '2');
            square2.setAttribute('fill', '#000000');
            
            pattern.appendChild(bgRect);
            pattern.appendChild(square);
            pattern.appendChild(square2);
            
            const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            defs.appendChild(pattern);
            svg.appendChild(defs);

            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute('cx', '50%');
            circle.setAttribute('cy', '50%');
            circle.setAttribute('r', '45%');
            circle.setAttribute('fill', 'url(#checkerboard)');
            
            svg.appendChild(circle);
            bg.appendChild(svg);
            bg.style.background = 'transparent';
        } else {
          const colorName = id.replace('Circle', '').toLowerCase();
          const colorKey = CONFIG.colorMap[colorName];
          if (colorKey && CONFIG.colors[colorKey]) {
            bg.style.backgroundColor = CONFIG.colors[colorKey];
          } else {
            console.warn(`Unknown color circle: ${id}`);
            bg.style.backgroundColor = '#555555';
          }
        }
      }

      iconWrapper.appendChild(bg);

      if (!isCircle) {
        const svg = utils.createSVG(id);
        iconWrapper.appendChild(svg);
      }

      if (isCircle) {
        const colorCirclesContainer = state.container.querySelector('.color-circles-container');
        if (colorCirclesContainer) {
          colorCirclesContainer.appendChild(iconWrapper);
        }
      } else {
        state.container.appendChild(iconWrapper);
      }
      
      return iconWrapper;
    },

    createAllIcons() {
      ICONS.forEach((iconInfo, index) => {
        const icon = this.createIcon(iconInfo, index);
        state.icons[iconInfo.id] = icon;
      });
    },

    showNotification(message, isError = true) {
      if (!message) return;
      
      const notification = document.createElement('div');
      notification.className = 'aligner-notification';
      notification.textContent = message;
      
      if (!isError) {
        notification.style.backgroundColor = 'rgba(21, 87, 36, 0.8)';
      }
      
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    },

    destroy() {
      if (state.container) {
        document.body.removeChild(state.container);
        state.container = null;
      }
      state.visible = false;
      state.icons = {};
    }
  };

  const actions = {
    toggle() {
      if (state.visible) {
        dom.destroy();
      } else {
        dom.injectStyles();
        dom.createContainer();
        dom.createAllIcons();
        state.visible = true;
        state.container.style.display = 'block';
        this.updateIconPositions();
        setTimeout(() => {
          state.container.style.pointerEvents = 'auto';
        }, 100);
      }
    },
    
    updateIconPositions() {
      const { iconSize, spacing } = CONFIG;
      const halfSize = iconSize / 2;
      const effectiveSpacing = spacing + halfSize;

      const boundingBox = utils.calculateUIBoundingBox(state.lastX, state.lastY);

      const [safeX, safeY] = utils.keepInViewport(
        boundingBox.left,
        boundingBox.top,
        boundingBox.width,
        boundingBox.height + 10
      );
 
      const centerX = safeX + effectiveSpacing;
      const centerY = safeY + effectiveSpacing;

      Object.entries(state.icons).forEach(([id, icon], index) => {
        if (id.includes('Circle')) {
          return;
        }
        
        const relativePos = utils.calculatePosition(index, 0, 0);
        if (relativePos) {
          const [relX, relY] = relativePos;
          icon.style.transform = `translate(${centerX + relX}px, ${centerY + relY}px)`;
        }
      });

      const colorCirclesContainer = state.container.querySelector('.color-circles-container');
      if (colorCirclesContainer) {
        const containerWidth = colorCirclesContainer.offsetWidth;
        const x = centerX - containerWidth / 2;
        const y = centerY + CONFIG.spacing + CONFIG.iconSize / 2 + 15;
        
        colorCirclesContainer.style.transform = `translate(${x}px, ${y}px)`;
      }
    },

    getComfyUIAppInstance() {
      if (window.app?.canvas && window.app?.graph) {
        return window.app;
      }

      if (window.LiteGraph?.LGraphCanvas?.active_canvas) {
        const canvas = LiteGraph.LGraphCanvas.active_canvas;
        if (canvas?.graph) {
          return { canvas, graph: canvas.graph };
        }
      }

      const canvasElement = document.querySelector(".litegraph.litegraph-canvas");
      if (canvasElement?.lgraphcanvas) {
        const canvas = canvasElement.lgraphcanvas;
        if (canvas?.graph) {
          return { canvas, graph: canvas.graph };
        }
      }
      
      return null;
    },
    
    getSelectedNodes(appInstance) {
      if (appInstance.canvas.selected_nodes?.length) {
        return Array.from(appInstance.canvas.selected_nodes);
      }

      const selectedNodes = [];
      if (appInstance.graph?._nodes) {
        for (const node of appInstance.graph._nodes) {
          if (node.is_selected) {
            selectedNodes.push(node);
          }
        }
      }
      
      return selectedNodes;
    },
    
    getSelectedGroups(appInstance) {
      const selectedGroups = [];
      
      if (appInstance.canvas?.selected_groups?.length) {
        return Array.from(appInstance.canvas.selected_groups);
      }
      
      if (appInstance.graph?.groups) {
        for (const group of appInstance.graph.groups) {
          if (group.selected) {
            selectedGroups.push(group);
          }
        }
      }
      
      return selectedGroups;
    },

    openNativeColorPicker() {
      const appInstance = this.getComfyUIAppInstance();
      if (!appInstance) {
        dom.showNotification("Unable to get ComfyUI application instance");
        return;
      }

      const selectedNodes = this.getSelectedNodes(appInstance);
      const selectedGroups = this.getSelectedGroups(appInstance);
      
      if (selectedNodes.length === 0 && selectedGroups.length === 0) {
        dom.showNotification("Please select nodes or groups to apply color");
        return;
      }

      const colorInput = document.createElement('input');
      colorInput.type = 'color';

      let initialColor = '#3355aa';
      if (selectedNodes.length > 0) {
        initialColor = selectedNodes[0].color?.replace(/rgba?\(.*\)/, '#000000') || '#3355aa';
      } else if (selectedGroups.length > 0) {
        initialColor = selectedGroups[0].color || '#3355aa';
      }
      
      colorInput.value = initialColor;
      colorInput.style.position = 'absolute';
      colorInput.style.visibility = 'hidden';
      document.body.appendChild(colorInput);

      const handleColorChange = (e) => {
        const color = e.target.value;

        selectedNodes.forEach(node => {
          node.color = color;
        });

        selectedGroups.forEach(group => {
          group.color = color;
        });

        appInstance.graph.setDirtyCanvas(true, true);
      };

      colorInput.addEventListener('input', handleColorChange);
      colorInput.addEventListener('change', () => {
        document.body.removeChild(colorInput);
      });
      
      colorInput.click();
    },

    handleAlignAction(action) {
      let result;
      
      switch(action) {
        case 'left':
          result = this.alignNodesToLeft();
          break;
        case 'right':
          result = this.alignNodesToRight();
          break;
        case 'top':
          result = this.alignNodesToTop();
          break;
        case 'bottom':
          result = this.alignNodesToBottom();
          break;
        case 'horizontalCenter':
          result = this.alignNodesToHorizontalCenter();
          break;
        case 'verticalCenter':
          result = this.alignNodesToVerticalCenter();
          break;
        case 'leftStretch':
          result = this.stretchNodesToLeft();
          break;
        case 'rightStretch':
          result = this.stretchNodesToRight();
          break;
        case 'topStretch':
          result = this.stretchNodesToTop();
          break;
        case 'bottomStretch':
          result = this.stretchNodesToBottom();
          break;
        case 'horizontalStretch':
          result = this.stretchNodesHorizontally();
          break;
        case 'verticalStretch':
          result = this.stretchNodesVertically();
          break;
        case 'redCircle':
        case 'orangeCircle':
        case 'yellowCircle':
        case 'greenCircle':
        case 'cyanCircle':
        case 'blueCircle':
        case 'purpleCircle':
          result = this.setNodesColor(action);
          break;
        case 'blackCircle':
          result = this.setNodesColor(action);
          break;
        case 'moonCircle':
          this.openNativeColorPicker();
          return; 
        default:
          return;
      }
      
      if (result && !result.success) {
        dom.showNotification(result.message, true);
      }
    },

    alignNodesToLeft() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const leftmostX = Math.min(...selectedNodes.map(node => node.pos[0]));

        selectedNodes.forEach(node => {
          node.pos[0] = leftmostX;
        });

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Left alignment failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },
    
    alignNodesToRight() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const rightmostEdge = Math.max(...selectedNodes.map(node => node.pos[0] + node.size[0]));

        selectedNodes.forEach(node => {
          node.pos[0] = rightmostEdge - node.size[0];
        });

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Right alignment failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },

    alignNodesToTop() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const topmostY = Math.min(...selectedNodes.map(node => node.pos[1]));

        selectedNodes.forEach(node => {
          node.pos[1] = topmostY;
        });

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Top alignment failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },

    alignNodesToBottom() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const bottommostEdge = Math.max(...selectedNodes.map(node => node.pos[1] + node.size[1]));

        selectedNodes.forEach(node => {
          node.pos[1] = bottommostEdge - node.size[1];
        });

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Bottom alignment failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },

    alignNodesToHorizontalCenter() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const sortedNodes = [...selectedNodes].sort((a, b) => a.pos[0] - b.pos[0]);
        const nodeWidthSum = sortedNodes.reduce((sum, node) => sum + node.size[0], 0);
        
        const leftmostX = Math.min(...selectedNodes.map(node => node.pos[0]));
        const rightmostX = Math.max(...selectedNodes.map(node => node.pos[0] + node.size[0]));
        const totalWidth = rightmostX - leftmostX;
        
        const leftmostNode = sortedNodes[0];
        const leftmostNodeTopY = leftmostNode.pos[1];

        selectedNodes.forEach(node => {
          if (node !== leftmostNode) {
            node.pos[1] = leftmostNodeTopY;
          }
        });
        
        const minSpacing = CONFIG.horizontalMinSpacing;
        const safetyMargin = 20;
        const effectiveMinSpacing = minSpacing + safetyMargin;
        
        const totalRequiredSpace = nodeWidthSum + (sortedNodes.length - 1) * effectiveMinSpacing;
        
        let spacing = effectiveMinSpacing;
        
        if (totalWidth > totalRequiredSpace) {
          spacing = (totalWidth - nodeWidthSum) / (sortedNodes.length - 1);
          spacing = Math.max(spacing, effectiveMinSpacing);
        }
        
        let currentX = leftmostX;
        sortedNodes.forEach((node, index) => {
          node.pos[0] = currentX;
          
          if (index < sortedNodes.length - 1) {
            const nextMinX = currentX + node.size[0] + effectiveMinSpacing;
            currentX += node.size[0] + spacing;
            
            if (currentX < nextMinX) {
              currentX = nextMinX;
            }
          }
        });

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Horizontal center alignment failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },

    alignNodesToVerticalCenter() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const sortedNodes = [...selectedNodes].sort((a, b) => a.pos[1] - b.pos[1]);
        const nodeHeightSum = sortedNodes.reduce((sum, node) => sum + node.size[1], 0);
        
        const topmostY = Math.min(...selectedNodes.map(node => node.pos[1]));
        const bottommostY = Math.max(...selectedNodes.map(node => node.pos[1] + node.size[1]));
        const totalHeight = bottommostY - topmostY;

        const topNode = sortedNodes[0];
        const topNodeCenterX = topNode.pos[0] + (topNode.size[0] / 2);

        selectedNodes.forEach(node => {
          const nodeCenterX = node.pos[0] + (node.size[0] / 2);
          const offsetX = topNodeCenterX - nodeCenterX;
          node.pos[0] += offsetX;
        });

        const minSpacing = CONFIG.verticalMinSpacing;
        const safetyMargin = 30;
        const effectiveMinSpacing = minSpacing + safetyMargin;
        
        const totalRequiredSpace = nodeHeightSum + (sortedNodes.length - 1) * effectiveMinSpacing;
        
        let spacing = effectiveMinSpacing;
        
        if (totalHeight > totalRequiredSpace) {
          spacing = (totalHeight - nodeHeightSum) / (sortedNodes.length - 1);
          spacing = Math.max(spacing, effectiveMinSpacing);
        }
        
        let currentY = topmostY;
        sortedNodes.forEach((node, index) => {
          node.pos[1] = currentY;
          
          if (index < sortedNodes.length - 1) {
            const nextMinY = currentY + node.size[1] + effectiveMinSpacing;
            currentY += node.size[1] + spacing;
            
            if (currentY < nextMinY) {
              currentY = nextMinY;
            }
          }
        });

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Vertical center alignment failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },

    stretchNodesToLeft() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const leftmostX = Math.min(...selectedNodes.map(node => node.pos[0]));

        const isLeftAligned = selectedNodes.every(node => Math.abs(node.pos[0] - leftmostX) < 1);
        
        if (isLeftAligned) {
          const minWidth = Math.min(...selectedNodes.map(node => node.size[0]));
          
          selectedNodes.forEach(node => {
            if (node.size[0] > minWidth) {
              node.size[0] = minWidth;
            }
          });
        } else {
          selectedNodes.forEach(node => {
            if (node.pos[0] > leftmostX) {
              const rightEdge = node.pos[0] + node.size[0];
              node.pos[0] = leftmostX;
              const newWidth = Math.max(rightEdge - leftmostX, 100);
              node.size[0] = newWidth;
            }
          });
        }

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Left stretch failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },

    stretchNodesToRight() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const rightmostEdge = Math.max(...selectedNodes.map(node => node.pos[0] + node.size[0]));

        const isRightAligned = selectedNodes.every(node => 
          Math.abs((node.pos[0] + node.size[0]) - rightmostEdge) < 1
        );
        
        if (isRightAligned) {
          const minWidth = Math.min(...selectedNodes.map(node => node.size[0]));
          
          selectedNodes.forEach(node => {
            if (node.size[0] > minWidth) {
              const rightEdge = node.pos[0] + node.size[0];
              node.size[0] = minWidth;
              node.pos[0] = rightEdge - minWidth;
            }
          });
        } else {
          selectedNodes.forEach(node => {
            if (node.pos[0] + node.size[0] < rightmostEdge) {
              const newWidth = Math.max(rightmostEdge - node.pos[0], 100);
              node.size[0] = newWidth;
            }
          });
        }

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Right stretch failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },

    stretchNodesToTop() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const topmostY = Math.min(...selectedNodes.map(node => node.pos[1]));

        const isTopAligned = selectedNodes.every(node => 
          Math.abs(node.pos[1] - topmostY) < 1
        );
        
        if (isTopAligned) {
          const minHeight = Math.min(...selectedNodes.map(node => node.size[1]));
          
          selectedNodes.forEach(node => {
            if (node.size[1] > minHeight) {
              node.size[1] = minHeight;
            }
          });
        } else {
          selectedNodes.forEach(node => {
            if (node.pos[1] > topmostY) {
              const bottomEdge = node.pos[1] + node.size[1];
              node.pos[1] = topmostY;
              const newHeight = Math.max(bottomEdge - topmostY, 60);
              node.size[1] = newHeight;
            }
          });
        }

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Top stretch failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },

    stretchNodesToBottom() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const bottommostEdge = Math.max(...selectedNodes.map(node => node.pos[1] + node.size[1]));

        const isBottomAligned = selectedNodes.every(node => 
          Math.abs((node.pos[1] + node.size[1]) - bottommostEdge) < 1
        );
        
        if (isBottomAligned) {
          const minHeight = Math.min(...selectedNodes.map(node => node.size[1]));
          
          selectedNodes.forEach(node => {
            if (node.size[1] > minHeight) {
              const bottomEdge = node.pos[1] + node.size[1];
              node.size[1] = minHeight;
              node.pos[1] = bottomEdge - minHeight;
            }
          });
        } else {
          selectedNodes.forEach(node => {
            if (node.pos[1] + node.size[1] < bottommostEdge) {
              const newHeight = Math.max(bottommostEdge - node.pos[1], 60);
              node.size[1] = newHeight;
            }
          });
        }

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Bottom stretch failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },
    
    stretchNodesHorizontally() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const maxWidth = Math.max(...selectedNodes.map(node => node.size[0]));

        selectedNodes.forEach(node => {
          if (node.size[0] < maxWidth) {
            const centerX = node.pos[0] + (node.size[0] / 2);
            node.size[0] = maxWidth;
            node.pos[0] = centerX - (maxWidth / 2);
          }
        });

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Horizontal stretch failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },

    stretchNodesVertically() {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        if (selectedNodes.length <= 1) {
          return { success: false, message: "At least two nodes must be selected" };
        }

        const maxHeight = Math.max(...selectedNodes.map(node => node.size[1]));

        selectedNodes.forEach(node => {
          if (node.size[1] < maxHeight) {
            const centerY = node.pos[1] + (node.size[1] / 2);
            node.size[1] = maxHeight;
            node.pos[1] = centerY - (maxHeight / 2);
          }
        });

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Vertical stretch failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    },

    setNodesColor(colorType) {
      try {
        const appInstance = this.getComfyUIAppInstance();
        if (!appInstance) {
          return { success: false, message: "Unable to get ComfyUI application instance" };
        }

        const selectedNodes = this.getSelectedNodes(appInstance);
        const selectedGroups = this.getSelectedGroups(appInstance);
        
        if (selectedNodes.length === 0 && selectedGroups.length === 0) {
          return { success: false, message: "Please select nodes or groups to apply color" };
        }

        let color;
        const colorName = colorType.replace('Circle', '').toLowerCase();

        if (colorName === 'moon') {
          return { success: false, message: "Moon color should be handled by color picker" };
        }
        
        const colorKey = CONFIG.colorMap[colorName];
        
        if (!colorKey || !CONFIG.colors[colorKey]) {
          return { success: false, message: `Unknown color type: ${colorType}` };
        }

        if (colorName === 'black') {
          selectedNodes.forEach(node => {
            delete node.color;
            delete node.bgcolor;
          });
          
          selectedGroups.forEach(group => {
            delete group.color;
          });
        } else {
          color = CONFIG.colors[colorKey];
          
          selectedNodes.forEach(node => {
            node.color = color;
          });
          
          selectedGroups.forEach(group => {
            group.color = color;
          });
        }

        appInstance.graph.setDirtyCanvas(true, true);
        
        return { success: true };
      } catch (error) {
        console.error("Setting color failed:", error);
        return { success: false, message: `Operation failed: ${error.message}` };
      }
    }
  };

  const events = {
    trackMousePosition(e) {
      state.lastX = e.clientX;
      state.lastY = e.clientY;
    },

    handleKeyDown(e) {
      const shortcut = CONFIG.shortcut.toLowerCase();
      const parts = shortcut.split('+');

      if (parts.length === 1) {
        if (e.key.toLowerCase() === parts[0]) {
          e.preventDefault();
          actions.toggle();
        }
        return;
      }

      if (parts.length === 2) {
        const [modifier, key] = parts;

        let modifierPressed = false;
        if (modifier === 'alt' && e.altKey) modifierPressed = true;
        if (modifier === 'ctrl' && (e.ctrlKey || e.metaKey)) modifierPressed = true;
        if (modifier === 'shift' && e.shiftKey) modifierPressed = true;

        if (modifierPressed && e.key.toLowerCase() === key) {
          e.preventDefault();
          actions.toggle();
        }
      }
    },

    handleIconInteraction() {
      if (!state.container) return;

      state.container.addEventListener('mouseover', (e) => {
        const icon = e.target.closest('.aligner-icon');
        if (!icon) return;
        
        const bg = icon.querySelector('.aligner-icon-bg');
        if (!bg) return;
        
        if (!icon.classList.contains('aligner-icon-circle')) {
          bg.style.backgroundColor = CONFIG.colors.hover;
        }
      });
      
      state.container.addEventListener('mouseout', (e) => {
        const icon = e.target.closest('.aligner-icon');
        if (!icon) return;
        
        const bg = icon.querySelector('.aligner-icon-bg');
        if (!bg) return;
        
        if (!icon.classList.contains('aligner-icon-circle')) {
          bg.style.backgroundColor = CONFIG.colors.bg;
        }
      });

      state.container.addEventListener('click', (e) => {
        const icon = e.target.closest('.aligner-icon');
        if (!icon) return;
        
        console.log("Icon clicked:", icon.dataset.id);
        e.stopPropagation();
        
        const action = icon.dataset.id;
        actions.handleAlignAction(action);
        actions.toggle();
      });
    },

    handleOutsideClick(e) {
      if (state.visible && state.container && !state.container.contains(e.target)) {
        actions.toggle();
      }
    },

    registerEventListeners() {
      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('mousemove', this.trackMousePosition);
      document.addEventListener('click', this.handleOutsideClick);

      const originalToggle = actions.toggle;
      actions.toggle = function() {
        originalToggle.call(actions);
        if (state.visible) {
          events.handleIconInteraction();
        }
      };
    },

    removeEventListeners() {
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('mousemove', this.trackMousePosition);
      document.removeEventListener('click', this.handleOutsideClick);
    }
  };

  return {
    init() {
      CONFIG.horizontalMinSpacing = DEFAULT_CONFIG.horizontalMinSpacing;
      CONFIG.verticalMinSpacing = DEFAULT_CONFIG.verticalMinSpacing;

      const shortcutSetting = app.extensionManager.setting.get("Align.Shortcut");
      if (shortcutSetting !== undefined) {
        CONFIG.shortcut = shortcutSetting;
      }
      
      events.registerEventListeners();
    },
    destroy() {
      events.removeEventListeners();
      dom.destroy();
      if (state.styleElement) {
        document.head.removeChild(state.styleElement);
        state.styleElement = null;
      }
    },
    CONFIG
  };
})();

app.registerExtension({
  name: "ComfyUI-Align.Settings",
  settings: [
    {
      id: "Align.Spacing.horizontalMin",
      name: "Horizontal Min Spacing",
      type: "slider",
      defaultValue: DEFAULT_CONFIG.horizontalMinSpacing,
      attrs: {
        min: 10,
        max: 100,
        step: 1
      },
      tooltip: "Minimum horizontal spacing between nodes when aligning (in pixels)",
      onChange: (value) => {
        if (AlignerPlugin && AlignerPlugin.CONFIG) {
          AlignerPlugin.CONFIG.horizontalMinSpacing = value;
        }
      }
    },
    {
      id: "Align.Spacing.verticalMin",
      name: "Vertical Min Spacing",
      type: "slider",
      defaultValue: DEFAULT_CONFIG.verticalMinSpacing,
      attrs: {
        min: 10,
        max: 100,
        step: 1
      },
      tooltip: "Minimum vertical spacing between nodes when aligning (in pixels)",
      onChange: (value) => {
        if (AlignerPlugin && AlignerPlugin.CONFIG) {
          AlignerPlugin.CONFIG.verticalMinSpacing = value;
        }
      }
    },
    {
      id: "Align.Shortcut",
      name: "Shortcut",
      type: "text",
      defaultValue: DEFAULT_CONFIG.shortcut,
      tooltip: "Shortcut to open the alignment tool (e.g. 'alt+a', 'shift+s', etc.)",
      onChange: (value) => {
        if (AlignerPlugin && AlignerPlugin.CONFIG) {
          AlignerPlugin.CONFIG.shortcut = value;
        }
      }
    }
  ]
});

app.registerExtension({
  name: "ComfyUI-Align.SettingsUpdate",
  async setup() {
    await app.extensionManager.setting.set("Align.Spacing.horizontalMin", DEFAULT_CONFIG.horizontalMinSpacing);
    await app.extensionManager.setting.set("Align.Spacing.verticalMin", DEFAULT_CONFIG.verticalMinSpacing);

    AlignerPlugin.CONFIG.horizontalMinSpacing = DEFAULT_CONFIG.horizontalMinSpacing;
    AlignerPlugin.CONFIG.verticalMinSpacing = DEFAULT_CONFIG.verticalMinSpacing;

    const shortcutSetting = app.extensionManager.setting.get("Align.Shortcut");
    if (shortcutSetting !== undefined) {
      AlignerPlugin.CONFIG.shortcut = shortcutSetting;
    }
  }
});

function initializePlugin() {
  AlignerPlugin.init();
}

setTimeout(initializePlugin, 1000);