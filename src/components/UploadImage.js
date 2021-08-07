// import React from 'react';
// import { Image as Img, Upload, message } from 'antd';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

// const UploadImage = ({ name, onChange, value, ...props }) => {
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [url, setUrl] = React.useState('');
//   React.useEffect(() => {
//     setUrl(value);
//   }, [value]);
//   const beforeHandle = (file) => {
//     const isJpgOrPng =
//       file.type === 'image/jpeg' ||
//       file.type === 'image/png' ||
//       file.type === 'image/jpg';
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error('Image must smaller than 2MB!');
//     }
//     return isJpgOrPng && isLt2M;
//   };
//   const changeHandle = (info) => {
//     if (info.file.status === 'uploading') {
//       setIsLoading(true);
//       return;
//     }
//     if (info.file.status === 'done') {
//       const imageUrl = info.file.response.location;
//       setUrl(imageUrl);
//       onChange(imageUrl);
//       setIsLoading(false);
//     }
//   };
//   return (
//     <>
//       <Upload
//         name={name || 'image'}
//         listType="picture-card"
//         multiple={false}
//         showUploadList={false}
//         action={`${API_UPLOAD_URL}/image`}
//         beforeUpload={beforeHandle}
//         onChange={changeHandle}
//         {...props}
//       >
//         {url ? (
//           <Img src={url} />
//         ) : (
//           <div>{isLoading ? <LoadingOutlined /> : <PlusOutlined />}</div>
//         )}
//       </Upload>
//     </>
//   );
// };
// export default UploadImage;

import React from 'react';
import { Image as Img, Upload, message, Badge } from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { API_UPLOAD_URL } from '../constants/defaultValues';

const UploadImage = ({
  name,
  onChange,
  value,
  disabled = false,
  preview = false,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [url, setUrl] = React.useState('');
  React.useEffect(() => {
    setUrl(value);
  }, [value]);
  const beforeHandle = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const changeHandle = (info) => {
    if (info.file.status === 'uploading') {
      setIsLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const imageUrl = info.file.response.location;
      setUrl(imageUrl);
      onChange(imageUrl);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Upload
        name={name || 'image'}
        listType="picture-card"
        multiple={false}
        disabled={disabled}
        showUploadList={false}
        action={`${API_UPLOAD_URL}/image`}
        beforeUpload={beforeHandle}
        onChange={changeHandle}
      >
        {url ? (
          <Badge
            count={
              <CloseOutlined
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  setUrl('');
                  onChange('');
                }}
              />
            }
          >
            <Img preview={preview} src={url} />
          </Badge>
        ) : (
          <div>{isLoading ? <LoadingOutlined /> : <PlusOutlined />}</div>
        )}
      </Upload>
    </>
  );
};
export default UploadImage;
