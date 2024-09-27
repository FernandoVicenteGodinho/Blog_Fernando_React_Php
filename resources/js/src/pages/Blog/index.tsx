import { React } from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { setPageTitle, toggleTheme } from '../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import themeConfig from '../../theme.config';
import { IRootState } from '../../store';
import { IPost } from '../../types/types';
import { get } from 'http';
import { getPosts } from '../../service/post';

const Blog = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [userLogged, setUserLogged] = useState<Boolean>(false);

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Knowledge Base'));
    getPosts().then((res) => {
      setPosts(res.data.content);
    });
    localStorage.getItem(`token`) ? setUserLogged(true) : setUserLogged(false);
    console.log(localStorage.getItem(`token`));
  }, []);
  const [active, setActive] = useState<Number>();
  const togglePara = (value: Number) => {
    setActive((oldValue) => {
      return oldValue === value ? 0 : value;
    });
  };
  function extractFirstImgSrc(body) {
    const imgTagRegex = /<img[^>]+src="([^">]+)"/;
    const match = body.match(imgTagRegex);
    return match ? match[1] : '/assets/images/lightbox1.jpg';
  }

  return (
    <div>
      <div className="pt-5">
        <h2 className="text-center my-5 text-2xl md:text-5xl font-bold">Blog</h2>
        <p className="text-center text-white brightness-50 my-5 text-mb md:text-lg ">Estudar, escrever e criar</p>
        <div className="flex justify-center items-center ">
          <p className="text-center text-white brightness-50 my-5 text-mb md:text-lg ">Faça o login e compartilhe suas ideias</p>
          { userLogged &&
           <a
            href="/profile/create-post"
            className=" items-center p-2 mx-2 my-2 px-[40px] rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
          >
            <p className="text-center text-white brightness-50 text-mb md:text-lg ">Crie seu post</p>
          </a>
          }
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          { posts?.map((post) => (
            <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md bg-white dark:bg-black p-5 shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),_0px_12px_24px_-4px_rgba(145,158,171,0.12)]">
              <a href={`/blog/${post.id}`}>
                <div className="rounded-md overflow-hidden mb-5 shadow-[0_6px_10px_0_rgba(0,0,0,0.14),_0_1px_18px_0_rgba(0,0,0,0.12),_0_3px_5px_-1px_rgba(0,0,0,0.20)]">
                    <img src={extractFirstImgSrc(post.body)} alt="..." className='max-w-full h-auto max-h-[300px] object-cover' />
                </div>
                <h5 className="text-xl">{post.title}</h5>
                <h4 className="text-mb ml-5 mb-5">{post.resume}</h4>
              </a>
              <div className="flex">
                <a href={`https://github.com/${post.user.github != null ? post.user.github : 'FernandoVicenteGodinho'}`}>
                  <div className="rounded-full overflow-hidden ltr:mr-4 rtl:ml-4">
                    <img src={`https://avatars.githubusercontent.com/${post.user.github != null ? post.user.github : 'FernandoVicenteGodinho'}`} className="w-11 h-11 object-cover" alt="profile1" />
                  </div>
                </a>
                <div className="flex-1">
                  <h4>{post.user.name}</h4>
                  <p>{post.user.profession}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
