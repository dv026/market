import { Button, Input, Modal } from 'antd';
import { FC, useEffect, useState } from 'react';
import { purchaseApi } from '../../entities/purchase/api';
import { Nullable } from '../../app/types';
import { NumericInput } from '../../shared/numeric-input/numberic-input';
import { DeleteOutlined } from '@ant-design/icons';
import { styles } from './add-extra-info-modal.styles';
import { ExtraInfo } from '../../entities/purchase/model';

interface AddExtraInfoModalProps {
  open: boolean;
  close: () => void;
  purchaseId: Nullable<string>;
  cb?: () => void;
  data: ExtraInfo[];
}

export const AddExtraInfoModal: FC<AddExtraInfoModalProps> = ({
  open,
  data,
  close,
  purchaseId,
  cb
}) => {
  const [extraInfo, setExtraInfo] = useState<ExtraInfo[]>(data);
  const handleSubmit = () => {
    if (purchaseId && extraInfo.length > 0) {
      const extraInfoWithoutId = extraInfo.map((elem) => ({
        name: elem.name,
        value: elem.value
      }));
      purchaseApi
        .partialEdit(purchaseId, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          extraInfo: extraInfoWithoutId as any
        })
        .then(cb);
    }
  };

  useEffect(() => {
    setExtraInfo(data?.map((elem, index) => ({ ...elem, id: index })) || []);
  }, [data]);

  return (
    <Modal open={open} onCancel={close} closable={false} onOk={handleSubmit}>
      <Button
        type="dashed"
        onClick={() => {
          setExtraInfo((p) => [...p, { name: '', id: p.length + 1 }]);
        }}>
        Добавить
      </Button>
      <div css={styles.form}>
        {extraInfo.map((info, index) => (
          <div css={styles.row} key={index}>
            <Input
              value={info.name}
              onChange={(e) =>
                setExtraInfo((p) =>
                  p.map((elem) => {
                    if (elem.id === info.id) {
                      return {
                        ...elem,
                        name: e.target.value.trim().toLocaleLowerCase()
                      };
                    }
                    return elem;
                  })
                )
              }
            />
            <NumericInput
              onChange={(e) =>
                setExtraInfo((p) =>
                  p.map((elem) => {
                    const valueWithoutSeparator = e.target.value.replaceAll('.', '');
                    if (elem.id === info.id) {
                      return {
                        ...elem,
                        value: parseFloat(valueWithoutSeparator)
                      };
                    }
                    return elem;
                  })
                )
              }
              value={info.value}
            />
            <DeleteOutlined
              css={styles.deleteIcon}
              onClick={() => setExtraInfo((p) => p.filter((elem) => elem.id !== info.id))}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
};
