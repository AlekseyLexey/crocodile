import React, { useEffect, useState } from 'react';
import type { ITheme } from './index';
import { $api } from '@/shared';
import styles from './ThemesSelect.module.scss';

interface IThemesSelectProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemesSelect = ({ setTheme }: IThemesSelectProps) => {
  const [themes, setThemes] = useState<ITheme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  useEffect(() => {
    const getAllThemes = async () => {
      const allThemesArr = await $api.get('/themes');
      setThemes(allThemesArr.data.data);
    };

    getAllThemes();
  }, []);

  const changeThemeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const themeId = e.target.value;
    setSelectedTheme(themeId);
    setTheme(themeId);
  };

  return (
    <select
      className={styles.roomInput}
      value={selectedTheme}
      onChange={changeThemeHandler}
      required
    >
      <option value="" disabled>
        Выбор темы
      </option>
      <option value="all">Все темы</option>
      {themes?.map((theme) => {
        return (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        );
      })}
    </select>
  );
};
