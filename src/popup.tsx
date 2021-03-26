import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { ChakraProvider, Textarea, Select } from '@chakra-ui/react';
import { makeStyles } from '@material-ui/core/styles';
import { useClipboard } from 'use-clipboard-copy';
import { clipboard as ClipboardUtils } from '@extend-chrome/clipboard';
import useTranslator from './useTranslator';

function Popup() {
  const styles = useStyles();
  const {
    inputValue, setInputValue,
    outputValue,
    srcLang, setSrcLang,
    dstLang, setDstLang,
    translate
  } = useTranslator();
  const clipboard = useClipboard();

  const onInputValueChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = function (e) {
    setInputValue(e.target.value);
    translate(e.target.value, srcLang, dstLang);
  }

  const pasteText = () => {
    ClipboardUtils.readText()
      .then(val => {
        setInputValue(val);
        translate(val, srcLang, dstLang);
      })
      .catch(err => console.log(err));
  }

  const copyText = () => {
    clipboard.copy();
  }

  const InputTextField = useMemo(() => (
    <Textarea
      id='input-text-area'
      variant='outline'
      placeholder='请输入要翻译的内容'
      size='sm'
      value={inputValue}
      focusBorderColor='blue.200'
      onChange={onInputValueChange} />
  ), [inputValue, setInputValue]);

  const OutputTextField = useMemo(() => (
    <Textarea
      id='input-text-area'
      variant='filled'
      size='sm'
      isReadOnly
      value={outputValue}
      ref={clipboard.target}
      focusBorderColor='blue.200' />
  ), [outputValue]);

  return (
    <Box className={styles.container}>
      <Box>
        <Button
          variant='contained'
          disableElevation
          disableRipple
          className={styles.pasteBtn}
          fullWidth
          onClick={() => pasteText()}>
          从剪贴板获取
        </Button>
        <Divider className={styles.horizontalBlankSpace} />
        <Button
          variant='contained'
          disableElevation
          disableRipple
          className={styles.copyBtn}
          fullWidth
          onClick={() => copyText()}>
          复制翻译内容
        </Button>
      </Box>
      <Divider className={styles.horizontalBlankSpace} />
      <Box display='flex'>
        <Select
          focusBorderColor='blue.200'
          placeholder='自动'
          onChange={e => {
            const val = e.target.value;
            if (val === '') setSrcLang('auto');
            else setSrcLang(val);
          }} >
          <option value='zh'>中文</option>
          <option value='en'>英语</option>
          <option value='jp'>日语</option>
        </Select>
        <Divider className={styles.verticalBlankSpace} />
        <Select
          focusBorderColor='blue.200'
          placeholder='中文'
          onChange={e => {
            const val = e.target.value;
            if (val === '') setDstLang('auto');
            else setDstLang(val);
          }}>
          <option value='en'>英语</option>
          <option value='jp'>日语</option>
        </Select>
      </Box>
      <Divider className={styles.horizontalBlankSpace} />
      <Box display='flex'>
        {InputTextField}
        <Divider className={styles.verticalBlankSpace} />
        {OutputTextField}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  container: {
    width: 500,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  pasteBtn: {
    backgroundColor: '#73d13d',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#95de64',
    }
  },
  copyBtn: {
    backgroundColor: '#597ef7',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#85a5ff',
    }
  },
  horizontalBlankSpace: {
    height: 10,
    backgroundColor: '#ffffff'
  },
  verticalBlankSpace: {
    width: 10,
    backgroundColor: '#ffffff'
  }
});

ReactDOM.render(
  <ChakraProvider>
    <Popup />,
  </ChakraProvider>,
  document.getElementById("root")
);
