/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
// import io from 'socket.io-client';
import { styles } from './home-page.styles';
import { useNavigate } from 'react-router-dom';
// import { useCreateItemStore } from '../../app/stores/create-item-store';
import { purchaseApi } from '../../entities/purchase/api';
import { CarModel, ExtraInfo } from '../../entities/purchase/model';
import { Badge, Button, Card, Dropdown, Modal, Popover, Statistic, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleTwoTone,
  AppstoreAddOutlined
} from '@ant-design/icons';
const { confirm } = Modal;
import {
  Nullable,
  PurchaseStatusNames,
  PurchaseStatuses,
  PurchaseTypeNames,
  PurchaseTypes
} from '../../app/types';
import { routes } from '../../routes';
import { SoldPriceModal } from '../../features/sold-price-modal/sold-price-modal';
import { AddExtraInfoModal } from '../../features/add-extra-info-modal/add-extra-info-modal';
import { toast } from 'react-toastify';

// const socket = io('https://payment-tg-bot.onrender.com');

// socket.on('new_message_server', (data) => {
//   console.log(data);
// });
const renderStatus = (status: PurchaseStatuses) => {
  const statusOptions = PurchaseStatusNames[status];
  return (
    <Badge
      css={styles.badge}
      color={statusOptions.color}
      text={PurchaseStatusNames[status].title}
    />
  );
};

