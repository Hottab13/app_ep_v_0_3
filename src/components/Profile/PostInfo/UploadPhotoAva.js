import { Upload, message, Button , Modal, Icon} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React  from "react";
import './PostInfo.css';
import { useSelector, useDispatch } from "react-redux";


function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Вы можете загружать только файлы JPG/PNG!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Изображение должно быть меньше 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true,
    });
  };

  handleUpload = ({ fileList }) => {
    //---------------^^^^^----------------
    // this is equivalent to your "const img = event.target.files[0]"
    // here, antd is giving you an array of files, just like event.target.files
    // but the structure is a bit different that the original file
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj
    console.log("fileList", fileList);

    // you store them in state, so that you can make a http req with them later
    this.setState({ fileList });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //let formData = new FormData();
    // add one or more of your files in FormData
    // again, the original file is located at the `originFileObj` key
    //formData.append("image", this.state.fileList[0].originFileObj);
    //this.props.uploadPhoto(formData);
    this.props.uploadPhoto(this.state.fileList[0].originFileObj);
  };
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        {/*<Icon type="plus" />*/}
        <div className="ant-upload-text">Загрузить</div>
      </div>
    );
    return (
      <div>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleUpload}
          beforeUpload={beforeUpload} // return false so that antd doesn't upload the picture right away
        >
          {uploadButton}
        </Upload>

        <Button
          onClick={this.handleSubmit} // this button click will trigger the manual upload
        >
          Отправить
        </Button>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default PicturesWall;