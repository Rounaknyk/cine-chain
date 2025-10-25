import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  asChild?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'medium',
  asChild = false,
  children,
  className = '',
  ...props
}, ref) => {
  const Component = asChild ? motion.div : motion.button;
  
  return (
    <Component
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      {...(asChild ? {} : props)}
    >
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
