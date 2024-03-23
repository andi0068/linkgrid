import { FiLoader } from 'react-icons/fi';

import { BaseProps } from '@/types';

import Icon from './icon';

export interface ButtonContentProps extends BaseProps {
  loading?: boolean;
}

export default function ButtonContent({ children, loading }: ButtonContentProps) {
  return (
    <>
      {loading ? (
        <Icon asChild>
          <FiLoader aria-label="Loading" />
        </Icon>
      ) : (
        children
      )}
    </>
  );
}
