import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: 'rounded-lg px-5 font-medium flex items-center justify-center gap-2',
  
  variants: {
    variant: {
      primary: 'button-primary',
      secondary: 'button-secondary',
      tertiary: 'button-Tertiary'
    },
    
    size: {
      default: 'py-2',
      full: 'w-full h-11',
      fullSmall:'w-full h-8',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default'
  },
})
const getDisabledClass = (variant: string | undefined) => {
  switch (variant) {
    case 'primary':
      return 'button-primary-disabled cursor-not-allowed';
    case 'secondary':
      return 'button-secondary-disabled cursor-not-allowed';
    default:
      return '';
  }
};

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode;
  disabled?: boolean;
}

export function Button({ children, variant, size, disabled, ...rest }: ButtonProps) {
  const disabledClass = disabled ? getDisabledClass(variant) : '';
  return (
    <button {...rest} className={`${buttonVariants({ variant, size })} ${disabledClass}`} disabled={disabled}>
      {children}
    </button>
  );
}

