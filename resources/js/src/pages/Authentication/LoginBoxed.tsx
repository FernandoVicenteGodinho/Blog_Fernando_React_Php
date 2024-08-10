import  React, { useEffect, useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../components/Dropdown';
import themeConfig from '../../theme.config';
import i18next from 'i18next';


const LoginBoxed = () => {
    const { t } = useTranslation();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [flag, setFlag] = useState(themeConfig.locale);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

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
        dispatch(setPageTitle('Login Boxed'));
    });

    const navigate = useNavigate();

    const submitForm = () => {
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                <div className="flex justify-between ">
                    <h2 className="font-bold text-2xl mb-3">Login</h2>
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

                <p className="mb-7">{t('login_subtitle')}</p>
                <form className="space-y-5" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input id="email" type="email" className="form-input" placeholder={t('enter_your')+" e-mail" }/>
                    </div>
                    <div>
                        <label htmlFor="password">{t('password_Label')}</label>
                        <input id="password" type="password" className="form-input" placeholder={t('password')} />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        {t('login')}
                    </button>
                </form>
                <div className="relative my-2 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                </div>
                <p className="text-center">
                    {t('dont_have_an_account')}
                    <Link to="/register" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                        {t('sign_up')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginBoxed;
