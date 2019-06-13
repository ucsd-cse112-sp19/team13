import { storiesOf } from '@storybook/html';
import '../dist/core-tooltip';

storiesOf('CoreTooltip', module)
  .add('default', () => '<a>Text<core-tooltip></core-tooltip></a>')
  .add('content', () => '<a>Text<core-tooltip content="A Tooltip\'Description"></core-tooltip></a>')
  .add('open-delay', () => '<a>Text<core-tooltip open-delay="1000">Hello!</core-tooltip></a>')
  .add('close-delay', () => '<a>Text<core-tooltip close-delay="0">Hello!</core-tooltip></a>')
  .add('placement="left"', () => '<a>Text<core-tooltip placement="left">Hello!</core-tooltip></a>')
  .add('placement="right"', () => '<a>Text<core-tooltip placement="right">Hello!</core-tooltip></a>')
  .add('placement="top"', () => '<a>Text<core-tooltip placement="top">Hello!</core-tooltip></a>')
  .add('placement="bottom"', () => '<a>Text<core-tooltip placement="bottom">Hello!</core-tooltip></a>')
  .add('focusable', () => '<div><input id="text-input"/><core-tooltip for="text-input" focusable>Hello!</core-tooltip></div>')
  .add('for', () => '<div><input id="text-input"/><core-tooltip for="text-input" focusable>Bye!</core-tooltip></div>')
  .add('offset', () => '<a>Text<core-tooltip offset="10">Hello!</core-tooltip></a>')
  .add('no-visible-arrow', () => '<a>Text<core-tooltip no-visible-arrow>Hello!</core-tooltip></a>')
  .add('disabled', () => '<a>Text<core-tooltip disabled>You will never see me!</core-tooltip></a>')
  .add('manual', () => `
    <div>
      Text
      <core-tooltip manual>Hi there!</core-tooltip>
    </div>
    <button onclick="document.querySelector('core-tooltip').toggle()">Toggle Tooltip</button>`)
  .add('effect="light"', () => '<a>Text<core-tooltip effect="light">Hello!</core-tooltip></a>')
  .add('effect="dark"', () => '<a>Text<core-tooltip effect="dark">Hello!</core-tooltip></a>');
