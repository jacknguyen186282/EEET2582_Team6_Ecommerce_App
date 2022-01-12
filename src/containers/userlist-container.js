import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUser } from '../actions/adminActions/adminActions';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export const UserListContainer = (props) => {
  const {
    pageNumber = 1,
  } = useParams();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      listUser(
      {
        pageNumber: pageNumber - 1,
      }
    ));
  }, [dispatch, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    return `/userlist/pageNumber/${filterPage}`;
  };
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
            {users.data ? users.data.content.map((user) => (
                <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.admin.toString()}</td>
              </tr>
            )) : <p>No User is found!</p> }
          </tbody>
        </table>
        </>
      )}
      {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
            {users.data.content.length === 0 && (
                <MessageBox>No User Found</MessageBox>
              )}
            <div className="row center pagination">
                {[...Array(users.data.total_page).keys()].map((x) => (
                  <Link
                    className={x === users.data.current_page ? 'active' : ''}
                    key={ x }
                    to={getFilterUrl({ page: x +1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
              </>
          )}
    </div>
  );
}
