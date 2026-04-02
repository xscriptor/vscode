import iconNames from './preview-icons.json' assert { type: 'json' };

(() => {
  const variant = document.body.dataset.previewVariant || 'x-min';
  const configByVariant = {
    'x-min': {
      svgFolder: './svg-x-min',
      heading: 'x Product Icons',
      description: 'Compact preview rendered from shared SVG metadata.'
    },
    x: {
      svgFolder: './svg-x',
      heading: 'x Product Icons',
      description: 'Shared preview rendered from the larger badge variant.'
    }
  };

  const config = configByVariant[variant] || configByVariant['x-min'];
  const grid = document.getElementById('icon-grid');
  const heading = document.getElementById('preview-title');
  const description = document.getElementById('preview-description');

  if (!grid) {
    return;
  }

  if (heading) {
    heading.textContent = config.heading;
  }

  if (description) {
    description.textContent = config.description;
  }

  grid.innerHTML = iconNames
    .map((name) => `
      <div class="card">
        <img src="${config.svgFolder}/${name}.svg" alt="${name}" loading="lazy" />
        <span>${name}</span>
      </div>
    `)
    .join('');
})();
