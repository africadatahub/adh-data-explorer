const DEFAULT_PACKAGES = ['controls', 'corechart', 'geochart', 'table'];

let chartsPromise = null;

export function loadGoogleCharts(packages = DEFAULT_PACKAGES) {
  if (window.google && window.google.visualization) {
    return Promise.resolve(window.google);
  }

  if (!chartsPromise) {
    chartsPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-google-charts-loader]');
      const onReady = () => {
        window.google.charts.load('current', { packages });
        window.google.charts.setOnLoadCallback(() => resolve(window.google));
      };

      if (existing) {
        if (window.google && window.google.charts) {
          onReady();
        } else {
          existing.addEventListener('load', onReady, { once: true });
          existing.addEventListener('error', reject, { once: true });
        }
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.async = true;
      script.dataset.googleChartsLoader = 'true';
      script.onload = onReady;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  return chartsPromise;
}

export function parseGoogleDataTable(source) {
  if (!source) {
    return null;
  }
  if (typeof source === 'string') {
    return JSON.parse(source);
  }
  return source;
}
