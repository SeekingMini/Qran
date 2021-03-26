declare namespace FetchTranslationAPI {
  type Request = {
    q: string;
    from: string;
    to: string;
    appid: string;
    salt: string;
    sign: string;
  }
  type Response = {
    from: string;
    to: string;
    trans_result: [TransResult]
  }
  type TransResult = {
    src: string;
    dst: string;
  }
}