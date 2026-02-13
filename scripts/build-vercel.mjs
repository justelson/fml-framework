import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const deployDir = resolve(root, 'deploy');

function run(command, cwd) {
  const result = spawnSync(command, {
    cwd,
    stdio: 'inherit',
    shell: true,
  });

  if (result.status !== 0) {
    throw new Error(`Command failed (${command}) in ${cwd}`);
  }
}

function buildApp(folderName, basePath) {
  const appDir = resolve(root, folderName);
  if (!existsSync(appDir)) {
    throw new Error(`Missing app directory: ${folderName}`);
  }

  run('npm install', appDir);
  run(`npm run build -- --base=${basePath}`, appDir);
}

function main() {
  rmSync(deployDir, { recursive: true, force: true });
  mkdirSync(deployDir, { recursive: true });

  buildApp('mathf3-o', '/3o/');
  buildApp('mathf4-o', '/4o/');

  cpSync(resolve(root, 'mathf3-o', 'dist'), resolve(deployDir, '3o'), { recursive: true });
  cpSync(resolve(root, 'mathf4-o', 'dist'), resolve(deployDir, '4o'), { recursive: true });
  cpSync(resolve(root, 'portal', 'index.html'), resolve(deployDir, 'index.html'));
  cpSync(resolve(root, 'portal', 'project.html'), resolve(deployDir, 'project.html'));
  cpSync(resolve(root, 'portal', 'curriculum.html'), resolve(deployDir, 'curriculum.html'));
  cpSync(resolve(root, 'portal', 'deployment.html'), resolve(deployDir, 'deployment.html'));
  cpSync(resolve(root, 'portal', 'docs.html'), resolve(deployDir, 'docs.html'));
  cpSync(resolve(root, 'portal', 'styles.css'), resolve(deployDir, 'styles.css'));
  cpSync(resolve(root, 'portal', 'theme.js'), resolve(deployDir, 'theme.js'));

  console.log('Build completed: deploy/ now contains multi-page portal + 3o + 4o');
}

main();

