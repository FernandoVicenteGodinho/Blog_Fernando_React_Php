import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { getUser, updateUser } from '../../service/user';
import { use } from 'i18next';
import { useTranslation } from 'react-i18next';
import Notification from '../../components/Notification';
import { INotification, IUser } from '../../types/types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPost } from '../../service/post';

const PostCreate = () => {
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [custonContent, setCustonContent] = useState('');
  const [sumary, setSumary] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    getUser().then((res) => {
      setUser(res.data.content);
      setUserPhoto(res.data.content.github);
    });
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle(t('create_post_page')));
  });
  const [tabs, setTabs] = useState<string>('home');
  const toggleTabs = (name: string) => {
    setTabs(name);
  };

  const saveUser = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: title,
      body: custonContent,
      tags: tags.split(','),
      resume: sumary,
    }

    createPost(data).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        setNotification({ color: 'success', message: t('post_created') });
        window.location.href = '/blog';
      }
    });

    console.log(data);

  };
  useEffect(() => {
    if (content) {
      let customizedContent = content
        .replace(/<h1>/g, "<h1 class='text-center text-4xl font-bold my-4'>")
        .replace(/<h3>/g, "<h3 class='text-center my-5 text-2xl md:text-5xl font-bold'>")
        .replace(/<h4>/g, "<h4 class='text-center mb-4 text-2xl font-semibold'>")
        .replace(/<p>/g, "<p class='text-center text-white brightness-50 text-mb md:text-lg'>")
        .replace(/<strong>/g, "<strong class='font-semibold'>")
        .replace(/<img/g, "<img class='mx-auto my-4'");
      customizedContent = `
              <h1 class="text-center text-4xl font-bold my-4">${title}</h1>
              ${customizedContent ?? ''}
        `
      setCustonContent(customizedContent);
    }
  }, [content]);

  return (
    <div>
      <Notification color={notification.color} message={notification.message} onToastEnd={() => setNotification({ color: '', message: '' })} />

      <div className="">
        <div>
          <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
            <li className="inline-block">
              <p
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !border-primary text-primary`}
              >
                {t('create_post_page')}
              </p>
            </li>
          </ul>
        </div>
        <form onSubmit={saveUser}>
          <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className='mb-5'>
                <label htmlFor="title">{t('title')}</label>
                <input
                  id="title"
                  type="text"
                  placeholder={t('title')}
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className='mb-5'>
              <label htmlFor="content_summary">{t('content_summary')}</label>
              <input
                id="summary"
                type="text"
                placeholder={t('content_summary')}
                className="form-input"
                value={sumary}
                onChange={(e) => setSumary(e.target.value)}
              />
            </div>
            <div className='mb-5'>
              <label htmlFor="tags">{t('tags')}</label>
              <label htmlFor="tags_label">{t('tags_label')}</label>
              <input
                id="tags"
                type="text"
                placeholder={t('tags')}
                className="form-input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name">{t('content')}</label>
              <ReactQuill theme="snow" value={content} onChange={setContent} modules={{ toolbar: [[{ header: [1, 3, 4, false] }], ['bold', 'italic', 'underline', 'strike', 'image', 'link']] }} />
            </div>
            <button type="submit" className="btn btn-primary">
              {t('save')}
            </button>
          </div>
        </form>
        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
          <div dangerouslySetInnerHTML={{ __html: custonContent }} />
        </div>

      </div>
    </div>
  );
};

export default PostCreate;
