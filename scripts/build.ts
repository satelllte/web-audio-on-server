import html from 'bun-plugin-html';

await Bun.build({
  entrypoints: ['src/index.html'],
  outdir: 'dist',
  plugins: [html()],
});
