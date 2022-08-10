import CSS from './css';

export const css = CSS;

export const resolveCompiler = (file: string) => {
  switch (file.split('.').pop()) {
    case 'css':
      return new CSS(file);
    default:
      console.log(`Unknown file type: ${file}`);
  }
};