export const HomePage = () => {
  // const [notifications, setNotifications] = useState<string[]>([]);
  // const { createItemStep } = useCreateItemStore((state) => state);
  const [currentExtraInfo, setCurrentExtraInfo] = useState<ExtraInfo[]>([]);
  const [itemList, setItemList] = useState<CarModel[]>([]);
  const [openSoldPriceModal, setOpenSoldPriceModal] = useState(false);
  const [openExtraInfoModal, setOpenExtraInfoModal] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState<Nullable<string>>('');
  const navigate = useNavigate();
  const [stats, setStats] = useState<{
    purchaseCount: number;
    moneyInDeel: number;
    profit: number;
    salesCount: number;
    userProfit: number;
    growPercent: number;
  }>();

  const handleDelete = (id: Nullable<string>) => {
    confirm({
      title: 'Подтверди удаление !',
      icon: null,
      onOk() {
        if (id) {
          purchaseApi.remove(id).then(() => {
            fetchPruchases();
            fetchStats();
          });
        }
      }
    });
  };

  const handleDepositBack = (id: string) => {
    purchaseApi.depositBack(id).then(() => {
      fetchPruchases();
      fetchStats();
    });
  };

  const handleFakeFeeBack = (id: string) => {
    purchaseApi.fakeFeeBack(id).then(() => {
      fetchPruchases();
      fetchStats();
    });
  };

  const handleCommissionBack = (id: string) => {
    purchaseApi.commissionBack(id).then(() => {
      fetchPruchases();
      fetchStats();
    });
  };

  const columns: ColumnsType<CarModel> = [
    {
      title: 'Марка',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: 'Модель',
      dataIndex: ['model', 'name'],
      key: 'name'
    },
    {
      title: 'Год',
      dataIndex: 'year',
      key: 'year'
    },
    {
      title: 'Пробег',
      dataIndex: 'mileage',
      key: 'mileage'
    },
    {
      title: 'Тип',
      dataIndex: 'purchaseType',
      key: 'purchaseType',
      render: (purchaseType) => PurchaseTypeNames[purchaseType]
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Dropdown
          menu={{ items: getStatuses(record._id, status, record.purchaseType as PurchaseTypes) }}>
          {renderStatus(status)}
        </Dropdown>
      )
    },
    {
      title: '',
      render: (_, record) => {
        const showReturnDepositPopover = record.deposit.canReturn || record.fakeFee.canReturn;
        return (
          <div css={styles.controls}>
            <DeleteOutlined onClick={() => handleDelete(record._id)} />
            <EditOutlined
              onClick={() => {
                if (record._id) {
                  navigate(`${routes.purchase.edit(record._id)}`);
                }
              }}
            />
            <AppstoreAddOutlined
              onClick={() => {
                setCurrentPurchase(record._id);
                setCurrentExtraInfo(record.extraInfo);
                setOpenExtraInfoModal(true);
              }}
            />
            {showReturnDepositPopover && (
              <Popover content={() => content(record)} title="Нужно доп информация">
                <InfoCircleTwoTone />
              </Popover>
            )}
          </div>
        );
      }
    }
  ];

  const content = (purchase: CarModel) => {
    return (
      <>
        {purchase.commission.canReturn && (
          <Button
            onClick={() => {
              if (purchase._id) {
                handleCommissionBack(purchase._id);
              }
            }}>
            Вернуть комиссию
          </Button>
        )}
        {purchase.deposit.canReturn && (
          <Button
            onClick={() => {
              if (purchase._id) {
                handleDepositBack(purchase._id);
              }
            }}>
            Вернуть задаток
          </Button>
        )}
        {purchase.fakeFee.canReturn && (
          <Button
            onClick={() => {
              if (purchase._id) {
                handleFakeFeeBack(purchase._id);
              }
            }}>
            Вернуть fake fee
          </Button>
        )}
      </>
    );
  };

  const getStatuses = (
    id: Nullable<string>,
    status: PurchaseStatuses,
    purchaseType: PurchaseTypes
  ) => {
    // remove deposit paid form commission
    const extraFilter =
      purchaseType === PurchaseTypes.Commission
        ? ([key]: any) => key !== PurchaseStatuses.DepositPaid
        : (elem: any) => elem;
    return Object.entries(PurchaseStatusNames)
      .filter(([key]) => key !== status)
      .filter(extraFilter)
      .map(([key]) => ({
        key,
        label: (
          <div
            onClick={() => {
              if (id) {
                purchaseApi.editStatus(id, key as PurchaseStatuses).then(() => {
                  if (key === PurchaseStatuses.Completed) {
                    setOpenSoldPriceModal(true);
                    setCurrentPurchase(id);
                  } else {
                    fetchPruchases();
                    fetchStats();
                    setOpenSoldPriceModal(false);
                  }
                });
              }
            }}>
            {renderStatus(key as PurchaseStatuses)}
          </div>
        )
      }));
  };

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.metaKey && event.code === 'KeyI') {
      navigate(routes.purchase.create);
    }
  }, []);

  const fetchPruchases = () => {
    purchaseApi.getList().then((list) => setItemList(list));
  };

  const fetchStats = () => {
    purchaseApi.getStats().then((stats) => setStats(stats));
  };
  useEffect(() => {
    fetchPruchases();
    fetchStats();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div css={styles.page}>
      <div css={styles.info}>
        <div css={styles.firstBlock}>
          <Card css={{ height: '100px' }} bordered={false}>
            <Statistic title="Покупки" value={stats?.purchaseCount} />
          </Card>
          <Card css={{ height: '100px' }} bordered={false}>
            <Statistic title="Продажи" value={stats?.salesCount} />
          </Card>
        </div>
        <Card css={{ height: '100px' }} bordered={false}>
          <Statistic title="В обороте" value={stats?.moneyInDeel} />
        </Card>
        <div css={styles.firstBlock}>
          <Card css={{ height: '100px' }} bordered={false}>
            <Statistic title="Общий +" valueStyle={{ color: '#3f8600' }} value={stats?.profit} />
          </Card>
          <Card css={{ height: '100px' }} bordered={false}>
            <Statistic title="Мой +" valueStyle={{ color: '#3f8600' }} value={stats?.userProfit} />
          </Card>
        </div>
        <Card css={{ height: '100px' }} bordered={false}>
          <Statistic
            title="Общий рост капитала (завершенные)"
            valueStyle={{ color: '#3f8600' }}
            value={stats?.growPercent + '%'}
          />
        </Card>
      </div>
      <AddExtraInfoModal
        data={currentExtraInfo}
        purchaseId={currentPurchase}
        close={() => {
          setOpenExtraInfoModal(false);
        }}
        open={openExtraInfoModal}
        cb={() => {
          fetchPruchases();
          fetchStats();
          setOpenExtraInfoModal(false);
          toast.success('Доп расходы изменены');
        }}
      />
      <SoldPriceModal
        purchaseId={currentPurchase}
        close={() => setOpenSoldPriceModal(false)}
        open={openSoldPriceModal}
        cb={() => {
          fetchPruchases();
          fetchStats();
          setOpenSoldPriceModal(false);
        }}
      />
      <Table
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: () => navigate(`${routes.purchase.edit(record._id)}`)
        //   };
        // }}
        columns={columns}
        dataSource={itemList}
      />
    </div>
  );
};
