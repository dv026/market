import { css } from '@emotion/react';
import { primaryColor } from '../../../../styles';

export const styles = {
  modal: css`
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  listItem: css`
    border-radius: 8px;
    &:hover {
      background-color: ${primaryColor};

      & > span {
        color: white;
      }
    }
  `,

  listItemActive: css`
    background-color: ${primaryColor};

    & > span {
      color: white;
    }
  `
};
