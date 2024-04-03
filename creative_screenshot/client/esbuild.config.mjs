/*
 Copyright 2024 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// eslint-disable-next-line node/no-unpublished-import
import esbuild from 'esbuild';
// eslint-disable-next-line node/no-unpublished-import
import serve from 'create-serve';

const isDevServer = process.argv.includes('--dev');

const context = esbuild.context({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'www/build/bundle.js',
  minify: !isDevServer,
  sourcemap: true,
  target: ['es2020'],
  define: {
    'process.env.NODE_ENV': isDevServer ? '"development"' : '"production"',
  },
  plugins: [
    {
      name: 'build-event',
      setup(build) {
        build.onEnd(() => {
          serve.update();
        });
      },
    },
  ],
});

if (isDevServer) {
  (async () => {
    serve.start({
      port: 5000,
      root: './www',
      live: true,
    });
    (await context).watch();
  })();
}
