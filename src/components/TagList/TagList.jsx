/* eslint-disable react/jsx-props-no-spreading */
import { useFieldArray } from 'react-hook-form';
import { Button } from 'antd';

import styles from './TagList.module.scss';

function TagList({ label, register, errors, name, control }) {
  const { fields, append, remove } = useFieldArray({ control, name });
  return (
    <div className={styles.tagwrapper}>
      <label>{label}</label>
      <ul className={styles.taglist}>
        {fields.map((item, index) => (
          <li key={item.id} className={styles.tagwrapper__item}>
            <input {...register(`${name}.${index}.tagName`)} />
            <div className={styles.buttonwrapper}>
              <Button className={styles.button} ghost danger onClick={() => remove(index)}>
                Delete
              </Button>
              {fields.length - 1 === index && (
                <Button className={styles.button} ghost type="primary" onClick={() => append({})}>
                  Add tag
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {!fields.length && (
        <div className={styles.buttonwrapper}>
          <Button className={styles.button} ghost type="primary" onClick={() => append({})}>
            Add tag
          </Button>
        </div>
      )}
      {errors[name] && <span className={styles.error}>{`${label} ${errors[name].message}`}</span>}
    </div>
  );
}

export default TagList;
