import styles from "./Rules.module.scss";

export const Rules = () => {
  return (
    <div className={styles.container}>
        <div className={styles.rulcontainer}>
        <h1 className={styles.title}>Правила пользования игрой</h1>
        <h2 className={styles.title}>Основные правила</h2>
        <ul className={styles.title}>
            <li>Будьте вежливы – общайтесь уважительно, без оскорблений.</li>
            <li>
            Формат ответов: если отгадка состоит из двух слов, пишите их через
            тире (например, Солид-Снейк, Лара-Крофт).
            </li>
        </ul>
        <h2>Сложные темы</h2>
        <ul className={styles.title}>
            <li>Безумный зоопарк – необычные или гибридные животные.</li>
            <li>Монстры в тапках – злодеи и монстры из фильмов/игр.</li>
            <li>Консольный бардак – персонажи видеоигр.</li>
            <li>Древний трэш – устаревшие или исторические слова.</li>
        </ul>
        </div>
    </div>
  );
};
