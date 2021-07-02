import React from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/actions';

const { Option } = Select;

const CommunitySelect = ({ ...props }) => {
  const dispatch = useDispatch();
  const [communityList, setCommunityList] = React.useState([]);
  const [list, setlist] = React.useState([]);
  const { communityAll } = useSelector((state) => state);
  React.useEffect(() => {
    dispatch(Actions.getAllCommunity());
  }, [dispatch]);
  React.useEffect(() => {
    setCommunityList(communityAll.community);
    setlist(communityAll.community);
  }, [communityAll]);
  const onSearchCommunity = (v) => {
    const u = [...communityList];
    if (v) {
      setlist([
        ...u.filter(
          (c) => c?.name?.toLowerCase().indexOf(v.toLowerCase()) > -1
        ),
      ]);
    } else {
      setlist(u);
    }
  };
  return (
    <Select
      filterOption={false}
      showSearch
      onSearch={onSearchCommunity}
      {...props}
      placeholder="Please choose the community"
    >
      {list &&
        list.map((item) => {
          return (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          );
        })}
    </Select>
  );
};

export default CommunitySelect;
