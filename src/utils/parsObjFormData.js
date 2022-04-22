const parsObjFormData = (data) => {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key].constructor === Array) {
      let arr = data[key];
      for (let i = 0; i < arr.length; i++) {
        formData.append(`${key}[]`, arr[i]);
      }
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};
export default parsObjFormData;
