import { Divider, Form, Input, Modal, Radio, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useCreateItemStore } from '../../../../app/stores/create-item-store';
import {
  CreateItemSteps,
  IOption,
  PurchaseTypes,
  getPurchaseTypeNameOptions
} from '../../../../app/types';
import { styles } from './main-form-modal.styles';
import { carBrandApi } from '../../../../entities/car-brand/api/car-api';
import { PatternFormat } from 'react-number-format';
import { purchaseApi } from '../../../../entities/purchase/api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../../../routes';
import { useAtom } from 'jotai';
import { createFormAtom, initialFormValues } from '../../../../app/atoms/create-form-atom';
import { NumericInput } from '../../../../shared/numeric-input/numberic-input';

const purchaseTypeOptions = getPurchaseTypeNameOptions();

export const MainFormModal = () => {
  const { setCreateItemStep, createItemType } = useCreateItemStore();
  const [carBrands, setCarBrands] = useState<IOption[]>([]);
  const [carModels, setCarModels] = useState<IOption[]>([]);
  const [isModelLoading, setModelLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [createForm, setPurchase] = useAtom(createFormAtom);

  const {
    year,
    mileage,
    carBrand,
    carModel,
    price,
    status,
    purchaseType,
    commissionRate,
    fakeFeeRate,
    depositRate
  } = createForm;

  useEffect(() => {
    if (id) {
      purchaseApi.get(id).then((data) =>
        setPurchase({
          carBrand: { id: data.brand },
          carModel: data.model,
          depositRate: data.deposit.rate,
          fakeFeeRate: data.fakeFee.rate,
          commissionRate: data.commission.rate,
          ...data
        })
      );
    }
    carBrandApi.getCarBrands().then((carBrands) =>
      setCarBrands(
        carBrands.map((carBrand) => ({
          value: carBrand.id,
          label: carBrand.name,
          object: carBrand
        }))
      )
    );
  }, []);

  useEffect(() => {
    if (carBrand?.id) {
      setModelLoading(true);
      carBrandApi
        .getModels(carBrand.id)
        .then((models) => {
          setCarModels(
            models.map((model) => ({
              value: model.id,
              label: model.name,
              object: model
            }))
          );
        })
        .finally(() => setModelLoading(false));
    }
  }, [carBrand]);

  const handleSubmit = useCallback(() => {
    if (isEdit) {
      purchaseApi
        .edit({
          _id: id,
          year,
          price,
          mileage,
          model: { id: carModel?.id, name: carModel?.name },
          brand: carBrand?.id,
          type: createItemType,
          status,
          purchaseType,
          commission: {
            rate: purchaseType === PurchaseTypes.Commission ? 0 : commissionRate
          },
          deposit: {
            rate: purchaseType === PurchaseTypes.Commission ? 0 : depositRate
          },
          fakeFee: {
            rate: purchaseType === PurchaseTypes.Commission ? 0 : fakeFeeRate
          }
        })
        .then(() => {
          toast.success('Покупка создана');
          setCreateItemStep(CreateItemSteps.CHOOSE_TYPE);
          setPurchase(initialFormValues);
          navigate('/');
        });
    } else {
      purchaseApi
        .create({
          year,
          price,
          mileage,
          model: { id: carModel?.id, name: carModel?.name },
          brand: carBrand?.id,
          type: createItemType,
          status,
          purchaseType,
          commission: {
            rate: purchaseType === PurchaseTypes.Commission ? 0 : commissionRate
          },
          deposit: {
            rate: purchaseType === PurchaseTypes.Commission ? 0 : depositRate
          },
          fakeFee: {
            rate: purchaseType === PurchaseTypes.Commission ? 0 : fakeFeeRate
          }
        })
        .then(() => {
          toast.success('Покупка создана');
          setCreateItemStep(CreateItemSteps.CHOOSE_TYPE);
          setPurchase(initialFormValues);
          navigate('/');
        });
    }
  }, [
    year,
    price,
    mileage,
    carModel?.id,
    carModel?.name,
    carBrand?.id,
    createItemType,
    status,
    purchaseType,
    commissionRate,
    fakeFeeRate,
    depositRate,
    setCreateItemStep,
    navigate
  ]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Enter' && event.metaKey) {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <Modal
      cancelText={isEdit ? 'Закрыть' : 'Назад'}
      maskClosable={false}
      onCancel={() => {
        if (isEdit) {
          navigate(routes.root);
        } else {
          setCreateItemStep(CreateItemSteps.CHOOSE_TYPE);
        }
      }}
      onOk={handleSubmit}
      width={600}
      closable={false}
      open>
      <Divider orientation="left">Общее</Divider>
      <Form labelCol={{ span: 8 }} labelAlign="left" css={styles.form}>
        <Form.Item label="Тип:">
          <Select
            value={purchaseType}
            onChange={(value) => setPurchase((p) => ({ ...p, purchaseType: value }))}
            options={purchaseTypeOptions}
          />
        </Form.Item>
        {purchaseType === PurchaseTypes.Auction && (
          <>
            <Form.Item label="Депозит">
              <Radio.Group
                css={styles.radio}
                value={depositRate}
                onChange={(rate) => setPurchase((p) => ({ ...p, depositRate: rate.target.value }))}
                buttonStyle="solid">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <Radio.Button value={0}>0</Radio.Button>
                  <Radio.Button value={15}>15 %</Radio.Button>
                </div>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Комиссия">
              <Radio.Group
                css={styles.radio}
                onChange={(rate) =>
                  setPurchase((p) => ({ ...p, commissionRate: rate.target.value }))
                }
                value={commissionRate}
                buttonStyle="solid">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <Radio.Button value={0}>0</Radio.Button>
                  <Radio.Button value={15}>15 %</Radio.Button>
                </div>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Fake fee">
              <Radio.Group
                css={styles.radio}
                onChange={(rate) => setPurchase((p) => ({ ...p, fakeFeeRate: rate.target.value }))}
                value={fakeFeeRate}
                buttonStyle="solid">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <Radio.Button value={0}>0</Radio.Button>
                  <Radio.Button value={30}>30 %</Radio.Button>
                </div>
              </Radio.Group>
            </Form.Item>
          </>
        )}
      </Form>
      <Divider orientation="left">Машина</Divider>
      <Form labelCol={{ span: 8 }} labelAlign="left" css={styles.form}>
        <Form.Item label="Марка">
          <Select
            showSearch
            value={carBrand?.id}
            onChange={(_, options) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setPurchase((p) => ({ ...p, carModel: null, carBrand: (options as any).object }))
            }
            options={carBrands}
          />
        </Form.Item>
        <Form.Item label="Модель">
          <Select
            disabled={carModels.length === 0 && !carModel}
            showSearch
            value={carModel?.id}
            onChange={(_, options) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setPurchase((p) => ({ ...p, carModel: (options as any).object }))
            }
            options={carModels}
            loading={isModelLoading}
          />
        </Form.Item>
        <Form.Item label="Пробег">
          <NumericInput
            onChange={(e) => {
              const valueWithoutSeparator = e.target.value.replaceAll('.', '');
              setPurchase((p) => ({ ...p, mileage: parseFloat(valueWithoutSeparator) }));
            }}
            value={mileage}
            maxLength={10}
          />
        </Form.Item>
        <Form.Item label="Цена">
          <NumericInput
            onChange={(e) => {
              const valueWithoutSeparator = e.target.value.replaceAll('.', '');
              setPurchase((p) => ({ ...p, price: parseFloat(valueWithoutSeparator) }));
            }}
            value={price}
            maxLength={10}
          />
        </Form.Item>
        <Form.Item label="Год">
          <PatternFormat
            value={year}
            onChange={(e) => {
              setPurchase((p) => ({ ...p, year: parseInt(e.target.value) }));
            }}
            format="####"
            type="tel"
            customInput={Input}></PatternFormat>
        </Form.Item>
      </Form>
    </Modal>
  );
};
