import Link from 'next/link';
import { useActiveRoute } from '../../hooks';
import routes from '../../utils/routes';
import { useSidebarRoutes } from '../../utils/static';
import { Profile } from './profile';
import { Profile as IProfile } from '../../services/queries/profile/types';

export interface IProps {
  className?: string;
  data?: IProfile;
}

export function Sidebar(props: IProps) {
  const { className = 'hidden lg:block', data } = props;
  const { isActive } = useActiveRoute();

  const sidebarRoutes = useSidebarRoutes();

  return (
    <aside className={`app__dashboard_layout__aside ${className}`}>
      <div className="app__dashboard_layout__aside__content">
        <div className="app__dashboard_layout__aside__content__top app__dashboard_layout__aside__content_px">

          <Link href={routes.dashboard.path} className="app__dashboard_layout__aside__logo !text-white">
            Philan Admin
          </Link>

          <nav className="app__dashboard_layout__aside__nav">
            <ul className="app__dashboard_layout__aside__nav__ul">
              {sidebarRoutes.map((item) => (
                <li className="app__dashboard_layout__aside__nav__ul__li" key={item.label}>
                  <Link href={item.href} legacyBehavior>
                    <a className={`app__dashboard_layout__aside__nav__ul__li__a justify-between ${item.className || ''} ${item.href === routes.dashboard.path ? isActive(item.href, true) : isActive(item.href)}`} href={item.href}>
                      <div className="flex items-center">
                        {item.icon}

                        {item.label}
                      </div>

                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="app__dashboard_layout__aside__content_px">
          <Profile
            data={data}
            type="sidebar"
          />
        </div>
      </div>
    </aside>
  );
}
