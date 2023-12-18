/* eslint-disable @typescript-eslint/no-unused-vars */
import { Divider, List, Modal, Typography } from 'antd';
import { CreateItemSteps, ItemTypes, getItemTypeNameOptions } from '../../../../app/types';
import { styles } from './choose-type-modal.styles';
import { useCreateItemStore } from '../../../../app/stores/create-item-store';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const options = getItemTypeNameOptions();

export const ChooseTypeModal = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectRef = useRef<any>(null);
  const { setCreateItemType, createItemType, setCreateItemStep } = useCreateItemStore();
  // const { setCreateItemStep, setCreateItemType } = useCreateItemStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    selectRef.current?.focus();
  }, []);

  const handleListItemClick = (itemType: ItemTypes) => {
    setCreateItemType(itemType);
  };

  const goToNextStep = () => {
    if (createItemType === ItemTypes.CAR) {
      setCreateItemStep(CreateItemSteps.MAIN_FORM);
    }
  };

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'ArrowDown') {
        const currentElemIndex = options.findIndex((option) => option.value === createItemType);
        const nextCreateItemStep = options[(currentElemIndex + 1) % options.length].value;
        setCreateItemType(nextCreateItemStep as ItemTypes);
      } else if (event.code === 'ArrowUp') {
        const currentElemIndex = options.findIndex((option) => option.value === createItemType);
        const prevCreateItemStep = options[Math.abs(currentElemIndex - 1) % options.length].value;
        setCreateItemType(prevCreateItemStep as ItemTypes);
      } else if (event.code === 'Enter') {
        goToNextStep();
      }
    },
    [createItemType, setCreateItemType, setCreateItemStep]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <Modal
      maskClosable={false}
      closable={false}
      onCancel={() => navigate('/')}
      cancelText="Закрыть"
      onOk={goToNextStep}
      okText="Следующий шаг"
      open>
      <Divider orientation="left">Тип записи</Divider>
      <List
        bordered
        size="large"
        dataSource={options}
        renderItem={(item) => (
          <List.Item
            css={[styles.listItem, item.value === createItemType && styles.listItemActive]}
            onClick={() => handleListItemClick(item.value as ItemTypes)}>
            <Typography.Text> {item.label}</Typography.Text>
          </List.Item>
        )}
      />
    </Modal>
  );
};
