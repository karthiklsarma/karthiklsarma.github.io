import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const staticDirectories = [
  'assets',
  'Analytics',
  'DataViz',
  'Interactive-Resume',
  'Project',
];

async function copyDirectory(source, destination) {
  await mkdir(destination, { recursive: true });

  for (const entry of await readdir(source, { withFileTypes: true })) {
    const sourcePath = join(source, entry.name);
    const destinationPath = join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
    } else {
      await copyFile(sourcePath, destinationPath);
    }
  }
}

await Promise.all(
  staticDirectories.map((directory) => copyDirectory(directory, join('dist', directory))),
);

await Promise.all([
  writeFile(join('dist', 'CNAME'), 'karthiksarma.me\n'),
  writeFile(join('dist', '.nojekyll'), ''),
]);