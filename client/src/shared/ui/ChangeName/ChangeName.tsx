import { useState } from "react";
import styles from "../../../pages/ProfilePage/ProfilePage.module.scss";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

interface UserData {
  username: string;
  avatar: string;
}

export const ChangeName = () => {
  const [userData, setUserData] = useState<UserData>({
    username: "NoHomo",
    avatar: "",
  });

  return (
    <>
      <div className={styles.nickname}>{userData.username}</div>
      <div className={styles.password}>
        <Input type="text" className={styles.input} labelText="Новое имя" />
        <Button
          type="submit"
          buttonText="Сохранить"
          className={styles.submitButton}
        />
      </div>
    </>
  );
};
