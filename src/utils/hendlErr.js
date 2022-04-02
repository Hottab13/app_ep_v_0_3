export const hendlErr=(err)=>{
    if (err.response) {
      console.log("клиент получил ответ об ошибке (5xx, 4xx)");
      console.log(err.response);
    } else if (err.request) {
      console.log(
        "клиент так и не получил ответа, или запрос так и не ушел "
      );
      console.log(err.request);
    } else {
      console.log("неизвестная причина");
    }
  };