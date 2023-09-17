import React from 'react';
import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectUserById } from './usersApiSlice';
import EditUserForm from './EditUserForm';
import PulseLoader from 'react-spinners/PulseLoader';
import { useGetUsersQuery } from './usersApiSlice';
import useTitle from '../../hooks/useTitle';
const EditUser = () => {
    useTitle('techNotes: Edit User');

    const { id } = useParams();
    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id],
        }),
    });
    // const user = useSelector((state) => selectUserById(state, id));

    // const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

    if (!user) return <PulseLoader color={'#FFF'} />;

    const content = <EditUserForm user={user} />;

    return content;
};

export default EditUser;
