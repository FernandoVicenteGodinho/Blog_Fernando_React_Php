import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Notification from '../../components/Notification';
import { INotification } from '../../types/types';
import { register } from '../../service/auth';

const RegisterBoxed = () => {
    const { t } = useTranslation();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [flag, setFlag] = useState(themeConfig.locale);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [notification, setNotification] = useState<INotification>({ color: '', message: '' });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(setPageTitle('Register Boxed'));
        const title = t('register');
        dispatch(setPageTitle(title));

    });
    const navigate = useNavigate();

    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        if (name == '' || email == '') {
            setNotification({ color: 'danger', message: t('sing_up_error') });
            return;
        }
        if (password.length < 8) {
            setNotification({ color: 'danger', message: t('password_error') });
            return;
        }

        const Register = {
            name: name,
            email: email,
            password: password,
        }

        await register(Register).then((response) => {
            console.log(response.status);
            if (response.status == 200){
                navigate('/login');
            }
        }).catch((error) => {
            setNotification({ color: 'danger', message: t('sing_up_error') });
        });
    };

    return (
        <div>
            <Notification color={notification.color} message={notification.message} onToastEnd={() => setNotification({ color: '', message: '' })} />

            <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
                <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                    <div className="flex justify-between ">
                        <h2 className="font-bold text-2xl mb-3">{t('sign_up')}</h2>
                        <div className="dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                button={<img className="w-5 h-5 object-cover rounded-full" src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="flag" />}
                            >
                                <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                    {themeConfig.languageList.map((item: any) => {
                                        return (
                                            <li key={item.code}>
                                                <button
                                                    type="button"
                                                    className={`flex w-full hover:text-primary rounded-lg ${i18next.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                    onClick={() => {
                                                        i18next.changeLanguage(item.code);
                                                        // setFlag(item.code);
                                                        setLocale(item.code);
                                                    }}
                                                >
                                                    <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                    <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <p className="mb-7">{t('register_subtitle')}</p>
                    <form className="space-y-5" onSubmit={submitForm} >
                        <div>
                            <label htmlFor="name" className="flex">{t('Name')} <p className="text-xs text-red-500" hidden={name.length > 0}>*</p></label>
                            <input id="name" type="text" className="form-input" placeholder={t('enter_your') + ' ' + t('name')} value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email" className="flex">E-mail <p className="text-xs text-red-500" hidden={email.length > 0}>*</p></label>
                            <input id="email" type="email" className="form-input" placeholder={t('enter_your')+" e-mail" } value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="flex">{t('password_Label')} <p className="text-xs text-red-500" hidden={password.length > 0}>*</p></label>
                            <input id="password" type="password" className="form-input" placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            {t('sign_up')}
                        </button>
                    </form>
                    <div className="relative my-2 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">

                    </div>
                    <p className="text-center">
                        {t('have_an_account')}
                        <Link to="/login" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                            {t('login')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterBoxed;
