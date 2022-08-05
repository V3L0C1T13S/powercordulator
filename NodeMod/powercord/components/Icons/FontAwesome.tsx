import React, { PropsWithChildren } from 'react';

type icon = {
  icon: string;
}

type fontAwesomeIcon = PropsWithChildren<icon>;

export default React.memo((props: fontAwesomeIcon) => {
  const styles = {
    regular: 'r',
    light: 'l',
    duotone: 'd',
    brands: 'b',
  };

  const style = Object.keys(styles).find(
    (style) => style === props.icon.split(' ')[0].match(/[a-z]+(?!.*-)/)[0],
  );
  const icon = `fa-${props.icon.replace(`-${style}`, '')} fa-fw`;
  const prefix = styles[style] ? `fa${styles[style]}` : 'fas';

  return <div className={`${prefix} ${icon} ${props.className}`.trim()} />;
});
