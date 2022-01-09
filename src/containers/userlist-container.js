import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUser } from '../actions/adminActions/adminActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export const UserListContainer = (props) => {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  console.log(users)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);
  return (
    <div>
      <h1>User List</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        <table className="table">    
          <thead>
            <tr>
              <th>EMAIL</th>
              <th>GENDER</th>
              <th>IS ADMIN</th>
            </tr>
          </thead>
          <tbody>
            {users.data ? users.data.map((user) => (
                <tr>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.admin.toString()}</td>
              </tr>
            )) : <p>No User is found!</p> }
          </tbody>
        </table>
        </>
      )}
    </div>
  );
}
