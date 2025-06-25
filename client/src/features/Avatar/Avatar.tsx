interface IAvatar {
  fileName: string | null | undefined;
}

const Avatar = ({ fileName }: IAvatar) => {
  const avatar = fileName ? (
    <img src={`/${fileName}.svg`} alt={`Аватар ${fileName}`} />
  ) : (
    <img src={`/crocodile-com.svg`} alt="Дефолтный аватар" />
  );

  return avatar;
};

export default Avatar;
