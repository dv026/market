import { css } from '@emotion/react';
import { errorColor } from '../../styles';

export const styles = {
  row: css`
    display: flex;
    gap: 20px;
  `,

  form: css`
    margin-top: 24px;
    gap: 16px;
    display: flex;
    flex-direction: column;
  `,

  deleteIcon: css`
    &:hover {
      color: ${errorColor};
    }
  `
};
