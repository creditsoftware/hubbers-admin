import React from 'react';
import { Select } from 'antd';
import { timezoneList } from '../../../constants/timezone';

const { Option } = Select;

const TimezoneSelect = ({ ...props }) => {
  const [list, setlist] = React.useState([]);
  React.useEffect(() => {
    setlist(timezoneList);
  }, []);
  const onSearch = (v) => {
    const u = [...timezoneList];
    if (v) {
      setlist([
        ...u.filter(
          (c) => c?.value?.toLowerCase().indexOf(v.toLowerCase()) > -1
        ),
      ]);
    } else {
      setlist(u);
    }
  };
  return (
    <Select filterOption={false} showSearch onSearch={onSearch} {...props}>
      {list &&
        list.map((item) => {
          return (
            <Option value={item.value} key={item.value}>
              {`${item.abbr} / ${item.value}`}
            </Option>
          );
        })}
    </Select>
  );
};

export default TimezoneSelect;
