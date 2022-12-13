import { Button } from 'antd';

import styles from './Modal.module.scss';

function Modal({ closeModal, deleteArticle }) {
  return (
    <div className={styles.modal}>
      <div>
        <span>Are you sure want to delete article?</span>
      </div>
      <div className={styles.buttons}>
        <Button onClick={closeModal}>No</Button>
        <Button onClick={deleteArticle}>Yes</Button>
      </div>
    </div>
  );
}

export default Modal;
