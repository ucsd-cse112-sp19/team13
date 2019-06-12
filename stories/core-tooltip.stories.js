import { storiesOf } from '@storybook/html';
// import { withKnobs } from '@storybook/addon-knobs/polymer';
// import { action } from '@storybook/addon-actions';
import coretooltip from '../src/core-tooltip/CoreTooltipElement';


storiesOf('Core Tooltip', module)
  .add('English', () => '<core-tooltip>Peter</core-tooltip>')
  // .addDecorator(withKnobs)
  .add('Default', () => {
    const tooltip = document.createElement('core-tooltip');
    tooltip.innerText = 'demo';
    return slider;
  })