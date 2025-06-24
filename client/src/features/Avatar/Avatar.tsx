import crocoDefaultAva from '@/assets/svg/animals/крокодил.svg';
import styles from '../../pages/ProfilePage/ProfilePage.module.scss';

interface IAvatar {
  fileName: string | null;
}

const Avatar = ({ fileName }: IAvatar) => {
  const getAvatarUrl = (name: string) => {
    return new URL(`/src/assets/svg/avatars/${name}.svg`, import.meta.url).href;
  };

  const avatar = fileName ? (
    <img src={getAvatarUrl(fileName)} alt={`Аватар ${fileName}`} />
  ) : (
    <img
      src={crocoDefaultAva}
      alt="Дефолтный аватар"
      className={styles.defaultAvatar}
    />
  );

  return avatar;
};

export default Avatar;
