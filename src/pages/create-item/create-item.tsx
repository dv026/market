import { ChooseTypeModal } from './components/choose-type-modal/choose-type-modal';
import { CreateItemSteps, ItemTypeNames, ItemTypes } from '../../app/types';
import { useCreateItemStore } from '../../app/stores/create-item-store';
import { MainFormModal } from './components/main-form-modal/main-form-modal';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

console.log(ItemTypeNames[ItemTypes.CAR]);

export const CreateItem = () => {
  const { createItemStep, setCreateItemStep } = useCreateItemStore((state) => state);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setCreateItemStep(CreateItemSteps.MAIN_FORM);
    }
  }, []);

  const renderBody = () => {
    switch (createItemStep) {
      case CreateItemSteps.CHOOSE_TYPE:
        return <ChooseTypeModal />;
      case CreateItemSteps.MAIN_FORM:
        return <MainFormModal />;
      default:
        return null;
    }
  };

  return renderBody();
};
