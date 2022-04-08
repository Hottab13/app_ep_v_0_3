export const hendlErr = (err) => {
  if (err.response) {
    console.log("Клиент получил ответ об ошибке (5xx, 4xx)");
    console.log(err.response);
    return err.response;
  } else if (err.request) {
    console.log("клиент так и не получил ответа, или запрос так и не ушел ");
    const dataErr = {
      data: {
        errorText: "Клиент так и не получил ответа, или запрос так и не ушел ",
      },
    };
    console.log(err.request);
    return dataErr;
  } else {
    const dataErr = {
      data: {
        errorText: "Неизвестная причина ",
      },
    };
    console.log("Неизвестная причина");
    return dataErr;
  }
};
