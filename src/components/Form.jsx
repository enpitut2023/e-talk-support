import { useRef } from "react";
import { db } from "../../firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import "../App.css";

import {
  Button,
  FormControl,
  TextField,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Form = (props) => {
  // 親コンポネントのユーザーリストを更新のための関数を受け取り
  const addUserToList = props.addUserToList;
  const meetingDocRef = doc(db, "meetings", props.meetingId);
  const userCollectionRef = collection(db, "users");

  // 各入力フィールド用のrefを作成
  const nameRef = useRef(null);
  const birthPlaceRef = useRef(null);
  const affliationRef = useRef(null);
  const hobbyRef = useRef(null);
  const talkRef = useRef(null);
  const snsRef = useRef(null);

  const resetForm = () => {
    const collection = document.getElementsByClassName("form-val");
    for (let i = 0; i < collection.length; i++) {
      collection[i].value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    // refを使用して各フィールドの値を取得
    const name = nameRef.current.value;
    const birthPlace = birthPlaceRef.current.value;
    const affliation = affliationRef.current.value;
    const hobby = hobbyRef.current.value;
    const talk = talkRef.current.value;
    const sns = snsRef.current.value;

    const userData = {
      name: {
        value: name,
        fav: 0,
      },
      birthPlace: {
        value: birthPlace,
        fav: 0,
      },
      affliation: {
        value: affliation,
        fav: 0,
      },
      hobby: {
        value: hobby,
        fav: 0,
      },
      talk: {
        value: talk,
        fav: 0,
      },
      sns: {
        value: sns,
        fav: 0,
      },
    };

    resetForm();

    addDoc(userCollectionRef, userData).then((userRef) => {
      updateDoc(meetingDocRef, {
        users: arrayUnion(userRef),
      }).then(() => {
        addUserToList(userRef);
      });
    });
  };

  const FormItem = (props) => {
    return (
      <div>
        <TextField
          type="text"
          size="small"
          margin="normal"
          label={props.label}
          variant="filled"
          inputRef={props.valueRef}
          fullWidth
        />
      </div>
    );
  };

  return (
    <Box width={430}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          あなたのユーザー情報を登録
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <FormControl variant="standard">
              <FormItem label="名前" valueRef={nameRef}></FormItem>
              <FormItem label="出身地" valueRef={birthPlaceRef}></FormItem>
              <FormItem label="所属" valueRef={affliationRef}></FormItem>
              <FormItem label="趣味" valueRef={hobbyRef}></FormItem>
              <FormItem label="話したいこと" valueRef={talkRef}></FormItem>
              <FormItem label="SNS" valueRef={snsRef}></FormItem>
              <h5>
                一度登録したプロフィール情報は変更できません。
                <br />
                登録情報を修正したい場合は、 「ユーザを削除」をクリックし、
                入力フォームから再度情報を登録してください。
              </h5>
              <Button type="submit">登録</Button>
            </FormControl>
          </form>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
