(() => {
  'use strict';

  const themeImages = [
    'blue-abstract-3840x2160-25119(1).jpg',
    'fluorite-crystal-3840x2160-12636.jpg',
    'fluorite-crystal-3840x2160-14506.jpg',
    'golden-diamond-3840x2160-19354.jpg',
    'golden-glitter-3840x2160-23905.jpg',
    'golden-metallic-3840x2160-21510.jpg',
    'golden-symmetry-3840x2160-24780.png',
    'google-pixel-8-pro-3840x2160-14490.jpg',
    'grey-abstract-3840x2160-26349.jpg',
    'huawei-mate-80-3840x2160-24785.png',
    'iridescent-spheres-3840x2160-26346(1).jpg',
    'jupiter-dark-3840x2160-26348.png',
    'light-blue-abstract-3840x2160-26353.jpg',
    'light-green-3840x2160-26352.jpg',
    'lone-tree-3840x2160-26307.jpg',
    'macos-big-sur-stock-night-lone-tree-sedimentary-rocks-3840x2160-3776.jpg',
    'mars-red-planet-3840x2160-26347.jpg',
    'microsoft-design-3840x2160-26028.jpg',
    'microsoft-surface-3840x2160-9237.png',
    'microsoft-surface-3840x2160-9243.png',
    'microsoft-surface-duo-2-stock-black-background-3840x2160-7011.png',
    'moon-dark-3840x2160-26344.png',
    'os-x-mountain-lion-3840x2160-24066.jpg',
    'os-x-mountain-lion-3840x2160-24074.jpg',
    'os-x-mountain-lion-3840x2160-24075.jpg',
    'os-x-mountain-lion-earth-horizon-cosmos-stock-3840x2160-4003.jpg',
    'planet-earth-dark-3840x2160-26342.jpg',
    'planet-earth-india-3840x2160-10758.jpg',
    'planet-earth-night-view-illuminated-orbit-dark-background-5k-3840x2160-8934.jpg',
    'planet-earth-orbit-outer-space-cosmos-3840x2160-8769.jpg',
    'planet-mercury-dark-3840x2160-26345.png',
    'planet-venus-dark-3840x2160-26351.png',
    'planetary-horizon-3840x2160-26343.jpg',
    'purple-gradient-3840x2160-22798.png',
    'rocky-mountains-3840x2160-26304.jpg',
    'sage-green-abstract-3840x2160-26354.jpg',
    'sage-green-abstract-3840x2160-26355.jpg',
    'sand-dunes-moon-3840x2160-26311.jpg',
    'sapphire-fluorite-3840x2160-14502.jpg',
    'saturn-dark-3840x2160-26350.png',
    'snowy-mountains-3840x2160-26363.jpg',
    'thick-forest-misty-3840x2160-26360.jpg',
    'vivo-pad-blue-3840x2160-23152.jpg',
    'vivo-pad-dark-blue-3840x2160-23151.jpg',
    'vivo-pad-stock-blue-background-3840x2160-7925.jpg',
  ];

  const STORAGE_KEY = 'nx_theme_file';

  const setBodyBackgroundTheme = (file) => {
    if (!file) return;
    const url = `temaspng/${encodeURI(file)}`;
    document.body.style.backgroundImage = `url('${url}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  };

  const overlayId = 'theme-overlay';
  const panelId = 'theme-panel';

  function ensureDialogDom() {
    if (document.getElementById(overlayId)) return;

    const overlay = document.createElement('div');
    overlay.id = overlayId;
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '2500';
    overlay.style.background = 'rgba(0,0,0,0.7)';
    overlay.style.backdropFilter = 'blur(8px)';
    overlay.style.display = 'none';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.padding = '20px';

    const panel = document.createElement('div');
    panel.id = panelId;
    panel.style.width = 'min(920px, 96vw)';
    panel.style.maxHeight = '82vh';
    panel.style.overflow = 'auto';
    panel.style.borderRadius = '18px';
    panel.style.background = 'rgba(20,24,40,0.92)';
    panel.style.border = '1px solid rgba(108,99,255,0.25)';
    panel.style.padding = '18px';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    header.style.gap = '12px';
    header.style.marginBottom = '12px';

    const title = document.createElement('div');
    title.textContent = '🎨 Temas';
    title.style.fontFamily = 'Space Grotesk, system-ui';
    title.style.color = 'rgba(255,255,255,.95)';
    title.style.fontWeight = '800';
    title.style.fontSize = '20px';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.type = 'button';
    closeBtn.style.width = '42px';
    closeBtn.style.height = '42px';
    closeBtn.style.borderRadius = '12px';
    closeBtn.style.border = '1px solid rgba(255,255,255,.12)';
    closeBtn.style.background = 'rgba(255,255,255,.05)';
    closeBtn.style.color = 'rgba(255,255,255,.9)';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => closeThemesMenu();

    header.appendChild(title);
    header.appendChild(closeBtn);

    const grid = document.createElement('div');
    grid.id = 'theme-grid';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(140px, 1fr))';
    grid.style.gap = '12px';

    panel.appendChild(header);
    panel.appendChild(grid);
    overlay.appendChild(panel);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeThemesMenu();
    });

    document.body.appendChild(overlay);
  }

  function renderThemeGrid() {
    const grid = document.getElementById('theme-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const current = localStorage.getItem(STORAGE_KEY) || '';

    themeImages.forEach((file) => {
      const item = document.createElement('div');
      item.style.cursor = 'pointer';
      item.style.borderRadius = '16px';
      item.style.overflow = 'hidden';
      item.style.border = (file === current) ? '2px solid rgba(78,205,196,0.95)' : '1px solid rgba(255,255,255,0.12)';
      item.style.background = 'rgba(255,255,255,0.03)';

      const img = document.createElement('img');
      img.src = `temaspng/${encodeURI(file)}`;
      img.alt = file;
      img.style.width = '100%';
      img.style.height = '110px';
      img.style.objectFit = 'cover';
      img.style.display = 'block';

      const label = document.createElement('div');
      label.textContent = file
        .replace(/\.[a-z0-9]+$/i, '')
        .slice(0, 22);
      label.style.padding = '10px 10px';
      label.style.fontSize = '12px';
      label.style.color = 'rgba(255,255,255,.88)';
      label.style.fontFamily = 'ui-sans-serif, system-ui';
      label.style.whiteSpace = 'nowrap';
      label.style.overflow = 'hidden';
      label.style.textOverflow = 'ellipsis';

      item.onclick = () => {
        localStorage.setItem(STORAGE_KEY, file);
        setBodyBackgroundTheme(file);
        renderThemeGrid();
      };

      item.appendChild(img);
      item.appendChild(label);
      grid.appendChild(item);
    });
  }

  function openThemesMenu() {
    ensureDialogDom();
    const overlay = document.getElementById(overlayId);
    if (!overlay) return;
    overlay.style.display = 'flex';
    renderThemeGrid();
  }

  function closeThemesMenu() {
    const overlay = document.getElementById(overlayId);
    if (overlay) overlay.style.display = 'none';
  }

  // expose for inline onclick
  window.openThemesMenu = openThemesMenu;
  window.closeThemesMenu = closeThemesMenu;

  // apply saved theme on load
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) setBodyBackgroundTheme(saved);
})();

