import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { PageHero } from '../../layout/PageHero';
import { supabase } from '../../lib/supabase';
import { ContentEditor, type ContentTab } from './ContentEditor';
import { CoursesAdmin } from './CoursesAdmin';
import './Admin.css';

// Internal tool for the studio owner, so its labels are Vietnamese only.

const TABS = [
  { key: 'home', label: 'Trang chủ' },
  { key: 'about', label: 'Giới thiệu' },
  { key: 'contact', label: 'Liên hệ' },
  { key: 'courses', label: 'Khoá học' },
] as const;
type Tab = (typeof TABS)[number]['key'];

export function Admin() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.rpc('is_admin').then(({ data, error }) => {
      if (error) console.error(error);
      setAllowed(data === true);
    });
  }, []);

  return (
    <>
      <PageHero title="Quản trị" />
      <main className="page">
        {allowed === null ? null : allowed ? (
          <AdminTabs />
        ) : (
          <p className="muted">Tài khoản này chưa có quyền quản trị. Xem hướng dẫn thêm quản trị viên trong supabase/admin.sql.</p>
        )}
      </main>
    </>
  );
}

function AdminTabs() {
  const [params] = useSearchParams();
  const requested = params.get('tab');
  const tab: Tab = TABS.find((t) => t.key === requested)?.key ?? 'home';
  const course = params.get('course');
  const [lastContentTab, setLastContentTab] = useState<ContentTab>('home');
  useEffect(() => {
    if (tab !== 'courses') setLastContentTab(tab);
  }, [tab]);

  // Both editors stay mounted and are only hidden, so switching tabs never loses unsaved edits.
  return (
    <>
      <nav className="admin-tabs" aria-label="Mục quản trị">
        {TABS.map((t) => (
          <Link key={t.key} to={`?tab=${t.key}${course ? `&course=${course}` : ''}`} className="admin-tabs__tab" aria-current={tab === t.key ? 'page' : undefined}>
            {t.label}
          </Link>
        ))}
      </nav>
      <ContentEditor tab={tab === 'courses' ? lastContentTab : tab} hidden={tab === 'courses'} />
      <div hidden={tab !== 'courses'}>
        <CoursesAdmin />
      </div>
    </>
  );
}
