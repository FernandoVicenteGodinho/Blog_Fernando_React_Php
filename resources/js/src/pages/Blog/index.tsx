import { React } from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { setPageTitle, toggleTheme } from '../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import themeConfig from '../../theme.config';
import { IRootState } from '../../store';

const Blog = () => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Knowledge Base'));
    });
    const [active, setActive] = useState<Number>();
    const togglePara = (value: Number) => {
        setActive((oldValue) => {
            return oldValue === value ? 0 : value;
        });
    };

    return (
        <div>
            <div className="pt-5">
                <h2 className="text-center my-5 text-2xl md:text-5xl font-bold">Blog</h2>
                <p className="text-center text-white brightness-50 my-5 text-mb md:text-lg ">Estudar, escrever e criar</p>


                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md bg-white dark:bg-black p-5 shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),_0px_12px_24px_-4px_rgba(145,158,171,0.12)]">
                        <div className="rounded-md overflow-hidden mb-5 shadow-[0_6px_10px_0_rgba(0,0,0,0.14),_0_1px_18px_0_rgba(0,0,0,0.12),_0_3px_5px_-1px_rgba(0,0,0,0.20)]">
                            <img src="/assets/images/lightbox1.jpg" alt="..." />
                        </div>
                        <h5 className="text-xl mb-5">Excessive sugar is harmful</h5>
                        <div className="flex">
                            <div className="rounded-full overflow-hidden ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-1.jpeg" className="w-11 h-11 object-cover" alt="profile1" />
                            </div>
                            <div className="flex-1">
                                <h4>Alma Clark</h4>
                                <p>06 May</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Blog;
