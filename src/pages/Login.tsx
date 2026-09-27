import { AuthError } from '@supabase/supabase-js';
import { useState, type FormEvent } from 'react';
import { Navigate, useSearchParams } from 'react-router';
import { Icon } from '../components/Icon';
import { Input } from '../components/Input';
import { useAuth } from '../auth';
import { useT, type TKey } from '../i18n';
import { PageHero } from '../layout/PageHero';
import { supabase } from '../lib/supabase';
import './Login.css';

const ERRORS: Record<string, TKey> = {
  invalid_credentials: 'auth.error.invalid',
  email_not_confirmed: 'auth.error.unconfirmed',
  user_already_exists: 'auth.error.exists',
  weak_password: 'auth.error.weak',
  over_email_send_rate_limit: 'auth.error.rate',
  over_request_rate_limit: 'auth.error.rate',
};

export function Login() {
  const { t } = useT();
  const { session } = useAuth();
  const [params] = useSearchParams();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<TKey | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  // Only same-site paths, so the link can't bounce people to another website.
  const next = params.get('next')?.startsWith('/') ? params.get('next')! : '/classes';
  if (session) return <Navigate to={next} replace />;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email'));
    const password = String(form.get('password'));
    setBusy(true);
    setError(null);
    const { data, error } =
      mode === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/login?next=${encodeURIComponent(next)}` } });
    setBusy(false);
    if (error) return setError(ERRORS[(error as AuthError).code ?? ''] ?? 'auth.error.generic');
    // With email confirmation on, sign-up returns no session until the link is clicked.
    if (!data.session) setSentTo(email);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError(null);
  };

  return (
    <>
      <PageHero title={t(mode === 'login' ? 'page.login' : 'auth.signupTitle')} />
      <main className="page">
        {sentTo ? (
          <p className="auth__sent" role="status">
            {t('auth.checkEmail')} <strong>{sentTo}</strong>.
          </p>
        ) : (
          <form className="auth" onSubmit={submit}>
            {error && (
              <div className="alert" role="alert">
                <Icon name="warning-circle" set="fill" size={20} color="var(--error)" style={{ marginTop: 1 }} />
                <span>{t(error)}</span>
              </div>
            )}
            <label className="field">
              <span className="field__label">{t('auth.email')}</span>
              <Input tone="light" name="email" type="email" autoComplete="email" required />
            </label>
            <label className="field">
              <span className="field__label">{t('auth.password')}</span>
              <div className="password">
                <Input
                  tone="light"
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  minLength={mode === 'signup' ? 8 : undefined}
                  required
                />
                <button type="button" className="password__toggle" aria-pressed={showPw} onClick={() => setShowPw((v) => !v)}>
                  {t(showPw ? 'auth.hide' : 'auth.show')}
                </button>
              </div>
              {mode === 'signup' && <span className="note">{t('auth.passwordHint')}</span>}
            </label>
            <button type="submit" className="btn btn--dark btn--lg btn--full" disabled={busy}>
              {t(mode === 'login' ? 'auth.submitLogin' : 'auth.submitSignup')}
            </button>
            <button type="button" className="auth__switch" onClick={switchMode}>
              {t(mode === 'login' ? 'auth.toSignup' : 'auth.toLogin')}
            </button>
          </form>
        )}
      </main>
    </>
  );
}
