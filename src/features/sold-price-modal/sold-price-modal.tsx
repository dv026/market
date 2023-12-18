import { Form, Modal } from 'antd';
import { FC, useState } from 'react';
import { purchaseApi } from '../../entities/purchase/api';
import { Nullable } from '../../app/types';
import { NumericInput } from '../../shared/numeric-input/numberic-input';

interface SoldPriceModalProps {
  open: boolean;
  close: () => void;
  purchaseId: Nullable<string>;
  cb?: () => void;
}

export const SoldPriceModal: FC<SoldPriceModalProps> = ({ open, close, purchaseId, cb }) => {
  const [soldPrice, setSoldPrice] = useState('');
  const handleSubmit = () => {
    if (purchaseId && parseInt(soldPrice)) {
      purchaseApi.partialEdit(purchaseId, { soldPrice: parseInt(soldPrice) }).then(cb);
    }
  };
  return (
    <Modal open={open} onCancel={close} closable={false} onOk={handleSubmit}>
      <Form labelCol={{ span: 8 }} labelAlign="left">
        <Form.Item label="Цена продажи">
          <NumericInput
            value={soldPrice}
            onChange={(e) => {
              const valueWithoutSeparator = e.target.value.replaceAll('.', '');
              setSoldPrice(valueWithoutSeparator);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
