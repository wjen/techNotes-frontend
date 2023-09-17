import { useEffect, useRef, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useRefreshMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import { PulseLoader } from 'react-spinners';

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    console.log(
        '🚀 ~ file: PersistLogin.js:12 ~ PersistLogin ~ effectRan:',
        effectRan
    );

    const [trueSuccess, setTrueSuccess] = useState(false);

    // isUninitialized means the refresh function has not been called yet.
    const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
        useRefreshMutation();

    useEffect(() => {
        if (
            effectRan.current === true ||
            process.env.NODE_ENV !== 'development'
        ) {
            //react 18 strict mod
            const verifyRefreshToken = async () => {
                console.log('verify refresh token');
                try {
                    const response = await refresh();
                    console.log(
                        '🚀 ~ file: PersistLogin.js:25 ~ verifyRefreshToken ~ response:',
                        response
                    );
                    // const { accessToken } = response.data

                    // set true success because refresh can be successful without the token being set yet
                    setTrueSuccess(true);
                } catch (err) {
                    console.error(err);
                }
            };
            if (!token && persist) verifyRefreshToken();
        }
        // useRef will hold this value even after component mounts and remounts
        return () => (effectRan.current = true);
    }, []);

    let content;
    if (!persist) {
        // persist: no
        console.log('no persist');
        content = <Outlet />;
    } else if (isLoading) {
        //persist: yes, token: no
        console.log('loading');
        content = <PulseLoader color={'#FFF'} />;
    } else if (isError) {
        //persist: yes, token: no
        console.log('error');
        content = (
            <p className="errmsg">
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>.
            </p>
        );
    } else if (isSuccess && trueSuccess) {
        //persist: yes, token: yes
        console.log('success');
        content = <Outlet />;
    } else if (token && isUninitialized) {
        //persist: yes, token: yes
        console.log('token and uninit');
        console.log(isUninitialized);
        content = <Outlet />;
    }

    return content;
};

export default PersistLogin;
