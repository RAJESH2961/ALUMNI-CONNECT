import styles from './Button.module.css';
import { Link } from 'react-router-dom';

const Button = ({ text, href, onClick, type = 'button' }) => {
  if (href) {
    return (
      <Link to={href} className={styles.fancyButton}>
        <span className={styles.text}>{text}</span>
      </Link>
    );
  }

  return (
    <button className={styles.fancyButton} onClick={onClick} type={type}>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Button;
