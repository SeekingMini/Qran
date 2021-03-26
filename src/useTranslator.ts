import { useState, useCallback } from 'react';
import { fetchTranslation } from './api';
import md5 from 'blueimp-md5';

// APPID和密钥需要自己获取
const appid = 'xxxxxx';
const secretKey = 'xxxxx';
// 随机码
const salt = '1435660288';

function useTranslator() {
  const [inputValue, setInputValue] = useState(() => '');
  const [outputValue, setOutputValue] = useState(() => '');
  const [srcLang, setSrcLang] = useState(() => 'auto');
  const [dstLang, setDstLang] = useState(() => 'zh');

  const translate = useCallback(function (value: string, srcLang: string, dstLang: string) {
    const sign = md5(appid + value + salt + secretKey);

    const req: FetchTranslationAPI.Request = {
      q: value,
      from: srcLang,
      to: dstLang,
      appid,
      salt,
      sign
    }
    fetchTranslation(req)
      .then(resp => {
        const transResult = resp.trans_result;
        if (transResult.length >= 1)
          setOutputValue(transResult[0].dst);
      })
      .catch(err => {
        console.error(err);
        setOutputValue('');
      });
  }, [setOutputValue]);

  return {
    inputValue, setInputValue,
    outputValue, setOutputValue,
    srcLang, setSrcLang,
    dstLang, setDstLang,
    translate
  };
}

export default useTranslator;