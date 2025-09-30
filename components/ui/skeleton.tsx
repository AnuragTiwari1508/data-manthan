import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
      <div
        data-slot="skeleton"
        className={cn('bg-accent animate-pulse rounded-md', 'w-full h-4 sm:h-6', className)}
        {...props}
      />
  )
}

export { Skeleton }
