import { Card, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { styles } from './info-block.styles';

export const InfoBlock = () => {
  return (
    <Card css={styles.infoBlock} bordered={false}>
      <Statistic
        title="Active"
        value={11.28}
        precision={2}
        valueStyle={{ color: '#3f8600' }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Card>
  );
};
