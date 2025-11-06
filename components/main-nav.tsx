import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from './icons';

type NavItem = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
};

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'layoutDashboard',
  },
  {
    title: 'Study Materials',
    href: '/materials',
    icon: 'bookOpen',
  },
  {
    title: 'Upload',
    href: '/upload',
    icon: 'upload',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'settings',
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => {
        const Icon = Icons[item.icon];
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors',
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent/50',
            )}
          >
            <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
