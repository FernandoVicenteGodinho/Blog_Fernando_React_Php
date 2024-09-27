import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { getUser, updateUser } from '../../service/user';
import { use } from 'i18next';
import { useTranslation } from 'react-i18next';
import Notification from '../../components/Notification';
import { INotification, IUser } from '../../types/types';

const AccountSetting = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    profession: '',
    website: '',
    linkedin: '',
    github: '',
  });
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [notification, setNotification] = useState<INotification>({ color: '', message: '' });

  useEffect(() => {
    getUser().then((res) => {
      setUser(res.data.content);
      setUserPhoto(res.data.content.github);
    });
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Account Setting'));
  });
  const [tabs, setTabs] = useState<string>('home');
  const toggleTabs = (name: string) => {
    setTabs(name);
  };

  const saveUser = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user);
    updateUser(user).then((res) => {
      if (res.data.status == 200) {
        setNotification({ color: 'success', message: t('success') });
        setUserPhoto(user.github);
      } else {
        setNotification({ color: 'danger', message: t('notifications_error') });
      }
    });
  };

  return (
    <div>
      <Notification color={notification.color} message={notification.message} onToastEnd={() => setNotification({ color: '', message: '' })} />

      <div className="">
        <div>
          <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
            <li className="inline-block">
              <button
                onClick={() => toggleTabs('home')}
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path
                    opacity="0.5"
                    d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M12 15L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Home
              </button>
            </li>
          </ul>
        </div>
        {tabs === 'home' ? (
          <form onSubmit={saveUser}>
            <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
              <h6 className="text-lg font-bold mb-5">{t('general_information')}</h6>
              <div className="flex flex-col sm:flex-row">
                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                  <img
                    src={`https://avatars.githubusercontent.com/${userPhoto != '' ? userPhoto : 'FernandoVicenteGodinho'}`}
                    alt="img"
                    className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"
                  />
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name">{t('name')}</label>
                    <input
                      id="name"
                      type="text"
                      placeholder={t('name')}
                      className="form-input"
                      value={user.name ?? ''}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="profession">{t('profession')}</label>
                    <input
                      id="profession"
                      type="text"
                      placeholder="Web Developer"
                      className="form-input"
                      value={user.profession ?? ''}
                      onChange={(e) => setUser({ ...user, profession: e.target.value })}
                      />
                  </div>
                  <div>
                    <label htmlFor="email">E-mail</label>
                    <input
                      disabled
                      id="email"
                      type="email"
                      placeholder={t('enter_your') + ' e-mail'}
                      className="form-input disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed"
                      value={user.email ?? ''}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="web">Website</label>
                    <input
                      id="web"
                      type="text"
                      placeholder={t('enter_your_url')}
                      className="form-input"
                      value={user.website ?? ''}
                      onChange={(e) => setUser({ ...user, website: e.target.value })}
                    />
                  </div>

                  <div className="sm:col-span-2 mt-3">
                    <button type="submit" className="btn btn-primary">
                      {t('save')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black">
              <h6 className="text-lg font-bold mb-5">{t('social_media')}</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex">
                  <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="fernando-vicente-godinho-76a018143"
                    className="form-input"
                    value={user.linkedin ?? ''}
                    onChange={(e) => setUser({ ...user, linkedin: e.target.value })}
                  />
                </div>
                <div className="flex">
                  <div className="bg-[#eee] flex justify-center items-center rounded px-3 font-semibold dark:bg-[#1b2e4b] ltr:mr-2 rtl:ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="FernandoVicenteGodinho"
                    className="form-input"
                    value={user.github ?? ''}
                    onChange={(e) => setUser({ ...user, github: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </form>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AccountSetting;
