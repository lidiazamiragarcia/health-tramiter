 "use client";
import React, { useState } from 'react';
import styles from '../../components/auth/login.module.css';
import Button from '../../components/ui/Button';
import httpRequest from '../../services/httpClient';
import { createUser } from '../../services/userService';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [types, setTypes] = useState<{ id: number; code: string; name: string }[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  React.useEffect(() => {
    // Load identification types and roles from API
    (async () => {
      try {
        const t: any = await httpRequest('/tipos-identificacion', { method: 'GET' });
        setTypes(t || []);
      } catch {
        setTypes([
          { id: 1, code: 'CC', name: 'Cédula de ciudadanía' },
          { id: 2, code: 'CE', name: 'Cédula de extranjería' },
          { id: 3, code: 'PA', name: 'Pasaporte' },
          { id: 4, code: 'TI', name: 'Tarjeta de identidad' }
        ]);
      }
    })();
  }, []);

  return (
    <div className={styles.pageAuth}>
      <div className={styles.authCard}>
        <header className={styles.authHeader}>
          <div className={styles.authBrand} aria-hidden>
            <img src="/logo.png" alt="Health Tramiter" />
          </div>
          <div className={styles.title}>Registro de usuario</div>
          <div className={styles.subtitle}>Crea tu cuenta</div>
        </header>

        {errorMsg && <div style={{ marginBottom: 12, color: 'red', textAlign: 'center' }}>{errorMsg}</div>}
        {successMsg && <div style={{ marginBottom: 12, color: 'green', textAlign: 'center' }}>{successMsg}</div>}
        <form className={styles.form} onSubmit={async (e) => {
          e.preventDefault();
          // build payload and submit
          const payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            identificationTypeId: Number(idType) || null,
            identificationNumber: idNumber,
            roleId: 2 // default USER role id; backend will validate
          };
          setErrorMsg(null);
          if (password !== confirm) {
            setErrorMsg('Las contraseñas no coinciden');
            return;
          }
          try {
            await createUser(payload);
            setSuccessMsg('Registro exitoso. Redirigiendo a login...');
            setTimeout(() => { window.location.href = '/login'; }, 900);
          } catch (err: any) {
            const msg = err?.message || (err?.payload && err.payload.message) || 'Error registrando usuario';
            setErrorMsg(msg);
          }
        }} noValidate>
          <div className={styles.formGrid}>
            <label className={`${styles.formLabel} ${styles.span2}`}>
              Nombres
              <input className={styles.input} name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label className={`${styles.formLabel} ${styles.span2}`}>
              Apellidos
              <input className={styles.input} name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
          </div>

          <label className={`${styles.formLabel} ${styles.span2}`}>
            Tipo de identificación
            <select className={styles.input} value={idType} onChange={(e) => setIdType(e.target.value)}>
              <option value="">Seleccione</option>
              {types.map((t) => <option key={t.id} value={t.id}>{t.code} – {t.name}</option>)}
            </select>
          </label>

          <label className={`${styles.formLabel} ${styles.span2}`}>
            Número de identificación
            <input className={styles.input} name="identificationNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
          </label>

          <label className={`${styles.formLabel} ${styles.span2}`}>
            Email
            <input className={styles.input} name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className={`${styles.formLabel} ${styles.span2}`}>
            Contraseña
            <input className={styles.input} name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          <label className={`${styles.formLabel} ${styles.span2}`}>
            Confirmar contraseña
            <input className={styles.input} name="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </label>

          <div className={styles.actions}>
            <Button type="submit">Registrar</Button>
          </div>
        </form>

        <footer className={styles.authFooter}>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </footer>
      </div>
    </div>
  );
}

