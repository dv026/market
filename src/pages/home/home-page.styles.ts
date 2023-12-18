import { css } from '@emotion/react';
import { primaryColor } from '../../styles';

export const styles = {
  page: css`
    display: flex;
    flex-direction: column;
    gap: 60px;
  `,

  info: css`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `,

  firstBlock: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  `,

  badge: css`
    & > span {
      height: 10px !important;
      width: 10px !important;
    }
  `,

  controls: css`
    display: flex;
    gap: 15px;

    & span:hover {
      color: ${primaryColor};
    }
  `
};
