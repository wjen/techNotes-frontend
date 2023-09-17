import { store } from '../../app/store';
import { notesApiSlice } from '../notes/notesApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        // console.log('subscribing');
        // const notes = store.dispatch(
        //     notesApiSlice.endpoints.getNotes.initiate()
        // );
        // const users = store.dispatch(
        //     usersApiSlice.endpoints.getUsers.initiate()
        // );
        // using rtk instead of redux
        store.dispatch(
            notesApiSlice.util.prefetch('getNotes', 'notesList', {
                force: true,
            })
        );

        store.dispatch(
            usersApiSlice.util.prefetch('getUsers', 'usersList', {
                force: true,
            })
        );
        // prefetching now so nothing to unsubscribe from
        // return () => {
        //     console.log('unsubscribing');
        //     notes.unsubscribe ();
        //     users.unsubscribe();
        // };
    }, []);

    return <Outlet />;
};
export default Prefetch;
