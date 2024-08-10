import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import React from 'react';
import WaveLine from '../Components/Waveline';

const LandPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Maintenance'));
    });
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-[#292929] to-[#1a1a1a]">
            <div className='flex-1 flex flex-col items-center justify-center min-h-full'>
                <div className='text-white'>Teste</div>
            </div>
            <nav className='flex-shrink-0  p-6 min-h-full flex flex-col items-start justify-center flex-1'>
                <ul>
                    <li className='mb-8'>
                        <p className='text-white brightness-50 text-lg italic'>Sobre mim e porque deveria me contratar</p>
                        <a className='text-5xl font-bold text-white mt-2' href=""><h2 className='mt-2'>Acout</h2></a>
                    </li>
                    <li className='mb-8'>
                        <p className='text-white brightness-50 text-lg italic'>Contatos para me contratar</p>
                        <a className='text-5xl font-bold text-white' href=""><h2 className='mt-2'>Contact</h2></a>
                    </li>
                    <li className='mb-8'>
                        <p className='text-white brightness-50 text-lg italic'>Minhas histórias, artigos e outros</p>
                        <a className='text-5xl font-bold text-white' href="/blog"><h2 className='mt-2'>Blog</h2></a>
                    </li>
                    <li className='mb-8'>
                        <p className='text-white brightness-50 text-lg italic'>Meu portifólio</p>
                        <a className='text-5xl font-bold text-white' href=""><h2 className='mt-2'>Projects</h2></a>
                    </li>
                </ul>
            </nav>
            <WaveLine />
        </div>
    );
};

export default LandPage;
