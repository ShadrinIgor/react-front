class FileModel {
  constructor(props) {
    const urls = props ? props.urls : {};

    Object.assign(this, urls);
  }
}

export default FileModel;