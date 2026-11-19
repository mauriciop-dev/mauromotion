import * as React from 'react';

const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export { cn };

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg' }
>(({ className, variant = 'default', size = 'md', children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-MM-cyan focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      size === 'sm' && 'px-3 py-1.5 text-xs',
      size === 'md' && 'px-4 py-2',
      size === 'lg' && 'px-6 py-3 text-base',
      variant === 'default' && 'bg-gradient-to-r from-MM-cyan to-MM-magenta text-MM-black hover:opacity-90',
      variant === 'outline' && 'border border-MM-border-glow bg-MM-bg-card text-MM-text-primary hover:bg-MM-bg-surface',
      variant === 'ghost' && 'hover:bg-MM-bg-card hover:text-MM-text-primary',
      className
    )}
    {...props}
  >
    {children}
  </button>
));

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-MM-border-glow bg-MM-bg-card px-3 py-2',
        'text-MM-text-primary file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-MM-text-secondary focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-MM-cyan disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  ),
);

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-sm font-medium text-MM-text-primary leading-none', className)}
      {...props}
    />
  ),
);

export const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'outline' }
>(({ className, variant = 'default', children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
      'transition-colors focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-MM-cyan focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      variant === 'default' && 'bg-MM-cyan text-MM-black border-transparent',
      variant === 'outline' && 'border-MM-border-glow bg-MM-bg-card text-MM-text-primary',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('rounded-xl border border-MM-border-glow bg-MM-bg-card text-MM-text-primary shadow-sm', className)}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('font-bold text-MM-text-primary tracking-tight', className)} {...props} />
);

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-MM-text-secondary', className)} {...props} />
);

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);

export const Select = ({ children, ...props }: { children: React.ReactNode }) => (
  <div className="relative" {...props}>
    {children}
  </div>
);

export const SelectTrigger = ({ children, ...props }: { children: React.ReactNode }) => (
  <div className="flex h-10 w-full items-center justify-between rounded-md border border-MM-border-glow bg-MM-bg-card px-3 py-2 text-sm">
    {children}
  </div>
);

export const SelectContent = ({ children, ...props }: { children: React.ReactNode }) => (
  <div className="absolute z-50 w-[200px] min-w-[8rem] rounded-md border-MM-border-glow bg-MM-bg-card p-1 shadow-md">
    {children}
  </div>
);

export const SelectItem = ({ children, onClick, ...props }: { children: React.ReactNode; onClick?: () => void }) => (
  <div 
    className="cursor-pointer select-none items-center rounded-sm p-2 text-sm text-MM-text-primary hover:bg-MM-bg-surface"
    onClick={onClick}
  >
    {children}
  </div>
);

export const SelectValue = ({ placeholder }: { placeholder?: string }) => (
  <span>{placeholder}</span>
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex w-full rounded-md border border-MM-border-glow bg-MM-bg-card px-3 py-2 text-sm',
        'text-MM-text-primary placeholder:text-MM-text-secondary focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-MM-cyan disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  ),
);